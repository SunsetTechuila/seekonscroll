import { SettingsSection } from "spcr-settings";

export default async function main() {
  let stopDraggingTimeout: number;
  let progressBar: HTMLDivElement;
  let slider: HTMLDivElement;

  const settings = new SettingsSection("Seek on scroll", "seekOnScroll");
  settings.addInput(
    "skipPercent",
    "Set percentage of track time to skip on each scroll (1-100)",
    // default skip percent
    "3",
    undefined,
    "number",
  );
  settings.addToggle("invertScroll", "Invert scroll direction", false);
  await settings.pushSettings();

  function waitForProgressBar() {
    const progressBarMaybe = document.querySelector(
      ".playback-bar .playback-progressbar-isInteractive .progress-bar",
    );
    const sliderMaybe = document.querySelector(
      ".playback-bar .playback-progressbar-isInteractive .progress-bar__slider",
    );
    if (progressBarMaybe instanceof HTMLDivElement && sliderMaybe instanceof HTMLDivElement) {
      progressBar = progressBarMaybe;
      progressBar.addEventListener("wheel", (wheelEvent) => handleScroll(wheelEvent));
      slider = sliderMaybe;
    } else {
      setTimeout(waitForProgressBar, 300);
    }
  }
  waitForProgressBar();
  document.addEventListener("fullscreenchange", waitForProgressBar);

  function handleScroll(wheelEvent: WheelEvent) {
    const currentSkipPercent = Number.parseInt(settings.getFieldValue("skipPercent"));
    if (currentSkipPercent === 0) return;

    if (stopDraggingTimeout) clearTimeout(stopDraggingTimeout);

    if (!progressBar.className.includes("isDragging")) startDragging();

    let deltaY = -wheelEvent.deltaY; // delta < 0 -> scroll wheel moved forward, so reverse the sign
    if (settings.getFieldValue("invertScroll")) deltaY = -deltaY;

    dragByPercent(currentSkipPercent * (deltaY > 0 ? 1 : -1));

    stopDraggingTimeout = setTimeout(stopDragging, 300);
  }

  function dragByPercent(percentToSeek: number) {
    const { width: progressBarWidth } = progressBar.getBoundingClientRect();
    const { x: sliderX, y: sliderY } = getSliderCenterCoordinates();

    const pixelsToMove = (progressBarWidth * percentToSeek) / 100;
    const finalX = sliderX + pixelsToMove;

    dispatchMouseAndPointerEvents("move", Math.floor(finalX), sliderY);
  }

  function startDragging() {
    // prevent the slider to move to the cursor position when the mouse is moved while scrolling
    document.addEventListener("mousemove", filterMouseOrPointerEvent);
    document.addEventListener("pointermove", filterMouseOrPointerEvent);

    const { x: sliderX, y: sliderY } = getSliderCenterCoordinates();

    dispatchMouseAndPointerEvents("down", Math.floor(sliderX), sliderY);
  }

  function stopDragging() {
    const { x: sliderX, y: sliderY } = getSliderCenterCoordinates();

    dispatchMouseAndPointerEvents("up", Math.floor(sliderX), sliderY);

    document.removeEventListener("mousemove", filterMouseOrPointerEvent);
    document.removeEventListener("pointermove", filterMouseOrPointerEvent);
  }

  function getSliderCenterCoordinates() {
    const sliderRect = slider.getBoundingClientRect();
    return {
      x: sliderRect.x + sliderRect.width / 2,
      y: sliderRect.y + sliderRect.height / 2,
    };
  }

  function filterMouseOrPointerEvent(event: MouseEvent | PointerEvent) {
    if (event.buttons !== 999) event.stopImmediatePropagation();
  }

  function dispatchMouseAndPointerEvents(
    eventType: "up" | "down" | "move",
    xCoordinate: number,
    yCoordinate: number,
  ) {
    const eventParameters = {
      clientX: xCoordinate,
      clientY: yCoordinate,
      screenX: xCoordinate,
      screenY: yCoordinate,
      buttons: 999, // value to indicate that this is not a user-triggered event
      view: window,
      bubbles: true,
    };

    const mouseEvent = new MouseEvent(`mouse${eventType}`, eventParameters);
    const pointerEvent = new PointerEvent(`pointer${eventType}`, eventParameters);

    progressBar.dispatchEvent(mouseEvent);
    progressBar.dispatchEvent(pointerEvent);
  }
}

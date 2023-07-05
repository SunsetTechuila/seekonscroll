import { SettingsSection } from "spcr-settings";
function main() {
  const defaultSkipValueSec = "1"
  const settings = new SettingsSection(
    "Seek on scroll",
    "seekOnScroll"
  );
  settings.addInput(
    "skipValueSec",
    "Set the number of seconds to skip on each scroll",
    defaultSkipValueSec,
    undefined,
    {
      type: "number",
      min: "1"
    },
  );
  settings.pushSettings();

  function waitForProgressBar() {
    const progressBar = document.querySelector<HTMLDivElement>(
      ".playback-bar .playback-progressbar-isInteractive .progress-bar"
    );
    if (progressBar) {
      onProgressBarLoad(progressBar);
    }
    else {
      setTimeout(waitForProgressBar, 100);
    }
  }
  waitForProgressBar();
  document.addEventListener("fullscreenchange", () => {
    setTimeout(waitForProgressBar, 300)
  });

  function onProgressBarLoad(progressBar: HTMLDivElement) {
    progressBar.addEventListener("wheel", (event) => skip(event))
  }

  function skip(event: WheelEvent) {
    let currentSkipValueSec = parseInt(
      settings.getFieldValue("skipValueSec")
      , 10);
    const maxSkipValueSec = Spicetify.Player.getDuration() / 1000
    let currentSkipValueMs;

    switch (true) {
      case currentSkipValueSec < 1:
        currentSkipValueMs = parseInt(defaultSkipValueSec, 10) * 1000;
        break;
      case currentSkipValueSec > maxSkipValueSec:
        currentSkipValueMs = maxSkipValueSec * 1000;
        break;
      default:
        currentSkipValueMs = currentSkipValueSec * 1000;
        break;
    }

    if (event.deltaY > 0) {
      Spicetify.Player.skipBack(currentSkipValueMs);
    }
    else if (event.deltaY < 0) {
      Spicetify.Player.skipForward(currentSkipValueMs);
    }
  }
}

export default main;

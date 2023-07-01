async function main() {
  while (!Spicetify?.showNotification) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  Spicetify.showNotification("Hello!");
  console.log("Hello Xyntho!");
  const progBar = document.querySelector<HTMLDivElement>(
    "#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.main-nowPlayingBar-center > div > div.playback-bar > div.playback-progressbar.playback-progressbar-isInteractive > div"
  );
  const sensitivity = 0.2;

  if (progBar) {
    progBar.addEventListener("wheel", (e) => {
      console.log(e);

      let currentState = parseFloat(
        progBar.style.cssText.split(":")[1].split("%")[0]
      );

      if (currentState <= 100 && currentState >= 0) {
        let changedVal = currentState + e.deltaY * sensitivity;
        if (e.deltaY > 0) {
          if (changedVal <= 100) {
            progBar.style.cssText =
              "--progress-bar-transform: " + changedVal + "%;";
          }
        } else {
          if (changedVal >= 0) {
            progBar.style.cssText =
              "--progress-bar-transform: " + changedVal + "%;";
          }
        }
      }
      debounce(handleStyleChange, 300);
    });

    // Create a new MutationObserver
    const observer = new MutationObserver((mutationsList) => {
      let isWheeling = false;
      // Check each mutation that occurred
      for (const mutation of mutationsList) {
        // Check if the mutation is a style change
        if (mutation.attributeName === "style") {
          isWheeling = true;
        }
      }

      // If the style change is complete, handle the event
      if (!isWheeling) {
        handleStyleChange();
      }
    });

    // Select the target element
    const targetElement = progBar;

    // Start observing the target element for mutations
    observer.observe(targetElement, { attributes: true });
  }

  // Debounce function to delay the execution of the handler
  let debounceTimeout: ReturnType<typeof setTimeout>;
  function debounce(func: () => void, delay: number) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, delay);
  }

  // Handler function to handle the style change event
  function handleStyleChange() {
    console.log("Style change complete!");
    if (progBar) {
      let currentState = parseFloat(
        progBar.style.cssText.split(":")[1].split("%")[0]
      );
      let prog = currentState / 100;
      let newProg = Spicetify.Player.getDuration() * prog;
      Spicetify.Player.seek(newProg);
    }
  }
}

export default main;

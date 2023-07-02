async function main() {
  
  console.log("Seek on scroll loaded!");
  var checkProgBar = setInterval(() => {
    if (document.querySelector<HTMLDivElement>(
      "#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.main-nowPlayingBar-center > div > div.playback-bar > div.playback-progressbar.playback-progressbar-isInteractive > div"
    )) {
      onProgBarLoaded();
      console.log("Prog bar loaded!");
      clearInterval(checkProgBar);
    }
  }, 10);
  const sensitivity = 0.2;
  let toPlay = false;
  function onProgBarLoaded() {
    const progBar = document.querySelector<HTMLDivElement>(
      "#main > div > div.Root__top-container > div.Root__now-playing-bar > footer > div > div.main-nowPlayingBar-center > div > div.playback-bar > div.playback-progressbar.playback-progressbar-isInteractive > div"
    );
    if (progBar) {
      progBar.addEventListener("wheel", (e) => {
        if (Spicetify.Player.isPlaying()) {
          Spicetify.Player.pause();
          toPlay = true;
        }

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
    function handleStyleChange() {
      if (progBar) {
        let currentState = parseFloat(
          progBar.style.cssText.split(":")[1].split("%")[0]
        );
        let prog = currentState / 100;
        let newProg = Spicetify.Player.getDuration() * prog;
        Spicetify.Player.seek(newProg);
        if (!Spicetify.Player.isPlaying() && toPlay) {
          Spicetify.Player.play();
          toPlay = false;
        }
      }
    }
  }
}

export default main;

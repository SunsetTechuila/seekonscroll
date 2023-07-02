import { SettingsSection } from "spcr-settings";
import debounce from "./modules/debounce";
async function main() {
  const settings = new SettingsSection(
    "Seek on scroll sensitivity",
    "seekOnScrollSensitivity"
  );
  settings.addInput(
    "seekOnScrollSensitivity",
    "Enter sensitivity (Default: 0.022)",
    "0.022",
    "number"
  );
  settings.pushSettings();

  console.log("Seek on scroll loaded!");
  var checkProgBar = setInterval(() => {
    if (
      document.querySelector<HTMLDivElement>(
        ".playback-progressbar-isInteractive .progress-bar"
      )
    ) {
      onProgBarLoaded();
      console.log("Prog bar loaded!");
      clearInterval(checkProgBar);
    }
  }, 10);
  let toPlay = false;
  function onProgBarLoaded() {
    const progBar = document.querySelector<HTMLDivElement>(
      ".playback-progressbar-isInteractive .progress-bar"
    );
    if (progBar) {
      progBar.addEventListener("wheel", (e) => {
        let sensitivity = settings.getFieldValue("seekOnScrollSensitivity");
        if (Spicetify.Player.isPlaying() && !toPlay) {
          Spicetify.Player.pause();
          toPlay = true;
        }
        let currentState = parseFloat(
          progBar.style.getPropertyValue("--progress-bar-transform").split("%")[0]
        );
        if (currentState <= 100 && currentState >= 0) {
          let changedVal = currentState + e.deltaY * sensitivity;
         
            if (changedVal <= 100 && changedVal >= 0) {
              progBar.style.setProperty("--progress-bar-transform", changedVal + "%")
            }
          
        }
        debounce(handleSeek, 300);
      });
    }
    
    function handleSeek() {
      if (progBar) {
        let currentState = parseFloat(
          progBar.style.getPropertyValue("--progress-bar-transform").split("%")[0]
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

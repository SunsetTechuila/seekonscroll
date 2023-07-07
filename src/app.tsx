import { SettingsSection } from 'spcr-settings';

function main() {
  const { Player } = Spicetify;
  let scrollTimeout: NodeJS.Timeout;
  let wasPlaying: boolean | null;
  let progressBar: HTMLDivElement;
  let progressBarElapsed: HTMLDivElement;
  let progressBarRemaining: HTMLDivElement;
  let ignoreInput: boolean;
  const defaultSkipPercent = '3';

  const settings = new SettingsSection('Seek on scroll', 'seekOnScroll');
  settings.addInput(
    'skipPercent',
    'Set percentage of track time to skip on each scroll (1-100 int)',
    defaultSkipPercent,
    undefined,
    {
      type: 'number',
      max: '100',
      min: '1',
      placeholder: `Default is ${defaultSkipPercent}`,
    }
  );
  settings.addToggle('invertScroll', 'Invert scroll direction', false);
  settings.pushSettings();

  function waitForPlayerState(testState: boolean) {
    const checkState = setInterval(() => {
      if (Player.isPlaying() === testState) clearInterval(checkState);
    }, 50);
  }

  function waitForPlayerProgress(testProgress: number) {
    const checkProgress = setInterval(() => {
      if (Player.getProgress() === testProgress) clearInterval(checkProgress);
    }, 50);
  }

  function setProgress(newProgressMs: number) {
    ignoreInput = true;

    Player.seek(newProgressMs);
    waitForPlayerProgress(newProgressMs);

    if (wasPlaying) {
      Player.play();
      waitForPlayerState(true);
    }

    wasPlaying = null;
    ignoreInput = false;
  }

  function handleScroll(event: WheelEvent) {
    if (ignoreInput) return;
    if (scrollTimeout) clearTimeout(scrollTimeout);

    const isPlaying = Player.isPlaying();
    if (wasPlaying == null) wasPlaying = isPlaying;
    if (isPlaying) {
      ignoreInput = true;
      Player.pause();
      waitForPlayerState(false);
      ignoreInput = false;
    }

    const { style } = progressBar;
    let { deltaY } = event;
    if (settings.getFieldValue('invertScroll')) deltaY = -deltaY;

    const currentSkipPercent = parseInt(settings.getFieldValue('skipPercent'), 10);
    const currentProgressPercent = parseFloat(style.getPropertyValue('--progress-bar-transform'));

    let newProgressPercent;
    switch (true) {
      case deltaY > 0:
        newProgressPercent = currentProgressPercent - currentSkipPercent;
        if (newProgressPercent < 0) newProgressPercent = 0;
        break;
      case deltaY < 0:
        newProgressPercent = currentProgressPercent + currentSkipPercent;
        if (newProgressPercent > 100) newProgressPercent = 100;
        break;
      default:
        return;
    }

    const durationMs = Player.getDuration();

    const newProgressMs = Math.floor((newProgressPercent / 100) * durationMs);
    const newProgressMin = Math.floor(newProgressMs / 60000);
    const newProgressSec = Math.floor((newProgressMs % 60000) / 1000);
    const zerosProgress = '0'.repeat(2 - newProgressSec.toString().length);
    const newProgressTime = `${newProgressMin}:${zerosProgress}${newProgressSec}`;

    const isRemainingDisplayed = progressBarRemaining.innerHTML.startsWith('-');
    if (isRemainingDisplayed) {
      const remainingMs = durationMs - newProgressMs;
      const remainingMin = Math.floor(remainingMs / 60000);
      const remainingSec = Math.floor((remainingMs % 60000) / 1000);
      const zerosRemaining = '0'.repeat(2 - remainingSec.toString().length);
      const remainingTime = `-${remainingMin}:${zerosRemaining}${remainingSec}`;

      progressBarRemaining.innerHTML = remainingTime;
    }

    style.setProperty('--progress-bar-transform', `${newProgressPercent}%`);
    progressBarElapsed.innerHTML = newProgressTime;

    scrollTimeout = setTimeout(setProgress, 400, newProgressMs);
  }

  function onProgressBarLoad() {
    progressBarElapsed = document.querySelector(
      '.playback-bar__progress-time-elapsed'
    ) as HTMLDivElement;
    progressBarRemaining = document.querySelector(
      '.main-playbackBarRemainingTime-container'
    ) as HTMLDivElement;
    progressBar.addEventListener('wheel', (event) => handleScroll(event));
  }

  function waitForProgressBar() {
    progressBar = document.querySelector(
      '.playback-bar .playback-progressbar-isInteractive .progress-bar'
    ) as HTMLDivElement;
    if (progressBar) {
      onProgressBarLoad();
    } else {
      setTimeout(waitForProgressBar, 100);
    }
  }

  waitForProgressBar();
  document.addEventListener('fullscreenchange', () => {
    setTimeout(waitForProgressBar, 300);
  });
}

export default main;

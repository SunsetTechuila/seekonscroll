import { SettingsSection } from 'spcr-settings';

function main() {
  const { Player } = Spicetify;
  let scrollTimeout: NodeJS.Timeout;
  let wasPlaying: boolean | null;
  let progressBar: HTMLDivElement;
  let progressBarTimeElapsed: HTMLDivElement;
  const defaultSkipPercent = '3';

  const settings = new SettingsSection('Seek on scroll', 'seekOnScroll');
  settings.addInput(
    'skipPercent',
    'Set the number of seconds to skip on each scroll (1-100)',
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

  function setProgress(newProgressMs: number) {
    Player.seek(newProgressMs);
    if (wasPlaying) Player.play();
    wasPlaying = null;
  }

  function handleScroll(event: WheelEvent) {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    const isPlaying = Player.isPlaying();
    if (isPlaying) Player.pause();
    if (wasPlaying == null) wasPlaying = isPlaying;

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

    const newProgressMs = (newProgressPercent / 100) * Player.getDuration();
    const newProgressMin = Math.floor(newProgressMs / 60000);
    const newProgressSec = Math.floor((newProgressMs % 60000) / 1000);

    const zeros = '0'.repeat(2 - newProgressSec.toString().length);
    const newProgressTime = `${newProgressMin}:${zeros}${newProgressSec}`;

    style.setProperty('--progress-bar-transform', `${newProgressPercent}%`);
    progressBarTimeElapsed.innerHTML = newProgressTime;

    scrollTimeout = setTimeout(setProgress, 400, newProgressMs);
  }

  function onProgressBarLoad() {
    progressBar.addEventListener('wheel', (event) => handleScroll(event));
  }

  function waitForProgressBar() {
    progressBar = document.querySelector(
      '.playback-bar .playback-progressbar-isInteractive .progress-bar'
    ) as HTMLDivElement;
    if (progressBar) {
      progressBarTimeElapsed = document.querySelector(
        '.playback-bar__progress-time-elapsed'
      ) as HTMLDivElement;
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

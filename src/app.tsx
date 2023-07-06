import { SettingsSection } from 'spcr-settings';

function main() {
  const { Player } = Spicetify;
  let scrollTimeout: number;
  let wasPlaying: boolean | null;
  let progressBar: HTMLDivElement;
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

  function setProgress(currentProgressPercent: number) {
    const newProgressMs = (currentProgressPercent / 100) * Player.getDuration();
    Player.seek(newProgressMs);
    if (wasPlaying) Player.play();
    wasPlaying = null;
  }

  function handleScroll(event: WheelEvent) {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    const isPlaying = Player.isPlaying();
    if (isPlaying) Player.pause();
    if (wasPlaying == null) wasPlaying = isPlaying;

    let { deltaY } = event;
    const { style } = progressBar;

    if (settings.getFieldValue('invertScroll')) deltaY = -deltaY;

    const currentSkipPercent = parseInt(settings.getFieldValue('skipPercent'), 10);
    const currentProgressPercent = parseFloat(style.getPropertyValue('--progress-bar-transform'));

    let newProgressPercent;
    if (deltaY > 0) newProgressPercent = currentProgressPercent - currentSkipPercent;
    else if (deltaY < 0) newProgressPercent = currentProgressPercent + currentSkipPercent;

    style.setProperty('--progress-bar-transform', `${newProgressPercent}%`);

    scrollTimeout = setTimeout(setProgress, 400, newProgressPercent);
  }

  function onProgressBarLoad() {
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

// app.ts
function createAnimator(el, opts) {
  const { frames, intervalMs } = opts;
  let index = 0;
  let timer = null;
  function tick() {
    el.textContent = frames[index];
    index = (index + 1) % frames.length;
  }
  return {
    start() {
      if (timer !== null)
        return;
      tick();
      timer = setInterval(tick, intervalMs);
    },
    stop() {
      if (timer === null)
        return;
      clearInterval(timer);
      timer = null;
    }
  };
}
var FRAMES = [
  `           ,~,
          ( | )
           '|'
        .-------.
      .'    |    '.
     /   .--+--.   \\
    |  .'   |   '.  |
    | |  . (O) .  | |
    |  '.   |   .'  |
     \\   '--+--'   /
      '.    |    .'
        '-------'`,
  `           ,~,
          ( / )
           '|'
        .-------.
      .'    |    '.
     /   .--+--.   \\
    |  .'   |   '.  |
    | |  . (o) .  | |
    |  '.   |   .'  |
     \\   '--+--'   /
      '.    |    .'
        '-------'`,
  `           ,~,
          ( | )
           '|'
        .-------.
      .'    |    '.
     /   .--X--.   \\
    |  .'   |   '.  |
    | |  . (0) .  | |
    |  '.   |   .'  |
     \\   '--X--'   /
      '.    |    .'
        '-------'`,
  `           ,~,
          ( \\ )
           '|'
        .-------.
      .'    |    '.
     /   .--+--.   \\
    |  .'   |   '.  |
    | |  . (o) .  | |
    |  '.   |   .'  |
     \\   '--+--'   /
      '.    |    .'
        '-------'`,
  `           ,~,
          ( | )
           '|'
        .-------.
      .'    |    '.
     /   .--*--.   \\
    |  .'   |   '.  |
    | |  . (O) .  | |
    |  '.   |   .'  |
     \\   '--*--'   /
      '.    |    .'
        '-------'`
];
function main() {
  const artEl = document.getElementById("art");
  if (!artEl)
    return;
  const animator = createAnimator(artEl, { frames: FRAMES, intervalMs: 550 });
  animator.start();
  document.addEventListener("visibilitychange", () => {
    document.hidden ? animator.stop() : animator.start();
  });
}
document.addEventListener("DOMContentLoaded", main);

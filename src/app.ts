// vazio.club — beholder ASCII animation

interface AnimatorOptions {
  frames: readonly string[];
  intervalMs: number;
}

interface Animator {
  start(): void;
  stop(): void;
}

function createAnimator(el: HTMLElement, opts: AnimatorOptions): Animator {
  const { frames, intervalMs } = opts;
  let index = 0;
  let timer: ReturnType<typeof setInterval> | null = null;

  function tick(): void {
    el.textContent = frames[index];
    index = (index + 1) % frames.length;
  }

  return {
    start() {
      if (timer !== null) return;
      tick();
      timer = setInterval(tick, intervalMs);
    },
    stop() {
      if (timer === null) return;
      clearInterval(timer);
      timer = null;
    },
  };
}

// ── frames ────────────────────────────────────────────────────────────────────
// Each frame is 15 lines. Characters that change across frames are marked below.
// Line  6: central eye pupil  @ / @> / --- / (O) / @@@
// Line  1: eyestalk tips      o ^ o ^ o  /  o o ^ o o  (frame 3)
// Lines 13-15: maw            wider in frame 4

const FRAMES: readonly string[] = [
/* 0 – rest, eye centred */
`      o   o   o
       \\  |  /
    o---( ~~~ )---o
   /   /       \\   \\
  |  o(  .---.  )o  |
  |  |(  | @ |  )|  |
  |  o(  '---'  )o  |
   \\   \\       /   /
    o---( ~~~ )---o
       /  |  \\
      o   |   o
          |
       .-------.
      | v v v v |
       '-------'`,

/* 1 – eye drifts right */
`      o   o   o
       \\  |  /
    o---( ~~~ )---o
   /   /       \\   \\
  |  o(  .---.  )o  |
  |  |(  |  @|  )|  |
  |  o(  '---'  )o  |
   \\   \\       /   /
    o---( ~~~ )---o
       /  |  \\
      o   |   o
          |
       .-------.
      | v v v v |
       '-------'`,

/* 2 – blink */
`      o   o   o
       \\  |  /
    o---( ~~~ )---o
   /   /       \\   \\
  |  o(  .---.  )o  |
  |  |(  |---|  )|  |
  |  o(  '---'  )o  |
   \\   \\       /   /
    o---( ~~~ )---o
       /  |  \\
      o   |   o
          |
       .-------.
      | v v v v |
       '-------'`,

/* 3 – iris dilates, stalks cluster */
`      o  o   o  o
       \\ \\   / /
    o---( ~~~ )---o
   /   /       \\   \\
  |  o(  .---.  )o  |
  |  |(  |(O)|  )|  |
  |  o(  '---'  )o  |
   \\   \\       /   /
    o---( ~~~ )---o
       /  |  \\
      o   |   o
          |
       .-------.
      | v v v v |
       '-------'`,

/* 4 – all eyes wide, maw gapes */
`      o   o   o
       \\  |  /
    o---( ~~~ )---o
   /   /       \\   \\
  |  o(  .---.  )o  |
  |  |(  |@@@|  )|  |
  |  o(  '---'  )o  |
   \\   \\       /   /
    o---( ~~~ )---o
       /   |   \\
      o    |    o
           |
      .---------.
     | v v v v v |
      '---------'`,
];

// ── boot ──────────────────────────────────────────────────────────────────────

function main(): void {
  const artEl = document.getElementById('art');
  if (!artEl) return;

  const animator = createAnimator(artEl, { frames: FRAMES, intervalMs: 550 });
  animator.start();

  document.addEventListener('visibilitychange', () => {
    document.hidden ? animator.stop() : animator.start();
  });
}

document.addEventListener('DOMContentLoaded', main);

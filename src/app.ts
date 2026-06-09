// vazio.club — tangerine ASCII animation

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
// Each frame is 12 lines. Characters that change across frames are marked below.
// Line  2: leaf direction  | / | \
// Line  8: navel char      O o 0 o
// Line  6/10: segment hub  + + X +

const FRAMES: readonly string[] = [
/* 0 – rest */
`       ,~,
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

/* 1 – tilt right */
`       ,~,
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

/* 2 – glow peak */
`       ,~,
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

/* 3 – tilt left */
`       ,~,
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

/* 4 – wide-open */
`       ,~,
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
    '-------'`,
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

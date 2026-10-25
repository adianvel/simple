"use client";

import { useEffect, useRef } from "react";

type PileIcon = {
  name: string;
  icon: string;
};

const PILE_ICONS: PileIcon[] = [
  { name: "OpenAI", icon: "/portfolio/icons/pile/openai.svg" },
  { name: "Anthropic", icon: "/portfolio/icons/pile/anthropic.svg" },
  { name: "NVIDIA", icon: "/portfolio/icons/pile/nvidia.svg" },
  { name: "Perplexity", icon: "/portfolio/icons/pile/perplexity.svg" },
  { name: "Cursor", icon: "/portfolio/icons/pile/cursor.svg" },
  { name: "Google", icon: "/portfolio/icons/pile/google.svg" },
  { name: "Microsoft", icon: "/portfolio/icons/pile/microsoft.svg" },
  { name: "Apple", icon: "/portfolio/icons/pile/apple.svg" },
  { name: "Discord", icon: "/portfolio/icons/pile/discord.svg" },
  { name: "Tesla", icon: "/portfolio/icons/pile/tesla.svg" },
  { name: "Spotify", icon: "/portfolio/icons/pile/spotify.svg" },
  { name: "Netflix", icon: "/portfolio/icons/pile/netflix.svg" },
  { name: "YouTube", icon: "/portfolio/icons/pile/youtube.svg" },
  { name: "Instagram", icon: "/portfolio/icons/pile/instagram.svg" },
  { name: "WhatsApp", icon: "/portfolio/icons/pile/whatsapp.svg" },
  { name: "TikTok", icon: "/portfolio/icons/pile/tiktok.svg" },
  { name: "Meta", icon: "/portfolio/icons/pile/meta.svg" },
  { name: "Mistral AI", icon: "/portfolio/icons/pile/mistralai.svg" },
  { name: "Ollama", icon: "/portfolio/icons/pile/ollama.svg" },
  { name: "Next.js", icon: "/portfolio/icons/pile/nextdotjs.svg" },
  { name: "React", icon: "/portfolio/icons/pile/react.svg" },
  { name: "TypeScript", icon: "/portfolio/icons/pile/typescript.svg" },
  { name: "Tailwind CSS", icon: "/portfolio/icons/pile/tailwindcss.svg" },
  { name: "Node.js", icon: "/portfolio/icons/pile/nodedotjs.svg" },
  { name: "Bun", icon: "/portfolio/icons/pile/bun.svg" },
  { name: "Deno", icon: "/portfolio/icons/pile/deno.svg" },
  { name: "Vite", icon: "/portfolio/icons/pile/vite.svg" },
  { name: "Astro", icon: "/portfolio/icons/pile/astro.svg" },
  { name: "Svelte", icon: "/portfolio/icons/pile/svelte.svg" },
  { name: "Python", icon: "/portfolio/icons/pile/python.svg" },
  { name: "Rust", icon: "/portfolio/icons/pile/rust.svg" },
  { name: "Go", icon: "/portfolio/icons/pile/go.svg" },
  { name: "GraphQL", icon: "/portfolio/icons/pile/graphql.svg" },
  { name: "Supabase", icon: "/portfolio/icons/pile/supabase.svg" },
  { name: "Firebase", icon: "/portfolio/icons/pile/firebase.svg" },
  { name: "MongoDB", icon: "/portfolio/icons/pile/mongodb.svg" },
  { name: "Redis", icon: "/portfolio/icons/pile/redis.svg" },
  { name: "Prisma", icon: "/portfolio/icons/pile/prisma.svg" },
  { name: "Cloudflare", icon: "/portfolio/icons/pile/cloudflare.svg" },
  { name: "Vercel", icon: "/portfolio/icons/pile/vercel.svg" },
  { name: "Netlify", icon: "/portfolio/icons/pile/netlify.svg" },
  { name: "Kubernetes", icon: "/portfolio/icons/pile/kubernetes.svg" },
  { name: "GitHub", icon: "/portfolio/icons/pile/github.svg" },
  { name: "GitLab", icon: "/portfolio/icons/pile/gitlab.svg" },
  { name: "Linear", icon: "/portfolio/icons/pile/linear.svg" },
  { name: "Notion", icon: "/portfolio/icons/pile/notion.svg" },
  { name: "Slack", icon: "/portfolio/icons/pile/slack.svg" },
  { name: "Sentry", icon: "/portfolio/icons/pile/sentry.svg" },
  { name: "Postman", icon: "/portfolio/icons/pile/postman.svg" },
  { name: "Raycast", icon: "/portfolio/icons/pile/raycast.svg" },
  { name: "Framer", icon: "/portfolio/icons/pile/framer.svg" },
  { name: "Stripe", icon: "/portfolio/icons/pile/stripe.svg" },
];

type PreparedIcon = {
  img: HTMLImageElement;
  ready: boolean;
  bleed: boolean;
  tile: HTMLCanvasElement | null;
  initial: string;
};

type PileBody = {
  item: PileIcon;
  body: Matter.Body;
  inWorld: boolean;
  seen: boolean;
  thrown: boolean;
  thrownAt: number;
};

const STEP = 1000 / 60;
const TILE_MIN = 22;
const MOBILE_TILE_MIN = 30;
const TILE_MAX = 46;
const FLIGHT_ROOM = 520;
const HOVER_DELAY = 150;
const THROW_COOLDOWN = 900;

function isBleedIcon(img: HTMLImageElement) {
  try {
    const probe = document.createElement("canvas");
    probe.width = probe.height = 16;
    const ctx = probe.getContext("2d", { willReadFrequently: true });
    if (!ctx) return false;
    ctx.drawImage(img, 0, 0, 16, 16);
    return [
      [0, 0],
      [15, 0],
      [0, 15],
      [15, 15],
    ]
      .map(([x, y]) => ctx.getImageData(x, y, 1, 1).data)
      .every(([r, g, b, a]) => a > 250 && r + g + b < 700);
  } catch {
    return false;
  }
}

function makeTile(prep: PreparedIcon, size: number, dpr: number) {
  const pixels = Math.max(2, Math.round(size * dpr));
  const tile = document.createElement("canvas");
  tile.width = tile.height = pixels;
  const ctx = tile.getContext("2d");
  if (!ctx) return tile;

  const inset = Math.max(1, dpr);
  ctx.beginPath();
  ctx.roundRect(inset / 2, inset / 2, pixels - inset, pixels - inset, 0.23 * pixels);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  if (prep.ready && prep.img.naturalWidth) {
    ctx.save();
    ctx.clip();
    const pad = prep.bleed ? 0 : 0.12 * pixels;
    const box = pixels - pad * 2;
    const ratio = prep.img.naturalWidth / prep.img.naturalHeight;
    const width = ratio >= 1 ? box : box * ratio;
    const height = ratio >= 1 ? box / ratio : box;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(prep.img, (pixels - width) / 2, (pixels - height) / 2, width, height);
    ctx.restore();
  } else {
    ctx.fillStyle = "#eef2ef";
    ctx.fill();
    ctx.fillStyle = "#16382c";
    ctx.font = `600 ${Math.round(0.42 * pixels)}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(prep.initial, pixels / 2, pixels / 2 + 0.02 * pixels);
  }

  ctx.lineWidth = Math.max(1, dpr);
  ctx.strokeStyle = "rgba(22, 56, 44, 0.14)";
  ctx.stroke();
  return tile;
}

export default function TechPile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const input = inputRef.current;
    if (!container || !canvas || !input) return;

    let disposed = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      const matterModule = await import("matter-js");
      type MatterAPI = typeof import("matter-js");
      const Matter = ((matterModule as { default?: MatterAPI }).default ?? matterModule) as MatterAPI;
      if (disposed) return;
      teardown = setup(Matter, container, canvas, input);
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  return (
    <div className="tech-pile" ref={containerRef} aria-hidden="true">
      <canvas className="tech-pile-render" ref={canvasRef} />
      <canvas className="tech-pile-input" ref={inputRef} />
    </div>
  );
}

function setup(
  Matter: typeof import("matter-js"),
  container: HTMLDivElement,
  canvas: HTMLCanvasElement,
  inputCanvas: HTMLCanvasElement,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = container.clientWidth;
  let height = container.clientHeight;
  let tileSize = TILE_MAX;
  let walls: Matter.Body[] = [];
  let raf = 0;
  let running = false;
  let started = false;
  let dropIndex = 0;
  let nextDropAt = 0;
  let lastFrame = performance.now();
  let accumulator = 0;
  let dragging = false;
  let hoverTimer = 0;
  let hoverEntry: PileBody | null = null;

  const engine = Matter.Engine.create({ gravity: { x: 0, y: 1, scale: 0.001 } });
  engine.enableSleeping = true;
  engine.positionIterations = 4;
  engine.velocityIterations = 3;

  const sleeping = Matter.Sleeping as unknown as {
    _motionSleepThreshold: number;
    _motionWakeThreshold: number;
  };
  sleeping._motionSleepThreshold = 0.35;
  sleeping._motionWakeThreshold = 0.8;

  const prepared = new Map<string, PreparedIcon>();
  const bodies: PileBody[] = [];

  const sizeCanvas = () => {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round((height + FLIGHT_ROOM) * dpr);
    canvas.style.height = `${height + FLIGHT_ROOM}px`;
    inputCanvas.width = Math.round(width * dpr);
    inputCanvas.height = Math.round(height * dpr);
  };

  const buildWalls = () => {
    Matter.Composite.remove(engine.world, walls);
    walls = [
      Matter.Bodies.rectangle(width / 2, height + 200, width + 800, 400, {
        isStatic: true,
        friction: 0.9,
      }),
      Matter.Bodies.rectangle(-200, height / 2, 400, height * 6 + 800, { isStatic: true }),
      Matter.Bodies.rectangle(width + 200, height / 2, 400, height * 6 + 800, { isStatic: true }),
    ];
    Matter.Composite.add(engine.world, walls);
  };

  const prepare = (item: PileIcon) => {
    const existing = prepared.get(item.icon);
    if (existing) return existing;

    const prep: PreparedIcon = {
      img: new Image(),
      ready: false,
      bleed: false,
      tile: null,
      initial: item.name.charAt(0).toUpperCase(),
    };
    prep.tile = makeTile(prep, tileSize, dpr);
    prep.img.decoding = "async";
    prep.img.onload = () => {
      prep.ready = true;
      prep.bleed = isBleedIcon(prep.img);
      prep.tile = makeTile(prep, tileSize, dpr);
      if (!running) draw();
    };
    prep.img.onerror = () => {
      prep.ready = false;
      prep.tile = makeTile(prep, tileSize, dpr);
      if (!running) draw();
    };
    prep.img.src = item.icon;
    prepared.set(item.icon, prep);
    return prep;
  };

  const makeBody = (item: PileIcon, index: number) =>
    Matter.Bodies.rectangle(
      width * (0.22 + ((0.618 * index) % 1) * 0.56),
      -tileSize * (1.4 + (index % 12) * 1.3),
      tileSize,
      tileSize,
      {
        restitution: 0.4,
        friction: 0.25,
        frictionStatic: 0.4,
        frictionAir: 0.014,
        angle: (Math.random() - 0.5) * 0.6,
        sleepThreshold: 30,
      },
    );

  const draw = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const entry of bodies) {
      if (!entry.inWorld) continue;
      const tile = prepared.get(entry.item.icon)?.tile;
      if (!tile) continue;
      const { position, angle } = entry.body;
      // Only the initial rain is hidden above the pile. Once a tile has
      // entered the pile it stays drawn even if a collision flings it back
      // above y=0, otherwise neighbours of a thrown tile vanish mid-air.
      if (position.y >= 0) entry.seen = true;
      if (!entry.seen && !entry.thrown) continue;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin, dpr * cos, dpr * position.x, dpr * (position.y + FLIGHT_ROOM));
      ctx.drawImage(tile, -tileSize / 2, -tileSize / 2, tileSize, tileSize);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  const addBody = (index: number) => {
    const entry = bodies[index];
    if (!entry || entry.inWorld) return;
    Matter.Composite.add(engine.world, entry.body);
    entry.inWorld = true;
  };

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    const delta = Math.min(now - lastFrame, 120);
    lastFrame = now;

    if (now >= nextDropAt) {
      let added = 0;
      while (dropIndex < bodies.length && now >= nextDropAt && added < 4) {
        addBody(dropIndex);
        dropIndex += 1;
        added += 1;
        nextDropAt = Math.max(nextDropAt + 45, now - 100);
      }
    }

    accumulator += delta;
    let steps = 0;
    while (accumulator >= STEP && steps < 4) {
      Matter.Engine.update(engine, STEP);
      accumulator -= STEP;
      steps += 1;
    }
    if (accumulator > STEP * 4) accumulator = 0;

    draw();
  };

  const start = () => {
    if (running || reducedMotion) return;
    if (!started) {
      started = true;
      nextDropAt = performance.now() + 150;
    }
    lastFrame = performance.now();
    accumulator = 0;
    running = true;
    raf = requestAnimationFrame(tick);
  };

  const stop = () => {
    // A held tile keeps following the cursor while the page scrolls, so keep
    // the loop alive until the drag ends (releaseDrag stops it if needed).
    if (dragging) return;
    running = false;
    cancelAnimationFrame(raf);
    cancelHover();
    // The canvas extends FLIGHT_ROOM above the pile, which can still be on
    // screen after the pile scrolls away. Drop that overlay so thrown tiles
    // do not stay frozen over the page content.
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, FLIGHT_ROOM * dpr);
  };

  let visible = true;

  // Watch the tall render canvas rather than the pile box: a thrown tile flies
  // through the FLIGHT_ROOM overlay above the pile, and stopping as soon as the
  // pile itself leaves the viewport froze that tile mid-air while it was still
  // on screen. The loop should only rest once none of its canvas is visible.
  const intObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else if (started) stop();
    },
    { threshold: 0 },
  );
  intObserver.observe(canvas);

  const resizeObserver = new ResizeObserver(() => {
    sizeCanvas();
    buildWalls();
    draw();
  });
  resizeObserver.observe(container);

  sizeCanvas();
  const minTile = width < 700 ? MOBILE_TILE_MIN : TILE_MIN;
  tileSize = Math.max(
    minTile,
    Math.min(TILE_MAX, Math.sqrt((0.22 * width * height) / Math.max(1, PILE_ICONS.length))),
  );
  buildWalls();

  const mouse = Matter.Mouse.create(inputCanvas);
  const wheel = (mouse as unknown as { mousewheel?: EventListener }).mousewheel;
  if (wheel) {
    inputCanvas.removeEventListener("wheel", wheel);
    inputCanvas.removeEventListener("mousewheel", wheel);
    inputCanvas.removeEventListener("DOMMouseScroll", wheel);
  }
  mouse.pixelRatio = dpr;
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.14, render: { visible: false } },
  });
  Matter.Composite.add(engine.world, mouseConstraint);

  const topmostAt = (x: number, y: number) => {
    for (let index = bodies.length - 1; index >= 0; index -= 1) {
      const entry = bodies[index];
      if (entry.inWorld && Matter.Vertices.contains(entry.body.vertices, { x, y })) return entry;
    }
    return null;
  };

  const cancelHover = () => {
    if (hoverTimer) window.clearTimeout(hoverTimer);
    hoverTimer = 0;
    hoverEntry = null;
  };

  const launch = (entry: PileBody) => {
    const now = performance.now();
    if (dragging || entry.body.speed > 1 || now - entry.thrownAt < THROW_COOLDOWN) return;
    entry.thrown = true;
    entry.thrownAt = now;
    Matter.Sleeping.set(entry.body, false);
    Matter.Body.setVelocity(entry.body, {
      x: (Math.random() - 0.5) * 3,
      y: -19.5 - Math.random() * 2,
    });
    Matter.Body.setAngularVelocity(entry.body, (Math.random() - 0.5) * 0.4);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || dragging) {
      cancelHover();
      return;
    }
    const rect = inputCanvas.getBoundingClientRect();
    const entry = topmostAt(event.clientX - rect.left, event.clientY - rect.top);
    if (entry === hoverEntry) return;
    cancelHover();
    if (!entry) return;
    hoverEntry = entry;
    hoverTimer = window.setTimeout(() => {
      if (hoverEntry === entry) launch(entry);
    }, HOVER_DELAY);
  };

  const onPointerDown = () => cancelHover();
  const onPointerLeave = () => cancelHover();

  // The input canvas only covers the pile, so a drag that leaves it (e.g. to
  // throw a tile above the quote) would stop tracking. Follow the pointer
  // globally while the button is held.
  const pointer = { x: 0, y: 0 };

  const syncMouse = () => {
    const rect = inputCanvas.getBoundingClientRect();
    mouse.absolute.x = pointer.x - rect.left;
    mouse.absolute.y = pointer.y - rect.top;
    mouse.position.x = mouse.absolute.x * mouse.scale.x + mouse.offset.x;
    mouse.position.y = mouse.absolute.y * mouse.scale.y + mouse.offset.y;
  };

  const trackDrag = (event: PointerEvent) => {
    if (!dragging && mouse.button !== 0) return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    syncMouse();
  };

  // Wheel scrolling fires no pointer events, so a held tile would keep
  // chasing a stale world point and drift away from the cursor.
  const onScroll = () => {
    cancelHover();
    if (!dragging && mouse.button !== 0) return;
    syncMouse();
  };

  window.addEventListener("pointermove", trackDrag);
  window.addEventListener("scroll", onScroll, { passive: true });

  if (!reducedMotion) {
    inputCanvas.addEventListener("pointermove", onPointerMove);
    inputCanvas.addEventListener("pointerdown", onPointerDown);
    inputCanvas.addEventListener("pointerleave", onPointerLeave);
  }

  // Sleeping neighbors never react when a dragged tile is pulled out from under
  // them, leaving them frozen mid-air. Wake the pile as soon as a drag starts.
  Matter.Events.on(mouseConstraint, "startdrag", () => {
    dragging = true;
    cancelHover();
    const dragged = mouseConstraint.body;
    if (dragged) {
      const entry = bodies.find((item) => item.body.id === dragged.id);
      if (entry) entry.thrown = true;
    }
    bodies.forEach((entry) => Matter.Sleeping.set(entry.body, false));
  });
  Matter.Events.on(mouseConstraint, "enddrag", () => {
    dragging = false;
    if (!visible) stop();
  });

  // Matter only listens for mouseup on the canvas, so releasing a dragged tile
  // outside the footer leaves it pinned to the cursor. Release it globally.
  const releaseDrag = () => {
    mouse.button = -1;
    dragging = false;
    cancelHover();
    if (!visible) stop();
  };
  window.addEventListener("mouseup", releaseDrag);
  window.addEventListener("pointerup", releaseDrag);
  window.addEventListener("blur", releaseDrag);

  PILE_ICONS.forEach((item, index) => {
    prepare(item);
    bodies.push({
      item,
      body: makeBody(item, index),
      inWorld: false,
      seen: false,
      thrown: false,
      thrownAt: 0,
    });
  });

  if (reducedMotion) {
    bodies.forEach((entry) => {
      Matter.Body.setPosition(entry.body, {
        x: width * (0.05 + Math.random() * 0.9),
        y: height - tileSize * (1 + Math.random() * 6),
      });
    });
    bodies.forEach((_, index) => addBody(index));
    for (let step = 0; step < 400; step += 1) Matter.Engine.update(engine, STEP);
    draw();
    started = true;
  }

  return () => {
    dragging = false;
    stop();
    cancelHover();
    intObserver.disconnect();
    resizeObserver.disconnect();
    inputCanvas.removeEventListener("pointermove", onPointerMove);
    inputCanvas.removeEventListener("pointerdown", onPointerDown);
    inputCanvas.removeEventListener("pointerleave", onPointerLeave);
    window.removeEventListener("pointermove", trackDrag);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("mouseup", releaseDrag);
    window.removeEventListener("pointerup", releaseDrag);
    window.removeEventListener("blur", releaseDrag);
    Matter.Composite.clear(engine.world, false);
    Matter.Engine.clear(engine);
  };
}

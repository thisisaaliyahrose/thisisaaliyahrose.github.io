/* Ink — printed-ink textures and transitions shared by every page.
   - Ink.filter(svg): gives an SVG logo rough, bleeding, letterpress-speckled edges
   - Ink.bleedIn / bleedOut / boil: animate that filter (ink pooling in, receding, hand-printed jitter)
   - Paper grain over the whole page, and an ink-blot wipe between pages */
(() => {
  const NS = "http://www.w3.org/2000/svg";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lerp = (a, b, p) => a + (b - a) * p;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeInOut = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const wait = ms => new Promise(r => setTimeout(r, ms));
  let uid = 0;

  function tween(dur, fn, ease = easeOut) {
    return new Promise(done => {
      const t0 = performance.now();
      (function step(now) {
        const p = Math.min(1, (now - t0) / dur);
        fn(ease(p));
        p < 1 ? requestAnimationFrame(step) : done();
      })(t0);
    });
  }

  // ---------- the ink filter ----------
  // State: blur (spread of the ink), level (0 = all ink, 1 = none; 0.42 = settled), warp (edge roughness)
  const SETTLED = { blur: 0.6, level: 0.42 };
  const HIDDEN = { blur: 9, level: 1.05 };

  function filter(svg, { rough = 2.4, speck = 0.85 } = {}) {
    const id = "ink-" + (++uid);
    const defs = document.createElementNS(NS, "defs");
    defs.innerHTML = `
      <filter id="${id}" x="-10%" y="-30%" width="120%" height="160%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="1" result="warp"/>
        <feDisplacementMap in="SourceGraphic" in2="warp" scale="${rough}" xChannelSelector="R" yChannelSelector="G" result="rough"/>
        <feGaussianBlur in="rough" stdDeviation="${SETTLED.blur}" result="soft"/>
        <feComponentTransfer in="soft" result="ink"><feFuncA type="linear" slope="16" intercept="0"/></feComponentTransfer>
        <feTurbulence type="fractalNoise" baseFrequency="${speck}" numOctaves="2" seed="7" result="speck"/>
        <feColorMatrix in="speck" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.7 0 0 0 1.75" result="press"/>
        <feComposite in="ink" in2="press" operator="in"/>
      </filter>`;
    svg.prepend(defs);
    const g = document.createElementNS(NS, "g");
    g.setAttribute("filter", `url(#${id})`);
    [...svg.childNodes].filter(n => n !== defs).forEach(n => g.appendChild(n));
    svg.appendChild(g);
    const [warp, disp, blur, func] = defs.firstElementChild.children;
    const ink = {
      svg, rough,
      warp, fa: func.firstElementChild,
      set({ blur: b, level, warp: w = rough }) {
        blur.setAttribute("stdDeviation", b);
        this.fa.setAttribute("intercept", 0.5 - 16 * level);
        disp.setAttribute("scale", w);
      },
    };
    ink.set(reduce ? SETTLED : HIDDEN);
    svg.style.visibility = "visible";
    return ink;
  }

  // Ink pools into the shapes: blotches first, thin hairlines last
  function bleedIn(ink, dur = 2600) {
    if (reduce) return ink.set(SETTLED), Promise.resolve();
    return tween(dur, p => ink.set({
      blur: lerp(HIDDEN.blur, SETTLED.blur, p),
      level: lerp(0.98, SETTLED.level, p),
      warp: lerp(ink.rough * 6, ink.rough, p),
    }));
  }

  // Ink recedes back into blotches and dries away
  function bleedOut(ink, dur = 1500) {
    if (reduce) return Promise.resolve();
    return tween(dur, p => {
      ink.set({ blur: lerp(SETTLED.blur, 7, p), level: lerp(SETTLED.level, 1.05, p), warp: lerp(ink.rough, ink.rough * 5, p) });
      ink.svg.style.opacity = 1 - p * p;
    }, t => t);
  }

  // Hand-printed jitter: step the edge noise a few times a second, like stop-motion frames
  function boil(ink, fps = 8) {
    if (reduce) return () => {};
    let k = 0;
    const timer = setInterval(() => {
      if (document.hidden) return;
      ink.warp.setAttribute("seed", 1 + (k++ % 4));
    }, 1000 / fps);
    return () => clearInterval(timer);
  }

  // ---------- pencil outline ----------
  // Grainy graphite line traced over a copy of the shapes; call after filter() so the outline sits on top.
  // trace: an <svg> holding the logo's original, unmerged strokes. The pencil follows those strokes
  // (so long swashes sweep across in one motion) but is masked to the merged outline, so lines
  // where shapes overlap never show. keepLast: leave the last shape (the sparkle) unmasked.
  function pencil(svg, { width = 0.9, color = "currentColor", opacity = 1, trace = null, keepLast = false } = {}) {
    const id = "pencil-" + (++uid);
    const defs = document.createElementNS(NS, "defs");
    defs.innerHTML = `
      <filter id="${id}" x="-5%" y="-20%" width="110%" height="140%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G" result="line"/>
        <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="1" seed="11" result="g"/>
        <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.6 0 0 0 2.1" result="graphite"/>
        <feComposite in="line" in2="graphite" operator="in"/>
      </filter>`;
    svg.prepend(defs);
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "ink-pencil");
    g.setAttribute("filter", `url(#${id})`);
    g.style.color = color;
    g.style.opacity = reduce ? 0 : opacity;
    const own = [...svg.querySelectorAll("path")].filter(p => !p.closest(".ink-pencil") && !p.closest("mask"));
    const paths = (trace ? [...trace.querySelectorAll("path")] : own).map(p => {
      const c = p.cloneNode();
      c.removeAttribute("class");
      Object.entries({ fill: "none", stroke: "currentColor", "stroke-width": width, "stroke-linejoin": "round", "stroke-linecap": "round", pathLength: 1 })
        .forEach(([k, v]) => c.setAttribute(k, v));
      c.style.fill = "none";
      c.style.strokeDasharray = 1;
      c.style.strokeDashoffset = 1;
      g.appendChild(c);
      return c;
    });
    if (trace) {
      const mask = document.createElementNS(NS, "mask");
      mask.id = id + "-edge";
      mask.setAttribute("maskUnits", "userSpaceOnUse");
      const vb = svg.viewBox.baseVal;
      Object.entries({ x: vb.x - 20, y: vb.y - 20, width: vb.width + 40, height: vb.height + 40 }).forEach(([k, v]) => mask.setAttribute(k, v));
      own.forEach((p, k) => {
        const m = p.cloneNode();
        m.removeAttribute("class");
        Object.assign(m.style, { fill: "none", stroke: "#fff", strokeWidth: width * 3.2 });
        mask.appendChild(m);
        if (keepLast && k === own.length - 1) {
          const b = p.getBBox(), pad = b.width * 0.3;
          const rect = document.createElementNS(NS, "rect");
          Object.entries({ x: b.x - pad, y: b.y - pad, width: b.width + 2 * pad, height: b.height + 2 * pad, fill: "#fff" }).forEach(([a, v]) => rect.setAttribute(a, v));
          mask.appendChild(rect);
        }
      });
      defs.appendChild(mask);
      g.setAttribute("mask", `url(#${mask.id})`);
    }
    svg.appendChild(g);
    const order = paths.map(p => [p, p.getBBox().x]).sort((a, b) => a[1] - b[1]).map(e => e[0]);
    return {
      g,
      draw(dur = 2400, stagger = 90) {
        if (reduce) return Promise.resolve();
        return Promise.all(order.map((p, k) => wait(k * stagger).then(() =>
          tween(dur, t => { p.style.strokeDashoffset = 1 - t; }, easeInOut))));
      },
      fade(to, dur = 1000) {
        if (reduce) return Promise.resolve();
        const from = parseFloat(g.style.opacity);
        return tween(dur, t => { g.style.opacity = lerp(from, to, t); });
      },
    };
  }

  // ---------- page textures + transition (injected so every page shares them) ----------
  // Speckle: alpha comes from the noise value, so only the darker grains show and the ground stays clean
  const noise = (freq, octaves, gain, cut) => `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='${octaves}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${gain} 0 0 0 ${-cut}'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`)}")`;

  const css = document.createElement("style");
  css.textContent = `
    .ink-grain { position: fixed; inset: -60px; z-index: 60; pointer-events: none; opacity: .08;
      background-image: ${noise(0.9, 3, 3, 1.45)}; animation: ink-grain 1s steps(5) infinite; }
    .ink-paper { position: fixed; inset: 0; z-index: -1; pointer-events: none; opacity: .1;
      background-image: ${noise(0.012, 4, 1.6, 0.65)}; background-size: 520px 520px; }
    @keyframes ink-grain { 0% { transform: translate(0, 0) } 20% { transform: translate(-22px, 14px) } 40% { transform: translate(18px, -26px) }
      60% { transform: translate(-10px, 30px) } 80% { transform: translate(26px, 8px) } 100% { transform: translate(0, 0) } }
    .ink-dark .ink-grain { filter: invert(1); opacity: .1; } .ink-dark .ink-paper { display: none; }
    .ink-wipe { position: fixed; inset: 0; z-index: 100; pointer-events: none; color: var(--ink, var(--fg, #231f20)); }
    .ink-wipe svg { width: 100%; height: 100%; display: block; overflow: visible; }
    @media (prefers-reduced-motion: reduce) { .ink-grain { animation: none; } }
  `;
  document.head.appendChild(css);
  // Light specks on a dark page, dark specks on a light one
  const [r, g, b] = (getComputedStyle(document.body).backgroundColor.match(/\d+/g) || [255, 255, 255]).map(Number);
  document.documentElement.classList.toggle("ink-dark", (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5);

  const paper = document.createElement("div"); paper.className = "ink-paper";
  const grain = document.createElement("div"); grain.className = "ink-grain";
  const wipe = document.createElement("div"); wipe.className = "ink-wipe"; wipe.setAttribute("aria-hidden", "true");
  wipe.innerHTML = `<svg><defs><filter id="ink-wipe-f" x="-50%" y="-50%" width="200%" height="200%">
      <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="4" seed="4"/>
      <feDisplacementMap in="SourceGraphic" scale="160" xChannelSelector="R" yChannelSelector="G"/></filter></defs>
      <circle r="0" fill="currentColor" filter="url(#ink-wipe-f)"/></svg>`;
  document.body.prepend(paper);
  document.body.append(grain, wipe);
  const blot = wipe.querySelector("circle");
  const cover = () => Math.hypot(innerWidth, innerHeight) * 1.25;

  // Arriving from another page: the ink that covered the screen drains away
  let arrival = null;
  try { arrival = JSON.parse(sessionStorage.getItem("ink-wipe")); sessionStorage.removeItem("ink-wipe"); } catch (e) {}
  // The blot is filled with the destination page's background (a link's data-ground), so a flood
  // that already matches this page simply hands over; any other colour drains away to reveal it.
  const sameColor = (a, b) => { const c = document.createElement("canvas").getContext("2d"); c.fillStyle = a; const x = c.fillStyle; c.fillStyle = b; return x === c.fillStyle; };
  if (arrival && !reduce && !(arrival.fill && sameColor(arrival.fill, getComputedStyle(document.body).backgroundColor))) {
    const cx = arrival.x * innerWidth, cy = arrival.y * innerHeight;
    if (arrival.fill) blot.style.fill = arrival.fill;
    blot.setAttribute("cx", cx); blot.setAttribute("cy", cy); blot.setAttribute("r", cover());
    tween(900, p => blot.setAttribute("r", lerp(cover(), 0, p)), easeInOut);
  }
  addEventListener("pageshow", e => { if (e.persisted) blot.setAttribute("r", 0); });

  // Leaving: an ink blot spreads from the click, then the next page loads
  document.addEventListener("click", e => {
    const a = e.target.closest("a[href]");
    if (!a || reduce || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) return;
    if (url.pathname === location.pathname) return; // same-page anchors scroll as usual
    e.preventDefault();
    const fill = a.dataset.ground || "";
    blot.style.fill = fill;
    blot.setAttribute("cx", e.clientX); blot.setAttribute("cy", e.clientY);
    try { sessionStorage.setItem("ink-wipe", JSON.stringify({ x: e.clientX / innerWidth, y: e.clientY / innerHeight, fill })); } catch (err) {}
    // Navigate when the blot covers the screen, or after 1.1s if animation frames are paused (background tab)
    Promise.race([tween(750, p => blot.setAttribute("r", lerp(0, cover(), p)), t => t * t), wait(1100)])
      .then(() => { location.href = url.href; });
  });

  window.Ink = { filter, pencil, bleedIn, bleedOut, boil, tween, wait, reduce };
})();

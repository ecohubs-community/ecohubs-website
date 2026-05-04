<script lang="ts">
  import { onMount } from 'svelte';

  interface Member {
    name: string;
    loc: string;
    xp: number;
    eco: number;
    langs: string;
    bio: string;
    contrib: string;
    img?: string;
  }

  let { members = [] as Member[] } = $props();

  // Percentage positions (x, y) arranged as concentric rings:
  //   0      — centre (highest-XP member, the hub)
  //   1–5    — inner pentagon (next 5 highest-XP members)
  //   6–17   — outer dodecagon (12 nodes, the rest)
  // Avatars rendered at index = the member's XP rank, so top contributors
  // are pulled toward the centre regardless of array order.
  const POSITIONS = [
    { x: 50, y: 50 }, // 0 — centre
    // Inner ring (radius ~25%)
    { x: 50, y: 25 }, // 1
    { x: 74, y: 37 }, // 2
    { x: 65, y: 67 }, // 3
    { x: 35, y: 67 }, // 4
    { x: 26, y: 37 }, // 5
    // Outer ring (radius ~42%)
    { x: 50, y: 9  }, // 6
    { x: 71, y: 13 }, // 7
    { x: 87, y: 27 }, // 8
    { x: 91, y: 50 }, // 9
    { x: 87, y: 73 }, // 10
    { x: 71, y: 87 }, // 11
    { x: 50, y: 91 }, // 12
    { x: 29, y: 87 }, // 13
    { x: 13, y: 73 }, // 14
    { x: 9,  y: 50 }, // 15
    { x: 13, y: 27 }, // 16
    { x: 29, y: 13 }, // 17
  ];

  let selectedIdx: number | null = $state(null);

  const maxXP = $derived(Math.max(...members.map((m) => m.xp), 1));

  function getSize(xp: number): number {
    // Scale from 38px (smallest) to 68px (highest XP)
    return Math.round(38 + (xp / maxXP) * 30);
  }

  // memberRank[memberIdx] = position index (0 = highest XP, at the centre)
  const memberRank = $derived.by(() => {
    const ranks = new Array(members.length).fill(0);
    members
      .map((m, i) => ({ i, xp: m.xp }))
      .sort((a, b) => b.xp - a.xp)
      .forEach((s, rank) => { ranks[s.i] = rank; });
    return ranks;
  });

  function memberPos(memberIdx: number) {
    const rank = memberRank[memberIdx];
    return POSITIONS[Math.min(rank, POSITIONS.length - 1)];
  }

  // Build hub-and-spoke connections based on XP rank.
  // Returns pairs of [memberIdxA, memberIdxB].
  const connections = $derived(buildConnections());

  function buildConnections(): [number, number][] {
    const count = Math.min(members.length, POSITIONS.length);
    if (count < 2) return [];

    // memberAtRank[r] = the member index occupying rank r
    const memberAtRank: number[] = members
      .map((m, i) => ({ i, xp: m.xp }))
      .sort((a, b) => b.xp - a.xp)
      .map(s => s.i)
      .slice(0, count);

    const seen = new Set<string>();
    const result: [number, number][] = [];
    const addEdge = (a: number, b: number) => {
      if (a === b) return;
      const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
      if (seen.has(key)) return;
      seen.add(key);
      result.push([a, b]);
    };

    const innerSize = Math.min(5, count - 1);

    // 1) Centre hub → every inner-ring member (the "spokes")
    for (let r = 1; r <= innerSize; r++) {
      addEdge(memberAtRank[0], memberAtRank[r]);
    }

    // 2) Inner ring connects in a pentagon (gives the network depth)
    if (innerSize >= 2) {
      for (let r = 1; r <= innerSize; r++) {
        const next = r === innerSize ? 1 : r + 1;
        addEdge(memberAtRank[r], memberAtRank[next]);
      }
    }

    // 3) Each outer member connects to its nearest inner-ring (or centre) node
    for (let r = innerSize + 1; r < count; r++) {
      const myPos = POSITIONS[r];
      let nearestInner = 0;
      let nearestDist = Infinity;
      for (let inner = 0; inner <= innerSize; inner++) {
        const p = POSITIONS[inner];
        const d = Math.hypot(p.x - myPos.x, p.y - myPos.y);
        if (d < nearestDist) {
          nearestDist = d;
          nearestInner = inner;
        }
      }
      addEdge(memberAtRank[r], memberAtRank[nearestInner]);
    }

    return result;
  }

  // Whether to show a member on mobile (only show the 9 with the most XP).
  function mobileVisible(i: number): boolean {
    if (members.length <= 9) return true;
    return memberRank[i] < 9;
  }

  // Tooltip placement: flip horizontally if avatar is in the right half,
  // flip vertically if near the bottom.
  function tooltipTransform(i: number): string {
    const pos = memberPos(i) ?? { x: 50, y: 50 };
    const tx = pos.x > 58 ? 'calc(-100% - 12px)' : '12px';
    const ty = pos.y > 68 ? 'calc(-100% - 12px)' : '12px';
    return `translate(${tx}, ${ty})`;
  }

  // Derived stats for the strip below the constellation.
  const totalMembers = $derived(members.length);
  const totalCountries = $derived(
    new Set(members.map((m) => m.loc.split(' ').pop())).size
  );
  const totalLangs = $derived(
    new Set(members.flatMap((m) => m.langs.split(' · '))).size
  );
  const totalXP = $derived(members.reduce((s, m) => s + m.xp, 0));
</script>

<!-- Outer wrapper: the background div has overflow-hidden for rounded corners;
     the interactive layer does NOT, so tooltips are never clipped. -->
<div class="relative">
  <!-- Visual background (clipped) -->
  <div
    class="absolute inset-0 rounded-[28px] overflow-hidden border border-emerald-900/40"
    style="background: linear-gradient(135deg, #072018, #0f3328);"
  >
    <div
      class="absolute inset-0 opacity-30"
      style="background-image: radial-gradient(circle at 50% 50%, rgba(16,185,129,0.25), transparent 55%);"
    ></div>
  </div>

  <!-- Interactive layer (not clipped) -->
  <div class="relative h-[380px] md:h-[560px] lg:h-[640px]">

    <!-- SVG connection lines -->
    <svg
      class="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {#each connections as [a, b]}
        {#if a < members.length && b < members.length}
          {@const pa = memberPos(a)}
          {@const pb = memberPos(b)}
          {@const isHubLine = memberRank[a] === 0 || memberRank[b] === 0}
          <line
            x1={pa.x} y1={pa.y}
            x2={pb.x} y2={pb.y}
            stroke={isHubLine ? 'rgba(16,185,129,0.35)' : 'rgba(5,150,105,0.20)'}
            stroke-width={isHubLine ? 0.45 : 0.3}
          />
        {/if}
      {/each}
    </svg>

    <!-- Avatar buttons -->
    {#each members.slice(0, POSITIONS.length) as member, i}
      {@const pos = memberPos(i)}
      {@const size = getSize(member.xp)}
      {@const ring = memberRank[i] === 0 ? 'ring-2 ring-emerald-300/60' : 'ring-1 ring-emerald-400/30'}
      <button
        class="absolute rounded-full overflow-hidden border-2 border-emerald-400/30
               hover:border-emerald-300/70 hover:scale-110 transition-[border-color,transform]
               duration-200 focus-visible:outline focus-visible:outline-2
               focus-visible:outline-emerald-400 {ring}
               {mobileVisible(i) ? '' : 'hidden md:block'}"
        style="
          left: {pos.x}%;
          top: {pos.y}%;
          width: {size}px;
          height: {size}px;
          transform: translate(-50%, -50%);
          z-index: {selectedIdx === i ? 30 : 10};
          animation: constellation-float {3.5 + (i % 5) * 0.45}s ease-in-out {i * 0.37}s infinite;
        "
        aria-label="View {member.name}'s profile"
        onclick={() => (selectedIdx = selectedIdx === i ? null : i)}
      >
        {#if member.img}
          <img src={member.img} alt={member.name} class="w-full h-full object-cover" />
        {:else}
          <div
            class="w-full h-full flex items-center justify-center bg-emerald-950
                   text-emerald-300 font-serif text-sm"
          >
            {member.name.charAt(0)}
          </div>
        {/if}
      </button>
    {/each}

    <!-- Tooltip — rendered at the container root so nothing clips it -->
    {#if selectedIdx !== null && selectedIdx < members.length}
      {@const m = members[selectedIdx]}
      {@const pos = memberPos(selectedIdx)}
      <div
        role="tooltip"
        class="absolute z-50 w-72 rounded-2xl border border-emerald-900/60 p-5 shadow-2xl pointer-events-none"
        style="
          left: {pos.x}%;
          top: {pos.y}%;
          transform: {tooltipTransform(selectedIdx)};
          background: rgba(11,46,36,0.96);
          backdrop-filter: blur(8px);
        "
      >
        <div class="flex items-center gap-3 mb-3">
          <div
            class="w-12 h-12 rounded-full overflow-hidden border border-emerald-400/40
                   bg-emerald-950 shrink-0"
          >
            {#if m.img}
              <img src={m.img} alt={m.name} class="w-full h-full object-cover" />
            {:else}
              <div
                class="w-full h-full flex items-center justify-center
                       text-emerald-300 font-serif"
              >{m.name.charAt(0)}</div>
            {/if}
          </div>
          <div>
            <div class="font-serif text-lg text-white leading-tight">{m.name}</div>
            <div class="text-xs text-stone-300/70 mt-0.5">{m.loc}</div>
          </div>
        </div>
        <p class="text-sm text-stone-200/85 leading-relaxed mb-3">{m.bio}</p>
        <div class="font-story italic text-xs text-emerald-300/90 mb-3">{m.contrib}</div>
        <div class="grid grid-cols-3 gap-2 pt-3 border-t border-emerald-900/40 text-left">
          <div>
            <div class="text-[10px] tracking-widest uppercase text-stone-400/70">XP</div>
            <div class="font-serif text-white text-lg">{m.xp.toLocaleString()}</div>
          </div>
          <div>
            <div class="text-[10px] tracking-widest uppercase text-stone-400/70">ECO</div>
            <div class="font-serif text-emerald-300 text-lg">{m.eco.toLocaleString()}</div>
          </div>
          <div>
            <div class="text-[10px] tracking-widest uppercase text-stone-400/70">Langs</div>
            <div class="text-stone-200 text-xs mt-1">{m.langs}</div>
          </div>
        </div>
      </div>
    {/if}

    <!-- Legend (click anywhere else to dismiss) -->
    {#if selectedIdx !== null}
      <button
        class="absolute inset-0 z-20 cursor-default"
        aria-label="Dismiss member card"
        onclick={() => (selectedIdx = null)}
      ></button>
    {/if}

    <div
      class="absolute bottom-4 left-5 flex flex-wrap items-center gap-4
             text-xs text-stone-300/60 z-10 pointer-events-none"
    >
      <span class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>Active
      </span>
      <span class="hidden sm:flex items-center gap-2">
        <span class="w-5 h-5 rounded-full bg-emerald-500/80 ring-2 ring-emerald-300/50 inline-block"></span>Higher contribution
      </span>
      <span class="hidden sm:inline text-stone-400/40">· click to open</span>
    </div>
  </div>
</div>

<!-- Stats strip -->
<div class="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
  {#each [
    { label: 'Active members', value: totalMembers },
    { label: 'Countries',      value: totalCountries },
    { label: 'Languages',      value: totalLangs },
    { label: 'XP co-created',  value: totalXP > 999 ? `${(totalXP/1000).toFixed(1)}k` : totalXP },
  ] as stat}
    <div class="p-5 rounded-2xl border border-emerald-900/40"
         style="background: rgba(7,32,24,0.8);">
      <div class="font-serif text-3xl text-emerald-300">{stat.value}</div>
      <div class="text-xs tracking-widest uppercase text-stone-300/60 mt-1">{stat.label}</div>
    </div>
  {/each}
</div>

<style>
  @keyframes constellation-float {
    0%, 100% { translate: 0 0;    scale: 1; }
    50%       { translate: 0 -8px; scale: 1.035; }
  }
  /* Ensure font-story is usable inside this component */
  .font-story { font-family: var(--font-story, 'Fraunces', serif); font-optical-sizing: auto; }
</style>

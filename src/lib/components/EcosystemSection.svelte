<script lang="ts">
  import {
    Network,
    Wifi,
    Battery,
    Check,
    X,
    LayoutGrid,
    Leaf,
    Coins
  } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { fade, scale, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';

  interface EcosystemTool {
    icon: string;
    iconColor: string;
    iconBg: string;
    hoverBorderColor: string;
    hoverRingColor: string;
    hoverTextColor: string;
    title: string;
    description: string;
    category: 'onboarding' | 'dialogue' | 'action' | 'governance';
    highlight?: boolean;
    link?: {href: string; target: '_blank' | '_self'};
  }

  const tools: EcosystemTool[] = [
    {
      icon: "tabler:writing-sign",
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      hoverBorderColor: 'border-blue-200',
      hoverRingColor: 'ring-blue-200',
      hoverTextColor: 'text-blue-600',
      title: 'Application Form',
      description: 'Selective membership process. We welcome aligned contributors who share our vision for regenerative communities.',
      link: {href: 'https://ecohubs.community/membership', target: '_self'},
      category: 'onboarding'
    },
    {
      icon: "tabler:layout-dashboard",
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      hoverBorderColor: 'border-emerald-200',
      hoverRingColor: 'ring-emerald-200',
      hoverTextColor: 'text-emerald-600',
      title: 'EcoHubsOS',
      description: 'The central hub connecting all tools. Member dashboard, onboarding flow, and unified access to our ecosystem.',
      category: 'onboarding',
      highlight: true
    },
    {
      icon: "tabler:brand-discord",
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      hoverBorderColor: 'border-indigo-200',
      hoverRingColor: 'ring-indigo-200',
      hoverTextColor: 'text-indigo-600',
      title: 'Discord',
      description: 'Real-time community chat. Public channels for open discussion, private member channels for deeper collaboration. [Third-party tool]',
      link: {href: 'https://discord.com/invite/Xnh7247Nq3', target: '_blank'},
      category: 'dialogue'
    },
    {
      icon: "tabler:message-share",
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      hoverBorderColor: 'border-purple-200',
      hoverRingColor: 'ring-purple-200',
      hoverTextColor: 'text-purple-600',
      title: 'Flarum Forum',
      description: 'Structured discussions for proposals, decisions, and sense-making. Where ideas mature before voting. [Third-party tool]',
      link: {href: 'https://flarum.org', target: '_blank'},
      category: 'dialogue'
    },
    {
      icon: "tabler:target",
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      hoverBorderColor: 'border-orange-200',
      hoverRingColor: 'ring-orange-200',
      hoverTextColor: 'text-orange-600',
      title: 'Puckstack',
      description: 'Gas-free bounty board. Organize work with tasks & quests, reward effort with XP & tokens, govern with earned authority.',
      link: {href: 'https://puckstack.xyz', target: '_self'},
      category: 'action'
    },
    {
      icon: "tabler:git-branch",
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-100',
      hoverBorderColor: 'border-teal-200',
      hoverRingColor: 'ring-teal-200',
      hoverTextColor: 'text-teal-600',
      title: 'Blueprint App',
      description: 'Git-based collaboration for structuring and writing articles. GitHub workflows with PRs and approvals for quality control.',
      link: {href: 'https://blueprint.ecohubs.community', target: '_self'},
      category: 'action'
    },
    {
      icon: "tabler:checkbox",
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-100',
      hoverBorderColor: 'border-amber-200',
      hoverRingColor: 'ring-amber-200',
      hoverTextColor: 'text-amber-600',
      title: 'Internal Voting',
      description: 'Built into ecohubsOS — member applications, content publication, and governance decisions are decided together through transparent, internal voting. Free, accessible, no external accounts.',
      link: {href: 'https://os.ecohubs.community', target: '_self'},
      category: 'governance'
    },
    {
      icon: "tabler:coin",
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-100',
      hoverBorderColor: 'border-rose-200',
      hoverRingColor: 'ring-rose-200',
      hoverTextColor: 'text-rose-600',
      title: 'Offcoin',
      description: 'Off-chain tokens reward collaboration. XP unlocks permissions and responsibilities. Built into Puckstack and EcoHubsOS.',
      link: {href: 'https://offcoin.space', target: '_blank'},
      category: 'governance'
    }
  ];

  // State
  let activeTool = $state<EcosystemTool | null>(null);
  let currentTime = $state(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  onMount(() => {
    // Clock interval
    const timer = setInterval(() => {
        currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, 60000);

    return () => clearInterval(timer);
  });
</script>

<section id="ecosystem" class="py-16 md:py-24 relative bg-gradient-to-b from-ecohubs-base via-emerald-50/30 to-ecohubs-base overflow-hidden">

  <div class="absolute inset-0 pointer-events-none hidden md:block">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl opacity-50"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
      <div class="kicker text-emerald-700 mb-4">Our digital mycelium</div>
      <h3 class="font-serif text-3xl md:text-4xl lg:text-5xl text-ecohubs-deep mb-4 md:mb-6 leading-tight">
        The <em class="font-story italic font-normal text-ecohubs-primary">operating system</em><br class="hidden md:block" />
        for regenerative action.
      </h3>
      <p class="text-stone-700 text-base md:text-lg leading-relaxed">
        Explore the tools that power our community. <span class="hidden md:inline">Click on the apps in the dock below to learn how we collaborate and govern.</span><span class="md:hidden">Tap on any tool to learn more.</span>
      </p>
    </div>

    <!-- Mobile View: Grid of tool cards -->
    <div class="md:hidden grid grid-cols-2 gap-3 mb-8">
      {#each tools as tool}
        <button
          onclick={() => activeTool = activeTool?.title === tool.title ? null : tool}
          class="relative p-4 rounded-2xl bg-white border transition-all duration-300 text-left
            {activeTool?.title === tool.title ? 'border-emerald-500 shadow-lg' : 'border-stone-200/70 hover:border-stone-300'}"
        >
          <div class="w-10 h-10 rounded-xl {tool.iconBg} {tool.iconColor} flex items-center justify-center mb-3">
            <Icon icon={tool.icon} class="w-5 h-5" />
          </div>
          <h4 class="font-serif text-sm text-ecohubs-deep mb-1">{tool.title}</h4>
          <span class="text-[10px] uppercase tracking-[0.18em] text-stone-500 font-medium">{tool.category}</span>
        </button>
      {/each}
    </div>

    <!-- Mobile: Expanded tool detail -->
    {#if activeTool}
      <div class="md:hidden mb-8 p-6 rounded-2xl bg-white border border-stone-200/70 shadow-lg" transition:fly={{ y: 10, duration: 200 }}>
        <div class="flex items-start gap-4 mb-4">
          <div class="w-14 h-14 rounded-2xl {activeTool.iconBg} {activeTool.iconColor} flex items-center justify-center shrink-0">
            <Icon icon={activeTool.icon} class="w-7 h-7" />
          </div>
          <div>
            <h4 class="font-serif text-xl text-ecohubs-deep">{activeTool.title}</h4>
            <span class="text-[10px] uppercase tracking-[0.18em] text-stone-500 font-medium">{activeTool.category}</span>
          </div>
        </div>
        <p class="text-stone-700 text-sm leading-relaxed">{activeTool.description}</p>

        <div class="flex items-center gap-4 mt-4">
          <button
            onclick={() => activeTool = null}
            class="text-xs font-medium text-stone-500 hover:text-ecohubs-deep font-story italic"
          >
            Close
          </button>

          {#if activeTool.link}
            <a href={activeTool.link.href} target={activeTool.link.target} class="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline decoration-emerald-300 underline-offset-4">
              Visit {activeTool.title}
            </a>
          {/if}
        </div>
      </div>
    {/if}

    <!-- Desktop View: Laptop mockup (hidden on mobile) -->
    <div class="relative w-full max-w-5xl mx-auto hidden md:block">

      <div class="relative bg-ecohubs-deep rounded-[2rem] p-2 shadow-2xl border border-emerald-900/40 ring-1 ring-emerald-900/20 transform transition-transform duration-700">

        <div class="relative w-full aspect-[16/10] md:aspect-[16/9] bg-gradient-to-br from-ecohubs-ivory to-emerald-50 rounded-[1.5rem] overflow-hidden flex flex-col shadow-inner">

          <div class="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
               style="background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'); background-size: cover; background-position: center;">
          </div>

          <div class="w-full h-9 bg-white/60 backdrop-blur-md flex items-center justify-between px-4 z-20 border-b border-stone-200/60">
            <div class="flex items-center gap-2 text-[10px] md:text-xs font-medium text-ecohubs-deep">
                <span class="w-1.5 h-1.5 rounded-full bg-ecohubs-primary"></span>
                <span class="font-serif text-[13px] tracking-tight">ecohubsOS</span>
            </div>
            <div class="flex items-center gap-3 text-ecohubs-deep">
              <span class="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800">
                <Leaf class="w-3 h-3" strokeWidth={2} />
                <span>1322 XP</span>
              </span>
              <span class="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/70 text-amber-800">
                <Coins class="w-3 h-3" strokeWidth={2} />
                <span>847 ECO</span>
              </span>
              <span class="text-[10px] font-medium tracking-wide ml-1">{currentTime}</span>
              <Wifi class="w-3 h-3" />
              <Battery class="w-3 h-3" />
            </div>
          </div>

          <div class="flex-1 relative p-4 md:p-8">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col gap-4 absolute top-8 left-4 md:left-8 z-10 w-full max-w-[280px] pointer-events-none">
                
                <div class="bg-white/85 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-stone-200/60 pointer-events-auto transform hover:scale-[1.02] transition-transform">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-md bg-emerald-100">
                            <img src="https://i.pravatar.cc/150?u=ecohubs" alt="User" class="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div class="font-serif text-sm text-ecohubs-deep">Contributor</div>
                            <div class="text-[10px] text-stone-500 font-medium font-story italic">Level 3 · Steward</div>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between items-center text-[10px] text-stone-500 font-medium tracking-[0.18em] uppercase">
                            <span>Reputation</span>
                            <span class="text-emerald-700 tracking-normal normal-case font-semibold">1322 XP</span>
                        </div>
                        <div class="h-1.5 w-full bg-stone-200/80 rounded-full overflow-hidden">
                            <div class="h-full w-[72%] bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
                        </div>
                    </div>
                </div>

                <div class="bg-white/85 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-stone-200/60 pointer-events-auto transform hover:scale-[1.02] transition-transform">
                     <div class="flex items-center justify-between mb-3">
                        <span class="font-serif text-sm text-ecohubs-deep">Onboarding</span>
                        <div class="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                            <span class="text-[10px] font-bold">2</span>
                        </div>
                     </div>
                     <div class="space-y-3 relative">
                        <div class="absolute left-[9px] top-2 bottom-2 w-0.5 bg-stone-200 -z-10"></div>

                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center border-2 border-white shadow-sm z-10">
                                <Check class="w-3 h-3 text-white" />
                            </div>
                            <span class="text-[11px] text-stone-400 line-through">Submit Application</span>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center shadow-sm z-10">
                                <div class="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
                            </div>
                            <span class="text-[11px] font-medium text-ecohubs-deep">Claim Discord Member status</span>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 rounded-full bg-stone-100 border-2 border-white flex items-center justify-center z-10">
                                <div class="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
                            </div>
                            <span class="text-[11px] text-stone-400">Connect account to Offcoin</span>
                        </div>
                     </div>
                </div>
            </div>

            {#if activeTool}
                <div class="absolute inset-0 z-40 flex items-center justify-center p-4 md:p-12" transition:fade={{ duration: 200 }}>
                    
                    <div
                        class="w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-stone-200/70 flex flex-col overflow-hidden"
                        transition:scale={{ duration: 300, start: 0.95, opacity: 0, easing: cubicOut }}
                    >
                        <div class="h-10 bg-ecohubs-ivory/70 border-b border-stone-200/70 flex items-center justify-between px-4 shrink-0">
                            <div class="flex items-center gap-2">
                                <button
                                    onclick={() => activeTool = null}
                                    class="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 flex items-center justify-center group transition-colors cursor-pointer"
                                    aria-label="Close"
                                >
                                    <X class="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
                                </button>
                                <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                            </div>
                            <span class="text-xs font-medium text-stone-500 flex items-center gap-1.5 font-serif">
                                <Icon icon={activeTool.icon} class="w-3 h-3" />
                                {activeTool.title}.app
                            </span>
                            <div class="w-10"></div>
                        </div>

                        <div class="p-8 flex flex-col items-center text-center relative overflow-hidden">
                            <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b {activeTool.iconBg.replace('bg-', 'from-')}/50 to-transparent opacity-30"></div>

                            <div class="relative w-20 h-20 {activeTool.iconBg} rounded-2xl flex items-center justify-center shadow-lg mb-6 ring-4 ring-white">
                                <Icon icon={activeTool.icon} class="w-10 h-10 {activeTool.iconColor}" />
                            </div>

                            <h2 class="font-serif text-2xl text-ecohubs-deep mb-2">{activeTool.title}</h2>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-[0.18em] uppercase bg-emerald-50 text-emerald-800 mb-6 border border-emerald-100">
                                {activeTool.category}
                            </span>

                            <p class="text-stone-700 text-[15px] leading-relaxed max-w-sm mb-6">
                                {activeTool.description}
                            </p>

                            {#if activeTool.link}
                              <div class="mb-5">
                                <span class="text-xs font-medium text-stone-500">Visit</span>
                                <a href={activeTool.link.href} target={activeTool.link.target} class="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline decoration-emerald-300 underline-offset-4">
                                  {activeTool.title}
                                </a>
                              </div>
                            {/if}

                            <button
                                onclick={() => activeTool = null}
                                class="text-xs font-medium text-stone-500 hover:text-ecohubs-deep transition-colors font-story italic"
                            >
                                Close window
                            </button>
                        </div>
                    </div>
                </div>
            {/if}

            {#if !activeTool}
                <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" transition:fade>
                    <div class="text-center opacity-70">
                        <Network class="w-32 h-32 text-emerald-700/15 mx-auto mb-4" />
                        <p class="font-story italic text-stone-600 text-sm bg-white/60 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm inline-block border border-stone-200/50">
                            Select an app from the dock
                        </p>
                    </div>
                </div>
            {/if}

          </div>

          <div class="h-20 md:h-24 w-full flex items-end justify-center pb-4 md:pb-6 z-50 pointer-events-none">
            <div
                class="bg-white/55 backdrop-blur-xl border border-stone-200/60 shadow-2xl rounded-2xl md:rounded-3xl px-3 py-3 md:px-4 md:py-3 flex items-center gap-2 md:gap-4 pointer-events-auto transition-all duration-300 hover:scale-105 hover:bg-white/70"
            >
              {#each tools.filter((t) => !t.highlight) as tool}
                <div class="relative group flex flex-col items-center">

                    <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-ecohubs-deep text-ecohubs-ivory text-[10px] font-medium tracking-wide py-1 px-2.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none mb-2 font-serif">
                        {tool.title}
                        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ecohubs-deep rotate-45"></div>
                    </div>

                    <button
                        type="button"
                        onclick={() => activeTool = tool}
                        class="relative w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ease-out
                                shadow-sm hover:shadow-lg hover:-translate-y-2 active:scale-95 cursor-pointer bg-white
                                {activeTool?.title === tool.title ? 'ring-2 ring-offset-2 ring-offset-transparent ring-emerald-500 -translate-y-2' : ''}"
                    >
                        <div class="absolute inset-0 rounded-xl md:rounded-2xl {tool.iconBg} opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        <Icon icon={tool.icon} class="w-5 h-5 md:w-6 md:h-6 {tool.iconColor} relative z-10" strokeWidth={2} />

                        {#if activeTool?.title === tool.title}
                            <div class="absolute -bottom-3 w-1 h-1 bg-ecohubs-deep rounded-full"></div>
                        {/if}
                    </button>
                </div>
              {/each}

              <div class="w-px h-8 bg-stone-400/30 mx-1"></div>

              <button class="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/60 hover:bg-white flex items-center justify-center transition-all hover:-translate-y-1 cursor-pointer">
                <LayoutGrid class="w-5 h-5 text-stone-600" />
              </button>
            </div>
          </div>

        </div>
        
        <div class="absolute bottom-[-14px] left-1/2 -translate-x-1/2 w-[120px] h-[14px] bg-ecohubs-deep rounded-b-xl opacity-50 blur-sm"></div>

      </div>
    </div>

    <div class="mt-16 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-sm font-medium border border-emerald-100">
            <Network class="w-4 h-4" />
            <span>All tools unified via <em class="font-story italic">ecohubsOS</em></span>
        </div>
    </div>
  </div>
</section>
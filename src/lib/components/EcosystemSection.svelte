<script lang="ts">
  import type { ComponentType } from 'svelte';
  import {
    ScrollText,
    MessageCircle,
    Vote,
    LayoutDashboard,
    Coins,
    MessagesSquare,
    Target,
    GitBranch,
    Network,
    Wifi,
    Battery,
    Check,
    X,
    Maximize2,
    Minus,
    Search,

	LayoutGrid

  } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { fade, scale, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  interface EcosystemTool {
    icon: ComponentType;
    iconColor: string;
    iconBg: string;
    hoverBorderColor: string;
    hoverRingColor: string;
    hoverTextColor: string;
    title: string;
    description: string;
    category: 'onboarding' | 'dialogue' | 'action' | 'governance';
    highlight?: boolean;
  }

  const tools: EcosystemTool[] = [
    {
      icon: ScrollText,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      hoverBorderColor: 'border-blue-200',
      hoverRingColor: 'ring-blue-200',
      hoverTextColor: 'text-blue-600',
      title: 'Application Form',
      description: 'Selective membership process. We welcome aligned contributors who share our vision for regenerative communities.',
      category: 'onboarding'
    },
    {
      icon: LayoutDashboard,
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
      icon: MessageCircle,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      hoverBorderColor: 'border-indigo-200',
      hoverRingColor: 'ring-indigo-200',
      hoverTextColor: 'text-indigo-600',
      title: 'Discord',
      description: 'Real-time community chat. Public channels for open discussion, private member channels for deeper collaboration.',
      category: 'dialogue'
    },
    {
      icon: MessagesSquare,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      hoverBorderColor: 'border-purple-200',
      hoverRingColor: 'ring-purple-200',
      hoverTextColor: 'text-purple-600',
      title: 'Flarum Forum',
      description: 'Structured discussions for proposals, decisions, and sense-making. Where ideas mature before voting.',
      category: 'dialogue'
    },
    {
      icon: Target,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      hoverBorderColor: 'border-orange-200',
      hoverRingColor: 'ring-orange-200',
      hoverTextColor: 'text-orange-600',
      title: 'Puckstack',
      description: 'Gas-free bounty board. Organize work with tasks & quests, reward effort with XP & tokens, govern with earned authority.',
      category: 'action'
    },
    {
      icon: GitBranch,
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-100',
      hoverBorderColor: 'border-teal-200',
      hoverRingColor: 'ring-teal-200',
      hoverTextColor: 'text-teal-600',
      title: 'Blueprint App',
      description: 'Git-based collaboration for structuring and writing articles. GitHub workflows with PRs and approvals for quality control.',
      category: 'action'
    },
    {
      icon: Vote,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-100',
      hoverBorderColor: 'border-amber-200',
      hoverRingColor: 'ring-amber-200',
      hoverTextColor: 'text-amber-600',
      title: 'Snapshot',
      description: 'Gas-free voting for member applications, decisions, blog posts, and governance. Transparent and auditable.',
      category: 'governance'
    },
    {
      icon: Coins,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-100',
      hoverBorderColor: 'border-rose-200',
      hoverRingColor: 'ring-rose-200',
      hoverTextColor: 'text-rose-600',
      title: 'Offcoin',
      description: 'Off-chain tokens reward collaboration. XP unlocks permissions and responsibilities. Built into Puckstack and EcoHubsOS.',
      category: 'governance'
    }
  ];

  // State
  let hoveredIndex = $state<number | null>(null);
  let activeTool = $state<EcosystemTool | null>(null);
  let sectionRef: HTMLElement;
  let currentTime = $state(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  onMount(() => {
    // Clock interval
    const timer = setInterval(() => {
        currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, 60000);

    return () => clearInterval(timer);
  });
</script>

<section id="ecosystem" bind:this={sectionRef} class="py-24 relative bg-gradient-to-b from-white via-emerald-50/20 to-white overflow-hidden">
  
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl opacity-50"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="text-center mb-12 max-w-3xl mx-auto">
      <h2 class="text-xs font-bold text-emerald-600 tracking-[0.2em] uppercase mb-3">Our Digital Mycelium</h2>
      <h3 class="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
        The <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">Operating System</span><br/> for Regenerative Action
      </h3>
      <p class="text-gray-600 text-lg leading-relaxed">
        Explore the tools that power our community. Click on the apps in the dock below to learn how we collaborate and govern.
      </p>
    </div>

    <div class="relative w-full max-w-5xl mx-auto">
      
      <div class="relative bg-slate-300 rounded-[2rem] p-2 shadow-2xl border border-slate-400 ring-1 ring-slate-300/10 transform transition-transform duration-700">
        
        <div class="relative w-full aspect-[16/10] md:aspect-[16/9] bg-gradient-to-br from-slate-200 to-slate-300 rounded-[1.5rem] overflow-hidden flex flex-col shadow-inner">
          
          <div class="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" 
               style="background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'); background-size: cover; background-position: center;">
          </div>
          
          <div class="w-full h-8 bg-white/30 backdrop-blur-md flex items-center justify-between px-4 z-20 border-b border-white/20">
            <div class="flex items-center gap-4 text-[10px] md:text-xs font-semibold text-slate-800">
                <span class="hover:bg-white/40 px-2 py-0.5 rounded cursor-default">EcoHubsOS</span>
            </div>
            <div class="flex items-center gap-3 text-slate-800">
              <span class="text-[10px] font-medium tracking-wide">{currentTime}</span>
              <Wifi class="w-3 h-3" />
              <Battery class="w-3 h-3" />
            </div>
          </div>

          <div class="flex-1 relative p-4 md:p-8">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col gap-4 absolute top-8 left-4 md:left-8 z-10 w-full max-w-[280px] pointer-events-none">
                
                <div class="bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/50 pointer-events-auto transform hover:scale-[1.02] transition-transform">
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-md ring-2 ring-white">
                        <img src="https://i.pravatar.cc/150?u=ecohubs" alt="User" class="w-full h-full object-cover rounded-full opacity-90" />
                        </div>
                        <div>
                        <div class="text-sm font-bold text-gray-800">Contributor</div>
                        <div class="text-[10px] text-gray-500 font-medium">Level 3 • Steward</div>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between text-[10px] text-gray-500 font-medium uppercase tracking-wider">
                            <span>Reputation</span>
                            <span class="text-emerald-600">850 XP</span>
                        </div>
                        <div class="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div class="h-full w-[70%] bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                        </div>
                    </div>
                </div>

                <div class="bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-lg border border-white/50 pointer-events-auto transform hover:scale-[1.02] transition-transform">
                     <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-bold text-gray-800">Onboarding</span>
                        <div class="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <span class="text-[10px] font-bold">2</span>
                        </div>
                     </div>
                     <div class="space-y-3 relative">
                        <div class="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200 -z-10"></div>
                        
                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-white shadow-sm z-10">
                                <Check class="w-3 h-3 text-white" />
                            </div>
                            <span class="text-[11px] text-gray-400 line-through">Submit Application</span>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-sm z-10">
                                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            </div>
                            <span class="text-[11px] font-medium text-gray-800">Claim Discord Member status</span>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="w-5 h-5 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center z-10">
                                <div class="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                            </div>
                            <span class="text-[11px] text-gray-400">Connect account to Offcoin</span>
                        </div>
                     </div>
                </div>
            </div>

            {#if activeTool}
                {@const ActiveIcon = activeTool.icon}
                <div class="absolute inset-0 z-40 flex items-center justify-center p-4 md:p-12" transition:fade={{ duration: 200 }}>
                    
                    <div 
                        class="w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/40 flex flex-col overflow-hidden"
                        transition:scale={{ duration: 300, start: 0.95, opacity: 0, easing: cubicOut }}
                    >
                        <div class="h-10 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between px-4 shrink-0">
                            <div class="flex items-center gap-2">
                                <button 
                                    onclick={() => activeTool = null}
                                    class="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 flex items-center justify-center group transition-colors cursor-pointer"
                                    aria-label="Close"
                                >
                                    <X class="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
                                </button>
                                <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div class="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <span class="text-xs font-medium text-gray-500 flex items-center gap-1">
                                <ActiveIcon class="w-3 h-3" />
                                {activeTool.title}.app
                            </span>
                            <div class="w-10"></div> </div>

                        <div class="p-8 flex flex-col items-center text-center relative overflow-hidden">
                            <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b {activeTool.iconBg.replace('bg-', 'from-')}/50 to-transparent opacity-30"></div>
                            
                            <div class="relative w-20 h-20 {activeTool.iconBg} rounded-2xl flex items-center justify-center shadow-lg mb-6 ring-4 ring-white">
                                <ActiveIcon class="w-10 h-10 {activeTool.iconColor}" />
                            </div>
                            
                            <h2 class="text-2xl font-serif font-bold text-gray-900 mb-2">{activeTool.title}</h2>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-6 border border-gray-200">
                                {activeTool.category}
                            </span>
                            
                            <p class="text-gray-600 text-sm leading-relaxed max-w-sm mb-6">
                                {activeTool.description}
                            </p>

                            <button 
                                onclick={() => activeTool = null}
                                class="text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                Close Window
                            </button>
                        </div>
                    </div>
                </div>
            {/if}

            {#if !activeTool}
                <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" transition:fade>
                    <div class="text-center opacity-60">
                        <Network class="w-32 h-32 text-slate-400/20 mx-auto mb-4" />
                        <p class="text-slate-500 font-medium text-sm tracking-wide bg-white/40 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm inline-block">
                            Select an app from the dock
                        </p>
                    </div>
                </div>
            {/if}

          </div>

          <div class="h-20 md:h-24 w-full flex items-end justify-center pb-4 md:pb-6 z-50 pointer-events-none">
            <div 
                class="bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl md:rounded-3xl px-3 py-3 md:px-4 md:py-3 flex items-center gap-2 md:gap-4 pointer-events-auto transition-all duration-300 hover:scale-105 hover:bg-white/50"
            >
              {#each tools.filter((t) => !t.highlight) as tool, index}
                {@const ToolIcon = tool.icon}
                {@const isHovered = hoveredIndex === index}
                
                <div class="relative group flex flex-col items-center">
                    
                    <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none mb-2">
                        {tool.title}
                        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>

                    <button
                        type="button"
                        onclick={() => activeTool = tool}
                        onmouseenter={() => (hoveredIndex = index)}
                        onmouseleave={() => (hoveredIndex = null)}
                        class="relative w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ease-out 
                                shadow-sm hover:shadow-lg hover:-translate-y-2 active:scale-95 cursor-pointer bg-white
                                {activeTool?.title === tool.title ? 'ring-2 ring-offset-2 ring-offset-transparent ring-emerald-400 -translate-y-2' : ''}"
                    >
                        <div class="absolute inset-0 rounded-xl md:rounded-2xl {tool.iconBg} opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        <ToolIcon class="w-5 h-5 md:w-6 md:h-6 {tool.iconColor} relative z-10" strokeWidth={2} />
                        
                        {#if activeTool?.title === tool.title}
                            <div class="absolute -bottom-3 w-1 h-1 bg-gray-800 rounded-full"></div>
                        {/if}
                    </button>
                </div>
              {/each}
              
              <div class="w-px h-8 bg-gray-400/30 mx-1"></div>

              <button class="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/60 hover:bg-white flex items-center justify-center transition-all hover:-translate-y-1 cursor-pointer">
                <LayoutGrid class="w-5 h-5 text-gray-600" />
							</button>
            </div>
          </div>

        </div>
        
        <div class="absolute bottom-[-14px] left-1/2 -translate-x-1/2 w-[120px] h-[14px] bg-gray-800 rounded-b-xl opacity-50 blur-sm"></div>

      </div>
    </div>
    
    <div class="mt-16 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-sm font-medium">
            <Network class="w-4 h-4" />
            <span>All tools unified via EcoHubsOS</span>
        </div>
    </div>
  </div>
</section>
/* EcoHubs Learning Hub — shared config, data & behaviour */
if (window.tailwind) tailwind.config = {theme:{extend:{
  fontFamily:{serif:['Pridi','serif'],sans:['Inter','system-ui','sans-serif'],story:['Fraunces','serif'],mono:['JetBrains Mono','monospace']},
  colors:{ecohubs:{base:'#fbfbf9',ivory:'#f5f2ea',text:'#1c1917',primary:'#059669',dark:'#064e3b',deep:'#0b2e24',accent:'#d97706',light:'#a7f3d0',soil:'#8b6f47',clay:'#c4a484',muted:'#6b7265'}}
}}};

const EH = {};
window.EH = EH;

/* ============================ DATA ============================ */
EH.topics = [
  {slug:'intentional-communities',name:'Intentional Communities',cluster:'people',motif:'rings',count:14,blurb:'What they are, the forms they take, and how people actually end up living in one.'},
  {slug:'community-building',name:'Community Building',cluster:'people',motif:'weave',count:11,blurb:'Culture, rituals, welcoming, the slow work of turning neighbours into a we.'},
  {slug:'conflict-resolution',name:'Conflict Resolution',cluster:'people',motif:'weave',count:8,blurb:'Repair processes, facilitation, and what to do when it is already broken.'},
  {slug:'community-governance',name:'Governance',cluster:'decisions',motif:'grid',count:16,blurb:'Sociocracy, consensus, councils — how a group decides without exhausting itself.'},
  {slug:'legal-structures',name:'Legal Structures',cluster:'money',motif:'grid',count:9,blurb:'Co-ops, associations, foundations, land trusts — the container the community lives in.'},
  {slug:'community-economy',name:'Economy',cluster:'money',motif:'seed',count:12,blurb:'Income sharing, common purses, budgets, labour credits, and paying for a place.'},
  {slug:'land',name:'Land',cluster:'systems',motif:'strata',count:10,blurb:'Finding it, buying it, holding it in common, and reading what it can carry.'},
  {slug:'permaculture',name:'Permaculture',cluster:'systems',motif:'strata',count:13,blurb:'Water, soil, food, energy — designing the systems a settlement depends on.'},
  {slug:'software',name:'Software & Tools',cluster:'decisions',motif:'grid',count:6,blurb:'What communities use to decide, schedule, budget and remember together.'},
  {slug:'case-studies',name:'Case Studies',cluster:'people',motif:'tide',count:15,blurb:'Long looks at real communities — including the ones that came apart.'}
];
EH.clusters = {people:'People & Culture',decisions:'Decisions & Power',systems:'Land & Living Systems',money:'Money & Law'};

EH.guides = [
  {slug:'ultimate-guide-intentional-communities',title:'Ultimate Guide to Intentional Communities',motif:'rings',lessons:9,mins:74,level:'Foundational',blurb:'The whole landscape in one read: what these places are, the forms they take, what they ask of you, and how to tell if one is right.'},
  {slug:'ultimate-guide-governance',title:'Ultimate Guide to Community Governance',motif:'grid',lessons:8,mins:66,level:'Intermediate',blurb:'From the first house meeting to a working circle structure — decision-making that survives disagreement and time.'},
  {slug:'starting-an-ecovillage',title:'Starting an Ecovillage',motif:'strata',lessons:11,mins:98,level:'Advanced',blurb:'Vision, founding group, land, money, legal form, build-out. The sequence most projects get wrong, in order.'},
  {slug:'ultimate-guide-community-finance',title:'Ultimate Guide to Community Finance',motif:'seed',lessons:7,mins:58,level:'Intermediate',blurb:'Common purses, member contributions, loans, labour credits — how a community pays for itself without becoming a business.'},
  {slug:'regenerative-living',title:'Regenerative Living',motif:'tide',lessons:6,mins:44,level:'Foundational',blurb:'Water, soil, food and energy at the scale of a settlement — leaving a place measurably better than you found it.'}
];

EH.paths = [
  {slug:'become-a-community-founder',title:'Become a Community Founder',hours:14,lessons:24,pct:0,blurb:'From an idea and three friends to a legally held piece of land with people living on it.',
   steps:['What is an intentional community?','Choosing a vision worth 20 years','Finding your founding members','Deciding how you will decide','Reading land before you buy it','Money: the first three years','Conflict, before it arrives','Long-term resilience']},
  {slug:'find-your-community',title:'Find Your Community',hours:6,lessons:12,pct:0,blurb:'Work out what you actually need, then read communities honestly before you visit.',
   steps:['What are you really looking for?','The forms: village, cohousing, commune','Reading a community from outside','Visiting well','The trial membership','Saying yes — or no']},
  {slug:'governance-fundamentals',title:'Governance Fundamentals',hours:9,lessons:16,pct:0,blurb:'Consensus, consent, sociocracy and councils — enough to design a system, not just name one.',
   steps:['Why groups stall','Consensus and its failure modes','Consent-based decision-making','Circles and double links','Roles, terms and accountability','Writing your first agreements']},
  {slug:'building-community-culture',title:'Building Community Culture',hours:7,lessons:14,pct:0,blurb:'Rituals, welcoming, feedback and repair — the invisible work that holds a place together.',
   steps:['Culture is what you repeat','Welcoming and belonging','Feedback that people can hear','Rituals and rhythms','Care, illness and ageing','When someone leaves']}
];

EH.communities = [
  {name:'Tamera',loc:'Alentejo, Portugal',pop:'~170 residents',founded:1995,gov:'Council + consensus',tags:['Water retention','Peace research'],blurb:'A peace research village best known for rehydrating a dry Alentejo landscape with a chain of retention basins.'},
  {name:'Damanhur',loc:'Piedmont, Italy',pop:'~600 citizens',founded:1975,gov:'Elected King Guides',tags:['Federation','Own currency'],blurb:'A federation of small nuclei with its own constitution, complementary currency and rotating elected leadership.'},
  {name:'Auroville',loc:'Tamil Nadu, India',pop:'~3,300 residents',founded:1968,gov:"Residents' Assembly",tags:['Township','Afforestation'],blurb:'An experimental township of ~50 nationalities that reforested an eroded plateau over five decades.'},
  {name:'Twin Oaks',loc:'Virginia, USA',pop:'~90 members',founded:1967,gov:'Planner–manager system',tags:['Income sharing','Labour credits'],blurb:'Fully income-sharing since 1967; members work a labour-credit quota rather than earning individual wages.'},
  {name:'Findhorn',loc:'Moray, Scotland',pop:'~500 in the wider community',founded:1962,gov:'Consensus + attunement',tags:['Ecovillage','Education'],blurb:'Began as three people in a caravan; now one of the longest-running ecovillage education centres in Europe.'},
  {name:'Sieben Linden',loc:'Saxony-Anhalt, Germany',pop:'~150 residents',founded:1997,gov:'Consensus, sociocratic circles',tags:['Straw-bale','Low footprint'],blurb:'Measured repeatedly as one of Europe\u2019s lowest-footprint settlements, largely through shared infrastructure.'},
  {name:'Cloughjordan Ecovillage',loc:'Tipperary, Ireland',pop:'~100 residents',founded:2009,gov:'Members\u2019 co-operative',tags:['Serviced sites','District heating'],blurb:'A co-operative that serviced 114 sites inside an existing market town rather than building on greenfield land.'},
  {name:'Dancing Rabbit',loc:'Missouri, USA',pop:'~50 members',founded:1997,gov:'Consensus + covenants',tags:['Ecological covenants','Vehicle co-op'],blurb:'Binding ecological covenants — no private fossil-fuel vehicles, all electricity renewable — written into membership.'}
];

EH.glossary = [
  {t:'Agreements',topic:'community-governance',d:'The written rules a community has consented to. Distinct from values: agreements say what happens, and what follows when it does not.'},
  {t:'Attunement',topic:'community-building',d:'A short shared silence or check-in before a meeting or task, used to bring a group into the same tempo before it works.'},
  {t:'Blocking concern',topic:'community-governance',d:'In consensus, an objection serious enough to stop a proposal. Healthy systems define narrowly who may block and on what grounds.'},
  {t:'Circle',topic:'community-governance',d:'A semi-autonomous group with a defined aim, domain and set of roles. Sociocratic structures are built from nested circles.'},
  {t:'Cohousing',topic:'intentional-communities',d:'Private self-contained homes clustered around shared facilities — usually a common house with a kitchen — with residents managing the whole.'},
  {t:'Commons',topic:'land',d:'A resource held and governed collectively under agreed rules, rather than owned privately or by the state.'},
  {t:'Commune',topic:'intentional-communities',d:'A community that shares income and usually property. Membership implies economic interdependence, not just proximity.'},
  {t:'Common purse',topic:'community-economy',d:'A single shared pot of money that covers members\u2019 needs. Earnings go in; spending is decided collectively or by agreed allowance.'},
  {t:'Community land trust',topic:'legal-structures',d:'A non-profit that holds land permanently and leases it to residents, removing the land itself from the speculative market.'},
  {t:'Consensus',topic:'community-governance',d:'A decision method requiring the agreement of all participants. Powerful for trust, slow under scale and fatigue.'},
  {t:'Consent',topic:'community-governance',d:'A decision passes when no one has a reasoned, paramount objection. Not the same as everyone thinking it is the best idea.'},
  {t:'Covenant',topic:'legal-structures',d:'A binding condition attached to land or membership — for example, a ban on fossil-fuel vehicles — that survives changes of occupant.'},
  {t:'Double link',topic:'community-governance',d:'Two people carry information both ways between a circle and its parent circle, so power does not flow in only one direction.'},
  {t:'Ecovillage',topic:'intentional-communities',d:'An intentional or traditional community consciously designing its social, ecological, economic and cultural systems to regenerate its environment.'},
  {t:'Facilitation',topic:'conflict-resolution',d:'Holding a group process so the group can do its own thinking. The facilitator serves the process, not the outcome.'},
  {t:'Forming group',topic:'intentional-communities',d:'A community before land: people meeting, drafting a vision and testing whether they can decide together. Most projects end here.'},
  {t:'Gift economy',topic:'community-economy',d:'Circulation of goods and labour without direct exchange, held together by relationship and reputation rather than price.'},
  {t:'Governance',topic:'community-governance',d:'The system by which a group makes, records, reviews and enforces its decisions — including how it changes that system.'},
  {t:'Guest track',topic:'community-building',d:'The structured path a visitor moves along — visit, extended stay, provisional member — before joining. A community\u2019s real filter.'},
  {t:'Holon',topic:'community-governance',d:'A unit that is both a whole and a part — a circle that is complete in itself and a component of something larger.'},
  {t:'Income sharing',topic:'community-economy',d:'Members pool all outside earnings; needs are met from the pool. Removes internal wealth gaps and most wage-based hierarchy.'},
  {t:'Intentional community',topic:'intentional-communities',d:'A group of people who have chosen to live together, or close to each other, around shared values and explicit agreements.'},
  {t:'Keyline design',topic:'permaculture',d:'A land-planning method that reads a site\u2019s ridges and valleys to move water across the landscape rather than down it.'},
  {t:'Labour credit',topic:'community-economy',d:'An internal accounting unit for work done for the community, letting very different tasks count towards one shared quota.'},
  {t:'Land steward',topic:'land',d:'The role responsible for a piece of land over time — its water, soil, boundaries and long agreements — separate from ownership.'},
  {t:'Legal shell',topic:'legal-structures',d:'The registered entity — co-op, association, company, foundation — that can hold property, sign contracts and outlive members.'},
  {t:'Membership agreement',topic:'legal-structures',d:'The document a new member signs: rights, obligations, financial terms, and what happens on leaving.'},
  {t:'Mutual credit',topic:'community-economy',d:'A currency created between members as they trade, where the sum of balances is always zero. No scarce money needed.'},
  {t:'Non-violent communication',topic:'conflict-resolution',d:'A practice of separating observation, feeling, need and request, used widely in community repair conversations.'},
  {t:'Onboarding',topic:'community-building',d:'The deliberate first months of membership: who explains what, which agreements are read, and who is responsible for the newcomer.'},
  {t:'Permaculture',topic:'permaculture',d:'A design discipline for human settlements modelled on the relationships found in ecosystems — yields from patterns, not inputs.'},
  {t:'Provisional membership',topic:'intentional-communities',d:'A defined trial period with most rights and a scheduled decision point at the end, for both sides.'},
  {t:'Quorum',topic:'community-governance',d:'The minimum attendance for a decision to count. Set too high, nothing passes; too low, the absent are governed by the present.'},
  {t:'Regenerative',topic:'permaculture',d:'Leaving a system with more capacity than it had before — more soil, water, biodiversity, trust — rather than merely doing less harm.'},
  {t:'Restorative circle',topic:'conflict-resolution',d:'A facilitated meeting after harm, focused on impact and repair rather than on rule-breaking and punishment.'},
  {t:'Rotation',topic:'community-governance',d:'Fixed terms for roles, so responsibility circulates and no one becomes structurally indispensable.'},
  {t:'Sociocracy',topic:'community-governance',d:'A governance method using consent decisions, nested circles, double links and elections by open nomination.'},
  {t:'Sweat equity',topic:'community-economy',d:'Labour contributed to build or renovate, credited towards a member\u2019s financial stake in the project.'},
  {t:'Swale',topic:'permaculture',d:'A level ditch on contour that slows and infiltrates rainwater instead of letting it run off a slope.'},
  {t:'Tragedy of the commons',topic:'land',d:'The claim that shared resources are inevitably depleted — substantially revised by Ostrom\u2019s field evidence of durable commons rules.'},
  {t:'Vision document',topic:'intentional-communities',d:'The founding text stating what the community is for. Its job is to attract the right people and repel the wrong ones.'},
  {t:'Work exchange',topic:'community-economy',d:'Room and board given in return for labour — a common entry point, and a common source of unclear expectations.'},
  {t:'Zone planning',topic:'permaculture',d:'Placing elements by how often they need attention: daily-use zones nearest the dwelling, wild systems furthest out.'}
];

EH.slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

/* Search index built from all of the above */
EH.index = () => [
  ...EH.topics.map(t=>({kind:'Topic',title:t.name,desc:t.blurb,href:'Learning Topic.html'})),
  ...EH.guides.map(g=>({kind:'Guide',title:g.title,desc:g.blurb,href:'Learning Guide.html'})),
  ...EH.paths.map(p=>({kind:'Learning Path',title:p.title,desc:p.blurb,href:'Learning Hub.html#paths'})),
  ...EH.glossary.map(g=>({kind:'Glossary',title:g.t,desc:g.d,href:'Learning Term.html?t='+encodeURIComponent(g.t)})),
  ...EH.communities.map(c=>({kind:'Community',title:c.name,desc:c.loc+' · '+c.blurb,href:'Learning Hub.html#communities'}))
];

/* ============================ PROGRESS ============================ */
const PKEY='ecohubs.learning.progress.v1';
EH.progress = {
  all(){ try{return JSON.parse(localStorage.getItem(PKEY))||{}}catch(e){return {}} },
  done(id){ return !!this.all()[id] },
  set(id,v){ const a=this.all(); if(v)a[id]=Date.now(); else delete a[id]; localStorage.setItem(PKEY,JSON.stringify(a)); },
  toggle(id){ const v=!this.done(id); this.set(id,v); return v; },
  pct(ids){ if(!ids.length)return 0; const a=this.all(); return Math.round(ids.filter(i=>a[i]).length/ids.length*100); }
};

/* ============================ BEHAVIOUR ============================ */
document.addEventListener('DOMContentLoaded',()=>{
  EH.chrome();
  document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

  /* depth toggle */
  const depth = localStorage.getItem('ecohubs.learning.depth')||'standard';
  document.body.setAttribute('data-depth',depth);
  document.querySelectorAll('.depth button').forEach(b=>{
    b.classList.toggle('on',b.dataset.depth===depth);
    b.addEventListener('click',()=>{
      const d=b.dataset.depth;
      document.body.setAttribute('data-depth',d);
      localStorage.setItem('ecohubs.learning.depth',d);
      document.querySelectorAll('.depth button').forEach(x=>x.classList.toggle('on',x.dataset.depth===d));
    });
  });

  /* scroll progress */
  const line=document.querySelector('.scrollline');
  if(line){const upd=()=>{const h=document.documentElement.scrollHeight-innerHeight;line.style.width=(h>0?Math.min(100,scrollY/h*100):0)+'%'};upd();addEventListener('scroll',upd,{passive:true});}

  /* read buttons + tree ticks */
  const paint=EH.paint=()=>{
    document.querySelectorAll('[data-read]').forEach(b=>b.classList.toggle('is-done',EH.progress.done(b.dataset.read)));
    document.querySelectorAll('.tree a[data-lesson]').forEach(a=>a.classList.toggle('is-done',EH.progress.done(a.dataset.lesson)));
    document.querySelectorAll('[data-progress-of]').forEach(el=>{
      const ids=el.dataset.progressOf.split(',').filter(Boolean);
      const p=EH.progress.pct(ids);
      const fill=el.querySelector('i'); if(fill)fill.style.width=p+'%';
      const label=el.parentElement.querySelector('[data-progress-label]');
      if(label)label.textContent=p+'% complete';
    });
  };
  document.querySelectorAll('[data-read]').forEach(b=>b.addEventListener('click',()=>{
    const on=EH.progress.toggle(b.dataset.read);
    const t=b.querySelector('[data-read-label]'); if(t)t.textContent=on?'Marked as read':'Mark as read';
    paint();
  }));
  paint();

  /* glossary tooltips */
  const terms={}; EH.glossary.forEach(g=>terms[g.t.toLowerCase()]=g);
  const gl=document.querySelectorAll('.gloss');
  if(gl.length){
    const pop=document.createElement('div'); pop.id='glosspop';
    pop.innerHTML='<div class="gp-term"></div><div class="gp-def"></div><a class="gp-link" href="#">Open in glossary →</a>';
    document.body.appendChild(pop);
    let hide;
    const show=el=>{
      clearTimeout(hide);
      const key=(el.dataset.term||el.textContent).toLowerCase();
      const g=terms[key]; if(!g)return;
      pop.querySelector('.gp-term').textContent=g.t;
      pop.querySelector('.gp-def').textContent=g.d;
      pop.querySelector('.gp-link').href='Learning Term.html?t='+encodeURIComponent(g.t);
      const r=el.getBoundingClientRect();
      pop.style.left=Math.min(Math.max(12,r.left+scrollX-20),innerWidth-306)+'px';
      pop.style.top=(r.bottom+scrollY+10)+'px';
      pop.classList.add('on');
    };
    const later=()=>{hide=setTimeout(()=>pop.classList.remove('on'),220)};
    gl.forEach(el=>{el.addEventListener('mouseenter',()=>show(el));el.addEventListener('mouseleave',later);
      el.addEventListener('click',()=>{const g=terms[(el.dataset.term||el.textContent).toLowerCase()];if(g)location.href='Learning Term.html?t='+encodeURIComponent(g.t)})});
    pop.addEventListener('mouseenter',()=>clearTimeout(hide));
    pop.addEventListener('mouseleave',later);
  }

  /* serendipity */
  document.querySelectorAll('[data-rabbit]').forEach(box=>{
    const pool=[
      {k:'Case study',t:'Twin Oaks has shared every dollar since 1967',d:'Fifty-eight years of income sharing at a scale of about ninety people — the longest continuous experiment of its kind in the US.',h:'Learning Topic.html'},
      {k:'Glossary',t:'Tragedy of the commons — mostly wrong',d:'Ostrom documented commons that have held for centuries. The rules, not the sharing, decide the outcome.',h:'Learning Term.html?t=Tragedy%20of%20the%20commons'},
      {k:'Guide',t:'Why most forming groups never reach land',d:'The failure is almost never money. It is an unwritten vision and no agreed way to decide.',h:'Learning Guide.html'},
      {k:'Topic',t:'Water first, buildings second',d:'Tamera rehydrated a drying Alentejo valley before it built out. Read landscape before architecture.',h:'Learning Topic.html'},
      {k:'Concept',t:'A block is a right, not a mood',d:'Communities that survive consensus define exactly who may block, and on what grounds.',h:'Learning Term.html?t=Blocking%20concern'}
    ];
    const render=()=>{
      const p=pool[Math.floor(Math.random()*pool.length)];
      box.querySelector('[data-rabbit-kind]').textContent=p.k;
      box.querySelector('[data-rabbit-title]').textContent=p.t;
      box.querySelector('[data-rabbit-desc]').textContent=p.d;
      box.querySelector('[data-rabbit-link]').href=p.h;
    };
    render();
    const btn=box.querySelector('[data-rabbit-reroll]');
    if(btn)btn.addEventListener('click',render);
  });

  /* search forms → results page */
  document.querySelectorAll('form[data-search]').forEach(f=>f.addEventListener('submit',e=>{
    e.preventDefault();
    const q=f.querySelector('input').value.trim();
    location.href='Learning Search.html'+(q?'?q='+encodeURIComponent(q):'');
  }));

  /* section scrollspy for in-page TOC + tree */
  const heads=[...document.querySelectorAll('.prose h2[id]')];
  if(heads.length){
    const links=[...document.querySelectorAll('[data-spy] a')];
    const onScroll=()=>{
      let cur=heads[0];
      heads.forEach(h=>{if(h.getBoundingClientRect().top<140)cur=h});
      links.forEach(a=>a.classList.toggle('is-active',a.getAttribute('href')==='#'+cur.id));
    };
    onScroll(); addEventListener('scroll',onScroll,{passive:true});
  }
});

/* ============================ SHELL CHROME ============================ */
const MARK=(cls,bright)=>`<svg viewBox="0 0 1920 1920" class="${cls}${bright?' brightness-[1.6]':''}" xmlns="http://www.w3.org/2000/svg" aria-label="EcoHubs"><g fill="#064e3b"><path d="M375.183,374.836c31.204,-31.205 218.513,-64.394 371.175,88.268c91.285,91.286 206.245,429.736 176.537,459.444c-26.768,26.768 -368.158,-85.252 -459.443,-176.538c-164.72,-164.72 -123.097,-336.346 -88.269,-371.174Z"/><path d="M1544.82,1549.04c-31.204,31.204 -218.513,64.393 -371.175,-88.269c-91.285,-91.286 -206.245,-429.736 -176.537,-459.444c26.768,-26.768 368.158,85.252 459.443,176.538c164.72,164.72 123.097,336.346 88.269,371.175Z"/><path d="M1547.1,377.119c31.204,31.204 64.393,218.512 -88.269,371.174c-91.285,91.286 -429.736,206.245 -459.443,176.538c-26.769,-26.768 85.252,-368.158 176.537,-459.444c164.72,-164.72 336.347,-123.097 371.175,-88.268Z"/><path d="M372.9,1546.75c-31.204,-31.205 -64.393,-218.513 88.269,-371.175c91.285,-91.285 429.736,-206.245 459.443,-176.538c26.769,26.769 -85.252,368.158 -176.537,459.444c-164.72,164.72 -336.347,123.097 -371.175,88.269Z"/></g><g fill="#1a8e7b"><path d="M958.921,115.51c28.189,0 127.783,69.613 127.783,207.521c0,82.464 -100.947,287.26 -127.783,287.26c-24.181,0 -127.783,-204.796 -127.783,-287.26c0,-148.801 96.321,-207.521 127.783,-207.521Z"/><path d="M967.41,1804.49c-28.189,0 -127.783,-69.613 -127.783,-207.521c0,-82.464 100.946,-287.26 127.783,-287.26c24.181,0 127.783,204.796 127.783,287.26c0,148.801 -96.321,207.521 -127.783,207.521Z"/><path d="M1808.18,964.093c0,28.189 -69.612,127.783 -207.521,127.783c-82.463,0 -287.259,-100.946 -287.259,-127.783c0,-24.181 204.796,-127.782 287.259,-127.782c148.801,0 207.521,96.32 207.521,127.782Z"/><path d="M116.131,957.721c0,-28.189 69.612,-127.783 207.521,-127.783c82.463,0 287.259,100.947 287.259,127.783c0,24.181 -204.796,127.783 -287.259,127.783c-148.801,0 -207.521,-96.321 -207.521,-127.783Z"/></g></svg>`;
const NAVI={
  learning:['Learning','Learning Hub.html','<svg viewBox="0 0 24 24"><path d="M4 5.5A1.5 1.5 0 015.5 4H11v16H5.5A1.5 1.5 0 014 18.5z"/><path d="M20 5.5A1.5 1.5 0 0018.5 4H13v16h5.5a1.5 1.5 0 001.5-1.5z"/></svg>'],
  guides:['Guides','Learning Guide.html','<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2.5"/><path d="M8 9h8M8 13h8M8 17h5"/></svg>'],
  topics:['Topics','Learning Hub.html#topics','<svg viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/></svg>'],
  paths:['Learning Paths','Learning Hub.html#paths','<svg viewBox="0 0 24 24"><circle cx="7" cy="6" r="2.2"/><circle cx="17" cy="12" r="2.2"/><circle cx="7" cy="18" r="2.2"/><path d="M9.2 6H14a3 3 0 013 3v.8M14.8 12H10a3 3 0 00-3 3v.8"/></svg>'],
  glossary:['Glossary','Learning Glossary.html','<svg viewBox="0 0 24 24"><path d="M6 4h11a2 2 0 012 2v14H8a2 2 0 01-2-2z"/><path d="M6 17h13"/></svg>'],
  map:['Knowledge Map','Learning Map.html','<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.2"/><path d="M12 4v3.8M12 16.2V20M4 12h3.8M16.2 12H20"/></svg>']
};
EH.chrome=()=>{
  const head=document.querySelector('[data-siteheader]');
  if(head)head.outerHTML=`<header class="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#fbfbf9]/85 border-b border-stone-200/60">
<div class="max-w-[1360px] mx-auto px-6 h-16 flex items-center justify-between">
<a href="Homepage Redesign.html" class="flex items-center gap-2.5 font-serif text-[17px] text-ecohubs-dark">${MARK('w-8 h-8')}EcoHubs</a>
<nav class="hidden md:flex items-center gap-8 text-sm text-stone-700">
<a href="Homepage Redesign.html" class="hover:text-ecohubs-dark">Home</a>
<a href="Vision Page.html" class="hover:text-ecohubs-dark">Vision</a>
<a href="Blueprint Page.html" class="hover:text-ecohubs-dark">Blueprint</a>
<div class="relative group"><button type="button" class="flex items-center gap-1.5 hover:text-ecohubs-dark" aria-haspopup="true">Ecosystem <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
<div class="ecodrop">
<a href="https://rcos.ecohubs.community" target="_blank" rel="noopener"><span class="ed-name">RCOS ↗</span><span class="ed-sub">Regenerative Community OS — the Blueprint</span></a>
<a href="https://csi.ecohubs.community" target="_blank" rel="noopener"><span class="ed-name">CSI ↗</span><span class="ed-sub">Community Suitability Index</span></a>
<a href="https://votecast.ecohubs.community" target="_blank" rel="noopener"><span class="ed-name">VoteCast ↗</span><span class="ed-sub">Community voting platform</span></a>
<a href="https://seeking.community" target="_blank" rel="noopener"><span class="ed-name">Seeking.Community ↗</span><span class="ed-sub">Find &amp; match to a community · soon</span></a>
<a href="Resilience Assessment.html"><span class="ed-name">Resilience Assessment</span><span class="ed-sub">Interactive · 12 minutes</span></a>
</div></div>
<a href="Learning Hub.html" class="text-ecohubs-dark font-medium">Learning</a>
<a href="Membership Page.html" class="hover:text-ecohubs-dark">Members</a>
</nav>
<div class="flex items-center gap-3">
<a href="Learning Search.html" aria-label="Search the Learning Hub" class="w-9 h-9 rounded-full border border-stone-200 grid place-items-center text-stone-600 hover:border-ecohubs-dark hover:text-ecohubs-dark transition-colors"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></svg></a>
<a href="Membership Page.html" class="hidden sm:inline-flex px-4 py-2 bg-ecohubs-dark text-white text-sm rounded-full hover:bg-ecohubs-deep transition-colors">Become a Member</a>
</div></div></header>`;

  const active=document.body.dataset.section||'learning';
  const navHTML=Object.entries(NAVI).map(([k,[label,href,icon]])=>
    `<a class="rail-link${k===active?' is-active':''}" href="${href}">${icon.replace('<svg','<svg fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"')}<span>${label}</span></a>`).join('');
  const rn=document.querySelector('[data-railnav]');
  if(rn)rn.innerHTML=`<form data-search class="railsearch"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" stroke-width="1.8"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></svg><input type="search" placeholder="Search the hub" aria-label="Search" /></form>${navHTML}`;
  const rt=document.querySelector('[data-railtabs]');
  if(rt)rt.innerHTML=Object.entries(NAVI).map(([k,[label,href]])=>`<a href="${href}" class="${k===active?'is-active':''}">${label}</a>`).join('')+`<a href="Learning Search.html">Search</a>`;

  const f=document.querySelector('[data-footer]');
  if(f)f.outerHTML=`<footer class="bg-[#06170f] text-stone-300 mt-24">
<div class="max-w-[1360px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
<div class="col-span-2">
<a href="Homepage Redesign.html" class="flex items-center gap-2.5 mb-4">${MARK('w-9 h-9',true)}<span class="font-serif text-xl text-[#f5f2ea]">EcoHubs</span></a>
<p class="text-sm text-stone-400 leading-relaxed max-w-sm">A network of small communities living the questions of belonging, regeneration, and a more honest economy — one place at a time.</p>
<p class="mt-5 text-[13px] text-stone-500 font-story italic">The Learning Hub is free, open, and written in public. Corrections welcome.</p>
</div>
<div><div class="kicker text-emerald-300/70 mb-4">Learn</div><ul class="space-y-3 text-sm">
<li><a href="Learning Hub.html" class="hover:text-[#f5f2ea]">Learning Hub</a></li>
<li><a href="Learning Guide.html" class="hover:text-[#f5f2ea]">Guides</a></li>
<li><a href="Learning Hub.html#paths" class="hover:text-[#f5f2ea]">Learning Paths</a></li>
<li><a href="Learning Glossary.html" class="hover:text-[#f5f2ea]">Glossary</a></li>
<li><a href="Learning Map.html" class="hover:text-[#f5f2ea]">Knowledge map</a></li></ul></div>
<div><div class="kicker text-emerald-300/70 mb-4">Ecosystem</div><ul class="space-y-3 text-sm">
<li><a href="Blueprint Page.html" class="hover:text-[#f5f2ea]">RCOS Blueprint</a></li>
<li><a href="Resilience Assessment.html" class="hover:text-[#f5f2ea]">Resilience Assessment</a></li>
<li><a href="Vision Page.html" class="hover:text-[#f5f2ea]">Vision</a></li>
<li><a href="Membership Page.html" class="hover:text-[#f5f2ea]">Membership</a></li></ul></div>
<div><div class="kicker text-emerald-300/70 mb-4">About</div><ul class="space-y-3 text-sm">
<li><a href="FAQ Page.html" class="hover:text-[#f5f2ea]">FAQ</a></li>
<li><a href="Links Page.html" class="hover:text-[#f5f2ea]">Links</a></li>
<li><a href="Join the Waitlist.html" class="hover:text-[#f5f2ea]">Waitlist</a></li></ul></div>
</div>
<div class="border-t border-emerald-900/40"><div class="max-w-[1360px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-stone-500">
<div>© <span data-year>2026</span> EcoHubs.community · Built in the open, with care.</div>
<div class="flex gap-6"><a href="#" class="hover:text-stone-300">Privacy</a><a href="#" class="hover:text-stone-300">Imprint</a><a href="#" class="hover:text-stone-300">Code of Conduct</a><span class="hidden md:inline">EN · DE · ES</span></div>
</div></div></footer>`;
};

/* ============================ MAP ============================ */
/* Nested-cluster knowledge map, rendered from EH.topics */
EH.renderMap = (svg,opts={})=>{
  const w=opts.w||760,h=opts.h||520,compact=!!opts.compact;
  const groups={};
  EH.topics.forEach(t=>{(groups[t.cluster]=groups[t.cluster]||[]).push(t)});
  const keys=Object.keys(EH.clusters).filter(k=>groups[k]);
  const cols=compact?1:2, rows=Math.ceil(keys.length/cols);
  const cw=w/cols, ch=h/rows;
  let out=`<rect width="${w}" height="${h}" fill="transparent"/>`;
  keys.forEach((k,i)=>{
    const cx=(i%cols)*cw+cw/2, cy=Math.floor(i/cols)*ch+ch/2;
    const r=Math.min(cw,ch)/2-(compact?14:26);
    out+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(245,242,234,.9)" stroke="rgba(6,78,59,.16)" stroke-dasharray="3 5"/>`;
    out+=`<text class="mapcluster-label" x="${cx}" y="${cy-r+(compact?12:18)}" text-anchor="middle">${EH.clusters[k]}</text>`;
    const items=groups[k];
    items.forEach((t,j)=>{
      const a=(j/items.length)*Math.PI*2-Math.PI/2;
      const rr=items.length===1?0:r*(compact?.46:.52);
      const x=cx+Math.cos(a)*rr, y=cy+Math.sin(a)*rr;
      out+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(6,78,59,.14)"/>`;
    });
    out+=`<circle cx="${cx}" cy="${cy}" r="${compact?3:4}" fill="rgba(6,78,59,.35)"/>`;
    items.forEach((t,j)=>{
      const a=(j/items.length)*Math.PI*2-Math.PI/2;
      const rr=items.length===1?0:r*(compact?.46:.52);
      const x=cx+Math.cos(a)*rr, y=cy+Math.sin(a)*rr;
      const size=compact?5:6+Math.min(6,t.count/3);
      const active=opts.active===t.slug;
      out+=`<a class="mapnode" href="Learning Topic.html" aria-label="${t.name}">
        <circle cx="${x}" cy="${y}" r="${size}" fill="${active?'#059669':'rgba(6,78,59,.55)'}"/>
        <text x="${x}" y="${y-size-6}" text-anchor="middle" font-size="${compact?9.5:11.5}" ${active?'font-weight="600"':''}>${compact?t.name.split(' ')[0]:t.name}</text>
      </a>`;
    });
  });
  svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
  svg.innerHTML=out;
};

(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const e of a)if(e.type==="childList")for(const n of e.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function i(a){const e={};return a.integrity&&(e.integrity=a.integrity),a.referrerPolicy&&(e.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?e.credentials="include":a.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function t(a){if(a.ep)return;a.ep=!0;const e=i(a);fetch(a.href,e)}})();const g={name:"BLUE PRINT",tagline:"Architecture that shapes the way we live.",contact:{address:"42 Park Street, Bengaluru, Karnataka, India – 560001",phone:"+91 98765 43210",email:"hello@blueprintstudio.com",hours:"Monday – Friday, 9:00 AM – 6:00 PM"},socials:[{name:"Instagram",url:"#"},{name:"LinkedIn",url:"#"},{name:"Pinterest",url:"#"},{name:"Vimeo",url:"#"}],aboutStory:{heading:"Architecture with purpose.",paragraphs:["Founded with a belief that great architecture begins with understanding people and place, BLUE PRINT has grown into a multidisciplinary architecture and design studio working across residential, commercial, hospitality, and interior projects.","Our approach combines creative thinking with technical precision to create spaces that are functional, timeless, and deeply connected to their surroundings. We believe that architecture has the power to enrich lives, foster community, and shape a sustainable future.","Each project in our studio is treated as a unique response to context, material, light, and client aspirations. Rather than adhering to a single signature style, we let the site and the programmatic requirements guide our forms, resulting in bespoke spaces that feel natural and authentic."]}},S=[{value:50,label:"Projects Delivered"},{value:35,label:"Happy Clients"},{value:10,label:"Years of Experience"},{value:15,label:"Awards & Recognitions"}],C=[{num:"01",title:"Context",desc:"Architecture that responds to its surroundings, respecting native landscapes, site topography, and local climate conditions."},{num:"02",title:"Function",desc:"Spaces designed intentionally around how people live, work, and interact, balancing aesthetic elegance with day-to-day utility."},{num:"03",title:"Material",desc:"Thoughtful articulation of materials, textures, raw light, and precise proportions to elicit tactile and emotional responses."},{num:"04",title:"Experience",desc:"Architecture that goes beyond functional shelter, creating memorable human experiences and connecting people with their environment."}],B=[{num:"01",title:"Discover",desc:"Deep dive into client goals, site context, environmental constraints, and overall project vision."},{num:"02",title:"Concept",desc:"Translating research and goals into initial sketches, massing studies, spatial volumes, and structural strategies."},{num:"03",title:"Design",desc:"Refining the concept with full technical drawings, precise material specifications, interior details, and photorealistic 3D renders."},{num:"04",title:"Build",desc:"Collaborating closely with builders and craftsmen to execute the design with precise architectural alignment."}],_=[{title:"Architectural Design",desc:"Designing sustainable, contemporary buildings that form dialogs with their environment."},{title:"Interior Design",desc:"Creating bespoke interior volumes with attention to tactile materials, light, and custom furniture."},{title:"Residential Architecture",desc:"Crafting thoughtful, private sanctuaries customized for family life and modern living."},{title:"Commercial Architecture",desc:"Creating highly efficient, flexible commercial spaces, retail storefronts, and office environments."},{title:"Hospitality Design",desc:"Designing boutique hotels, dining environments, and resorts centered on spatial experiences."},{title:"3D Visualization",desc:"Producing detailed volumetric concepts, massing diagrams, and high-fidelity rendering details."},{title:"Urban Planning",desc:"Designing sustainable neighborhood frameworks, master plans, and public landscape connections."},{title:"Project Management",desc:"Supervising project development, contractor scheduling, and ensuring drawing details are built accurately."}],T=[{name:"Arjun Mehta",role:"Founder & Principal Architect",image:"/assets/team/team1.jpg"},{name:"Riya Kapoor",role:"Senior Architect",image:"/assets/team/team2.jpg"},{name:"Aditya Sharma",role:"Design Director",image:"/assets/team/team3.jpg"},{name:"Neha Verma",role:"Interior Designer",image:"/assets/team/team4.jpg"},{name:"Rahul Sen",role:"Project Architect",image:"/assets/team/team5.jpg"},{name:"Ananya Rao",role:"3D Visualization Artist",image:"/assets/team/team6.jpg"}],v=[{id:"azure-residence",title:"Azure Residence",tagline:"A concrete pavilion defined by water, light, and natural landscape.",location:"Bengaluru, India",category:"Residential",year:"2025",client:"The Somany Family",area:"4,500 sq ft",status:"Completed",description:"Azure Residence is a contemporary sanctuary designed to frame natural landscape and elements. Structured as a concrete pavilion, the home is organized around a private central courtyard and a reflective lap pool. A minimalist material selection of exposed board-formed concrete, locally sourced teak, and expansive structural glazing provides a highly texturized, natural background that is continuously animated by light and shadow.",heroImage:"/assets/projects/azure_hero.jpg",galleryImages:[{url:"/assets/projects/azure_ext.jpg",caption:"Concrete pavilion and reflective lap pool at dusk."},{url:"/assets/projects/azure_int.jpg",caption:"Double-height living space with local teak and raw concrete."},{url:"/assets/projects/azure_detail.jpg",caption:"Tactile detailing showing board-formed concrete texture and shadow lines."}],drawings:[{name:"Ground Floor Plan",url:"/assets/projects/azure_drawing_floor.jpg"},{name:"Building Elevation",url:"/assets/projects/azure_drawing_elevation.jpg"}],renders:[{name:"Volumetric Massing Model",url:"/assets/projects/azure_render_massing.jpg"},{name:"Reflective Pool Concept Render",url:"/assets/projects/azure_render_pool.jpg"}],story:[{heading:"The Idea",text:"The core concept behind Azure Residence was to create a dwelling that lives in synergy with the local climate and native vegetation of Bengaluru. Instead of creating a sealed, air-conditioned box, we opened up the volumes to allow fresh breeze, water reflections, and natural shade to drive the interior thermal comfort.",image:"/assets/projects/azure_story_idea.jpg"},{heading:"Material & Form",text:"Formally, the house is composed of stacked structural concrete boxes projecting over a lightweight steel and glass base. Board-formed concrete was selected for its raw honesty and thermal properties. We left the concrete surfaces untouched, showcasing the grain of the wooden shuttering panels, which contrast elegantly with refined glass panels.",image:"/assets/projects/azure_story_material.jpg"},{heading:"Light & Space",text:"Light is treated as a core building block. Large structural roof cutouts draw north light deep into the internal volumes. Large glass facades are protected by deep structural concrete cantilevers, protecting internal rooms from direct solar heat gain while maintaining seamless sightlines to the courtyard.",image:"/assets/projects/azure_story_light.jpg"}]},{id:"blue-tower",title:"The Blue Tower",tagline:"A landmark commercial facade that redefines workplace sustainability.",location:"Mumbai, India",category:"Commercial",year:"2024",client:"Zenith Development Group",area:"120,000 sq ft",status:"Completed",description:"The Blue Tower is a premium, contemporary commercial building that balances dense floor plates with employee wellness and green architectural features. The tower stands out in the skyline with its custom double-skin facade lined with royal blue ceramic louvers. These louvers are aerodynamically positioned to optimize natural breeze capture and light deflection, reducing solar heat loads while keeping offices naturally illuminated.",heroImage:"/assets/projects/blue_tower_hero.jpg",galleryImages:[{url:"/assets/projects/blue_tower_ext.jpg",caption:"Exterior view of the custom royal blue solar louvers."},{url:"/assets/projects/blue_tower_int.jpg",caption:"Lobby double-height volume featuring micro-cement and blue glass accents."}],drawings:[{name:"Core Building Section",url:"/assets/projects/blue_tower_drawing_section.jpg"}],renders:[{name:"Sky-Garden Concept Render",url:"/assets/projects/blue_tower_render_rooftop.jpg"}],story:[{heading:"The Idea",text:"In dense metropolis areas like Mumbai, workspaces are often cut off from light and air. The Blue Tower seeks to change this by incorporating vertical sky gardens and multi-story structural cutouts that allow tenants to access fresh air and green environments on every floor.",image:"/assets/projects/blue_tower_story_idea.jpg"},{heading:"Material & Form",text:"Constructed with a post-tensioned concrete structural frame, the building is wrapped in high-performance glass. The exterior skin features customized extruded terracotta fins finished in a vibrant royal blue glaze, acting as a functional solar shading system that also serves as a bold architectural identity.",image:"/assets/projects/blue_tower_story_material.jpg"}]},{id:"courtyard-house",title:"Courtyard House",tagline:"Reinterpreting traditional Indian courtyard living for a contemporary family.",location:"Hyderabad, India",category:"Residential",year:"2024",client:"Dr. Srinivas Reddy",area:"5,200 sq ft",status:"Completed",description:"Courtyard House reinterprets classic architectural principles of traditional Indian houses. Designed for a multigenerational family, the rooms are organized around a double-height, open-air central courtyard. Handmade brick screen lattices (jaalis) wrap around the building envelopes, allowing air to circulate freely while creating dynamic patterns of light and privacy internally.",heroImage:"/assets/projects/courtyard_house_hero.jpg",galleryImages:[{url:"/assets/projects/courtyard_house_ext.jpg",caption:"Contemporary hand-cast brick screens facade."},{url:"/assets/projects/courtyard_house_int.jpg",caption:"Open courtyard lounge featuring polished concrete and granite columns."}],drawings:[{name:"Site Layout & Ground Plan",url:"/assets/projects/courtyard_house_drawing_site.jpg"}],renders:[{name:"Courtyard Perspective Render",url:"/assets/projects/courtyard_house_render_courtyard.jpg"}],story:[{heading:"The Idea",text:"The traditional Indian courtyard has always served as the climatic core of a home. For this site in Hyderabad, we used the central volume to establish stack-ventilation, where warm air naturally rises and exits through the skylight roof, drawing in cool air through shaded brick screen facades.",image:"/assets/projects/courtyard_house_story_idea.jpg"},{heading:"Light & Space",text:"Spaces are structured with high ceilings and polished grey IPS concrete floors. During hot summer months, the screens soften direct light, throwing graphic patterns of dots and grids on the cool floors and white walls, creating a tranquil atmosphere.",image:"/assets/projects/courtyard_house_story_light.jpg"}]},{id:"urban-studio",title:"Urban Studio",tagline:"A creative industrial workspace highlighting historic textures and light.",location:"Delhi, India",category:"Interior",year:"2023",client:"Studio 11 Design Group",area:"2,800 sq ft",status:"Completed",description:"Urban Studio is a renovation of an industrial warehouse, converted into a collaborative architectural workspace. The project celebrates the raw texture of the original brick vaults and iron trusses, adding contemporary insertions such as royal blue steel beams, linear LED profiles, glass conference rooms, and custom-cast micro-concrete desks.",heroImage:"/assets/projects/urban_studio_hero.jpg",galleryImages:[{url:"/assets/projects/urban_studio_ext.jpg",caption:"Main open collaborative studio floor."},{url:"/assets/projects/urban_studio_int.jpg",caption:"Private meeting capsules finished in acoustic wood felt."}],drawings:[{name:"Studio Layout & Desk Plan",url:"/assets/projects/urban_studio_drawing_layout.jpg"}],renders:[{name:"Isometric Layout Concept Model",url:"/assets/projects/urban_studio_render_isometric.jpg"}],story:[{heading:"The Idea",text:"In converting this industrial warehouse, we wanted to avoid the generic sterile office aesthetic. The goal was to leave the historic narrative of the site visible, letting the industrial brick vaults and steel columns form a raw dialogue with clean, contemporary functional details.",image:"/assets/projects/urban_studio_story_idea.jpg"},{heading:"Material & Form",text:"We introduced custom structural reinforcements finished in our studio color—vibrant royal blue. This serves to stabilize the old roof trusses while bringing a sharp modern contrast that ties the visual layout of the workspace together.",image:"/assets/projects/urban_studio_story_material.jpg"}]}],w={render(r="home"){const s=[{id:"home",label:"Home",path:"/"},{id:"projects",label:"Projects",path:"/projects"},{id:"about",label:"About",path:"/about"},{id:"contact",label:"Contact",path:"/contact"}],i=s.map(a=>`
        <li class="nav-item">
          <a href="${a.path}" data-nav="${a.id}" class="nav-link ${r===a.id?"active":""}">${a.label}</a>
        </li>
      `).join(""),t=s.map(a=>`
        <li>
          <a href="${a.path}" data-nav="${a.id}" class="mobile-nav-link ${r===a.id?"active":""}">${a.label}</a>
        </li>
      `).join("");return`
      <nav class="navbar" id="main-navbar">
        <div class="container navbar-inner">
          <!-- Logo -->
          <a href="/" data-nav="home" class="logo">
            BLUE <span class="logo-blue">PRINT</span>
          </a>

          <!-- Desktop Navigation -->
          <ul class="nav-links">
            ${i}
          </ul>

          <!-- Right side CTA -->
          <div class="nav-cta">
            <a href="/contact" data-nav="contact" class="btn btn-secondary" style="padding: 10px 24px; font-size: 0.8rem;">
              Start a Project
            </a>
          </div>

          <!-- Mobile Toggle Hamburger -->
          <button class="mobile-toggle" id="mobile-menu-toggle" aria-label="Toggle Menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <!-- Mobile Fullscreen Overlay -->
        <div class="mobile-nav" id="mobile-navigation">
          <ul class="mobile-nav-list">
            ${t}
          </ul>
          <a href="/contact" data-nav="contact" class="btn btn-primary" id="mobile-cta-btn">
            Start a Project
          </a>
        </div>
      </nav>
    `},init(r){const s=document.getElementById("main-navbar"),i=document.getElementById("mobile-menu-toggle"),t=document.getElementById("mobile-navigation");if(!s)return;const a=()=>{window.scrollY>40?s.classList.add("scrolled"):s.classList.remove("scrolled")};window.addEventListener("scroll",a),a();const e=()=>{const o=i.getAttribute("aria-expanded")==="true";i.setAttribute("aria-expanded",!o),i.classList.toggle("active"),t.classList.toggle("active"),o?document.body.style.overflow="":document.body.style.overflow="hidden"};i.addEventListener("click",e),t.querySelectorAll("a[data-nav]").forEach(o=>{o.addEventListener("click",p=>{p.preventDefault(),document.body.style.overflow="",i.classList.remove("active"),t.classList.remove("active"),i.setAttribute("aria-expanded","false");const u=o.getAttribute("data-nav"),c=o.getAttribute("href");r.navigate(c,u)})}),s.querySelectorAll(".navbar-inner a[data-nav]").forEach(o=>{o.addEventListener("click",p=>{p.preventDefault();const u=o.getAttribute("data-nav"),c=o.getAttribute("href");r.navigate(c,u)})})}},j={render(){const r=new Date().getFullYear(),s=g.socials.map(i=>`
        <a href="${i.url}" class="footer-social-link" target="_blank" rel="noopener noreferrer">${i.name}</a>
      `).join("");return`
      <footer class="footer">
        <div class="container footer-grid">
          <!-- Column 1: Brand -->
          <div class="footer-brand">
            <a href="/" data-nav="home" class="logo">
              BLUE <span class="logo-blue">PRINT</span>
            </a>
            <p class="footer-tagline">${g.tagline}</p>
          </div>

          <!-- Column 2: Studio Links -->
          <div>
            <h4 class="footer-title">Studio</h4>
            <ul class="footer-links">
              <li><a href="/" data-nav="home">Home</a></li>
              <li><a href="/projects" data-nav="projects">Projects</a></li>
              <li><a href="/about" data-nav="about">About</a></li>
              <li><a href="/contact" data-nav="contact">Contact</a></li>
            </ul>
          </div>

          <!-- Column 3: Socials -->
          <div>
            <h4 class="footer-title">Connect</h4>
            <div class="footer-links" style="gap: 12px; display: flex; flex-direction: column;">
              ${s}
            </div>
          </div>

          <!-- Column 4: Contact -->
          <div>
            <h4 class="footer-title">Contact</h4>
            <div class="footer-info">
              <p class="footer-info-highlight">${g.contact.address}</p>
              <p>
                T: <a href="tel:${g.contact.phone.replace(/\s+/g,"")}" class="footer-info-highlight">${g.contact.phone}</a><br>
                E: <a href="mailto:${g.contact.email}" class="footer-info-highlight">${g.contact.email}</a>
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="container footer-bottom">
          <p>&copy; ${r} BLUE PRINT Architecture Studio. All rights reserved.</p>
          <p>Architecture that shapes the way we live.</p>
        </div>
      </footer>
    `},init(r){const s=document.getElementById("footer-container");if(!s)return;s.querySelectorAll("a[data-nav]").forEach(t=>{t.addEventListener("click",a=>{a.preventDefault();const e=t.getAttribute("data-nav"),n=t.getAttribute("href");r.navigate(n,e)})})}};class M{constructor(s,i,t,a){this.routes=s,this.mountingPoint=i,this.navbarPoint=t,this.footerPoint=a,this.currentViewName=""}init(){document.addEventListener("click",s=>{const i=s.target.closest("a[data-nav]");if(i){s.preventDefault();const t=i.getAttribute("data-nav"),a=i.getAttribute("href");this.navigate(a,t)}}),window.addEventListener("popstate",()=>{this.resolveRoute(window.location.pathname)}),this.resolveRoute(window.location.pathname)}navigate(s,i){window.location.pathname!==s&&(window.history.pushState({},"",s),this.resolveRoute(s,i))}async resolveRoute(s,i){let t=this.matchRoute(s);t||(t={route:this.routes["/"],params:{}});const{route:a,params:e}=t;this.currentViewName=a.name;const n=document.getElementById("page-transition-overlay");n?(n.classList.remove("animating-out"),n.classList.add("animating-in"),await new Promise(l=>setTimeout(l,450)),this.navbarPoint&&(this.navbarPoint.innerHTML=w.render(this.currentViewName),w.init(this)),this.footerPoint&&(this.footerPoint.innerHTML=j.render(),j.init(this)),this.mountingPoint.innerHTML=await a.view.render(e),window.scrollTo(0,0),a.view.init&&a.view.init(e,this),n.classList.remove("animating-in"),n.classList.add("animating-out"),setTimeout(()=>{n.classList.remove("animating-out")},600)):(this.navbarPoint&&(this.navbarPoint.innerHTML=w.render(this.currentViewName),w.init(this)),this.footerPoint&&(this.footerPoint.innerHTML=j.render(),j.init(this)),this.mountingPoint.innerHTML=await a.view.render(e),window.scrollTo(0,0),a.view.init&&a.view.init(e,this)),document.title=`${a.title} | BLUE PRINT`}matchRoute(s){if(this.routes[s])return{route:this.routes[s],params:{}};for(const i in this.routes)if(i.includes(":")){const t=i.split("/"),a=s.split("/");if(t.length===a.length){const e={};let n=!0;for(let l=0;l<t.length;l++)if(t[l].startsWith(":")){const o=t[l].slice(1);e[o]=a[l]}else if(t[l]!==a[l]){n=!1;break}if(n)return{route:this.routes[i],params:e}}}return null}}const x={images:[],currentIndex:0,isOpen:!1,render(){return`
      <div class="lightbox" id="app-lightbox" aria-hidden="true" role="dialog">
        <!-- Close button -->
        <button class="lightbox-close" id="lightbox-close-btn" aria-label="Close Lightbox"></button>

        <!-- Previous Navigation -->
        <button class="lightbox-nav lightbox-prev" id="lightbox-prev-btn" aria-label="Previous Image">
          <svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
        </button>

        <!-- Main Slide Display Area -->
        <div class="lightbox-content">
          <img src="" alt="" class="lightbox-image" id="lightbox-display-img">
        </div>

        <!-- Next Navigation -->
        <button class="lightbox-nav lightbox-next" id="lightbox-next-btn" aria-label="Next Image">
          <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
        </button>

        <!-- Metas & Counters -->
        <div class="lightbox-meta">
          <div class="lightbox-counter" id="lightbox-counter-label">0 / 0</div>
          <div class="lightbox-caption" id="lightbox-caption-label">Image Caption</div>
        </div>
      </div>
    `},init(){const r=document.getElementById("lightbox-container");if(!r)return;r.innerHTML=this.render();const s=document.getElementById("lightbox-close-btn"),i=document.getElementById("lightbox-prev-btn"),t=document.getElementById("lightbox-next-btn"),a=document.getElementById("app-lightbox");s&&s.addEventListener("click",()=>this.close()),i&&i.addEventListener("click",()=>this.prev()),t&&t.addEventListener("click",()=>this.next()),a&&a.addEventListener("click",e=>{(e.target===a||e.target.classList.contains("lightbox-content"))&&this.close()}),document.addEventListener("keydown",e=>{this.isOpen&&(e.key==="Escape"&&this.close(),e.key==="ArrowRight"&&this.next(),e.key==="ArrowLeft"&&this.prev())})},open(r,s=0){if(!r||r.length===0)return;this.images=r,this.currentIndex=s,this.isOpen=!0;const i=document.getElementById("app-lightbox");i&&(i.classList.add("active"),i.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden",this.updateView())},close(){this.isOpen=!1;const r=document.getElementById("app-lightbox");r&&(r.classList.remove("active"),r.setAttribute("aria-hidden","true"),document.body.style.overflow="")},next(){!this.isOpen||this.images.length<=1||(this.currentIndex=(this.currentIndex+1)%this.images.length,this.updateView())},prev(){!this.isOpen||this.images.length<=1||(this.currentIndex=(this.currentIndex-1+this.images.length)%this.images.length,this.updateView())},updateView(){const r=document.getElementById("lightbox-display-img"),s=document.getElementById("lightbox-counter-label"),i=document.getElementById("lightbox-caption-label");if(!r)return;const t=this.images[this.currentIndex];r.style.transform="scale(0.97)",r.style.opacity="0.3",setTimeout(()=>{r.src=t.url,r.alt=t.caption||"",i&&(i.textContent=t.caption||""),s&&(s.textContent=`${this.currentIndex+1} / ${this.images.length}`),r.style.transform="scale(1)",r.style.opacity="1"},150)}},D={async render(){const s=v.slice(0,4).map(e=>`
          <article class="project-card reveal-fade-up" data-project-id="${e.id}">
            <div class="project-card-image-wrapper">
              <img src="${e.heroImage}" alt="${e.title}" class="project-card-image">
              <div class="project-card-overlay"></div>
              <div class="project-card-indicator">View Project &rarr;</div>
            </div>
            <div class="project-card-info">
              <div class="project-card-meta">
                <span>${e.location}</span>
                <span>${e.category} | ${e.year}</span>
              </div>
              <h3 class="project-card-title">${e.title}</h3>
            </div>
          </article>
        `).join(""),i=S.map(e=>`
          <div class="stat-item">
            <div class="stat-number" data-target="${e.value}">0</div>
            <div class="stat-label">${e.label}</div>
          </div>
        `).join(""),t=C.map(e=>`
          <div class="philosophy-card reveal-fade-up">
            <div class="philosophy-num">${e.num}</div>
            <h3 class="philosophy-title">${e.title}</h3>
            <p class="philosophy-desc">${e.desc}</p>
            <div class="philosophy-line"></div>
          </div>
        `).join(""),a=B.map((e,n)=>`
          <div class="process-step" id="process-step-${n}">
            <div class="process-step-node">${e.num}</div>
            <div class="process-step-content">
              <h3 class="process-step-title">${e.title}</h3>
              <p class="process-step-desc">${e.desc}</p>
            </div>
          </div>
        `).join("");return`
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-background-wrapper">
          <!-- Main Hero Background -->
          <img src="/assets/projects/hero_main.jpg" alt="Blueprint Architecture Hero" class="hero-background hero-bg-reveal">
        </div>
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <span class="label-mono hero-title-reveal">Architectural Studio</span>
          <h1 class="hero-title hero-title-reveal">${g.name}</h1>
          <p class="hero-subtitle hero-subtitle-reveal">${g.tagline}</p>
          <p class="hero-description hero-desc-reveal">
            Blue Print is an architecture and design studio creating thoughtful, contemporary spaces that balance form, function, and human experience.
          </p>
          <div class="hero-actions hero-btn-reveal">
            <a href="/projects" data-nav="projects" class="btn btn-primary">Explore Projects</a>
            <a href="/contact" data-nav="contact" class="btn btn-secondary">Start a Project</a>
          </div>
          <div class="hero-metadata hero-meta-reveal">
            <div class="hero-meta-item">
              <span class="hero-meta-label">Based in</span>
              <span class="hero-meta-val">Bengaluru, India</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Est. Year</span>
              <span class="hero-meta-val">2016</span>
            </div>
            <div class="hero-meta-item">
              <span class="hero-meta-label">Focus</span>
              <span class="hero-meta-val">Minimalism</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Introduction Section (Asymmetric Editorial Layout) -->
      <section class="intro-section">
        <div class="container intro-grid">
          <div class="intro-text-wrapper reveal-fade-up">
            <span class="label-mono">Introduction</span>
            <h2 class="intro-heading">We design spaces with purpose.</h2>
            <p class="intro-body">
              We believe that architecture is more than just raw material and structure. It is the framework for human life. Our process is deeply rooted in context, crafting tailored designs that respond to native landscapes, light, and the unique habits of their inhabitants.
            </p>
            <p class="intro-body" style="font-size: 1rem; color: var(--color-text-light);">
              From private residential sanctuaries to carbon-neutral commercial buildings, we seek to bring a contemporary design sensibility that stands the test of time, marrying geometric clarity with organic warmth.
            </p>
            <a href="/about" data-nav="about" class="btn-text" style="margin-top: var(--space-sm);">
              Read Our Story <span class="arrow">&rarr;</span>
            </a>
          </div>
          <div class="intro-image-wrapper reveal-image-clip" id="intro-parallax-container">
            <img src="/assets/projects/intro_main.jpg" alt="Architectural design process" class="intro-image parallax-image" id="intro-parallax-img">
          </div>
        </div>
      </section>

      <!-- Statistics Section (Counter Animations) -->
      <section class="stats-section" id="stats-trigger-section">
        <div class="container stats-grid">
          ${i}
        </div>
      </section>

      <!-- Selected Projects (Grid Portfolio) -->
      <section class="featured-section">
        <div class="container">
          <div class="section-header">
            <div class="section-title-wrapper reveal-fade-up">
              <span class="label-mono">Portfolio</span>
              <h2>Selected Projects</h2>
              <p class="section-subtitle">A selection of spaces shaped by context, material, and human experience.</p>
            </div>
            <div class="reveal-fade-up delay-1">
              <a href="/projects" data-nav="projects" class="btn btn-secondary">View All Projects</a>
            </div>
          </div>
          <div class="featured-grid">
            ${s}
          </div>
        </div>
      </section>

      <!-- Design Philosophy -->
      <section class="philosophy-section">
        <div class="container">
          <div class="reveal-fade-up" style="text-align: center; max-width: 600px; margin: 0 auto var(--space-xl);">
            <span class="label-mono">Our Beliefs</span>
            <h2>Form. Function. Experience.</h2>
            <p class="section-subtitle">We design based on four core architectural pillars, creating structures that enrich everyday life.</p>
          </div>
          <div class="philosophy-grid">
            ${t}
          </div>
        </div>
      </section>

      <!-- Process Section (Horizontal Timeline) -->
      <section class="process-section" id="process-trigger-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-xl);">
            <span class="label-mono">The Way We Work</span>
            <h2>From idea to reality.</h2>
            <p class="section-subtitle">A step-by-step collaboration tailored to guide clients seamlessly from sketch to structural delivery.</p>
          </div>
          
          <div class="process-timeline reveal-fade-up delay-1">
            <div class="process-timeline-progress" id="timeline-progress-bar"></div>
            ${a}
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="cta-section reveal-fade-up">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-heading">Have a space in mind? Let's build it.</h2>
            <p class="cta-desc">Tell us about your next project and let's create something remarkable together.</p>
          </div>
          <div class="cta-action">
            <a href="/contact" data-nav="contact" class="btn btn-secondary">Start a Conversation</a>
          </div>
        </div>
      </section>
    `},init(r,s){y(),document.querySelectorAll(".project-card").forEach(u=>{u.addEventListener("click",()=>{const c=u.getAttribute("data-project-id");s.navigate(`/project/${c}`,"projects")})});const t=document.getElementById("intro-parallax-img"),a=document.getElementById("intro-parallax-container");if(t&&a){const u=()=>{const c=a.getBoundingClientRect(),m=window.innerHeight;if(c.top<m&&c.bottom>0){const h=((m-c.top)/(m+c.height)-.5)*50;t.style.transform=`translateY(${h}px) scale(1.08)`}};window.addEventListener("scroll",u),u()}const e=document.getElementById("stats-trigger-section"),n=document.querySelectorAll(".stat-number");if(e&&n.length>0){let u=!1;const c=new IntersectionObserver(m=>{m.forEach(d=>{d.isIntersecting&&!u&&(u=!0,n.forEach(h=>{const f=parseInt(h.getAttribute("data-target"),10),b=1800,E=performance.now(),$=k=>{const A=k-E,I=Math.min(A/b,1),P=I*(2-I),L=Math.floor(P*f);h.textContent=`${L}+`,I<1?requestAnimationFrame($):h.textContent=`${f}+`};requestAnimationFrame($)}),c.unobserve(e))})},{threshold:.2});c.observe(e)}const l=document.getElementById("process-trigger-section"),o=document.getElementById("timeline-progress-bar"),p=document.querySelectorAll(".process-step");if(l&&o&&p.length>0){let u=!1;const c=new IntersectionObserver(m=>{m.forEach(d=>{if(d.isIntersecting&&!u){u=!0;const h=[12.5,37.5,62.5,87.5];p.forEach((f,b)=>{setTimeout(()=>{f.classList.add("active"),o.style.width=`${h[b]}%`},b*400)}),setTimeout(()=>{o.style.width="100%"},p.length*400),c.unobserve(l)}})},{threshold:.3});c.observe(l)}}},R={currentCategory:"all",async render(){const s=["all","residential","commercial","interior","hospitality"].map(t=>`
          <button class="filter-btn ${this.currentCategory===t?"active":""}" data-filter="${t}">
            ${t}
          </button>
        `).join(""),i=this.renderProjectCards(v);return`
      <section class="projects-hero">
        <div class="container">
          <span class="label-mono reveal-fade-up">Portfolio</span>
          <h1 class="reveal-fade-up">Our Projects</h1>
          <p class="section-subtitle reveal-fade-up" style="max-width: 600px;">
            Exploring contemporary ideas, functional geometry, natural materials, and the structural possibilities of light.
          </p>
        </div>
      </section>

      <section class="projects-grid-section" style="padding-bottom: var(--space-xxl);">
        <div class="container">
          <!-- Filter Bar -->
          <div class="filter-bar reveal-fade-up">
            ${s}
          </div>

          <!-- Portfolio Grid container -->
          <div class="portfolio-grid" id="portfolio-grid-container">
            ${i}
          </div>
        </div>
      </section>
    `},renderProjectCards(r){if(r.length===0)return`
        <div class="grid-col-12" style="text-align: center; padding: var(--space-xl) 0;">
          <p style="color: var(--color-text-light);">No projects found in this category.</p>
        </div>
      `;const s=["grid-col-8","grid-col-4","grid-col-4","grid-col-8","grid-col-6","grid-col-6"];return r.map((i,t)=>{const a=s[t%s.length],e=`animation-delay: ${t%3*.15}s;`;return`
          <article class="project-card ${a} fade-in-item" data-project-id="${i.id}" style="${e}">
            <div class="project-card-image-wrapper">
              <img src="${i.heroImage}" alt="${i.title}" class="project-card-image">
              <div class="project-card-overlay"></div>
              <div class="project-card-indicator">View Project &rarr;</div>
            </div>
            <div class="project-card-info">
              <div class="project-card-meta">
                <span>${i.location}</span>
                <span>${i.category} | ${i.year}</span>
              </div>
              <h3 class="project-card-title">${i.title}</h3>
            </div>
          </article>
        `}).join("")},init(r,s){y();const i=()=>{document.querySelectorAll(".project-card[data-project-id]").forEach(n=>{n.addEventListener("click",()=>{const l=n.getAttribute("data-project-id");s.navigate(`/project/${l}`,"projects")})})};i();const t=document.querySelectorAll(".filter-btn"),a=document.getElementById("portfolio-grid-container");t.forEach(e=>{e.addEventListener("click",()=>{t.forEach(o=>o.classList.remove("active")),e.classList.add("active");const n=e.getAttribute("data-filter");this.currentCategory=n;let l=v;n!=="all"&&(l=v.filter(o=>o.category.toLowerCase()===n.toLowerCase())),a&&(a.style.opacity="0",a.style.transform="translateY(15px)",a.style.transition="opacity 0.25s ease, transform 0.25s ease",setTimeout(()=>{a.innerHTML=this.renderProjectCards(l),i(),a.style.opacity="1",a.style.transform="translateY(0)"},250))})})}},q={async render(r){const s=r.id,i=v.findIndex(d=>d.id===s);if(i===-1)return`
        <div class="container" style="padding: var(--space-xxl) 0; text-align: center;">
          <h2>Project Not Found</h2>
          <p>The requested project does not exist.</p>
          <a href="/projects" data-nav="projects" class="btn btn-primary" style="margin-top: 24px;">Back to Portfolio</a>
        </div>
      `;const t=v[i],a=(i+1)%v.length,e=v[a],l=[{label:"Client",val:t.client},{label:"Location",val:t.location},{label:"Year",val:t.year},{label:"Area",val:t.area},{label:"Project Type",val:t.category},{label:"Status",val:t.status}].map(d=>`
        <div class="spec-item">
          <div class="spec-label">${d.label}</div>
          <div class="spec-val">${d.val}</div>
        </div>
      `).join(""),o=["col-8","col-4","col-12","col-6","col-6"],p=t.galleryImages.map((d,h)=>`
          <div class="gallery-item ${o[h%o.length]} reveal-fade-up" data-gallery-index="${h}">
            <img src="${d.url}" alt="${d.caption||t.title}">
          </div>
        `).join(""),u=t.drawings.map((d,h)=>`
          <div class="drawing-card reveal-fade-up" data-drawing-index="${h}">
            <div class="drawing-image-wrapper">
              <img src="${d.url}" alt="${d.name}">
            </div>
            <div class="drawing-title">${d.name}</div>
          </div>
        `).join(""),c=t.renders.map((d,h)=>`
          <div class="render-card reveal-fade-up" data-render-index="${h}">
            <div class="render-image-wrapper">
              <img src="${d.url}" alt="${d.name}">
            </div>
            <div class="render-title">${d.name}</div>
          </div>
        `).join(""),m=t.story.map((d,h)=>`
          <div class="story-row ${h%2!==0?"alternate":""}">
            <div class="story-content reveal-fade-up">
              <span class="label-mono">${t.title} Story</span>
              <h2 class="story-heading">${d.heading}</h2>
              <p class="story-text">${d.text}</p>
            </div>
            <div class="story-image-wrapper reveal-image-clip">
              <img src="${d.image}" alt="${d.heading}" class="story-image" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </div>
        `).join("");return`
      <!-- Hero Header -->
      <section class="project-detail-hero">
        <img src="${t.heroImage}" alt="${t.title}" class="detail-hero-bg hero-bg-reveal">
        <div class="detail-hero-overlay"></div>
        <div class="container detail-hero-content">
          <span class="label-mono hero-title-reveal" style="color: #ffffff; border-bottom: 2px solid var(--color-primary); padding-bottom: 4px;">Featured Project</span>
          <h1 class="detail-hero-title hero-title-reveal">${t.title}</h1>
          <p class="detail-hero-meta hero-subtitle-reveal">${t.location} &mdash; ${t.year}</p>
        </div>
      </section>

      <!-- Info Specs Block -->
      <section class="detail-info-section">
        <div class="container detail-info-grid">
          <div class="specs-grid reveal-fade-up">
            ${l}
          </div>
          <div class="reveal-fade-up delay-1">
            <h3 style="margin-bottom: var(--space-sm); font-weight: 300;">The Project Brief</h3>
            <p class="description-text">${t.description}</p>
          </div>
        </div>
      </section>

      <!-- Editorial Story Block -->
      <section class="project-story-section">
        <div class="container">
          ${m}
        </div>
      </section>

      <!-- Image Gallery Section -->
      <section class="detail-gallery-section bg-secondary">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-xl);">
            <span class="label-mono">Gallery</span>
            <h2>Project Gallery</h2>
            <p class="section-subtitle">A collection of exterior, interior, and macro details capturing the spatial texture.</p>
          </div>
          <div class="gallery-collage">
            ${p}
          </div>
        </div>
      </section>

      <!-- Technical Drawings Section -->
      <section class="technical-drawings-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-lg);">
            <span class="label-mono">Drafts</span>
            <h2>The Architectural Design</h2>
            <p class="section-subtitle">Architectural plans, sections, and site drawings defining the structural geometry.</p>
          </div>
          <div class="drawings-grid">
            ${u}
          </div>
        </div>
      </section>

      <!-- 3D Renders / Visualizations Section -->
      <section class="renders-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-lg);">
            <span class="label-mono">Visualization</span>
            <h2>Visualizing the Space</h2>
            <p class="section-subtitle">Volumetric massing renders and 3D modeling drafts prepared during the development phase.</p>
          </div>
          <div class="renders-grid">
            ${c}
          </div>
        </div>
      </section>

      <!-- Next Project Link Anchor -->
      <section class="next-project-section" id="next-project-btn" data-next-id="${e.id}">
        <img src="${e.heroImage}" alt="${e.title}" class="next-project-bg">
        <div class="container next-project-content">
          <span class="next-project-label">Next Project &rarr;</span>
          <h2 class="next-project-title">${e.title}</h2>
          <div class="next-project-arrow">&darr;</div>
        </div>
      </section>
    `},init(r,s){const i=r.id,t=v.find(o=>o.id===i);if(!t)return;y(),document.querySelectorAll(".gallery-item[data-gallery-index]").forEach(o=>{o.addEventListener("click",()=>{const p=parseInt(o.getAttribute("data-gallery-index"),10),u=t.galleryImages.map(c=>({url:c.url,caption:c.caption}));x.open(u,p)})}),document.querySelectorAll(".drawing-card[data-drawing-index]").forEach(o=>{o.addEventListener("click",()=>{const p=parseInt(o.getAttribute("data-drawing-index"),10),u=t.drawings.map(c=>({url:c.url,caption:c.name}));x.open(u,p)})}),document.querySelectorAll(".render-card[data-render-index]").forEach(o=>{o.addEventListener("click",()=>{const p=parseInt(o.getAttribute("data-render-index"),10),u=t.renders.map(c=>({url:c.url,caption:c.name}));x.open(u,p)})});const l=document.getElementById("next-project-btn");l&&l.addEventListener("click",()=>{const o=l.getAttribute("data-next-id");s.navigate(`/project/${o}`,"projects")})}},N={async render(){const r=g.aboutStory.paragraphs.map(e=>`<p>${e}</p>`).join(""),i=[{num:"01",title:"Context",desc:"Every site has a narrative. We carefully study local context, native geography, daylight paths, and cultural heritage to design forms that look natural and grounded in their landscape."},{num:"02",title:"Function",desc:"Architecture should enhance day-to-day living. We design internal flows from the inside out, aligning geometry and custom divisions with the specific routines of the users."},{num:"03",title:"Material",desc:"We value tactile authenticity. Our studio favors raw concrete, textured local timbers, natural brick, and raw iron, letting the true physical qualities of materials serve as the ornament."},{num:"04",title:"Sustainability",desc:"Spaces designed for longevity. We integrate passive solar shading, cross-ventilation shafts, structural thermal mass, and high-performance screens to minimize carbon footprint."}].map(e=>`
        <div class="principle-row reveal-fade-up">
          <div class="principle-border"></div>
          <div class="principle-num">${e.num}</div>
          <h3 class="principle-title">${e.title}</h3>
          <p class="principle-desc">${e.desc}</p>
        </div>
      `).join(""),t=_.map(e=>`
        <div class="service-card reveal-fade-up">
          <h3 class="service-card-title">${e.title}</h3>
          <p class="service-card-desc">${e.desc}</p>
        </div>
      `).join(""),a=T.map(e=>`
        <div class="team-card reveal-fade-up">
          <div class="team-image-wrapper">
            <img src="${e.image}" alt="${e.name}" class="team-image">
            <div class="team-overlay"></div>
          </div>
          <div class="team-card-info">
            <h3 class="team-name">${e.name}</h3>
            <span class="team-role">${e.role}</span>
          </div>
        </div>
      `).join("");return`
      <!-- About Hero -->
      <section class="about-hero">
        <div class="container">
          <span class="label-mono reveal-fade-up">About Studio</span>
          <h1 class="reveal-fade-up">${g.aboutStory.heading}</h1>
          <p class="section-subtitle reveal-fade-up" style="max-width: 600px;">
            BLUE PRINT is a contemporary architecture and design studio focused on creating thoughtful spaces that respond to people, context, and the environment.
          </p>
        </div>
      </section>

      <!-- Story Narrative -->
      <section class="about-story-section">
        <div class="container about-story-grid">
          <div class="reveal-fade-up">
            <h2 style="font-weight: 300; line-height: 1.2;">Crafting spaces that balance form, function, and human experience.</h2>
          </div>
          <div class="about-story-content reveal-fade-up delay-1">
            ${r}
          </div>
        </div>
      </section>

      <!-- Our Approach (Interactive List) -->
      <section class="about-principles-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-xl);">
            <span class="label-mono">Principles</span>
            <h2>Our Design Approach</h2>
            <p class="section-subtitle">The guidelines that define our spatial thinking and structure details.</p>
          </div>
          <div class="principles-list">
            ${i}
          </div>
        </div>
      </section>

      <!-- What We Do (Services) -->
      <section class="about-services-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px;">
            <span class="label-mono">Services</span>
            <h2>Capabilities</h2>
            <p class="section-subtitle">A comprehensive design service from early concepts to complete construction supervision.</p>
          </div>
          <div class="services-grid">
            ${t}
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="about-team-section">
        <div class="container">
          <div class="reveal-fade-up" style="max-width: 600px; margin-bottom: var(--space-xl);">
            <span class="label-mono">People</span>
            <h2>Meet the Team</h2>
            <p class="section-subtitle">The creative architects, designers, and visualizers behind the spaces.</p>
          </div>
          <div class="team-grid">
            ${a}
          </div>
        </div>
      </section>
    `},init(r,s){y()}},z={async render(){return`
      <!-- Contact Hero -->
      <section class="contact-hero">
        <div class="container">
          <span class="label-mono reveal-fade-up">Get in Touch</span>
          <h1 class="reveal-fade-up">Let's create something meaningful.</h1>
          <p class="section-subtitle reveal-fade-up" style="max-width: 600px;">
            Whether you are planning a new home, commercial space, or a larger masterplan, we'd love to hear about your project goals.
          </p>
        </div>
      </section>

      <!-- Details & Form Grid -->
      <section class="contact-section">
        <div class="container contact-grid">
          
          <!-- Column 1: Studio Information Details -->
          <div class="contact-info-block reveal-fade-up">
            
            <div>
              <h3 class="contact-item-title">Our Studio</h3>
              <div class="contact-item-value">
                <strong>BLUE PRINT Architecture Studio</strong><br>
                ${g.contact.address}
              </div>
            </div>

            <div>
              <h3 class="contact-item-title">Direct Contact</h3>
              <div class="contact-item-value">
                <p>
                  General Inquiries: <a href="mailto:${g.contact.email}" class="text-primary" style="font-weight: 500;">${g.contact.email}</a>
                </p>
                <p>
                  Call Us: <a href="tel:${g.contact.phone.replace(/\s+/g,"")}" class="text-primary" style="font-weight: 500;">${g.contact.phone}</a>
                </p>
              </div>
            </div>

            <div>
              <h3 class="contact-item-title">Studio Hours</h3>
              <div class="contact-item-value">
                <p>${g.contact.hours}</p>
                <p style="color: var(--color-text-light); font-size: 0.9rem;">By appointment only.</p>
              </div>
            </div>

          </div>

          <!-- Column 2: Enquiry Form Block -->
          <div class="contact-form-wrapper reveal-fade-up delay-1" id="enquiry-form-container">
            <h2 class="contact-form-title" style="font-weight: 300;">Let's talk about your project.</h2>
            
            <form id="project-enquiry-form" novalidate>
              <div class="form-group">
                <label for="form-name" class="form-label">Full Name *</label>
                <input type="text" id="form-name" class="form-control" placeholder="John Doe" required>
              </div>

              <div class="form-group">
                <label for="form-email" class="form-label">Email Address *</label>
                <input type="email" id="form-email" class="form-control" placeholder="john@example.com" required>
              </div>

              <div class="form-group">
                <label for="form-phone" class="form-label">Phone Number</label>
                <input type="tel" id="form-phone" class="form-control" placeholder="+91 98765 43210">
              </div>

              <div class="form-group">
                <label for="form-project-type" class="form-label">Project Type *</label>
                <select id="form-project-type" class="form-control" required>
                  <option value="" disabled selected>Select a project category</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label for="form-message" class="form-label">Tell us about your project *</label>
                <textarea id="form-message" class="form-control" rows="5" placeholder="Outline your project scope, timeline, and location..." required></textarea>
              </div>

              <div style="margin-top: var(--space-lg);">
                <button type="submit" class="btn btn-primary" style="width: 100%;">Send Enquiry</button>
              </div>
            </form>
          </div>

        </div>
      </section>
    `},init(r,s){y();const i=document.getElementById("project-enquiry-form"),t=document.getElementById("enquiry-form-container");i&&t&&i.addEventListener("submit",a=>{a.preventDefault();const e=document.getElementById("form-name"),n=document.getElementById("form-email"),l=document.getElementById("form-project-type"),o=document.getElementById("form-message");let p=!0;if([e,n,l,o].forEach(m=>{m&&(m.style.borderColor="")}),e.value.trim()||(e.style.borderColor="red",p=!1),/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n.value.trim())||(n.style.borderColor="red",p=!1),l.value||(l.style.borderColor="red",p=!1),o.value.trim()||(o.style.borderColor="red",p=!1),!p)return;const c={name:e.value.trim(),email:n.value.trim(),phone:document.getElementById("form-phone").value.trim(),projectType:l.value,message:o.value.trim(),submittedAt:new Date().toISOString()};console.log("Blueprint Project Enquiry Submitted:",c),t.style.opacity="0",t.style.transform="translateY(10px)",t.style.transition="opacity 0.4s ease, transform 0.4s ease",setTimeout(()=>{t.innerHTML=`
            <div class="contact-form-success">
              <div class="success-icon-wrapper">
                <svg class="success-icon" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 class="success-title">Message Sent</h2>
              <p class="success-text">
                Thank you for reaching out, <strong>${c.name}</strong>. Our design directors have received your project inquiry and will contact you within 24–48 hours.
              </p>
              <a href="/projects" data-nav="projects" class="btn btn-secondary" style="margin-top: var(--space-md); width: auto;">
                Explore Selected Projects
              </a>
            </div>
          `;const m=t.querySelector("a[data-nav]");m&&m.addEventListener("click",d=>{d.preventDefault();const h=m.getAttribute("data-nav"),f=m.getAttribute("href");s.navigate(f,h)}),t.style.opacity="1",t.style.transform="translateY(0)"},400)})}},H={"/":{name:"home",title:"Architecture Studio",view:D},"/projects":{name:"projects",title:"Selected Projects",view:R},"/project/:id":{name:"projects",title:"Project Detail",view:q},"/about":{name:"about",title:"Our Story & Approach",view:N},"/contact":{name:"contact",title:"Start a Project",view:z}};function y(){const r={root:null,rootMargin:"0px 0px -8% 0px",threshold:.05},s=new IntersectionObserver((t,a)=>{t.forEach(e=>{e.isIntersecting&&(e.target.classList.add("revealed"),a.unobserve(e.target))})},r);document.querySelectorAll(".reveal-fade-up, .reveal-image-clip").forEach(t=>s.observe(t))}document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("app"),s=document.getElementById("navbar-container"),i=document.getElementById("footer-container");x.init(),new M(H,r,s,i).init(),y()});
//# sourceMappingURL=index-nL89S3Gn.js.map

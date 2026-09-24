/* ==========================================================================
   BLUE PRINT - Centralized Content Data
   ========================================================================== */

export const studioInfo = {
  name: 'BLUE PRINT',
  tagline: 'Architecture that shapes the way we live.',
  logo: {
    text: 'BLUE PRINT',
    highlight: 'PRINT'
  },
  contact: {
    address: '42 Park Street, Bengaluru, Karnataka, India – 560001',
    phone: '+91 98765 43210',
    email: 'hello@blueprintstudio.com',
    hours: 'Monday – Friday, 9:00 AM – 6:00 PM'
  },
  socials: [
    { name: 'Instagram', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Pinterest', url: '#' },
    { name: 'Vimeo', url: '#' }
  ],
  aboutStory: {
    heading: 'Architecture with purpose.',
    paragraphs: [
      'Founded with a belief that great architecture begins with understanding people and place, BLUE PRINT has grown into a multidisciplinary architecture and design studio working across residential, commercial, hospitality, and interior projects.',
      'Our approach combines creative thinking with technical precision to create spaces that are functional, timeless, and deeply connected to their surroundings. We believe that architecture has the power to enrich lives, foster community, and shape a sustainable future.',
      'Each project in our studio is treated as a unique response to context, material, light, and client aspirations. Rather than adhering to a single signature style, we let the site and the programmatic requirements guide our forms, resulting in bespoke spaces that feel natural and authentic.'
    ]
  }
};

export const constructionComparison = {
  tagline: 'Site Transformation',
  title: 'From Groundwork to Living Space',
  description: 'Experience the architectural evolution as raw structural masonry, scaffolding, and concrete foundations transform into a refined, light-filled contemporary sanctuary.',
  beforeImage: '/assets/projects/construction_before.jpg',
  afterImage: '/assets/projects/construction_after.jpg',
  beforeAlt: 'Living space during active construction phase with exposed masonry and scaffolding',
  afterAlt: 'Completed luxury interior living room with bespoke joinery, art, and natural lighting',
  beforeLabel: 'BEFORE',
  afterLabel: 'AFTER',
  caption: 'Slide or drag horizontally to compare the raw construction phase with the completed living volume.'
};

export const statistics = [
  { value: 50, label: 'Projects Delivered' },
  { value: 35, label: 'Happy Clients' },
  { value: 10, label: 'Years of Experience' },
  { value: 15, label: 'Awards & Recognitions' }
];

export const designPhilosophy = [
  {
    num: '01',
    title: 'Context',
    desc: 'Architecture that responds to its surroundings, respecting native landscapes, site topography, and local climate conditions.'
  },
  {
    num: '02',
    title: 'Function',
    desc: 'Spaces designed intentionally around how people live, work, and interact, balancing aesthetic elegance with day-to-day utility.'
  },
  {
    num: '03',
    title: 'Material',
    desc: 'Thoughtful articulation of materials, textures, raw light, and precise proportions to elicit tactile and emotional responses.'
  },
  {
    num: '04',
    title: 'Experience',
    desc: 'Architecture that goes beyond functional shelter, creating memorable human experiences and connecting people with their environment.'
  }
];

export const processSteps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Deep dive into client goals, site context, environmental constraints, and overall project vision.'
  },
  {
    num: '02',
    title: 'Concept',
    desc: 'Translating research and goals into initial sketches, massing studies, spatial volumes, and structural strategies.'
  },
  {
    num: '03',
    title: 'Design',
    desc: 'Refining the concept with full technical drawings, precise material specifications, interior details, and photorealistic 3D renders.'
  },
  {
    num: '04',
    title: 'Build',
    desc: 'Collaborating closely with builders and craftsmen to execute the design with precise architectural alignment.'
  }
];

export const services = [
  {
    title: 'Architectural Design',
    desc: 'Designing sustainable, contemporary buildings that form dialogs with their environment.'
  },
  {
    title: 'Interior Design',
    desc: 'Creating bespoke interior volumes with attention to tactile materials, light, and custom furniture.'
  },
  {
    title: 'Residential Architecture',
    desc: 'Crafting thoughtful, private sanctuaries customized for family life and modern living.'
  },
  {
    title: 'Commercial Architecture',
    desc: 'Creating highly efficient, flexible commercial spaces, retail storefronts, and office environments.'
  },
  {
    title: 'Hospitality Design',
    desc: 'Designing boutique hotels, dining environments, and resorts centered on spatial experiences.'
  },
  {
    title: '3D Visualization',
    desc: 'Producing detailed volumetric concepts, massing diagrams, and high-fidelity rendering details.'
  },
  {
    title: 'Urban Planning',
    desc: 'Designing sustainable neighborhood frameworks, master plans, and public landscape connections.'
  },
  {
    title: 'Project Management',
    desc: 'Supervising project development, contractor scheduling, and ensuring drawing details are built accurately.'
  }
];

export const team = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & Principal Architect',
    image: '/assets/team/team1.jpg'
  },
  {
    name: 'Riya Kapoor',
    role: 'Senior Architect',
    image: '/assets/team/team2.jpg'
  },
  {
    name: 'Aditya Sharma',
    role: 'Design Director',
    image: '/assets/team/team3.jpg'
  },
  {
    name: 'Neha Verma',
    role: 'Interior Designer',
    image: '/assets/team/team4.jpg'
  },
  {
    name: 'Rahul Sen',
    role: 'Project Architect',
    image: '/assets/team/team5.jpg'
  },
  {
    name: 'Ananya Rao',
    role: '3D Visualization Artist',
    image: '/assets/team/team6.jpg'
  }
];

export const projects = [
  {
    id: 'azure-residence',
    title: 'Azure Residence',
    tagline: 'A concrete pavilion defined by water, light, and natural landscape.',
    location: 'Bengaluru, India',
    category: 'Residential',
    year: '2025',
    client: 'The Somany Family',
    area: '4,500 sq ft',
    status: 'Completed',
    description: 'Azure Residence is a contemporary sanctuary designed to frame natural landscape and elements. Structured as a concrete pavilion, the home is organized around a private central courtyard and a reflective lap pool. A minimalist material selection of exposed board-formed concrete, locally sourced teak, and expansive structural glazing provides a highly texturized, natural background that is continuously animated by light and shadow.',
    heroImage: '/assets/projects/azure_hero.jpg',
    galleryImages: [
      { url: '/assets/projects/azure_ext.jpg', caption: 'Concrete pavilion and reflective lap pool at dusk.' },
      { url: '/assets/projects/azure_int.jpg', caption: 'Double-height living space with local teak and raw concrete.' },
      { url: '/assets/projects/azure_detail.jpg', caption: 'Tactile detailing showing board-formed concrete texture and shadow lines.' }
    ],
    comparison: {
      beforeImage: '/assets/projects/construction_before.jpg',
      afterImage: '/assets/projects/construction_after.jpg',
      beforeAlt: 'Azure Residence during active construction',
      afterAlt: 'Azure Residence completed living volume',
      caption: 'Slide to compare the active structural construction phase with the completed living space.'
    },
    drawings: [
      { name: 'Ground Floor Plan', url: '/assets/projects/azure_drawing_floor.jpg' },
      { name: 'Building Elevation', url: '/assets/projects/azure_drawing_elevation.jpg' }
    ],
    renders: [
      { name: 'Volumetric Massing Model', url: '/assets/projects/azure_render_massing.jpg' },
      { name: 'Reflective Pool Concept Render', url: '/assets/projects/azure_render_pool.jpg' }
    ],
    story: [
      {
        heading: 'The Idea',
        text: 'The core concept behind Azure Residence was to create a dwelling that lives in synergy with the local climate and native vegetation of Bengaluru. Instead of creating a sealed, air-conditioned box, we opened up the volumes to allow fresh breeze, water reflections, and natural shade to drive the interior thermal comfort.',
        image: '/assets/projects/azure_story_idea.jpg'
      },
      {
        heading: 'Material & Form',
        text: 'Formally, the house is composed of stacked structural concrete boxes projecting over a lightweight steel and glass base. Board-formed concrete was selected for its raw honesty and thermal properties. We left the concrete surfaces untouched, showcasing the grain of the wooden shuttering panels, which contrast elegantly with refined glass panels.',
        image: '/assets/projects/azure_story_material.jpg'
      },
      {
        heading: 'Light & Space',
        text: 'Light is treated as a core building block. Large structural roof cutouts draw north light deep into the internal volumes. Large glass facades are protected by deep structural concrete cantilevers, protecting internal rooms from direct solar heat gain while maintaining seamless sightlines to the courtyard.',
        image: '/assets/projects/azure_story_light.jpg'
      }
    ]
  },
  {
    id: 'blue-tower',
    title: 'The Blue Tower',
    tagline: 'A landmark commercial facade that redefines workplace sustainability.',
    location: 'Mumbai, India',
    category: 'Commercial',
    year: '2024',
    client: 'Zenith Development Group',
    area: '120,000 sq ft',
    status: 'Completed',
    description: 'The Blue Tower is a premium, contemporary commercial building that balances dense floor plates with employee wellness and green architectural features. The tower stands out in the skyline with its custom double-skin facade lined with royal blue ceramic louvers. These louvers are aerodynamically positioned to optimize natural breeze capture and light deflection, reducing solar heat loads while keeping offices naturally illuminated.',
    heroImage: '/assets/projects/blue_tower_hero.jpg',
    galleryImages: [
      { url: '/assets/projects/blue_tower_ext.jpg', caption: 'Exterior view of the custom royal blue solar louvers.' },
      { url: '/assets/projects/blue_tower_int.jpg', caption: 'Lobby double-height volume featuring micro-cement and blue glass accents.' }
    ],
    drawings: [
      { name: 'Core Building Section', url: '/assets/projects/blue_tower_drawing_section.jpg' }
    ],
    renders: [
      { name: 'Sky-Garden Concept Render', url: '/assets/projects/blue_tower_render_rooftop.jpg' }
    ],
    story: [
      {
        heading: 'The Idea',
        text: 'In dense metropolis areas like Mumbai, workspaces are often cut off from light and air. The Blue Tower seeks to change this by incorporating vertical sky gardens and multi-story structural cutouts that allow tenants to access fresh air and green environments on every floor.',
        image: '/assets/projects/blue_tower_story_idea.jpg'
      },
      {
        heading: 'Material & Form',
        text: 'Constructed with a post-tensioned concrete structural frame, the building is wrapped in high-performance glass. The exterior skin features customized extruded terracotta fins finished in a vibrant royal blue glaze, acting as a functional solar shading system that also serves as a bold architectural identity.',
        image: '/assets/projects/blue_tower_story_material.jpg'
      }
    ]
  },
  {
    id: 'courtyard-house',
    title: 'Courtyard House',
    tagline: 'Reinterpreting traditional Indian courtyard living for a contemporary family.',
    location: 'Hyderabad, India',
    category: 'Residential',
    year: '2024',
    client: 'Dr. Srinivas Reddy',
    area: '5,200 sq ft',
    status: 'Completed',
    description: 'Courtyard House reinterprets classic architectural principles of traditional Indian houses. Designed for a multigenerational family, the rooms are organized around a double-height, open-air central courtyard. Handmade brick screen lattices (jaalis) wrap around the building envelopes, allowing air to circulate freely while creating dynamic patterns of light and privacy internally.',
    heroImage: '/assets/projects/courtyard_house_hero.jpg',
    galleryImages: [
      { url: '/assets/projects/courtyard_house_ext.jpg', caption: 'Contemporary hand-cast brick screens facade.' },
      { url: '/assets/projects/courtyard_house_int.jpg', caption: 'Open courtyard lounge featuring polished concrete and granite columns.' }
    ],
    drawings: [
      { name: 'Site Layout & Ground Plan', url: '/assets/projects/courtyard_house_drawing_site.jpg' }
    ],
    renders: [
      { name: 'Courtyard Perspective Render', url: '/assets/projects/courtyard_house_render_courtyard.jpg' }
    ],
    story: [
      {
        heading: 'The Idea',
        text: 'The traditional Indian courtyard has always served as the climatic core of a home. For this site in Hyderabad, we used the central volume to establish stack-ventilation, where warm air naturally rises and exits through the skylight roof, drawing in cool air through shaded brick screen facades.',
        image: '/assets/projects/courtyard_house_story_idea.jpg'
      },
      {
        heading: 'Light & Space',
        text: 'Spaces are structured with high ceilings and polished grey IPS concrete floors. During hot summer months, the screens soften direct light, throwing graphic patterns of dots and grids on the cool floors and white walls, creating a tranquil atmosphere.',
        image: '/assets/projects/courtyard_house_story_light.jpg'
      }
    ]
  },
  {
    id: 'urban-studio',
    title: 'Urban Studio',
    tagline: 'A creative industrial workspace highlighting historic textures and light.',
    location: 'Delhi, India',
    category: 'Interior',
    year: '2023',
    client: 'Studio 11 Design Group',
    area: '2,800 sq ft',
    status: 'Completed',
    description: 'Urban Studio is a renovation of an industrial warehouse, converted into a collaborative architectural workspace. The project celebrates the raw texture of the original brick vaults and iron trusses, adding contemporary insertions such as royal blue steel beams, linear LED profiles, glass conference rooms, and custom-cast micro-concrete desks.',
    heroImage: '/assets/projects/urban_studio_hero.jpg',
    galleryImages: [
      { url: '/assets/projects/urban_studio_ext.jpg', caption: 'Main open collaborative studio floor.' },
      { url: '/assets/projects/urban_studio_int.jpg', caption: 'Private meeting capsules finished in acoustic wood felt.' }
    ],
    drawings: [
      { name: 'Studio Layout & Desk Plan', url: '/assets/projects/urban_studio_drawing_layout.jpg' }
    ],
    renders: [
      { name: 'Isometric Layout Concept Model', url: '/assets/projects/urban_studio_render_isometric.jpg' }
    ],
    story: [
      {
        heading: 'The Idea',
        text: 'In converting this industrial warehouse, we wanted to avoid the generic sterile office aesthetic. The goal was to leave the historic narrative of the site visible, letting the industrial brick vaults and steel columns form a raw dialogue with clean, contemporary functional details.',
        image: '/assets/projects/urban_studio_story_idea.jpg'
      },
      {
        heading: 'Material & Form',
        text: 'We introduced custom structural reinforcements finished in our studio color—vibrant royal blue. This serves to stabilize the old roof trusses while bringing a sharp modern contrast that ties the visual layout of the workspace together.',
        image: '/assets/projects/urban_studio_story_material.jpg'
      }
    ]
  }
];

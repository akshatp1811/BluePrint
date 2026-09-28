/* ==========================================================================
   BLUE PRINT - Centralized Content Data
   ========================================================================== */

export const studioInfo = {
  name: 'blueprint design studio',
  tagline: 'an architecture and interiors studio in civil lines, working from first sketch to final handover',
  headline: 'spaces drawn with intention, built with precision',
  locationLabel: 'ARCHITECTURE AND INTERIORS, PRAYAGRAJ',
  subLocation: 'civil lines, prayagraj',
  contact: {
    address: 'Civil Lines, Prayagraj, Uttar Pradesh, India',
    phone: '+91 98765 43210',
    email: 'hello@blueprintstudio.in',
    hours: 'Monday – Saturday, 10:00 AM – 7:00 PM'
  },
  socials: [
    { name: 'Instagram', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Pinterest', url: '#' }
  ],
  quote: {
    text: '"the team understood exactly what we wanted before we could even explain it fully"',
    author: 'client, tiwari residence'
  },
  aboutStory: {
    heading: 'precision in every line.',
    shortIntro: 'Blueprint Design Studio is an architecture and interiors practice based in Civil Lines, Prayagraj. We focus on restrained, context-aware spaces that unite structural clarity with tactile warmth.',
    paragraphs: [
      'We believe architecture should be quiet, functional, and deeply intentional. Operating from Civil Lines, Prayagraj, our studio handles projects from the first conceptual sketch through detailing, structural engineering, and final turnkey handover.',
      'Our practice balances spatial clarity with crafted materials—ensuring every built space serves both functional requirements and quiet elegance.'
    ]
  }
};

export const services = [
  {
    num: '01',
    title: 'architecture',
    desc: 'structural and spatial design for new builds and renovations'
  },
  {
    num: '02',
    title: 'interiors',
    desc: 'full-scope interior fit-outs, residential and commercial'
  },
  {
    num: '03',
    title: 'design to build',
    desc: 'in step with cnc construction for seamless execution'
  }
];

export const processSteps = [
  {
    num: '01',
    title: 'consultation',
    desc: 'brief definition, spatial review, and budget feasibility'
  },
  {
    num: '02',
    title: 'design and planning',
    desc: 'architectural drawings, material palettes, and 3D volumes'
  },
  {
    num: '03',
    title: 'execution',
    desc: 'on-site coordination, precision joinery, and structural builds'
  },
  {
    num: '04',
    title: 'handover',
    desc: 'final finishing inspections, commissioning, and client walk-through'
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
    id: 'nikhil-yadav-residence',
    title: 'nikhil yadav residence',
    tagline: 'minimalist bespoke residential interior in civil lines.',
    location: 'prayagraj',
    category: 'interiors',
    year: '2024',
    client: 'Nikhil Yadav',
    area: '3,800 sq ft',
    status: 'Completed',
    description: 'A full-scope residential interior in Prayagraj designed around warm natural textures, balanced day lighting, and custom joinery. Minimalist lines and bespoke teak woodwork create a calm, uncluttered domestic sanctuary.',
    heroImage: '/assets/projects/azure_int.jpg',
    galleryImages: [
      { url: '/assets/projects/azure_int.jpg', caption: 'Living area with bespoke timber paneling and natural illumination.' },
      { url: '/assets/projects/azure_detail.jpg', caption: 'Architectural joinery and tactile materials.' },
      { url: '/assets/projects/construction_after.jpg', caption: 'Completed living volume.' }
    ],
    drawings: [
      { name: 'Interior Spatial Plan', url: '/assets/projects/azure_drawing_floor.jpg' }
    ],
    renders: [
      { name: 'Concept 3D Render', url: '/assets/projects/azure_render_massing.jpg' }
    ],
    story: [
      {
        heading: 'The Brief',
        text: 'The clients wanted a serene, unpretentious living environment with ample breathing space and concealed storage to eliminate daily clutter.',
        image: '/assets/projects/azure_story_idea.jpg'
      }
    ]
  },
  {
    id: 'tiwari-residence',
    title: 'tiwari residence',
    tagline: 'refined spatial renovation celebrating soft daylight and natural stone.',
    location: 'prayagraj',
    category: 'interiors',
    year: '2024',
    client: 'The Tiwari Family',
    area: '4,200 sq ft',
    status: 'Completed',
    description: 'A comprehensive interior fit-out balancing contemporary clarity with domestic warmth. Custom brass details, micro-cement finishes, and muted tones bring understated sophistication to every room.',
    heroImage: '/assets/projects/construction_after.jpg',
    galleryImages: [
      { url: '/assets/projects/construction_after.jpg', caption: 'Main lounge featuring bespoke furniture and curated art.' },
      { url: '/assets/projects/courtyard_house_int.jpg', caption: 'Courtyard dining space with granite columns.' },
      { url: '/assets/projects/azure_detail.jpg', caption: 'Detailing of custom cabinetry.' }
    ],
    drawings: [
      { name: 'Floor Layout Plan', url: '/assets/projects/courtyard_house_drawing_site.jpg' }
    ],
    renders: [
      { name: 'Dining Volume Render', url: '/assets/projects/courtyard_house_render_courtyard.jpg' }
    ],
    story: [
      {
        heading: 'Material Palette',
        text: 'Muted limestone flooring pairs with white oak and fluted glass partitions, softening direct sunlight while maintaining privacy across living zones.',
        image: '/assets/projects/courtyard_house_story_idea.jpg'
      }
    ]
  },
  {
    id: 'lawyers-office-fit-out',
    title: "lawyer's office fit-out",
    tagline: 'precise legal chambers combining acoustic privacy with architectural dignity.',
    location: 'prayagraj',
    category: 'commercial',
    year: '2023',
    client: 'Senior Advocate Chamber',
    area: '2,600 sq ft',
    status: 'Completed',
    description: 'An executive office interior designed for a prominent legal practice in Prayagraj. Emphasizing acoustic privacy, rich walnut paneling, and architectural lighting, the workspace provides an atmosphere of quiet authority.',
    heroImage: '/assets/projects/urban_studio_hero.jpg',
    galleryImages: [
      { url: '/assets/projects/urban_studio_hero.jpg', caption: 'Principal consultation chamber with acoustic shelving.' },
      { url: '/assets/projects/urban_studio_int.jpg', caption: 'Associate discussion alcoves and library.' },
      { url: '/assets/projects/blue_tower_int.jpg', caption: 'Reception gallery and entrance portal.' }
    ],
    drawings: [
      { name: 'Office Layout & Section', url: '/assets/projects/urban_studio_drawing_layout.jpg' }
    ],
    renders: [
      { name: 'Chamber 3D Massing', url: '/assets/projects/urban_studio_render_isometric.jpg' }
    ],
    story: [
      {
        heading: 'Spatial Organisation',
        text: 'The plan separates client consultation zones from dense law library archives through acoustic double-glazed walls and bespoke joinery.',
        image: '/assets/projects/urban_studio_story_idea.jpg'
      }
    ]
  },
  {
    id: 'azure-residence',
    title: 'Azure Residence',
    tagline: 'A concrete pavilion defined by water, light, and natural landscape.',
    location: 'bengaluru',
    category: 'architecture',
    year: '2025',
    client: 'The Somany Family',
    area: '4,500 sq ft',
    status: 'Completed',
    description: 'Azure Residence is a contemporary sanctuary designed to frame natural landscape and elements. Structured as a concrete pavilion, the home is organized around a private central courtyard and a reflective lap pool.',
    heroImage: '/assets/projects/azure_hero.jpg',
    galleryImages: [
      { url: '/assets/projects/azure_ext.jpg', caption: 'Concrete pavilion and reflective lap pool at dusk.' },
      { url: '/assets/projects/azure_int.jpg', caption: 'Double-height living space with local teak and raw concrete.' },
      { url: '/assets/projects/azure_detail.jpg', caption: 'Tactile detailing showing board-formed concrete texture and shadow lines.' }
    ],
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
        text: 'The core concept behind Azure Residence was to create a dwelling that lives in synergy with the local climate and native vegetation.',
        image: '/assets/projects/azure_story_idea.jpg'
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

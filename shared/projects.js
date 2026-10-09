/* Shared project data for the V2 and V3 drafts.
   Images mirror the live Framer case studies, web-sized in shared/web/ (an .mp4 entry plays as a silent loop);
   the first image is each project's hero. Only Chicago carries its full case study; the rest keep their two hero images.
   Overview text comes from Aaliyah's own presentations. */
(() => {
  const MEDIA = {
 "chicago-2036": [
  "../shared/web/chicago-2036/01-logo-animation.mp4",
  "../shared/web/chicago-2036/02.jpg",
  "../shared/web/chicago-2036/03.jpg",
  "../shared/web/chicago-2036/04.jpg",
  "../shared/web/chicago-2036/05.jpg",
  "../shared/web/chicago-2036/06.jpg",
  "../shared/web/chicago-2036/07.jpg",
  "../shared/web/chicago-2036/08.jpg",
  "../shared/web/chicago-2036/09.jpg",
  "../shared/web/chicago-2036/10.jpg",
  "../shared/web/chicago-2036/11.jpg"
 ],
 "ross-dress-for-less": [
  "../shared/web/ross-dress-for-less/01.jpg",
  "../shared/web/ross-dress-for-less/02.jpg"
 ],
 "nothing-fits": [
  "../shared/web/nothing-fits/01.jpg",
  "../shared/web/nothing-fits/02.jpg"
 ],
 "little-bird-lounge": [
  "../shared/web/little-bird-lounge/01.jpg",
  "../shared/web/little-bird-lounge/02.jpg"
 ],
 "gothic-energy": [
  "../shared/web/gothic-energy/01.jpg",
  "../shared/web/gothic-energy/02.jpg"
 ],
 "neon-euphoria": [
  "../shared/web/neon-euphoria/01.jpg",
  "../shared/web/neon-euphoria/02.jpg"
 ],
 "lets-talk-about-getting-crafty": [
  "../shared/web/lets-talk-about-getting-crafty/01.jpg",
  "../shared/web/lets-talk-about-getting-crafty/02.jpg"
 ],
 "paper-dearest": [
  "../shared/web/paper-dearest/01.jpg",
  "../shared/web/paper-dearest/02.jpg"
 ]
};
  const imgs = slug => MEDIA[slug];

  window.PROJECTS = [
    {
      slug: "chicago-2036", name: "Chicago 2036", kind: "Olympic brand identity", images: imgs("chicago-2036"),
      sections: [
        ["Brief", "Design a graphic identity program for a candidate city for the Summer 2036 Olympic Games."],
        ["Statement", "My statement of intent for this event brand identity program is to successfully compel the International Olympic Committee Review Panel to choose Chicago, IL to host the Summer 2036 Olympic Games."],
        ["Strategy", "Through research, ideation, iconography, and typographic exploration, the graphic identity for Chicago, IL is visualized. Brand identity is crucial in the Olympics, as it shapes the Games’ global image and marketability. The rings, the torch, and the branding of host cities play a significant role in promoting the event’s prestige and attracting international attention and investment."],
        ["Research", "Chicago is recognized across the United States as a passionate sports town. The identity emphasizes the city’s cultural heritage (its diversity, rich history, and vibrant arts scene), leverages its sports legacy to foster local pride, and celebrates what makes Chicago unique."],
      ],
      details: [["Year", "2024"], ["Discipline", "Brand identity, Environmental graphics"], ["Deliverables", "Logo + wordmark, Pictograms, Banners, Murals, Wayfinding, Tickets, Pins"], ["Palette", "Flame Red, Waterway Blue, Traditional Black"], ["Typefaces", "Skin & Bones (altered), New Order"]],
    },
    {
      slug: "ross-dress-for-less", name: "Ross Dress for Less", kind: "Retail rebrand", images: imgs("ross-dress-for-less"),
      sections: [
        ["Overview", "A rebrand proposal for Ross Dress for Less that builds a new visual language for the off-price retailer and puts it in action across storefronts, store interiors, fitting rooms, wayfinding, posters, shopping bags, and totes."],
        ["Visual language", "A bold Ross Blue and Dark Wash palette grounded by Eggwash, heavy condensed typography, and a system of graphic elements: R styles, halftone icons, and patterns."],
      ],
      details: [["Year", "2025"], ["Discipline", "Rebrand, Logo design"], ["Deliverables", "Logo, Storefront, Interiors, Wayfinding, Posters, Bags + totes"], ["Palette", "Ross Blue #0048FF, Dark Wash #0B1533, Eggwash #FFFCF5"], ["Typefaces", "Eurostile Condensed, Mr Eaves XL Sans, Obvia, Savvy Sans"]],
    },
    {
      slug: "nothing-fits", name: "Nothing Fits", kind: "Posters + exhibition", images: imgs("nothing-fits"),
      sections: [
        ["Brief", "Rethink. Rewrite. Re-Imagine. After a screening of JR’s film Paper and Glue, research and re-imagine the ideology of a modernist or postmodernist art movement or manifesto, then develop a typographic and visual narrative in the form of an immersive indoor/outdoor pop-up installation and event campaign identity."],
        ["Concept", "Nothing Fits is a subversive, immersive art installation that investigates the instability of identity and the human body as a site of tension, rebellion, and expression. It unfolds through photography, typography, and performance art to confront the systems that demand coherence, control, and perfection. Its design language reflects fragmentation and mutation (letters slip, images warp, alignment breaks), mirroring the body’s refusal to conform."],
        ["Influences", "Rooted in the lineage of subversive and body-centered art movements, Nothing Fits draws from Dada’s defiance of order, Surrealism’s exploration of the subconscious, and the raw immediacy of performance art. It resonates with the confrontational typographic statements of Barbara Kruger, the corporeal distortion in Jenny Saville’s paintings, and the visceral intensity of Marina Abramović’s endurance pieces."],
        ["Ideology", "Dissonance is not failure; it is expression. Typography becomes anatomy: the grid becomes a skeleton, typography becomes flesh, and the ink becomes blood. Every distortion is a scar, every misalignment a mark of life."],
      ],
      details: [["Year", "2025"], ["Discipline", "Poster design, Exhibition design"], ["Deliverables", "Poster series, Billboards, Transit shelters, Gallery installation"]],
    },
    {
      slug: "little-bird-lounge", name: "Little Bird Lounge", kind: "Hospitality identity", images: imgs("little-bird-lounge"),
      sections: [
        ["Opportunity", "LA has strong Korean nightlife and Jamaican food and music culture, but not a restrained fusion experience that unfolds over the night."],
        ["Concept", "A restrained, intimate nightlife experience where discovery unfolds over time. Little Bird Lounge uses intentional pacing and culturally rooted fusion to invite guests to feel cared for, connected, and part of something layered, playful, and luxurious."],
        ["Mission", "To create an immersive nightlife experience that honors Jamaican and Korean cultures through shared ritual, sound, and communal connection."],
        ["Brand role", "The brand acts as a host and guide, not a performer: a late-night speakeasy where culture is experienced through participation, not presentation."],
      ],
      details: [["Year", "2026"], ["Discipline", "Brand identity, Hospitality"], ["Deliverables", "Apparel, Takeout bags, Posters, Social media, Website, Spatial"], ["Location", "Los Angeles"]],
    },
    {
      slug: "gothic-energy", name: "Gothic Energy", kind: "Package design", images: imgs("gothic-energy"),
      sections: [
        ["Overview", "Package design for Gothic Energy, a line of energy drinks built around three gemstone flavors: Carnelian Curse, the fiery nature of passion; Amethyst Wraith, unlocking your inner strength; and Tiger’s Eye Elixir, enhancing mental clarity."],
        ["On the can", "Bring the power: 200 mg of natural caffeine for energy. Take control: vitamins A, B3, and B12 for focus. Stay curious: vitamins C and E with antioxidants for immunity. Dare to feel alive."],
      ],
      details: [["Year", "2024"], ["Discipline", "Package design"], ["Deliverables", "Can designs, Product imagery"], ["Flavors", "Carnelian Curse, Amethyst Wraith, Tiger’s Eye Elixir"]],
    },
    {
      slug: "neon-euphoria", name: "Neon Euphoria", kind: "Posters + type in motion", images: imgs("neon-euphoria"),
      sections: [
        ["Statement", "My statement of intent for this poster series is to design three dynamic posters that reflect the lyricism and names of three songs by the German electronic artist BUNT: Lose It All (I Don’t Wanna), Clouds, and Lost My Mind (Wake Up)."],
        ["Approach", "Through the delivery of these EDM dance songs, I use experimental type to mirror the effect of attending a rave: flashing lights, energetic, pulsating, and dynamic. Exploration started in Photoshop, distorting type with Gaussian, motion, and radial blur to imply movement, experimenting with color and gradient maps, and applying halftone, curves, and liquify."],
        ["Reflection", "Creating a poster series for an EDM festival initially started off as a challenge. I was skeptical about posters, believing they didn’t have as much creative freedom, but this project helped me develop a newfound love for the art of poster design and to continue the practice even further."],
      ],
      details: [["Year", "2024"], ["Discipline", "Poster design, Motion typography"], ["Deliverables", "Poster series, Type in motion"], ["Artist", "BUNT"], ["Palette", "Fiery, Cool, Electric"], ["Format", "22″ × 33″ posters"]],
    },
    {
      slug: "lets-talk-about-getting-crafty", name: "Let’s Talk About Getting Crafty", kind: "Typographic book", images: imgs("lets-talk-about-getting-crafty"),
      sections: [
        ["Statement", "My statement of intent for my book is to deliver a typographic experience that walks the reader through the value of being crafty. Utilizing letterforms through digital and analog tactility and other unique assets, I invoke feelings similar to flipping through a personal journal or scrapbook."],
        ["Process", "The book moved through storytelling and pagination, type and layout studies, and margin, column, and grid explorations, then into digital refinements of the chapter openers, a single-page binding technique on printmaking paper, and a final size change from 10 × 7″ to letter."],
        ["Reflection", "Crafting a typographic book taught me valuable lessons in material selection, prototyping, and print production. Choosing the right materials sets the tone, prototyping allows for refinement, and print production brings the design to life."],
      ],
      details: [["Year", "2024"], ["Discipline", "Book design, Typography"], ["Typefaces", "Cherry Blossoms, Input Serif Compressed, Lulo Outline"]],
    },
    {
      slug: "paper-dearest", name: "Paper Dearest", kind: "Stationery identity", images: imgs("paper-dearest"),
      sections: [
        ["Brief", "An independent branding project: create and develop a brand of your own, based on your own personal interests."],
        ["What is Paper Dearest?", "A stationery company all about keeping it simple, yet vibrant and endearing. Designers and students have crazy and busy lives, and our products provide an easier way to plan their schedules, events, and day to day. We aim to create stationery that makes you take a step back and appreciate the love that goes into our paper products."],
        ["Strategy", "To develop a stationery brand that offers a diverse range of functional and aesthetically pleasing products tailored specifically for college students, designers, and stationery lovers. Existing products may lack functionality, aesthetic appeal, or affordability, leading to a disconnect between what is available and what this demographic truly desires."],
      ],
      details: [["Year", "2024"], ["Discipline", "Brand identity, Stationery"], ["Tagline", "Making every piece of paper special."], ["Typefaces", "Neulis Cursive (altered), Neulis Neue"], ["Deliverables", "Stationery box, Journals, Booklets, Product photography"]],
    },
  ];
})();

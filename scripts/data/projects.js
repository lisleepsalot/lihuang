const projects =[
  // {
  //   image: "images/covers/leavingDC.png",
  //   name: "Leaving Design Center",
  //   categories: ['design','web'],
  //   identifier: null,
  // },
  {
    image: "images/covers/calvino.mp4",
    name: "6 Memos to the Next Millennium",
    categories: ['motion design','art direction'],
    brief:`
             Type compositions on Italo Calvino’s Six Memos for the Next Millennium, Chapter 6, Exactitude.`,
    credits:`Grad Type III <br>
                    RISD 2024 Fall <br>
                    Instructed by: Doug Scott`,
    identifier: 'calvino',
    year: '2024'
  },
  {
    image: "images/covers/instructional-type.jpg",
    name: "Instructional Typography",
    categories: ['editorial design'],
    brief:`        A curated collection of instructive typographic works, featuring El Lissitzky’s influential essays on typography presented as an instructional manual.`,
    credits:`        Grad Type III <br>
        RISD 2024 Fall <br>
        Instructed by: Doug Scott <br>`,
    identifier: 'instructionalTypography',
    year: '2024'
  },
  {
    image: "images/covers/debates-in-ai.jpg",
    name: "Debates in AI",
    categories: ['identity design'],
    brief:`                    Debates in AI at RISD was a symposium held on April 11–12, 2024, bringing together artists from around the world to explore the complex dimensions of artificial intelligence (AI) and its influence on creative fields. The visual identity drew inspiration from the dynamics of information processing and the fluid, ambiguous nature of AI-generated visuals.`,
    credits:`Client: RISD <br> With Hannah Jeong and Maggie Meitong Xian`,
    identifier: 'debatesInAI',
    year: '2024'
  },
  {
    image: "images/covers/risd-museum.mp4",
    name: "RISD Museum",
    categories: ['identity design'],
    brief:`                    A visionary rebranding project for the RISD Museum, featuring a dynamic logo and color system inspired by the museum’s architecture. The new identity reflects its structural forms, textures, and spatial experience, creating a visual language that captures the look and feel of the physical space.`,
    credits:`                    Design Studio IV <br>
                    RISD 2024 Spring <br>
                    Instructed by: Hammett Nurosi <br>`,
    identifier: 'risdMuseum',
    year: '2024'
  },
  {
    image: "images/covers/yearbook2024.jpg",
    name: "RISD Yearbook 2024",
    categories: ['editorial design', 'art direction'],
    brief:`This yearbook takes the viewer away from their common beginnings at RISD into an imagined future where each graduating student is famous. Where and who will they be by 2034? Each year, the graduating class' yearbook is student-designed by the Design Guild.`,
    credits:`       Client: RISD <br>
                    with RISD <a class="removeA hover-yellow" href="https://www.risdguild.com/" target="_blank">RISD Design Guild</a><br>
                    Year: 2024`,
    identifier: 'yearbook2024',
    year: '2024'
  },
  {
    image: "images/covers/struve-geodetic-arc.mp4",
    name: "Struve Geodetic Arc",
    categories: ['identity design','motion design', 'editorial design'],
    brief:`        A visionary branding project for the Struve Geodetic Arc, a UNESCO World Heritage site where scientists measured the size of the Earth using mathematics and precise measurements. The brand identity explores themes of distance, geometry, the Earth, and mathematical precision.`,
    credits:`          Grad Type III <br>
          RISD 2024 Fall <br>
          Instructed by: Doug Scott <br>`,
    identifier: 'struveGeodeticArc',
    year: '2024'
  },

  {
    image: "images/covers/heap.mp4",
    name: "Heap Mono",
    categories: ['type design'],
    brief:`                    The follow-up to the poster series "To Cook ___ In Here," this book guides you in locating all essential items for cooking, whether edible or non-edible, within and beyond the kitchen. <br>
                    (This website is using it.)`,
    credits:`                    RISD 2024 Spring <br>
                    Instructed by: Cyrus Highsmith`,
    identifier: 'heapMono',
    year: '2025'
  },
  {
    image: "images/covers/cleanWipes.jpg",
    name: "Clean Wipes",
    categories: ['editorial design'],
    brief:`                    “This world needs more pee pee poo poo.” Clean Wipes is a project dedicated to make the ultimate 'go-to toilet read.' It embraces the charm of the “bad” cultures we love. The first volume is a dive into bad movies and the cinematic guilty pleasures, presenting both a physical book and a corresponding web version.`,
    credits:`                    Typography III <br>
                    RISD 2023 Fall <br>
                    Instructed by: Min Hee Lee <br>`,
    identifier: 'cleanWipes',
    year: '2023'
  },
  {
    image: "images/covers/mrJones.jpg",
    name: "The Unforseeable Fate of Mr.Jones",
    categories: ['editorial design'],
    brief:`                    Inspired by the song of the same name by Foster the People, 'The Unforeseeable Fate of Mr. Jones' is a two-part project that explores the concept of self-reflection through the lens of standardized tests. It includes the creation of both a book and a website. (Turn onthe audio please)`,
    credits:`                    Typography III <br>
                    RISD 2023 Fall <br>
                    Instructed by: Min Hee Lee <br><br>`,
    identifier: 'mrJones',
    year: '2023'
  },
  {
    image: "images/covers/cloudHopper.jpg",
    name: "CloudHopper",
    categories: ['identity design'],
    brief:`                    CloudHopper proposes a visual identity for the RISD Artist Ball 2023, inspired by the theme "Head in the Cloud."`,
    credits:`                    Client: RISD <br>
                    Year: 2023`,
    identifier: 'cloudHopper',
    year: '2023'
  },
  {
    image: "images/covers/anatomy-of-fascism.jpg",
    name: "Anatomy of Fascism",
    categories: ['editorial design'],
    brief:`This book project merges the writings of Robert O. Paxton's "The Anatomy of Fascism" and Adolf Loos' "Ornament and Crime" using both sans-serif and black-letter typefaces. This project deliberately explores the brutality of modernism beyond design boundaries.`,
    credits:`Typography 3 <br>
              RISD 2023 Spring <br>
              Instructed by: Anastasiia Raina`,
    identifier: 'anatomyOfFascism',
    year: '2023'
  },
  {
    image: "images/covers/toCookInHere.jpg",
    name: "To Cook ___ in Here",
    categories: ['poster design'],
    brief:`                    A poster series aims to explore how a particular food culture thrives in a foreign physical environment, ranging from the micro to the macro level. Stay tuned for the subsequent subproject "To Cook with an Open Kitchen".`,
    credits:`                    Design Studio 3 <br>
                    RISD 2023 Fall <br>
                    Instructed by: Renee Payne`,
    identifier: 'toCookInHere',
    year: '2023'
  },
  {
    image: "images/covers/atlas-swing.jpg",
    name: "Atlas Swing",
    categories: ['game design','art direction'],
    brief:`As a submission to the 2023 Geopipe NYC game jam, Atlas Swings is a golf game crafted utilizing Geopipe's provided model of New York City. The game secured first place in the game jam. In my role as the artist and graphic designer on the team, I collaborated with my colleagues to conduct research and delve into art styles and game flow. More specifically, I was responsible for designing and creating 3D models, 2D UI elements, and particle effects for various assets.<br> Cover Art & Animation by
                    <a class="credit-link" href="https://adamying.myportfolio.com/" target="_blank">Adam Ying</a><br>
                    Cover Illustration by <a class="credit-link" href="https://nicolezhu.com//" target="_blank">Nicole Zhu</a><br>`,
    credits:`2023 Geopipe NYC game jam`,
    identifier: 'atlasSwing',
    year: '2023'
  },
  {
    image: "images/covers/meowfia.mp4",
    name: "Meowfia",
    categories: ['game design'],
    brief:`                    Meowfia is a 2D pixel art game built with Unity. In a two-player game of cat and house, one attempts to escape the devious traps of the humans, the other stops them. I was responsible for creating the background art and designing the characters.
                    Play the game <a class="credit-link" href="https://brownrisdgames.itch.io/meowfia" target="_blank">here</a>!
                    Cover art by <a class="credit-link" href="https://cindylithium.com/" target="_blank">Cindy Li</a>.`,
    credits:`                    With <a class="credit-link" href="https://brownrisdgames.itch.io/meowfia" target="_blank">BRDG</a>
                    2022`,
    identifier: 'meowfia',
    year: '2022'
  },
  {
    image: "images/covers/hospital-navigation.jpg",
    name: "Hospital Navigation",
    categories: ['web design'],
    brief:``,
    credits:``,
    identifier: 'hospitalNavigation',
    year: '2023'
  },
  // {
  //   image: "images/covers-gif/kirakira.png",
  //   name: "KiraKira",
  //   categories: ['design'],
  //   identifier: 'kirakira',
  // },
]
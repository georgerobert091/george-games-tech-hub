// PRODUCT CATALOGUE — add new products by copying one object and changing its fields.
// Image links are remote cover-art URLs. For more reliable hosting, you can later add images
// to an images/ folder in this repository and change each image field to "images/your-file.jpg".
const PRODUCTS = [
  {
    id: "naruto-storm-4",
    name: "Naruto Shippuden: Ultimate Ninja Storm 4",
    category: "games", genre: "Action", icon: "⚔", tag: "ACTION · ANIME",
    price: "₦7,000",
    description: "Fast-paced anime fighting featuring Naruto, Sasuke and the climactic Shippuden story. Ask us to confirm edition and PC compatibility.",
    platforms: "PC · PlayStation · Xbox · Switch",
    image: "https://cdn11.bigcommerce.com/s-xs1cevxe43/products/2400/images/9436/naruto-shippuden-ultimate-ninja-storm-4_blank__76944.1638494772.386.513.jpg?c=2",
    imageAlt: "Naruto Shippuden Ultimate Ninja Storm 4 game cover"
  },
  {
    id: "naruto-connections",
    name: "Naruto x Boruto: Ultimate Ninja Storm Connections",
    category: "games", genre: "Action", icon: "⚔", tag: "ACTION · ANIME",
    price: "₦10,000",
    description: "Anime arena fighting with a large roster of ninjas, a condensed Naruto story and an original Boruto story.",
    platforms: "PC · PlayStation · Xbox · Switch",
    image: "https://image.jeuxvideo.com/medias/169659/1696593154-2537-jaquette-avant.jpg",
    imageAlt: "Naruto x Boruto Ultimate Ninja Storm Connections game cover"
  },
  {
    id: "fifa-football",
    name: "FIFA / EA SPORTS FC Football Games",
    category: "games", genre: "Sports", icon: "⚽", tag: "SPORTS · FOOTBALL",
    price: "₦3,500–₦10,000",
    description: "Football games across different editions and years. Tell us which version you want so we can confirm the exact price and PC requirements.",
    platforms: "PC · PlayStation · Xbox (varies by edition)",
    image: "https://s2-ge.glbimg.com/_73txZragNnTw2A6s4COMgybVOg%3D/600x0/filters%3Aquality%2870%29/https%3A/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2023/Z/V/BA0551QUqnAA6RguQ97w/ea-sports-fc-24-capa.png",
    imageAlt: "EA Sports FC football game cover"
  },
  {
    id: "pes-football",
    name: "PES / Pro Evolution Soccer",
    category: "games", genre: "Sports", icon: "⚽", tag: "SPORTS · FOOTBALL",
    price: "₦3,000–₦10,000",
    description: "Classic Pro Evolution Soccer football titles from different years. Ask for the available edition, included updates and system requirements.",
    platforms: "PC · PlayStation · Xbox (varies by edition)",
    image: "https://www.gamerclick.it/immagini/videogame/Pro_Evolution_Soccer_2018/cover/Pro_Evolution_Soccer_2018-cover.jpg",
    imageAlt: "Pro Evolution Soccer 2018 game cover"
  },
  {
    id: "black-myth-wukong",
    name: "Black Myth: Wukong",
    category: "games", genre: "Action", icon: "⚔", tag: "ACTION · RPG",
    price: "₦15,000",
    description: "A myth-inspired action RPG following the Destined One through challenging battles and a world inspired by Journey to the West. Check your PC specs before ordering.",
    platforms: "PC · PlayStation 5",
    image: "https://shared.steamstatic.com/store_item_assets/steam/apps/2358720/library_600x900_2x.jpg",
    imageAlt: "Black Myth Wukong game artwork"
  },
  {
    id: "god-of-war-ragnarok",
    name: "God of War Ragnarök",
    category: "games", genre: "Action", icon: "⚔", tag: "ACTION · ADVENTURE",
    price: "₦15,000",
    description: "Cinematic action-adventure following Kratos and Atreus through the Norse realms. Confirm your PC hardware meets the game's requirements before purchase.",
    platforms: "PC · PlayStation 4/5",
    image: "https://shared.steamstatic.com/store_item_assets/steam/apps/2322010/library_600x900.jpg",
    imageAlt: "God of War Ragnarok game artwork"
  },
  {
    id: "need-for-speed",
    name: "Need for Speed (selected editions)",
    category: "games", genre: "Racing", icon: "🏁", tag: "RACING · DRIVING",
    price: "₦3,500–₦10,000",
    description: "Street racing and driving games across selected Need for Speed editions. Tell us the title or year you prefer for an exact quote.",
    platforms: "PC · PlayStation · Xbox (varies by edition)",
    image: "https://shared.steamstatic.com/store_item_assets/steam/apps/1222680/library_600x900.jpg",
    imageAlt: "Need for Speed Heat game artwork"
  },
  {
    id: "split-second",
    name: "Split/Second",
    category: "games", genre: "Racing", icon: "🏁", tag: "RACING · ARCADE",
    price: "₦3,500",
    description: "Arcade racing where drivers trigger track hazards and explosive set pieces to gain an advantage. Ask about the PC edition and compatibility.",
    platforms: "PC · PlayStation 3 · Xbox 360",
    image: "https://down-my.img.susercontent.com/file/c9c5bea40bb9b312bf621aa2c70da005",
    imageAlt: "Split Second racing game cover"
  },
  {id:"gaming-accessories",name:"Gaming Accessories",category:"tech",genre:"Tech",icon:"🎮",tag:"TECH GEAR",price:"Ask for price",description:"Controllers, gaming mice, keyboards, headsets and other accessories. Ask about compatibility with your device.",platforms:"PC · Console (varies)",image:"Tech.png",imageAlt:"Tech.png"},
  {id:"storage-upgrades",name:"Storage & PC Upgrades",category:"tech",genre:"Tech",icon:"▤",tag:"TECH GEAR",price:"Ask for price",description:"Ask about SSDs, RAM and upgrades compatible with your computer model.",platforms:"PC · Laptop",image:"file_000000009dac821192a4ebccbc3b853f.png",imageAlt:"file_000000009dac821192a4ebccbc3b853f.png"},
  {id:"productivity-software",name:"Productivity Software",category:"software",genre:"Software",icon:"▦",tag:"SOFTWARE",price:"Ask for price",description:"Ask about legitimate office, PDF and productivity software with the right licence for your needs.",platforms:"Windows · macOS (varies)",image:"file_00000000aaa881f49ca9a8aec827a980.png",imageAlt:"file_00000000aaa881f49ca9a8aec827a980.png"},
  {id:"official-drivers",name:"Official Drivers & Setup Help",category:"drivers",genre:"Drivers",icon:"⚙",tag:"DRIVERS",price:"Ask for price",description:"Get help identifying official graphics, Wi-Fi, Bluetooth, audio and chipset drivers for your exact PC model.",platforms:"Windows · Device-specific",image:"",imageAlt:""}
];

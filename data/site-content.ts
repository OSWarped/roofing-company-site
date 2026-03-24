type ServiceItem = {
  title: string;
  description: string;
  href: string;
};

type ValueItem = {
  title: string;
  description: string;
};

type GalleryCard = {
  label: string;
  title: string;
  description: string;
};

type ReviewItem = {
  name: string;
  text: string;
};

type ProjectItem = {
  location: string;
  title: string;
  description: string;
};

type SiteContent = {
  companyName: string;
  shortName: string;
  phone: string;
  phoneHref: string;
  email: string;
  licenseNumber: string;
  serviceArea: string;
  serviceAreaDescription: string;
  cities: string[];
  serviceAreaDetail: string;
  serviceCities: string[];
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    supportingPoints: string[];
  };
  trustItems: string[];
  services: ServiceItem[];
  whyChooseUs: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  about: {
    intro: string;
    story: string;
    values: ValueItem[];
  };
  contact: {
    responseNote: string;
    estimateChecklist: string[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    cards: GalleryCard[];
  };
  galleryProjects: ProjectItem[];
  reviews: ReviewItem[];
  reviewsPlaceholder: {
    title: string;
    text: string;
  };
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
  };
};

const serviceCities = [
  "Biloxi",
  "Gulfport",
  "Ocean Springs",
  "Pascagoula",
  "Long Beach",
  "Bay St. Louis",
  "D'Iberville",
  "Pass Christian",
];

const services: ServiceItem[] = [
  {
    title: "Roof Repair",
    description:
      "Leak detection, storm-related repairs, and targeted roofing work to help stop damage from spreading and protect the property.",
    href: "/services",
  },
  {
    title: "Roof Replacement",
    description:
      "Full roof replacement for aging or heavily damaged roofing systems with straightforward recommendations and clean project execution.",
    href: "/services",
  },
  {
    title: "Storm Damage Roofing",
    description:
      "Responsive help after wind and storm events, including visible damage assessments and guidance on the next best step.",
    href: "/services",
  },
  {
    title: "Roof Inspections",
    description:
      "Roof condition reviews for homeowners and property owners who need a clearer understanding of current issues and overall roof health.",
    href: "/services",
  },
  {
    title: "Metal Roofing",
    description:
      "Metal roofing solutions for property owners looking for durability, longevity, and a clean finished appearance.",
    href: "/services",
  },
  {
    title: "Commercial Roofing",
    description:
      "Roofing support for commercial properties that need dependable communication, practical recommendations, and professional execution.",
    href: "/services",
  },
];

export const siteContent: SiteContent = {
  companyName: "Integrity Roofing of Mississippi",
  shortName: "Integrity Roofing of Mississippi",
  phone: "(228) 697-1315",
  phoneHref: "2286971315",
  email: "integrityroofs29@gmail.com",
  licenseNumber: "MSBOC No. R22836",
  serviceArea: "Serving the Mississippi Gulf Coast",
  serviceAreaDescription:
    "Serving Biloxi, Gulfport, Ocean Springs, Pascagoula, Long Beach, Bay St. Louis, D'Iberville, Pass Christian, and nearby Mississippi Gulf Coast communities.",
  cities: serviceCities,
  serviceAreaDetail:
    "Integrity Roofing of Mississippi serves homeowners and property owners across the Mississippi Gulf Coast with a focus on clear communication, honest recommendations, and dependable roofing work. The site should consistently reinforce the communities the company wants to be known for most throughout the region.",
  serviceCities,

  hero: {
    eyebrow: "Mississippi Gulf Coast Roofing",
    headline: "Integrity Roofing of Mississippi",
    subheadline:
      "Licensed and insured roofing contractor serving the Mississippi Gulf Coast with roof repair, roof replacement, storm damage support, and straightforward guidance from first call to final cleanup.",
    primaryCta: "Request Free Estimate",
    secondaryCta: "Call Now",
    supportingPoints: [
      "Licensed & Insured",
      "Residential & Commercial",
      "Mississippi Gulf Coast Service",
    ],
  },

  trustItems: [
    "Licensed & Insured",
    "MSBOC No. R22836",
    "Mississippi Gulf Coast",
    "Free Estimates",
    "Residential & Commercial",
  ],

  services,

  whyChooseUs: {
    eyebrow: "Why Homeowners Choose Us",
    title: "A Mississippi roofing name with a Gulf Coast focus",
    description:
      "Integrity Roofing of Mississippi is positioned to serve the Gulf Coast with the kind of communication, professionalism, and follow-through homeowners want when roofing problems need real attention.",
    items: [
      "Clear, honest estimates without unnecessary pressure",
      "Responsive communication from first contact to finished work",
      "Licensed and insured roofing support for Gulf Coast properties",
      "Residential and commercial service tailored to the property",
    ],
  },

  about: {
    intro:
      "Integrity Roofing of Mississippi is a licensed and insured roofing company serving the Mississippi Gulf Coast.",
    story:
      "Built around the full Integrity Roofing of Mississippi name, the company is focused on giving Gulf Coast homeowners and property owners a clear, trustworthy roofing option they can recognize online and feel confident contacting. The brand matters, because the goal is not just to be another roofing company on the coast. The goal is to become the Mississippi roofing name people remember when they need repair, replacement, storm damage help, or a straightforward estimate.",
    values: [
      {
        title: "Integrity",
        description:
          "The company name should mean something in practice: honest recommendations, clear expectations, and work approached with professionalism.",
      },
      {
        title: "Communication",
        description:
          "Roofing projects are easier for customers when updates are clear, questions are answered, and the next step is explained simply.",
      },
      {
        title: "Local Focus",
        description:
          "Serving the Mississippi Gulf Coast means understanding the market, the weather exposure, and the importance of strong local reputation.",
      },
    ],
  },

  contact: {
    responseNote:
      "Reach out to Integrity Roofing of Mississippi for roof repair, roof replacement, storm damage questions, and estimate requests across the Mississippi Gulf Coast.",
    estimateChecklist: [
      "Your name and the best phone number to reach you",
      "The city where the property is located",
      "Whether the issue is repair, replacement, storm damage, or inspection related",
      "A short description of what is going on with the roof",
      "Any timing concerns, such as active leaks or urgent storm damage",
    ],
  },

  gallery: {
    eyebrow: "Featured Work",
    title: "Roofing services homeowners and property owners are searching for now",
    description:
      "This section can eventually highlight real projects, before-and-after photos, and city-specific work examples that strengthen trust and reinforce the full Integrity Roofing of Mississippi brand.",
    cards: [
      {
        label: "Roof Replacement",
        title: "Full roofing projects that build long-term confidence",
        description:
          "Use this space to feature complete roof replacement work with strong finished photos and short summaries that show the scope of the job.",
      },
      {
        label: "Storm Damage",
        title: "Responsive help when weather creates urgent roofing issues",
        description:
          "Showcase projects that demonstrate quick response, clear communication, and practical next-step guidance after storms.",
      },
      {
        label: "Metal Roofing",
        title: "Clean finished work that supports a stronger visual brand",
        description:
          "Highlight metal roofing and other finished projects that photograph well and help build a stronger online footprint for the company.",
      },
    ],
  },

  galleryProjects: [
    {
      location: "Mississippi Gulf Coast",
      title: "Residential roof replacement project placeholder",
      description:
        "Use this slot for a real residential roof replacement with a short summary, city name, roof type, and one or two sentences about the result.",
    },
    {
      location: "Mississippi Gulf Coast",
      title: "Storm-related repair project placeholder",
      description:
        "Use this slot for a repair project that shows how Integrity Roofing of Mississippi responded to visible storm damage or active roof issues.",
    },
    {
      location: "Mississippi Gulf Coast",
      title: "Metal roofing project placeholder",
      description:
        "Use this slot for a finished metal roofing project with clean visuals and a concise explanation of the property and scope of work.",
    },
    {
      location: "Mississippi Gulf Coast",
      title: "Commercial roofing project placeholder",
      description:
        "Use this slot for a commercial roofing example that supports broader capability messaging and helps round out the gallery.",
    },
  ],

  reviews: [
    {
      name: "Verified review placeholder",
      text:
        "Replace this with a real customer review that mentions the full business name and, when natural, the city where the work was completed.",
    },
    {
      name: "Google review placeholder",
      text:
        "Use a real review here that highlights communication, workmanship, professionalism, or responsiveness during the roofing project.",
    },
  ],

  reviewsPlaceholder: {
    title: "Verified customer reviews can be added here",
    text:
      "This layout is ready for real Google, Facebook, and other verified customer feedback. When reviews are added, prioritize comments that reinforce the full Integrity Roofing of Mississippi name, trust, communication, and Gulf Coast service area.",
  },

  finalCta: {
    eyebrow: "Get Started",
    title: "Need roofing help on the Mississippi Gulf Coast?",
    description:
      "Talk with Integrity Roofing of Mississippi about roof repair, roof replacement, storm damage, or your next estimate. Licensed and insured with registration MSBOC No. R22836.",
  },

  socialLinks: {
    facebook: "#",
    instagram: "#",
    tiktok: "#",
  },
};
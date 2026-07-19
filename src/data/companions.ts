
export type Companion = {
  id: string
  name: string
  image: string
  imageKind?: 'model' | 'decor'
  tagline: string
  age: number
  city: string
  cities: string[]
  category: string
  rate: number
  languages: string[]
  interests: string[]
  traits: string[]
  verified: boolean
  tier: 'Signature' | 'Elite' | 'Muse'
  experiences: string[]
  bio: string[]
  availability: { day: string; slots: string }[]
}

type CompanionSource = Omit<Companion, 'image' | 'imageKind'> & {
  images: string[]
}

export const CITIES = [
  'All Cities',
  'Surat',
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Jaipur',
  'Goa',
  'Hyderabad',
  'Kolkata',
]

export const CATEGORIES = [
  'All Categories',
  'Call Girls',
  'Male Escorts',
  'Shemale Escorts',
  'Massages',
]

const companionSources: CompanionSource[] = [
  {
    "id": "in-khopal-com",
    "name": "Aanya",
    "images": [
      "in-khopal-com-1",
      "in-khopal-com-2",
      "in-khopal-com-3",
      "in-khopal-com-4",
      "in-khopal-com-5",
      "in-khopal-com-6",
      "in-khopal-com-7",
      "in-khopal-com-8",
      "in-khopal-com-9",
      "in-khopal-com-10"
    ],
    "tagline": "Refined companionship in Surat, on your terms.",
    "age": 24,
    "city": "Surat",
    "cities": [
      "Surat",
      "Mumbai",
      "Goa"
    ],
    "category": "Call Girls",
    "rate": 450,
    "languages": [
      "English",
      "Hindi",
      "Marathi"
    ],
    "interests": [
      "Fine dining",
      "Travel",
      "Art",
      "Music"
    ],
    "traits": [
      "Elegant",
      "Charming",
      "Discreet"
    ],
    "verified": true,
    "tier": "Signature",
    "experiences": [
      "Personal Meetings",
      "Social Companionship"
    ],
    "bio": [
      "Aanya is an independent companion based in Surat, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Friday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Afternoon — Late"
      }
    ]
  },
  {
    "id": "in-khopal-com-call-girls-noida",
    "name": "Arjun",
    "images": [
      "in-khopal-com-call-girls-noida-1",
      "in-khopal-com-call-girls-noida-2"
    ],
    "tagline": "A poised gentleman companion for Delhi evenings.",
    "age": 27,
    "city": "Surat",
    "cities": [
      "Surat",
      "Delhi"
    ],
    "category": "Male Escorts",
    "rate": 350,
    "languages": [
      "English",
      "Hindi",
      "Punjabi"
    ],
    "interests": [
      "Photography",
      "Poetry",
      "Jazz",
      "Sailing"
    ],
    "traits": [
      "Playful",
      "Sophisticated",
      "Genuine"
    ],
    "verified": true,
    "tier": "Elite",
    "experiences": [
      "Private Celebrations",
      "Travel Companionship",
      "Cultural Evenings"
    ],
    "bio": [
      "Arjun is an independent male companion in Delhi, equally suited to a business evening or a relaxed night out.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Wednesday",
        "slots": "Evening"
      },
      {
        "day": "Sunday",
        "slots": "Afternoon — Evening"
      }
    ]
  },
  {
    "id": "in-khopal-com-massages",
    "name": "Anaya",
    "images": [
      "in-khopal-com-massages-1"
    ],
    "tagline": "Unhurried, restorative sessions in Surat.",
    "age": 26,
    "city": "Surat",
    "cities": [
      "Surat",
      "Goa",
      "Mumbai"
    ],
    "category": "Massages",
    "rate": 300,
    "languages": [
      "English",
      "Hindi",
      "Konkani"
    ],
    "interests": [
      "Sailing",
      "Cuisine",
      "Fine dining",
      "Travel"
    ],
    "traits": [
      "Genuine",
      "Refined",
      "Confident"
    ],
    "verified": true,
    "tier": "Elite",
    "experiences": [
      "Travel Companionship",
      "Cultural Evenings"
    ],
    "bio": [
      "Anaya offers discreet, professional wellness sessions in Goa, focused entirely on your comfort.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Thursday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Midday — Evening"
      }
    ]
  },
  {
    "id": "tryst-link-bdsm-tsoliviarhodes",
    "name": "Olivia",
    "images": [
      "tryst-link-bdsm-tsoliviarhodes-1"
    ],
    "tagline": "Confident, elegant trans companionship in Surat.",
    "age": 28,
    "city": "Surat",
    "cities": [
      "Surat",
      "Bengaluru",
      "Hyderabad"
    ],
    "category": "Shemale Escorts",
    "rate": 400,
    "languages": [
      "English",
      "Hindi",
      "Kannada"
    ],
    "interests": [
      "Travel",
      "Art",
      "Music",
      "Theatre"
    ],
    "traits": [
      "Confident",
      "Gentle",
      "Elegant"
    ],
    "verified": true,
    "tier": "Signature",
    "experiences": [
      "Cultural Evenings",
      "Personal Meetings",
      "Social Companionship"
    ],
    "bio": [
      "Olivia is an independent trans companion in Bengaluru, warm, self-assured, and wonderful company.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Tuesday",
        "slots": "Evening"
      },
      {
        "day": "Friday",
        "slots": "Afternoon — Late"
      }
    ]
  },
  {
    "id": "tryst-link-escort-breebabyyy",
    "name": "Bree",
    "images": [
      "tryst-link-escort-breebabyyy-1"
    ],
    "tagline": "Refined companionship in Surat, on your terms.",
    "age": 23,
    "city": "Surat",
    "cities": [
      "Surat",
      "Jaipur"
    ],
    "category": "Call Girls",
    "rate": 280,
    "languages": [
      "English",
      "Hindi",
      "Gujarati"
    ],
    "interests": [
      "Dance",
      "Photography",
      "Poetry",
      "Jazz"
    ],
    "traits": [
      "Witty",
      "Poised",
      "Playful"
    ],
    "verified": false,
    "tier": "Muse",
    "experiences": [
      "Private City Experiences",
      "Private Celebrations"
    ],
    "bio": [
      "Bree is an independent companion based in Surat, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Thursday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Midday — Evening"
      }
    ]
  },
  {
    "id": "tryst-link-escort-rachelamore",
    "name": "Luna",
    "images": [
      "tryst-link-escort-rachelamore-1"
    ],
    "tagline": "Refined companionship in Surat, on your terms.",
    "age": 24,
    "city": "Surat",
    "cities": [
      "Surat",
      "Kolkata"
    ],
    "category": "Call Girls",
    "rate": 470,
    "languages": [
      "English",
      "Hindi",
      "Bengali"
    ],
    "interests": [
      "Fashion",
      "Dance",
      "Photography",
      "Poetry"
    ],
    "traits": [
      "Discreet",
      "Warm",
      "Witty"
    ],
    "verified": true,
    "tier": "Elite",
    "experiences": [
      "Social Companionship",
      "Private City Experiences",
      "Private Celebrations"
    ],
    "bio": [
      "Luna is an independent companion based in Surat, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Tuesday",
        "slots": "Evening"
      },
      {
        "day": "Friday",
        "slots": "Afternoon — Late"
      }
    ]
  },
  {
    "id": "tryst-link-escort-roxygoddess",
    "name": "Roxy",
    "images": [
      "tryst-link-escort-roxygoddess-1"
    ],
    "tagline": "A poised gentleman companion for Goa evenings.",
    "age": 29,
    "city": "Surat",
    "cities": [
      "Surat",
      "Goa",
      "Mumbai"
    ],
    "category": "Male Escorts",
    "rate": 360,
    "languages": [
      "English",
      "Hindi",
      "Konkani"
    ],
    "interests": [
      "Poetry",
      "Jazz",
      "Sailing",
      "Cuisine"
    ],
    "traits": [
      "Witty",
      "Poised",
      "Playful"
    ],
    "verified": true,
    "tier": "Signature",
    "experiences": [
      "Private City Experiences",
      "Private Celebrations"
    ],
    "bio": [
      "Roxy is an independent male companion in Goa, equally suited to a business evening or a relaxed night out.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Friday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Afternoon — Late"
      }
    ]
  },
  {
    "id": "in-khopal-com-call-girls-ahmedabad",
    "name": "Ishita",
    "images": [
      "in-khopal-com-call-girls-ahmedabad-1",
      "in-khopal-com-call-girls-ahmedabad-2",
      "in-khopal-com-call-girls-ahmedabad-3",
      "in-khopal-com-call-girls-ahmedabad-4"
    ],
    "tagline": "Refined companionship in Delhi, on your terms.",
    "age": 23,
    "city": "Delhi",
    "cities": [
      "Delhi",
      "Jaipur"
    ],
    "category": "Call Girls",
    "rate": 300,
    "languages": [
      "English",
      "Hindi",
      "Punjabi"
    ],
    "interests": [
      "Music",
      "Theatre",
      "Wine",
      "Yoga"
    ],
    "traits": [
      "Discreet",
      "Warm",
      "Witty"
    ],
    "verified": true,
    "tier": "Elite",
    "experiences": [
      "Social Companionship",
      "Private City Experiences",
      "Private Celebrations"
    ],
    "bio": [
      "Ishita is an independent companion based in Delhi, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Wednesday",
        "slots": "Evening"
      },
      {
        "day": "Sunday",
        "slots": "Afternoon — Evening"
      }
    ]
  },
  {
    "id": "in-khopal-com-call-girls-bengaluru",
    "name": "Meera",
    "images": [
      "in-khopal-com-call-girls-bengaluru-1",
      "in-khopal-com-call-girls-bengaluru-2"
    ],
    "tagline": "Unhurried, restorative sessions in Bengaluru.",
    "age": 27,
    "city": "Bengaluru",
    "cities": [
      "Bengaluru"
    ],
    "category": "Massages",
    "rate": 200,
    "languages": [
      "English",
      "Hindi",
      "Kannada"
    ],
    "interests": [
      "Yoga",
      "Literature",
      "Cinema",
      "Fashion"
    ],
    "traits": [
      "Witty",
      "Poised",
      "Playful"
    ],
    "verified": true,
    "tier": "Muse",
    "experiences": [
      "Private City Experiences",
      "Private Celebrations"
    ],
    "bio": [
      "Meera offers discreet, professional wellness sessions in Bengaluru, focused entirely on your comfort.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Thursday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Midday — Evening"
      }
    ]
  },
  {
    "id": "in-khopal-com-call-girls-guwahati",
    "name": "Rhea",
    "images": [
      "in-khopal-com-call-girls-guwahati-1",
      "in-khopal-com-call-girls-guwahati-2",
      "in-khopal-com-call-girls-guwahati-3",
      "in-khopal-com-call-girls-guwahati-4"
    ],
    "tagline": "Refined companionship in Kolkata, on your terms.",
    "age": 26,
    "city": "Kolkata",
    "cities": [
      "Kolkata",
      "Hyderabad"
    ],
    "category": "Call Girls",
    "rate": 350,
    "languages": [
      "English",
      "Hindi",
      "Bengali"
    ],
    "interests": [
      "Fashion",
      "Dance",
      "Photography",
      "Poetry"
    ],
    "traits": [
      "Playful",
      "Sophisticated",
      "Genuine"
    ],
    "verified": true,
    "tier": "Elite",
    "experiences": [
      "Private Celebrations",
      "Travel Companionship",
      "Cultural Evenings"
    ],
    "bio": [
      "Rhea is an independent companion based in Kolkata, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Tuesday",
        "slots": "Evening"
      },
      {
        "day": "Friday",
        "slots": "Afternoon — Late"
      }
    ]
  },
  {
    "id": "in-khopal-com-call-girls-hyderabad",
    "name": "Sara",
    "images": [
      "in-khopal-com-call-girls-hyderabad-1",
      "in-khopal-com-call-girls-hyderabad-2",
      "in-khopal-com-call-girls-hyderabad-3"
    ],
    "tagline": "Refined companionship in Hyderabad, on your terms.",
    "age": 25,
    "city": "Hyderabad",
    "cities": [
      "Hyderabad",
      "Bengaluru"
    ],
    "category": "Call Girls",
    "rate": 500,
    "languages": [
      "English",
      "Hindi",
      "Telugu"
    ],
    "interests": [
      "Poetry",
      "Jazz",
      "Sailing",
      "Cuisine"
    ],
    "traits": [
      "Genuine",
      "Refined",
      "Confident"
    ],
    "verified": true,
    "tier": "Signature",
    "experiences": [
      "Travel Companionship",
      "Cultural Evenings"
    ],
    "bio": [
      "Sara is an independent companion based in Hyderabad, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Friday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Afternoon — Late"
      }
    ]
  },
  {
    "id": "in-khopal-com-call-girls-indore",
    "name": "Kabir",
    "images": [
      "in-khopal-com-call-girls-indore-1",
      "in-khopal-com-call-girls-indore-2",
      "in-khopal-com-call-girls-indore-3",
      "in-khopal-com-call-girls-indore-4"
    ],
    "tagline": "A poised gentleman companion for Jaipur evenings.",
    "age": 28,
    "city": "Jaipur",
    "cities": [
      "Jaipur",
      "Delhi"
    ],
    "category": "Male Escorts",
    "rate": 400,
    "languages": [
      "English",
      "Hindi",
      "Rajasthani"
    ],
    "interests": [
      "Cuisine",
      "Fine dining",
      "Travel",
      "Art"
    ],
    "traits": [
      "Confident",
      "Gentle",
      "Elegant"
    ],
    "verified": true,
    "tier": "Elite",
    "experiences": [
      "Cultural Evenings",
      "Personal Meetings",
      "Social Companionship"
    ],
    "bio": [
      "Kabir is an independent male companion in Jaipur, equally suited to a business evening or a relaxed night out.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Wednesday",
        "slots": "Evening"
      },
      {
        "day": "Sunday",
        "slots": "Afternoon — Evening"
      }
    ]
  },
  {
    "id": "in-khopal-com-call-girls-jaipur",
    "name": "Priya",
    "images": [
      "in-khopal-com-call-girls-jaipur-1",
      "in-khopal-com-call-girls-jaipur-2",
      "in-khopal-com-call-girls-jaipur-3"
    ],
    "tagline": "Refined companionship in Jaipur, on your terms.",
    "age": 22,
    "city": "Jaipur",
    "cities": [
      "Jaipur"
    ],
    "category": "Call Girls",
    "rate": 250,
    "languages": [
      "English",
      "Hindi",
      "Rajasthani"
    ],
    "interests": [
      "Art",
      "Music",
      "Theatre",
      "Wine"
    ],
    "traits": [
      "Elegant",
      "Charming",
      "Discreet"
    ],
    "verified": false,
    "tier": "Muse",
    "experiences": [
      "Personal Meetings",
      "Social Companionship"
    ],
    "bio": [
      "Priya is an independent companion based in Jaipur, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Thursday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Midday — Evening"
      }
    ]
  },
  {
    "id": "in-khopal-com-call-girls-kolkata",
    "name": "Tara",
    "images": [
      "in-khopal-com-call-girls-kolkata-1",
      "in-khopal-com-call-girls-kolkata-2",
      "in-khopal-com-call-girls-kolkata-3",
      "in-khopal-com-call-girls-kolkata-4"
    ],
    "tagline": "Unhurried, restorative sessions in Kolkata.",
    "age": 29,
    "city": "Kolkata",
    "cities": [
      "Kolkata"
    ],
    "category": "Massages",
    "rate": 220,
    "languages": [
      "English",
      "Hindi",
      "Bengali"
    ],
    "interests": [
      "Wine",
      "Yoga",
      "Literature",
      "Cinema"
    ],
    "traits": [
      "Discreet",
      "Warm",
      "Witty"
    ],
    "verified": true,
    "tier": "Elite",
    "experiences": [
      "Social Companionship",
      "Private City Experiences",
      "Private Celebrations"
    ],
    "bio": [
      "Tara offers discreet, professional wellness sessions in Kolkata, focused entirely on your comfort.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Tuesday",
        "slots": "Evening"
      },
      {
        "day": "Friday",
        "slots": "Afternoon — Late"
      }
    ]
  },
  {
    "id": "in-khopal-com-call-girls-mumbai",
    "name": "Zoya",
    "images": [
      "in-khopal-com-call-girls-mumbai-1",
      "in-khopal-com-call-girls-mumbai-2",
      "in-khopal-com-call-girls-mumbai-3"
    ],
    "tagline": "Refined companionship in Mumbai, on your terms.",
    "age": 24,
    "city": "Mumbai",
    "cities": [
      "Mumbai",
      "Surat"
    ],
    "category": "Call Girls",
    "rate": 480,
    "languages": [
      "English",
      "Hindi",
      "Marathi"
    ],
    "interests": [
      "Cinema",
      "Fashion",
      "Dance",
      "Photography"
    ],
    "traits": [
      "Witty",
      "Poised",
      "Playful"
    ],
    "verified": true,
    "tier": "Signature",
    "experiences": [
      "Private City Experiences",
      "Private Celebrations"
    ],
    "bio": [
      "Zoya is an independent companion based in Mumbai, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Friday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Afternoon — Late"
      }
    ]
  },
  {
    "id": "tryst-link-escort-ariana23",
    "name": "Alesia",
    "images": [
      "tryst-link-escort-ariana23-1"
    ],
    "tagline": "Refined companionship in Goa, on your terms.",
    "age": 25,
    "city": "Goa",
    "cities": [
      "Goa"
    ],
    "category": "Call Girls",
    "rate": 600,
    "languages": [
      "English",
      "Hindi",
      "Konkani"
    ],
    "interests": [
      "Theatre",
      "Wine",
      "Yoga",
      "Literature"
    ],
    "traits": [
      "Elegant",
      "Charming",
      "Discreet"
    ],
    "verified": true,
    "tier": "Signature",
    "experiences": [
      "Personal Meetings",
      "Social Companionship"
    ],
    "bio": [
      "Alesia is an independent companion based in Goa, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Friday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Afternoon — Late"
      }
    ]
  },
  {
    "id": "tryst-link-escort-ashleyvictoria",
    "name": "Ashley",
    "images": [
      "tryst-link-escort-ashleyvictoria-1"
    ],
    "tagline": "Refined companionship in Delhi, on your terms.",
    "age": 24,
    "city": "Delhi",
    "cities": [
      "Delhi",
      "Mumbai"
    ],
    "category": "Call Girls",
    "rate": 500,
    "languages": [
      "English",
      "Hindi",
      "Punjabi"
    ],
    "interests": [
      "Literature",
      "Cinema",
      "Fashion",
      "Dance"
    ],
    "traits": [
      "Discreet",
      "Warm",
      "Witty"
    ],
    "verified": true,
    "tier": "Elite",
    "experiences": [
      "Social Companionship",
      "Private City Experiences",
      "Private Celebrations"
    ],
    "bio": [
      "Ashley is an independent companion based in Delhi, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Wednesday",
        "slots": "Evening"
      },
      {
        "day": "Sunday",
        "slots": "Afternoon — Evening"
      }
    ]
  },
  {
    "id": "tryst-link-escort-kristin-bay",
    "name": "Kristin",
    "images": [
      "tryst-link-escort-kristin-bay-1"
    ],
    "tagline": "Refined companionship in Hyderabad, on your terms.",
    "age": 26,
    "city": "Hyderabad",
    "cities": [
      "Hyderabad"
    ],
    "category": "Call Girls",
    "rate": 420,
    "languages": [
      "English",
      "Hindi",
      "Telugu"
    ],
    "interests": [
      "Jazz",
      "Sailing",
      "Cuisine",
      "Fine dining"
    ],
    "traits": [
      "Playful",
      "Sophisticated",
      "Genuine"
    ],
    "verified": true,
    "tier": "Elite",
    "experiences": [
      "Private Celebrations",
      "Travel Companionship",
      "Cultural Evenings"
    ],
    "bio": [
      "Kristin is an independent companion based in Hyderabad, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Tuesday",
        "slots": "Evening"
      },
      {
        "day": "Friday",
        "slots": "Afternoon — Late"
      }
    ]
  },
  {
    "id": "tryst-link-escort-leftonred-30",
    "name": "Scarlett",
    "images": [
      "tryst-link-escort-leftonred-30-1"
    ],
    "tagline": "Refined companionship in Mumbai, on your terms.",
    "age": 27,
    "city": "Mumbai",
    "cities": [
      "Mumbai"
    ],
    "category": "Call Girls",
    "rate": 550,
    "languages": [
      "English",
      "Hindi",
      "Marathi"
    ],
    "interests": [
      "Fine dining",
      "Travel",
      "Art",
      "Music"
    ],
    "traits": [
      "Genuine",
      "Refined",
      "Confident"
    ],
    "verified": true,
    "tier": "Signature",
    "experiences": [
      "Travel Companionship",
      "Cultural Evenings"
    ],
    "bio": [
      "Scarlett is an independent companion based in Mumbai, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Friday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Afternoon — Late"
      }
    ]
  },
  {
    "id": "tryst-link-escort-lulutina",
    "name": "Lulu",
    "images": [
      "tryst-link-escort-lulutina-1"
    ],
    "tagline": "Refined companionship in Bengaluru, on your terms.",
    "age": 22,
    "city": "Bengaluru",
    "cities": [
      "Bengaluru",
      "Goa"
    ],
    "category": "Call Girls",
    "rate": 260,
    "languages": [
      "English",
      "Hindi",
      "Kannada"
    ],
    "interests": [
      "Music",
      "Theatre",
      "Wine",
      "Yoga"
    ],
    "traits": [
      "Confident",
      "Gentle",
      "Elegant"
    ],
    "verified": false,
    "tier": "Muse",
    "experiences": [
      "Cultural Evenings",
      "Personal Meetings",
      "Social Companionship"
    ],
    "bio": [
      "Lulu is an independent companion based in Bengaluru, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Wednesday",
        "slots": "Evening"
      },
      {
        "day": "Sunday",
        "slots": "Afternoon — Evening"
      }
    ]
  },
  {
    "id": "tryst-link-escort-mimimimi",
    "name": "Mia",
    "images": [
      "tryst-link-escort-mimimimi-1"
    ],
    "tagline": "Confident, elegant trans companionship in Delhi.",
    "age": 25,
    "city": "Delhi",
    "cities": [
      "Delhi"
    ],
    "category": "Shemale Escorts",
    "rate": 380,
    "languages": [
      "English",
      "Hindi",
      "Punjabi"
    ],
    "interests": [
      "Yoga",
      "Literature",
      "Cinema",
      "Fashion"
    ],
    "traits": [
      "Elegant",
      "Charming",
      "Discreet"
    ],
    "verified": true,
    "tier": "Elite",
    "experiences": [
      "Personal Meetings",
      "Social Companionship"
    ],
    "bio": [
      "Mia is an independent trans companion in Delhi, warm, self-assured, and wonderful company.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Thursday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Midday — Evening"
      }
    ]
  },
  {
    "id": "tryst-link-online-hellomonique1",
    "name": "Monique",
    "images": [
      "tryst-link-online-hellomonique1-1"
    ],
    "tagline": "Refined companionship in Jaipur, on your terms.",
    "age": 23,
    "city": "Jaipur",
    "cities": [
      "Jaipur",
      "Delhi"
    ],
    "category": "Call Girls",
    "rate": 290,
    "languages": [
      "English",
      "Hindi",
      "Rajasthani"
    ],
    "interests": [
      "Cuisine",
      "Fine dining",
      "Travel",
      "Art"
    ],
    "traits": [
      "Playful",
      "Sophisticated",
      "Genuine"
    ],
    "verified": false,
    "tier": "Muse",
    "experiences": [
      "Private Celebrations",
      "Travel Companionship",
      "Cultural Evenings"
    ],
    "bio": [
      "Monique is an independent companion based in Jaipur, at ease anywhere from a quiet dinner to a gallery opening.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Wednesday",
        "slots": "Evening"
      },
      {
        "day": "Sunday",
        "slots": "Afternoon — Evening"
      }
    ]
  },
  {
    "id": "tryst-link-online-sexyjazzyxo",
    "name": "Jaz",
    "images": [
      "tryst-link-online-sexyjazzyxo-1"
    ],
    "tagline": "A poised gentleman companion for Hyderabad evenings.",
    "age": 28,
    "city": "Hyderabad",
    "cities": [
      "Hyderabad"
    ],
    "category": "Male Escorts",
    "rate": 340,
    "languages": [
      "English",
      "Hindi",
      "Telugu"
    ],
    "interests": [
      "Art",
      "Music",
      "Theatre",
      "Wine"
    ],
    "traits": [
      "Genuine",
      "Refined",
      "Confident"
    ],
    "verified": false,
    "tier": "Muse",
    "experiences": [
      "Travel Companionship",
      "Cultural Evenings"
    ],
    "bio": [
      "Jaz is an independent male companion in Hyderabad, equally suited to a business evening or a relaxed night out.",
      "Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected."
    ],
    "availability": [
      {
        "day": "Thursday",
        "slots": "Evening — Late"
      },
      {
        "day": "Saturday",
        "slots": "Midday — Evening"
      }
    ]
  }
]

// Each card represents one person and one photograph. The source material was
// delivered as a handful of multi-photo galleries, so it is normalized here
// into individual listings instead of showing a gallery inside every card.
const PHOTO_ALIASES = [
  'Aanya', 'Meher', 'Mira', 'Kavya', 'Riya', 'Zara', 'Naina', 'Ira', 'Saanvi', 'Tara',
  'Arjun', 'Anaya', 'Olivia', 'Bree', 'Luna', 'Roxy', 'Ishita', 'Meera', 'Rhea', 'Sara',
  'Kabir', 'Priya', 'Zoya', 'Alesia', 'Ashley', 'Kristin', 'Scarlett', 'Lulu', 'Mia', 'Monique',
  'Jaz', 'Esha', 'Nyla', 'Aditi', 'Aisha', 'Veera', 'Alina', 'Nisha', 'Shreya', 'Veda',
  'Diya', 'Simran', 'Navya', 'Myra', 'Tanya', 'Isha', 'Sia', 'Maya', 'Aarna', 'Nora',
  'Leela', 'Rumi', 'Vanya', 'Kaira',
]

const PHOTO_OVERRIDES: Record<string, Partial<Companion>> = {
  // This is the one standalone male portrait in the supplied model library.
  'in-khopal-com-2': {
    name: 'Aarav',
    city: 'Surat',
    cities: ['Surat'],
    category: 'Male Escorts',
    tagline: 'A thoughtful gentleman companion for refined evenings.',
    tier: 'Elite',
    verified: true,
  },
}

let aliasIndex = 0

const photoProfiles: Companion[] = companionSources.flatMap(({ images, ...profile }) =>
  images.map((image, photoIndex) => {
    const override = PHOTO_OVERRIDES[image]
    const city = override?.city ?? profile.city
    const name = override?.name ?? PHOTO_ALIASES[aliasIndex++ % PHOTO_ALIASES.length]
    const category =
      override?.category ??
      (image === 'in-khopal-com-2'
        ? 'Male Escorts'
        : profile.category === 'Male Escorts'
          ? 'Call Girls'
          : profile.category)

    return {
      ...profile,
      ...override,
      id: `${profile.id}-photo-${photoIndex + 1}`,
      name,
      image,
      city,
      cities: override?.cities ?? profile.cities,
      category,
      tagline:
        override?.tagline ??
        (photoIndex === 0
          ? profile.tagline
          : `A considered presence for ${city} evenings.`),
      bio: [
        `${name} is an independent companion based in ${city}, at ease anywhere from a quiet dinner to a gallery opening.`,
        'Every introduction is mutual and consent-based, arranged privately through our concierge. Boundaries are agreed in advance and always respected.',
      ],
    }
  }),
)

const independentPortraits: Companion[] = [
  {
    id: 'independent-saree-1',
    name: 'Avni',
    image: 'model-1',
    imageKind: 'decor',
    tagline: 'Warm, articulate company for Mumbai evenings.',
    age: 25,
    city: 'Mumbai',
    cities: ['Mumbai'],
    category: 'Call Girls',
    rate: 340,
    languages: ['English', 'Hindi', 'Marathi'],
    interests: ['Cuisine', 'Design', 'Travel'],
    traits: ['Warm', 'Poised', 'Curious'],
    verified: true,
    tier: 'Signature',
    experiences: ['Personal Meetings', 'Cultural Evenings'],
    bio: [
      'Avni brings a relaxed, thoughtful presence to dinners, openings, and unhurried city evenings.',
      'Introductions are made privately through our concierge, with comfort and clear boundaries at the centre.',
    ],
    availability: [{ day: 'Friday', slots: 'Evening' }, { day: 'Sunday', slots: 'Afternoon - Evening' }],
  },
  {
    id: 'independent-saree-2',
    name: 'Kiana',
    image: 'model-2',
    imageKind: 'decor',
    tagline: 'A bright, grounded companion for Delhi occasions.',
    age: 26,
    city: 'Delhi',
    cities: ['Delhi'],
    category: 'Call Girls',
    rate: 360,
    languages: ['English', 'Hindi'],
    interests: ['Art', 'Music', 'Fine dining'],
    traits: ['Genuine', 'Elegant', 'Easygoing'],
    verified: true,
    tier: 'Elite',
    experiences: ['Social Companionship', 'Private Celebrations'],
    bio: [
      'Kiana is at home in lively rooms and thoughtful conversation, with an instinct for making any occasion feel easy.',
      'Each introduction is considered and mutual, arranged around privacy and shared comfort.',
    ],
    availability: [{ day: 'Thursday', slots: 'Evening' }, { day: 'Saturday', slots: 'Afternoon - Evening' }],
  },
  {
    id: 'independent-saree-3',
    name: 'Ishani',
    image: 'model-3',
    imageKind: 'decor',
    tagline: 'Quiet confidence for Bengaluru nights out.',
    age: 24,
    city: 'Bengaluru',
    cities: ['Bengaluru'],
    category: 'Call Girls',
    rate: 330,
    languages: ['English', 'Hindi', 'Kannada'],
    interests: ['Literature', 'Cinema', 'Coffee'],
    traits: ['Calm', 'Refined', 'Sincere'],
    verified: true,
    tier: 'Signature',
    experiences: ['Personal Meetings', 'City Experiences'],
    bio: [
      'Ishani pairs a calm, observant nature with a love of the small details that make an evening memorable.',
      'Your introduction is private, intentional, and always centred on mutual respect.',
    ],
    availability: [{ day: 'Wednesday', slots: 'Evening' }, { day: 'Sunday', slots: 'Evening' }],
  },
  {
    id: 'independent-saree-4',
    name: 'Raina',
    image: 'model-4',
    imageKind: 'decor',
    tagline: 'Graceful, spirited company for Jaipur celebrations.',
    age: 27,
    city: 'Jaipur',
    cities: ['Jaipur'],
    category: 'Call Girls',
    rate: 350,
    languages: ['English', 'Hindi', 'Rajasthani'],
    interests: ['Heritage', 'Fashion', 'Music'],
    traits: ['Playful', 'Attentive', 'Confident'],
    verified: true,
    tier: 'Elite',
    experiences: ['Private Celebrations', 'Cultural Evenings'],
    bio: [
      'Raina brings an assured, welcoming energy to celebrations and cultural evenings across Jaipur.',
      'Our concierge makes every introduction discreetly and only after both sides are comfortable.',
    ],
    availability: [{ day: 'Friday', slots: 'Afternoon - Evening' }, { day: 'Saturday', slots: 'Evening' }],
  },
  {
    id: 'independent-saree-5',
    name: 'Samira',
    image: 'model-5',
    imageKind: 'decor',
    tagline: "An effortless host for Hyderabad's best evenings.",
    age: 25,
    city: 'Hyderabad',
    cities: ['Hyderabad'],
    category: 'Call Girls',
    rate: 345,
    languages: ['English', 'Hindi', 'Telugu'],
    interests: ['Food', 'Travel', 'Theatre'],
    traits: ['Sophisticated', 'Warm', 'Present'],
    verified: true,
    tier: 'Signature',
    experiences: ['Social Companionship', 'Travel Companionship'],
    bio: [
      'Samira is a considered, engaging presence for a dinner, an event, or a beautifully unplanned evening.',
      'All introductions remain private and are arranged around clear expectations and mutual comfort.',
    ],
    availability: [{ day: 'Thursday', slots: 'Evening' }, { day: 'Sunday', slots: 'Afternoon' }],
  },
]

export const companions: Companion[] = [...photoProfiles, ...independentPortraits]

export function getCompanion(id: string) {
  return companions.find((c) => c.id === id.trim())
}

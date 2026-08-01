
export type Companion = {
  id: string
  name: string
  image: string
  imageKind?: 'model' | 'decor'
  tagline: string
  description?: string
  contactPhone?: string
  whatsappNumber?: string
  telegramUsername?: string
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
  description?: string
}

export const CITIES = [
  'Surat',
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
    "description": "Explore local adult classified listings and verified independent companion profiles across India. Offering dedicated female call girls, male escorts, shemale companions, and therapeutic massage services with complete discretion. Arranged privately with mutual respect and agreed boundaries for discerning clients.",
    "bio": [
      "Explore local adult classified listings and verified independent companion profiles across India.",
      "Offering dedicated female call girls, male escorts, shemale companions, and therapeutic massage services with complete discretion.",
      "Arranged privately with mutual respect and agreed boundaries for discerning clients."
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
    "description": "Independent Noida Escorts & Call Girl Service offering 24/7 safe and secure outcall services. Featuring VIP profiles, high-class college companions, and genuine 5-star category hotel & home arrangements. Guaranteed complete satisfaction with clear communication and total privacy.",
    "bio": [
      "Independent Noida Escorts & Call Girl Service offering 24/7 safe and secure outcall services.",
      "Featuring VIP profiles, high-class college companions, and genuine 5-star category hotel & home arrangements.",
      "Guaranteed complete satisfaction with clear communication and total privacy."
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
    "description": "Unhurried, restorative massage and wellness sessions in major cities across India. Choose from verified profiles offering therapeutic body massage, tension relief, and deep relaxation. Focused entirely on your comfort, privacy, and personal well-being.",
    "bio": [
      "Unhurried, restorative massage and wellness sessions in major cities across India.",
      "Choose from verified profiles offering therapeutic body massage, tension relief, and deep relaxation.",
      "Focused entirely on your comfort, privacy, and personal well-being."
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
    "description": "Hi, I’m Olivia — your sexy trans twifey with a taste for power, control, and playful submission I love exploring BDSM dynamics and creating experiences that feel intense, personal, and tailored just for you. Whether you’re more dominant or submissive, I know how to match your energy—soft and obedient one moment, teasing and in control the next. It’s all about the connection, the tension, and giving you exactly what you crave. I’m very open-minded, discreet, and focused on making sure you feel comfortable while we explore your desires together. I really care about being attentive and fully present with you—when we’re together, my focus is completely on you and how you want to feel. If you’re looking for someone who understands both sides of control and enjoys slipping into a more submissive, playful energy for the right dynamic… I’d love to explore that with you",
    "bio": [
      "Hi, I’m Olivia — your sexy trans twifey with a taste for power, control, and playful submission",
      "I love exploring BDSM dynamics and creating experiences that feel intense, personal, and tailored just for you. Whether you’re more dominant or submissive, I know how to match your energy—soft and obedient one moment, teasing and in control the next. It’s all about the connection, the tension, and giving you exactly what you crave.",
      "I’m very open-minded, discreet, and focused on making sure you feel comfortable while we explore your desires together. I really care about being attentive and fully present with you—when we’re together, my focus is completely on you and how you want to feel.",
      "If you’re looking for someone who understands both sides of control and enjoys slipping into a more submissive, playful energy for the right dynamic… I’d love to explore that with you"
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
    "description": "heyy its breebaby here im 28 slim fit blonde hair blue eyed and ready to have tons of fun and cum. If you're looking for fantasy im your girl i love to explore all people's fantasy's and take you to your limit i also explore fetishes and like to be the dominant one when its called for so tell me what it is you like. majority of the time im the classy but nasty perfect little blonde that all y'all are looking for.... i love sucking dick and it show i get told a lot that I'm the best they have had and i like to believe their right. i take pride in what i do and hold myself to a high standard i would m a if you like it i LOVE it kind of girl and love to make your time all about you and your experience and needs I promises I'll keep you cumming back. no bare no greek no gfe no low baller i need a man that can see my worth along with his own and isn't okay with just any ol girl my pictures dont do me justice is what i hear on a daily basis and i would have to agree! anyone i see come too see me for me i love to just be myself and aim for us both to be comfortable and enjoy our times together. and absolutely no law enforcement.",
    "bio": [
      "heyy its breebaby here",
      "im 28 slim fit blonde hair blue eyed and ready to have tons of fun and cum. If you're looking for fantasy im your girl i love to explore all people's fantasy's and take you to your limit i also explore fetishes and like to be the dominant one when its called for so tell me what it is you like. majority of the time im the classy but nasty perfect little blonde that all y'all are looking for.... i love sucking dick and it show i get told a lot that I'm the best they have had and i like to believe their right. i take pride in what i do and hold myself to a high standard i would m a if you like it i LOVE it kind of girl and love to make your time all about you and your experience and needs I promises I'll keep you cumming back.",
      "no bare",
      "no greek",
      "no gfe",
      "no low baller i need a man that can see my worth along with his own and isn't okay with just any ol girl my pictures dont do me justice is what i hear on a daily basis and i would have to agree!",
      "anyone i see come too see me for me i love to just be myself and aim for us both to be comfortable and enjoy our times together.",
      "and absolutely no law enforcement."
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
    "description": "I am enticing, passionate, and wholly devoted to fulfilling your desires. Whether day or night, I am here to cater to your every whim. Simply send me a message, and let’s explore the depths of your fantasies together. Once you experience the allure of my company, you’ll find it irresistibly captivating. For those who value refinement and excellence, you’ve truly arrived at your destination. With love Luna",
    "bio": [
      "I am enticing, passionate, and wholly devoted to fulfilling your desires. Whether day or night, I am here to cater to your every whim. Simply send me a message, and let’s explore the depths of your fantasies together. Once you experience the allure of my company, you’ll find it irresistibly captivating. For those who value refinement and excellence, you’ve truly arrived at your destination.",
      "With love Luna"
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
    "description": "8137387835 Hello, love! My name is Roxy and friends I'm an exotic Latina with a spectacular body. I’m super fun, I am an elegant, polite, unique, sensual and passionate princess who seeks to satisfy your desires, needs and desires! 👸🏻100% real photos 🍓 Evaluation is required🩵Proper hygiene is essential 💎Exclusive experiences only.💎 Upscale Professional & Discreet 🥂• 100% REAL & Willing to FaceTime Verify ✔️• Fetish Friendly, O *** ¡¡¡ Multiple hours, dinner appointments, and overnight specials available !!!*** ¡ I am pleased to serve men who value the good things in life ! ¡ Making you feel more satisfied and helping you relax whether you are in the city on a business trip, looking for a new experience, a relaxing night or a fun night in the city! ¡ I'm her ! 👸🏻- I require a light screening for all new friends. ¡ I look forward to meeting you ! Don't hesitate to communicate ¡ I'll wait for you handsome ! Text me:8137387835",
    "bio": [
      "8137387835 Hello, love! My name is Roxy and friends I'm an exotic Latina with a spectacular body. I’m super fun, I am an elegant, polite, unique, sensual and passionate princess who seeks to satisfy your desires, needs and desires! 👸🏻100% real photos 🍓 Evaluation is required🩵Proper hygiene is essential",
      "💎Exclusive experiences only.💎",
      "Upscale Professional & Discreet 🥂• 100% REAL & Willing to FaceTime Verify ✔️• Fetish Friendly, O",
      "*** ¡¡¡ Multiple hours, dinner appointments, and overnight specials available !!!*** ¡ I am pleased to serve men who value the good things in life ! ¡ Making you feel more satisfied and helping you relax whether you are in the city on a business trip, looking for a new experience, a relaxing night or a fun night in the city!",
      "¡ I'm her ! 👸🏻- I require a light screening for all new friends. ¡ I look forward to meeting you ! Don't hesitate to communicate ¡ I'll wait for you handsome !",
      "Text me:8137387835"
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
    "description": "Independent Ahmedabad Escorts & Call Girl Service available 24/7. High-class North & South Indian models, college girls, and foreign companions providing hotel outcalls and incall sessions. Discreet, safe, and tailored for gentlemen seeking genuine company and quality time.",
    "bio": [
      "Independent Ahmedabad Escorts & Call Girl Service available 24/7.",
      "High-class North & South Indian models, college girls, and foreign companions providing hotel outcalls and incall sessions.",
      "Discreet, safe, and tailored for gentlemen seeking genuine company and quality time."
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
    "description": "Independent Bengaluru Escorts - Call Girl & Companion Service. VIP models, college companions, and high-profile independent escorts available for hotel and home visits. 100% safe and secure introductions with flexible timing and complete privacy.",
    "bio": [
      "Independent Bengaluru Escorts - Call Girl & Companion Service.",
      "VIP models, college companions, and high-profile independent escorts available for hotel and home visits.",
      "100% safe and secure introductions with flexible timing and complete privacy."
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
    "description": "Independent Guwahati Escorts & Call Girl Service. Featuring verified independent models, college companions, and hostesses for hotel outcalls. Professional door-step service with complete privacy and friendly, attentive company.",
    "bio": [
      "Independent Guwahati Escorts & Call Girl Service.",
      "Featuring verified independent models, college companions, and hostesses for hotel outcalls.",
      "Professional door-step service with complete privacy and friendly, attentive company."
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
    "description": "Independent Hyderabad Escorts & VIP Hotel Service. High-class models available 24 hours for dinner dates, social companionship, and private hotel sessions. Attentive, refined companions accustomed to meeting discerning gentlemen.",
    "bio": [
      "Independent Hyderabad Escorts & VIP Hotel Service.",
      "High-class models available 24 hours for dinner dates, social companionship, and private hotel sessions.",
      "Attentive, refined companions accustomed to meeting discerning gentlemen."
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
    "description": "Independent Indore Escorts & Companionship Service. High-profile VIP companions providing 24-hour hotel outcall and private apartment sessions. Safe, trusted, and discreet arrangements focused on mutual comfort and quality time.",
    "bio": [
      "Independent Indore Escorts & Companionship Service.",
      "High-profile VIP companions providing 24-hour hotel outcall and private apartment sessions.",
      "Safe, trusted, and discreet arrangements focused on mutual comfort and quality time."
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
    "description": "Independent Jaipur Escorts & Call Girl Service. High-profile genuine companions available for 5-star hotel outcalls and heritage city dates. Charming, poised, and discreet companions tailored for memorable Jaipur evenings.",
    "bio": [
      "Independent Jaipur Escorts & Call Girl Service.",
      "High-profile genuine companions available for 5-star hotel outcalls and heritage city dates.",
      "Charming, poised, and discreet companions tailored for memorable Jaipur evenings."
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
    "description": "Independent Kolkata Escorts & Call Girl Service. Verified profiles offering relaxing companionship, private hotel meetings, and full-night social sessions. Genuine cash-on-meet service with high standards of privacy and hospitality.",
    "bio": [
      "Independent Kolkata Escorts & Call Girl Service.",
      "Verified profiles offering relaxing companionship, private hotel meetings, and full-night social sessions.",
      "Genuine cash-on-meet service with high standards of privacy and hospitality."
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
    "description": "Independent Mumbai Escorts & Call Girl Service. High-profile genuine models, college girls, and independent companions available across South Mumbai, Bandra, Juhu, and Andheri. 24/7 hotel outcall service for private dinners, events, and unhurried city experiences.",
    "bio": [
      "Independent Mumbai Escorts & Call Girl Service.",
      "High-profile genuine models, college girls, and independent companions available across South Mumbai, Bandra, Juhu, and Andheri.",
      "24/7 hotel outcall service for private dinners, events, and unhurried city experiences."
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
    "description": "Hey, I’m Alesia 😊 Hey, I’m Alesia  a real mix of Brazilian fire and German sweetness. I’ve got that warm, exotic look with soft curves and a smile that comes easy. I love good conversation, genuine connection, and of course, making you feel completely wanted.  I’m very open-minded, always clean and well-groomed, and super discreet. If you’re looking for a fun, passionate time with a girl who actually enjoys what she does… come say hi.",
    "bio": [
      "Hey, I’m Alesia 😊",
      "Hey, I’m Alesia  a real mix of Brazilian fire and German sweetness. I’ve got that warm, exotic look with soft curves and a smile that comes easy.",
      "I love good conversation, genuine connection, and of course, making you feel completely wanted.  I’m very open-minded, always clean and well-groomed, and super discreet.",
      "If you’re looking for a fun, passionate time with a girl who actually enjoys what she does… come say hi."
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
    "description": "I am currently blonde with new photos on my website: www.date-av.com ———————- I reserve myself for  discerning, refined gentlemen who appreciate timeless beauty and intentional moments together. The veil over my face adds mystique. There’s anticipation leading to the moment of the reveal. Let’s embrace the reveal upon our eyes locking for the first time. Behind the soft veil, you’ll find light, almond shaped eyes framed by natural, long lashes, and plush lips. At a glance, my narrow, petite figure is captivating and inviting, showcasing evident care and devotion to looking and feeling my best. I exude the warmth and down-to-earth nature of the girl next door, where the simplicity of sharing laughter, smiles and conversation is what brings me the most joy. Being effervescent and sincere, I have a true wonder and appreciation for the world and those around me, especially building connection. Don't worry about perfection when together. I am the perfect host. You will feel at ease in my presence. With a curious mind and a wide range of interests, conversation flows easily  and you will feel at ease. Some topics I am fascinated by are: health, history, cooking, fitness, photography and reading. Even if we do not share similar interests, I know I will be drawn to learn and experience more with you. Think of me as the missing piece that completes you, making you feel whole after we depart. If I am lucky to see you again, you'll recognize I cherish our time together by recalling details about you. It would be a privilege to have an ongoing, deeper connection with you, but even if our time together is a one time and fleeting moment, I will look back and cherish it. . Together, we will go beyond reverie.If I’ve intrigued your senses, allow me  to let you into my world. -Ashley Victoria",
    "bio": [
      "I am currently blonde with new photos on my website: www.date-av.com",
      "———————-",
      "I reserve myself for  discerning, refined gentlemen who appreciate timeless beauty and intentional moments together.",
      "The veil over my face adds mystique. There’s anticipation leading to the moment of the reveal. Let’s embrace the reveal upon our eyes locking for the first time. Behind the soft veil, you’ll find light, almond shaped eyes framed by natural, long lashes, and plush lips. At a glance, my narrow, petite figure is captivating and inviting, showcasing evident care and devotion to looking and feeling my best. I exude the warmth and down-to-earth nature of the girl next door, where the simplicity of sharing laughter, smiles and conversation is what brings me the most joy. Being effervescent and sincere, I have a true wonder and appreciation for the world and those around me, especially building connection. Don't worry about perfection when together. I am the perfect host. You will feel at ease in my presence. With a curious mind and a wide range of interests, conversation flows easily  and you will feel at ease. Some topics I am fascinated by are: health, history, cooking, fitness, photography and reading. Even if we do not share similar interests, I know I will be drawn to learn and experience more with you. Think of me as the missing piece that completes you, making you feel whole after we depart. If I am lucky to see you again, you'll recognize I cherish our time together by recalling details about you. It would be a privilege to have an ongoing, deeper connection with you, but even if our time together is a one time and fleeting moment, I will look back and cherish it. . Together, we will go beyond reverie.If I’ve intrigued your senses, allow me  to let you into my world.",
      "-Ashley Victoria"
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
    "description": "Hey guys, I’ll be available in Baton Rouge for outcall. I’m a total sweetheart with a bubbly personality and a tight curvy body. Im pretty vocal and can be very naughty. I love fetishes and roll playing. Whatever it is you like, I’ll make sure it’s the best. I’m real and I have great reviews! Give me a call or text for more info. ***When contacting me please be respectful and polite I don't engage in explicit conversations*** I look forward to meeting you! Kristin 504-812-4777",
    "bio": [
      "Hey guys,",
      "I’ll be available in Baton Rouge for outcall. I’m a total sweetheart with a bubbly personality and a tight curvy body. Im pretty vocal and can be very naughty. I love fetishes and roll playing. Whatever it is you like, I’ll make sure it’s the best. I’m real and I have great reviews! Give me a call or text for more info.",
      "***When contacting me please be respectful and polite I don't engage in explicit conversations***",
      "I look forward to meeting you!",
      "Kristin 504-812-4777"
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
    "description": "Soft, sweet, and just a little edgy—the kind of warmth that feels effortless, with a playful spark that keeps things interesting. I’m flirty, feminine, and very easy to talk to… the “good girl” vibe with a hint of trouble when the chemistry is right. I love creating a relaxed, cozy atmosphere where you can actually unwind. Discretion is important to me, and I’m best matched with respectful gentlemen who value privacy, cleanliness, and clear communication. What you can expect: •Sweet, attentive, and genuinely welcoming energy •Polished, punctual, and easy to plan with •A calm, private vibe from start to finish •Screening required & quick verification available Availability: Incalls in Aurora, CO (private apartment). Outcalls available to DTC, Downtown Denver, LoDo, and RiNo. If you’d like to meet, send a polite intro with your name, preferred date/time, duration, and whether you prefer incall or outcall. If it’s a fit, I’ll take it from there.",
    "bio": [
      "Soft, sweet, and just a little edgy—the kind of warmth that feels effortless, with a playful spark that keeps things interesting. I’m flirty, feminine, and very easy to talk to… the “good girl” vibe with a hint of trouble when the chemistry is right.",
      "I love creating a relaxed, cozy atmosphere where you can actually unwind. Discretion is important to me, and I’m best matched with respectful gentlemen who value privacy, cleanliness, and clear communication.",
      "What you can expect:",
      "•Sweet, attentive, and genuinely welcoming energy",
      "•Polished, punctual, and easy to plan with",
      "•A calm, private vibe from start to finish",
      "•Screening required & quick verification available",
      "Availability: Incalls in Aurora, CO (private apartment). Outcalls available to DTC, Downtown Denver, LoDo, and RiNo.",
      "If you’d like to meet, send a polite intro with your name, preferred date/time, duration, and whether you prefer incall or outcall. If it’s a fit, I’ll take it from there."
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
    "description": "I may be small… but that just makes everything feel a little more intense, doesn’t it?  If you like a girl who listens… who follows… who gives in easily… you’re going to love me. If you’re serious, Message me for FREE on my Private WEBSITE… that’s where I really focus on you. The ones who message me there always get my full attention first. Use my private WEBSITE and message me for FREE and I’ll move you right to the top… no waiting, no distractions… just me, ready for you There’s something about having a small, playful girl all to yourself… the way I look up at you, the way I react to every little thing you do… it’s hard to resist. I don’t need to take control… I prefer when you do. Just tell me what you want… and I’ll be right there, exactly how you like it. So don’t stay here wondering… you already know where to find me",
    "bio": [
      "I may be small… but that just makes everything feel a little more intense, doesn’t it?  If you like a girl who listens… who follows… who gives in easily… you’re going to love me.",
      "If you’re serious, Message me for FREE on my Private WEBSITE… that’s where I really focus on you. The ones who message me there always get my full attention first.",
      "Use my private WEBSITE and message me for FREE and I’ll move you right to the top… no waiting, no distractions… just me, ready for you",
      "There’s something about having a small, playful girl all to yourself… the way I look up at you, the way I react to every little thing you do… it’s hard to resist.",
      "I don’t need to take control… I prefer when you do.",
      "Just tell me what you want… and I’ll be right there, exactly how you like it.",
      "So don’t stay here wondering… you already know where to find me"
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
    "description": "I’m naturally warm, a little playful, and easy to be around. I enjoy good conversation, shared laughter, and creating an atmosphere where people can relax and simply be themselves. I appreciate genuine moments and the kind of connection that feels natural rather than forced. Whether it’s easy conversation, a little laughter, or simply enjoying the moment, I value time that feels comfortable and real. Kindness, respect, and clear communication matter to me, and I believe the best experiences are the ones where both people feel at ease and genuinely enjoy the time they share. Select couples inquiries are welcome with advance discussion. Clever, classy, and impossible to forget. Mia",
    "bio": [
      "I’m naturally warm, a little playful, and easy to be around. I enjoy good conversation, shared laughter, and creating an atmosphere where people can relax and simply be themselves.",
      "I appreciate genuine moments and the kind of connection that feels natural rather than forced. Whether it’s easy conversation, a little laughter, or simply enjoying the moment, I value time that feels comfortable and real.",
      "Kindness, respect, and clear communication matter to me, and I believe the best experiences are the ones where both people feel at ease and genuinely enjoy the time they share.",
      "Select couples inquiries are welcome with advance discussion.",
      "Clever, classy, and impossible to forget.",
      "Mia"
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
    "description": "you found your way here. this is presence-based, embodied work for those drawn to depth and a more conscious relationship with intimacy. my approach is slow, attuned, and tantric-informed — oriented toward listening to the body and staying with sensation, rather than rushing toward a goal or needing to be a certain way. many people arrive carrying pressure, shame, or patterns of performing. here, there is space to slow down, be real, and stay with what is actually happening, without expectation. sessions may include conversation, breath, eye contact, guided attention, ritual elements, embodied practices, and touch. when touch is included, it is practitioner-to-client and offered intentionally; this may include sacred spot work (g-spot or prostate), approached slowly and with care. i also offer preparation and integration support for psychedelic journeys and other major life transitions. this work is best suited for those able to meet it with maturity, respect, and responsibility. availability is limited and offered by inquiry. client reflections \"the energy of that day stayed with me a long time and remained on my mind. i can say truthfully it was the first time i felt connected in a long time.\" \"your session helped me be vulnerable enough to enter a relationship after a long hiatus. i credit that experience with helping me open in that way.\" \"therapy never helped, but one experience with you and i felt a weight lifted off my chest. thank you for helping me, for listening and not judging me. my heart is so full.\"",
    "bio": [
      "you found your way here.",
      "this is presence-based, embodied work for those drawn to depth and a more conscious relationship with intimacy.",
      "my approach is slow, attuned, and tantric-informed — oriented toward listening to the body and staying with sensation, rather than rushing toward a goal or needing to be a certain way.",
      "many people arrive carrying pressure, shame, or patterns of performing. here, there is space to slow down, be real, and stay with what is actually happening, without expectation.",
      "sessions may include conversation, breath, eye contact, guided attention, ritual elements, embodied practices, and touch. when touch is included, it is practitioner-to-client and offered intentionally; this may include sacred spot work (g-spot or prostate), approached slowly and with care.",
      "i also offer preparation and integration support for psychedelic journeys and other major life transitions.",
      "this work is best suited for those able to meet it with maturity, respect, and responsibility. availability is limited and offered by inquiry.",
      "client reflections",
      "\"the energy of that day stayed with me a long time and remained on my mind. i can say truthfully it was the first time i felt connected in a long time.\"",
      "\"your session helped me be vulnerable enough to enter a relationship after a long hiatus. i credit that experience with helping me open in that way.\"",
      "\"therapy never helped, but one experience with you and i felt a weight lifted off my chest. thank you for helping me, for listening and not judging me. my heart is so full.\""
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
    "description": "Hey, I’m Jaz, I’m 4’9, but don’t let that fool you, I definitely know how to move 🥰 I’m here to tease, please, and leave you wanting more every single time I aim to give you pleasure only. If thats what you want my love. thats what you will get ! my favourite positions online are cowgirl and doggy, you can find out more on my link below ☺️ littlewildjaz.com ❤️ And just a warning… if you fall fast, that’s on you 😉 My only goal is to make you lose control and come back for more 😈",
    "bio": [
      "Hey, I’m Jaz,",
      "I’m 4’9, but don’t let that fool you, I definitely know how to move 🥰",
      "I’m here to tease, please, and leave you wanting more every single time",
      "I aim to give you pleasure only. If thats what you want my love. thats what you will get !",
      "my favourite positions online are cowgirl and doggy, you can find out more on my link below ☺️",
      "littlewildjaz.com ❤️",
      "And just a warning… if you fall fast, that’s on you 😉",
      "My only goal is to make you lose control and come back for more 😈"
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
      description: (override?.description ?? profile.description ?? profile.tagline).replaceAll(profile.name, name),
      bio: (override?.bio ?? profile.bio).map((b) => b.replaceAll(profile.name, name)),
    }
  }),
)

const independentPortraits: Companion[] = [
  {
    id: 'independent-saree-1',
    description: 'Avni brings a relaxed, thoughtful presence to dinners, openings, and unhurried city evenings. Introductions are made privately through our concierge, with comfort and clear boundaries at the centre.',
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
    description: 'Kiana is at home in lively rooms and thoughtful conversation, with an instinct for making any occasion feel easy. Each introduction is considered and mutual, arranged around privacy and shared comfort.',
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
    description: 'Ishani pairs a calm, observant nature with a love of the small details that make an evening memorable. Your introduction is private, intentional, and always centred on mutual respect.',
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
    description: 'Raina brings an assured, welcoming energy to celebrations and cultural evenings across Jaipur. Our concierge makes every introduction discreetly and only after both sides are comfortable.',
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
    description: 'Samira is a considered, engaging presence for a dinner, an event, or a beautifully unplanned evening. All introductions remain private and are arranged around clear expectations and mutual comfort.',
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

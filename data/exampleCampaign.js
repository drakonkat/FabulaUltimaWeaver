export const exampleCampaignData = {
  storyData: {
    storyName: "The Sunken Temple of Eldoria",
    NPC: [
      {
        name: "Elara, the Tide-Caller",
        description: "An elderly woman with eyes the color of the deep sea. She is the last guardian of the Eldorian lore and knows the rituals to safely navigate the temple's entrance. Her demeanor is stern but she is desperate to preserve the temple's secrets from falling into the wrong hands."
      }
    ],
    backgroundStory: "Centuries ago, the magnificent Temple of Eldoria was swallowed by the sea in a magical cataclysm. Legends say it holds the 'Tear of the Ocean', a gem that can control the tides. Recently, tremors have caused parts of the temple to resurface, and its magical wards are failing, threatening to unleash a torrent of ancient, angry spirits upon the nearby coastal villages.",
    mustCombat: {
      who: "a swarm of spectral guardians and a vengeful Water Elemental",
      difficulty: "normal"
    },
    previousSituation: "The heroes have arrived at the fishing village of Oakhaven, where terrified locals speak of ghostly apparitions and an unnatural, receding tide that reveals the temple's golden spires at dusk.",
    masterToRead: "The air is thick with salt and an ancient, palpable sorrow. Before you, the tide has pulled back further than any living soul has ever seen, revealing a winding causeway of slick, black stone leading to a majestic, barnacle-encrusted temple. Golden light pulses weakly from its highest spire, beckoning you into the watery depths. An old woman, leaning on a staff of driftwood, approaches you. 'The sea is angry,' she croaks, her voice like the grinding of stones. 'The Temple of Eldoria must not be disturbed, but its guardians are already waking. You must appease them, or Oakhaven is doomed.'",
    worldSituationUpdate: null
  },
  heroes: [
    {
      name: "Sir Kaelan the Steadfast",
      gender: "Male",
      age: "35",
      race: "Human",
      class: "Knight",
      appearance: "Clad in polished steel plate armor that bears the crest of a forgotten kingdom. He has a square jaw, a determined gaze, and a large shield strapped to his back.",
      background: "A knight sworn to protect the innocent. He heard of Oakhaven's plight and traveled to lend his sword to their cause, seeing it as his sacred duty.",
      status: "Vigilant",
      stats: [
        { key: "maxHP", value: "25" },
        { key: "currentHP", value: "25" },
        { key: "str", value: "16" },
        { key: "dex", value: "12" },
        { key: "con", value: "15" },
        { key: "int", value: "10" },
        { key: "wis", value: "13" },
        { key: "cha", value: "11" }
      ],
      inventory: [
          { name: 'Longsword', quantity: '1', weight: '3' },
          { name: 'Shield', quantity: '1', weight: '6' },
          { name: 'Rations (1 day)', quantity: '3', weight: '2' },
      ]
    },
    {
      name: "Ria the Knowledge-Seeker",
      gender: "Female",
      age: "28",
      race: "Gnome",
      class: "Scholar",
      appearance: "Wears spectacles on the end of her nose and has pockets overflowing with scrolls, lenses, and strange tools. Her silver hair is tied in a messy but practical bun.",
      background: "An insatiable scholar of lost civilizations. The legend of Eldoria is the stuff of dreams for her, and she couldn't resist the opportunity to study it firsthand, danger be damned.",
      status: "Excited",
      stats: [
          { key: "maxHP", value: "18" },
          { key: "currentHP", value: "18" },
          { key: "str", value: "8" },
          { key: "dex", value: "14" },
          { key: "con", value: "12" },
          { key: "int", value: "17" },
          { key: "wis", value: "15" },
          { key: "cha", value: "10" }
      ],
      inventory: [
          { name: 'Spellbook', quantity: '1', weight: '3' },
          { name: 'Healing Potion', quantity: '2', weight: '0.5' },
          { name: 'Ink & Quill', quantity: '1', weight: '0.1' },
      ]
    }
  ],
  monsters: [
    {
      name: "Spectral Guardian",
      attributes: [
        { key: "HP", value: "45" },
        { key: "AC", value: "13" },
        { key: "Attack", value: "+5 (1d8+3 cold)" },
        { key: "Resistance", value: "Necrotic, Cold" },
      ],
      inventory: [
        { name: "Ethereal Blade", quantity: "1" }
      ]
    },
    {
      name: "Water Elemental Whelp",
      attributes: [
        { key: "HP", value: "30" },
        { key: "AC", value: "14" },
        { key: "Attack", value: "+4 (1d6+2 bludgeoning)" },
        { key: "Special", value: "Water Jet (ranged attack)" },
      ],
      inventory: []
    }
  ],
  gameSettings: {
    system: "D&D",
    tone: "High Fantasy"
  }
};
export const theCrimsonCovenant = {
  title: {
    en: "The Crimson Covenant",
    it: "Il Patto Cremisi"
  },
  metadata: {
    difficulty: { en: "Medium", it: "Medio" },
    duration: { en: "3-4 hours", it: "3-4 ore" },
    players: { en: "3-5 players", it: "3-5 giocatori" }
  },
  mainStoryArcs: [
    {
      title: {
        en: "The Crimson Covenant of Mount Cinder",
        it: "Il Patto Cremisi del Monte Cinereo"
      },
      premise: {
        en: "A knightly order sacrifices innocents to a volcano god to prevent a prophesied eruption.",
        it: "Un ordine cavalleresco sacrifica innocenti a un dio vulcanico per prevenire un'eruzione profetizzata."
      },
      hook: {
        en: "A desperate village elder hires the party to find his missing daughter, last seen near the Monastery of the Ashen Flame on Mount Cinder.",
        it: "Un anziano disperato del villaggio ingaggia il gruppo per trovare sua figlia scomparsa, vista l'ultima volta vicino al Monastero della Fiamma Cinerea sul Monte Cinder."
      },
      objective: {
        en: "Infiltrate the monastery, uncover the truth, and stop the Crimson Covenant's final ritual before it's too late.",
        it: "Infiltratevi nel monastero, scoprite la verità e fermate il rituale finale del Patto Cremisi prima che sia troppo tardi."
      },
      stakes: {
        en: "If the ritual succeeds, the volcano god will awaken enraged, incinerating the region. If it's stopped, the knights will hunt the heroes. The missing villagers' lives hang in the balance.",
        it: "Se il rituale riesce, il dio vulcanico si risveglierà infuriato, incenerendo la regione. Se viene fermato, i cavalieri daranno la caccia agli eroi. Le vite degli abitanti scomparsi sono in bilico."
      },
      climax: {
        en: "A tense confrontation with High Lord Valerius at the heart of the volcano as he is about to sacrifice the final victim. The chamber trembles, and lava rises.",
        it: "Un teso confronto con l'Alto Lord Valerius nel cuore del vulcano mentre sta per sacrificare l'ultima vittima. La camera trema e la lava sale."
      },
      resolution: {
        en: "The party can defeat Valerius and save the victims, becoming local heroes but earning the Covenant's eternal enmity. They might also find an ancient artifact to truly pacify the volcano, offering a more peaceful solution.",
        it: "Il gruppo può sconfiggere Valerius e salvare le vittime, diventando eroi locali ma guadagnandosi l'inimicizia eterna del Patto. Potrebbero anche trovare un antico artefatto per pacificare veramente il vulcano, offrendo una soluzione più pacifica."
      }
    }
  ],
  locations: [
    {
      id: "loc1",
      name: {
        en: "Oakhaven Village",
        it: "Villaggio di Oakhaven"
      },
      description: {
        en: "A small, terrified village at the foot of Mount Cinder. The air is thick with smoke and fear.",
        it: "Un piccolo e terrorizzato villaggio ai piedi del Monte Cinder. L'aria è densa di fumo e paura."
      },
      keyFeatures: {
        en: "Worried elder, nervous villagers, hastily-made 'good luck' charms hanging on doors.",
        it: "Anziano preoccupato, abitanti nervosi, ciondoli 'portafortuna' appesi frettolosamente alle porte."
      }
    },
    {
      id: "loc2",
      name: {
        en: "The Monastery of the Ashen Flame",
        it: "Il Monastero della Fiamma Cinerea"
      },
      description: {
        en: "A grim, fortified structure built from volcanic rock. Red light glows from its windows at night.",
        it: "Una tetra struttura fortificata costruita con roccia vulcanica. Una luce rossa brilla dalle sue finestre di notte."
      },
      keyFeatures: {
        en: "Secret entrance in the crypts, training yard, sacrificial altar in the main hall.",
        it: "Ingresso segreto nelle cripte, cortile di addestramento, altare sacrificale nella sala principale."
      }
    }
  ],
  events: [
    {
      id: "evt1",
      eventType: { en: "Exploration", it: "Esplorazione" },
      description: {
        en: "The party finds a hidden path up the mountain, bypassing the main gate, but it is guarded by Ashen Hounds.",
        it: "Il gruppo trova un sentiero nascosto sulla montagna, aggirando il cancello principale, ma è sorvegliato da Segugi Cinerei."
      },
      clue: {
        en: "The path is marked with a symbol seen on the missing girl's locket.",
        it: "Il sentiero è segnato con un simbolo visto sul medaglione della ragazza scomparsa."
      },
      outcome: {
        en: "Success avoids a direct assault. Failure forces a frontal attack on the monastery.",
        it: "Il successo evita un assalto diretto. Il fallimento costringe a un attacco frontale al monastero."
      }
    },
    {
      id: "evt2",
      eventType: { en: "Social", it: "Sociale" },
      description: {
        en: "The party encounters Sister Elena, a young Covenant acolyte, who is having doubts. She can be persuaded to help them.",
        it: "Il gruppo incontra Sorella Elena, una giovane accolita del Patto, che ha dei dubbi. Può essere persuasa ad aiutarli."
      },
      clue: {
        en: "She reveals the location of the key to the volcanic heart and the time of the final ritual.",
        it: "Rivela la posizione della chiave per il cuore vulcanico e l'ora del rituale finale."
      },
      outcome: {
        en: "Success gains a valuable ally and vital information. Failure makes her report the party to High Lord Valerius, increasing security.",
        it: "Il successo garantisce un alleato prezioso e informazioni vitali. Il fallimento la spinge a denunciare il gruppo all'Alto Lord Valerius, aumentando la sicurezza."
      }
    }
  ],
  npcs: [
    {
      id: "npc1",
      name: { en: "High Lord Valerius", it: "Alto Lord Valerius" },
      role: { en: "Antagonist", it: "Antagonista" },
      keyCharacteristic: {
        en: "Charismatic, zealous, and utterly convinced of his righteousness. He does not see his actions as evil, but as a necessary sacrifice for the greater good.",
        it: "Carismatico, zelante e assolutamente convinto della propria rettitudine. Non vede le sue azioni come malvagie, ma come un sacrificio necessario per il bene superiore."
      },
      motivation: {
        en: "To prevent the cataclysmic eruption foretold in the Covenant's prophecies.",
        it: "Prevenire l'eruzione catastrofica predetta nelle profezie del Patto."
      },
      keyInformation: {
        en: "He knows the exact wording of the ritual and believes only a life can appease the volcano god.",
        it: "Conosce la formulazione esatta del rituale e crede che solo una vita possa placare il dio del vulcano."
      }
    },
    {
      id: "npc2",
      name: { en: "Yorick, the Elder", it: "Yorick, l'Anziano" },
      role: { en: "Quest Giver", it: "Datore di Missione" },
      keyCharacteristic: {
        en: "Desperate and heartbroken, but with a core of iron will. He's the village's unofficial leader.",
        it: "Disperato e con il cuore spezzato, ma con un nucleo di volontà di ferro. È il leader non ufficiale del villaggio."
      },
      motivation: {
        en: "To save his daughter, Lyra, and his village.",
        it: "Salvare sua figlia, Lyra, e il suo villaggio."
      },
      keyInformation: {
        en: "He provides the locket that is a clue to the secret path.",
        it: "Fornisce il medaglione che è un indizio per il sentiero segreto."
      }
    }
  ],
  items: [
    {
      id: "item1",
      name: { en: "Ash-Stained Ritual Dagger", it: "Daga Rituale Macchiata di Cenere" },
      itemType: { en: "Key Item", it: "Oggetto Chiave" },
      effect: {
        en: "A ceremonial dagger used in the Covenant's rituals. It is unsettlingly warm to the touch.",
        it: "Una daga cerimoniale usata nei rituali del Patto. È stranamente calda al tatto."
      },
      locationFound: {
        en: "On a defeated Covenant Knight or on an altar.",
        it: "Su un Cavaliere del Patto sconfitto o su un altare."
      }
    },
    {
      id: "item2",
      name: { en: "Geode of Pacification", it: "Geode della Pacificazione" },
      itemType: { en: "Artifact", it: "Artefatto" },
      effect: {
        en: "An ancient artifact said to calm the spirit of Mount Cinder without the need for sacrifice. Its location is hinted at in the monastery's library.",
        it: "Un antico artefatto che si dice plachi lo spirito del Monte Cinder senza bisogno di sacrifici. La sua posizione è suggerita nella biblioteca del monastero."
      },
      locationFound: {
        en: "Hidden in a puzzle-locked chamber within the library.",
        it: "Nascosto in una camera chiusa da un enigma all'interno della biblioteca."
      }
    }
  ],
  heroes: [
    {
      name: { en: "Alaric", it: "Alaric" },
      gender: { en: "Male", it: "Maschio" },
      age: "28",
      race: { en: "Human", it: "Umano" },
      class: { en: "Wayfarer", it: "Viandante" },
      appearance: {
        en: "Lean and watchful, with a weathered cloak and a perpetually serious expression. His hands are always near the hilts of his twin daggers.",
        it: "Snello e vigile, con un mantello logoro e un'espressione perennemente seria. Le sue mani sono sempre vicine alle else dei suoi due pugnali."
      },
      background: {
        en: "A former member of a mountain clan from this region, he left after a dispute. He knows the mountain's paths but is haunted by his past.",
        it: "Ex membro di un clan di montagna di questa regione, se n'è andato dopo una disputa. Conosce i sentieri della montagna ma è perseguitato dal suo passato."
      },
      status: { en: "Wary", it: "Guardingo" },
      stats: [
        { key: "maxHP", value: "80" },
        { key: "currentHP", value: "80" },
        { key: "dex", value: "d10" },
        { key: "ins", value: "d8" },
        { key: "mig", value: "d8" },
        { key: "wlp", value: "d6" }
      ],
      inventory: [
        { name: { en: "Twin Daggers", it: "Doppi Pugnali" }, quantity: "1", weight: "2" },
        { name: { en: "Traveler's Garb", it: "Vesti da Viaggiatore" }, quantity: "1", weight: "4" }
      ]
    },
    {
      name: { en: "Lina", it: "Lina" },
      gender: { en: "Female", it: "Femmina" },
      age: "22",
      race: { en: "Elf", it: "Elfa" },
      class: { en: "Arcanist (Fire)", it: "Arcanista (Fuoco)" },
      appearance: {
        en: "Bright-eyed with hair like spun copper. Her robes are covered in intricate, self-embroidered runes of protection and power.",
        it: "Occhi brillanti e capelli color rame filato. Le sue vesti sono coperte da intricate rune di protezione e potere, ricamate da lei stessa."
      },
      background: {
        en: "A brilliant student of elemental magic, she is fascinated by the unique geothermal energies of Mount Cinder and came to study them.",
        it: "Una brillante studentessa di magia elementale, è affascinata dalle uniche energie geotermiche del Monte Cinder ed è venuta a studiarle."
      },
      status: { en: "Curious", it: "Curiosa" },
      stats: [
        { key: "maxHP", value: "65" },
        { key: "currentHP", value: "65" },
        { key: "dex", value: "d8" },
        { key: "ins", value: "d12" },
        { key: "mig", value: "d6" },
        { key: "wlp", value: "d10" }
      ],
      inventory: [
        { name: { en: "Oak Staff", it: "Bastone di Quercia" }, quantity: "1", weight: "4" },
        { name: { en: "Spell Components", it: "Componenti per Incantesimi" }, quantity: "1", weight: "1" }
      ]
    },
    {
      name: { en: "Sir Gideon", it: "Sir Gideon" },
      gender: { en: "Male", it: "Maschio" },
      age: "35",
      race: { en: "Human", it: "Umano" },
      class: { en: "Paladin", it: "Paladino" },
      appearance: {
        en: "Broad-shouldered and resolute, clad in gleaming plate armor bearing the crest of a silver sun. His gaze is honest and unwavering.",
        it: "Spalle larghe e risoluto, vestito con un'armatura a piastre scintillante che porta lo stemma di un sole d'argento. Il suo sguardo è onesto and incrollabile."
      },
      background: {
        en: "A knight of the Order of the Silver Sun, Gideon was sent to investigate rumors of a heretical sect tarnishing the name of knighthood on Mount Cinder. He is a bastion of justice.",
        it: "Un cavaliere dell'Ordine del Sole d'Argento, Gideon è stato inviato per indagare su voci di una setta eretica che infanga il nome della cavalleria sul Monte Cinder. È un baluardo della giustizia."
      },
      status: { en: "Righteous", it: "Giusto" },
      stats: [
        { key: "maxHP", value: "90" },
        { key: "currentHP", value: "90" },
        { key: "dex", value: "d6" },
        { key: "ins", value: "d8" },
        { key: "mig", value: "d10" },
        { key: "wlp", value: "d10" }
      ],
      inventory: [
        { name: { en: "Longsword", it: "Spada Lunga" }, quantity: "1", weight: "3" },
        { name: { en: "Heater Shield", it: "Scudo a Mandorla" }, quantity: "1", weight: "6" }
      ]
    }
  ],
  monsters: [
    {
      name: { en: "Covenant Knight", it: "Cavaliere del Patto" },
      attributes: [
        { key: "HP", value: "40" },
        { key: "Defense", value: "12" },
        { key: "Attack", value: "Flaming Longsword (d8+d4 fire)" }
      ],
      inventory: []
    },
    {
      name: { en: "Ashen Hound", it: "Segugio Cinereo" },
      attributes: [
        { key: "HP", value: "30" },
        { key: "Special", value: "Fiery Bite (d6), can inflict Burning status" }
      ],
      inventory: []
    }
  ]
};
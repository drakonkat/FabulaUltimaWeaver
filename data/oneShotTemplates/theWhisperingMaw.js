
export const theWhisperingMaw = {
  title: {
    en: "The Whispering Maw",
    it: "Le Fauci Sussurranti"
  },
  mainStoryArcs: [
    {
      title: {
        en: "The Whispering Maw of Deepdelve",
        it: "Le Fauci Sussurranti di Deepdelve"
      },
      premise: {
        en: "A remote mining outpost goes silent after unearthing a cavern that whispers promises of power, turning miners into crystalline monsters.",
        it: "Un avamposto minerario remoto cade nel silenzio dopo aver scoperto una caverna che sussurra promesse di potere, trasformando i minatori in mostri cristallini."
      },
      hook: {
        en: "The heroes are hired by a mining guild to investigate the Deepdelve outpost, which has missed three consecutive supply runs. A hefty reward is offered for rescue or recovery.",
        it: "Gli eroi vengono ingaggiati da una gilda mineraria per indagare sull'avamposto di Deepdelve, che ha saltato tre consegne di rifornimenti consecutive. Viene offerta una lauta ricompensa per il salvataggio o il recupero."
      },
      objective: {
        en: "Descend into the mine, discover the source of the corruption, and either seal or destroy the 'Whispering Maw' before its influence spreads.",
        it: "Scendete nella miniera, scoprite la fonte della corruzione e sigillate o distruggete le 'Fauci Sussurranti' prima che la sua influenza si diffonda."
      },
      stakes: {
        en: "The entire region is at risk if the crystalline plague spreads beyond the mine. The miners are either dead or transformed into mindless husks.",
        it: "L'intera regione è a rischio se la piaga cristallina si diffonde oltre la miniera. I minatori sono morti o trasformati in gusci senza mente."
      },
      climax: {
        en: "The party reaches the heart of the cavern, where a massive, pulsating geode—the Whispering Maw—is protected by the transformed and heavily mutated mine foreman.",
        it: "Il gruppo raggiunge il cuore della caverna, dove un'enorme geode pulsante - le Fauci Sussurranti - è protetta dal caposquadra della miniera, trasformato e pesantemente mutato."
      },
      resolution: {
        en: "Destroying the Maw shatters all the corrupted creatures but might cause the mine to collapse. Sealing it might contain the threat, but leaves it dormant for the future. The party may also try to harness its power, with unpredictable results.",
        it: "Distruggere le Fauci frantuma tutte le creature corrotte ma potrebbe causare il crollo della miniera. Sigillarle potrebbe contenere la minaccia, ma la lascia dormiente per il futuro. Il gruppo può anche tentare di imbrigliarne il potere, con risultati imprevedibili."
      }
    }
  ],
  locations: [
    {
      id: "loc1",
      name: { en: "Deepdelve Outpost", it: "Avamposto di Deepdelve" },
      description: {
        en: "An eerily silent collection of wooden buildings on the mountainside. Tools are left where they were dropped, and a half-eaten meal sits on a table in the mess hall.",
        it: "Una raccolta di edifici in legno stranamente silenziosa sul fianco della montagna. Gli attrezzi sono stati lasciati dove sono caduti e un pasto a metà è rimasto su un tavolo nella mensa."
      },
      keyFeatures: {
        en: "Foreman's office with a barricaded door, scattered research notes, strange crystal growths on walls.",
        it: "Ufficio del caposquadra con una porta barricata, appunti di ricerca sparsi, strane crescite di cristallo sui muri."
      }
    },
    {
      id: "loc2",
      name: { en: "The Crystal Caverns", it: "Le Caverne di Cristallo" },
      description: {
        en: "The deeper mine shafts are aglow with an unsettling purple light from crystalline veins. A constant, low hum and faint whispers echo through the tunnels.",
        it: "I pozzi più profondi della miniera brillano di un'inquietante luce viola proveniente da vene cristalline. Un ronzio basso e costante e deboli sussurri echeggiano attraverso i tunnel."
      },
      keyFeatures: {
        en: "Crystalline barriers, pulsating nodes that amplify the whispers, the central Maw chamber.",
        it: "Barriere cristalline, nodi pulsanti che amplificano i sussurri, la camera centrale delle Fauci."
      }
    }
  ],
  events: [
    {
      id: "evt1",
      eventType: { en: "Puzzle", it: "Enigma" },
      description: {
        en: "The entrance to the lower mines is blocked by a crystalline barrier that regenerates. Research notes in the foreman's office hint at a specific sonic frequency that can shatter it.",
        it: "L'ingresso alle miniere inferiori è bloccato da una barriera cristallina che si rigenera. Gli appunti di ricerca nell'ufficio del caposquadra suggeriscono una specifica frequenza sonica che può frantumarla."
      },
      clue: {
        en: "The party must use mining equipment (hammers, drills) in a specific sequence to create the frequency.",
        it: "Il gruppo deve usare l'attrezzatura mineraria (martelli, trapani) in una sequenza specifica per creare la frequenza."
      },
      outcome: {
        en: "Success grants access to the deeper caverns. Failure attracts more Crystal-touched Miners with each attempt.",
        it: "Il successo garantisce l'accesso alle caverne più profonde. Il fallimento attira altri Minatori Toccati dal Cristallo ad ogni tentativo."
      }
    },
    {
      id: "evt2",
      eventType: { en: "Combat", it: "Combattimento" },
      description: {
        en: "The party is ambushed in a large cavern by Maw Echoes, floating crystalline entities that phase through walls to attack from multiple angles.",
        it: "Il gruppo cade in un'imboscata in una grande caverna da parte degli Echi delle Fauci, entità cristalline fluttuanti che attraversano i muri per attaccare da più angolazioni."
      },
      clue: {
        en: "The Echoes are tethered to a larger pulsating crystal node in the center of the room. Destroying it makes them vulnerable.",
        it: "Gli Echi sono legati a un nodo di cristallo pulsante più grande al centro della stanza. Distruggerlo li rende vulnerabili."
      },
      outcome: {
        en: "Surviving the ambush allows the party to learn how to deal with the Maw's primary defenders.",
        it: "Sopravvivere all'imboscata permette al gruppo di imparare come affrontare i principali difensori delle Fauci."
      }
    }
  ],
  npcs: [
    {
      id: "npc1",
      name: { en: "Foreman Borin (Transformed)", it: "Caposquadra Borin (Trasformato)" },
      role: { en: "Antagonist/Boss", it: "Antagonista/Boss" },
      keyCharacteristic: {
        en: "Once a proud and loud dwarf, his body is now a horrifying fusion of flesh and crystal. He still mutters about quotas and safety, but his words are twisted by the Maw's influence.",
        it: "Un tempo un nano fiero e rumoroso, il suo corpo è ora un'orribile fusione di carne e cristallo. Borbotta ancora di quote e sicurezza, ma le sue parole sono distorte dall'influenza delle Fauci."
      },
      motivation: {
        en: "To protect the 'beautiful silence' of the Maw and bring more 'workers' into its light.",
        it: "Proteggere il 'bellissimo silenzio' delle Fauci e portare più 'lavoratori' nella sua luce."
      },
      keyInformation: {
        en: "He carries the master key that opens the final door to the Maw's chamber.",
        it: "Porta con sé la chiave universale che apre la porta finale della camera delle Fauci."
      }
    },
    {
      id: "npc2",
      name: { en: "Silas, the Scholar (Journal)", it: "Silas, lo Studioso (Diario)" },
      role: { en: "Quest Giver (posthumous)", it: "Datore di Missione (postumo)" },
      keyCharacteristic: {
        en: "The party finds the journal of a scholar who was studying the strange crystals. His entries go from scientific curiosity to paranoid terror.",
        it: "Il gruppo trova il diario di uno studioso che stava studiando gli strani cristalli. Le sue annotazioni passano dalla curiosità scientifica al terrore paranoico."
      },
      motivation: {
        en: "To understand the entity before he was consumed by it.",
        it: "Comprendere l'entità prima di esserne consumato."
      },
      keyInformation: {
        en: "His final entry reveals the Maw's weakness: a pure, unaltered piece of the original rock it grew from, located in his office.",
        it: "La sua ultima annotazione rivela la debolezza delle Fauci: un pezzo puro e inalterato della roccia originale da cui è cresciuto, situato nel suo ufficio."
      }
    }
  ],
  items: [
    {
      id: "item1",
      name: { en: "Foreman's Journal", it: "Diario del Caposquadra" },
      itemType: { en: "Key Item", it: "Oggetto Chiave" },
      effect: {
        en: "Details the initial discovery and the slow descent of the miners into madness. Contains clues about the crystal's sonic weakness.",
        it: "Dettaglia la scoperta iniziale e la lenta discesa dei minatori nella follia. Contiene indizi sulla debolezza sonica del cristallo."
      },
      locationFound: {
        en: "Barricaded Foreman's office in the outpost.",
        it: "Ufficio barricato del caposquadra nell'avamposto."
      }
    },
    {
      id: "item2",
      name: { en: "Heartstone", it: "Pietra del Cuore" },
      itemType: { en: "Key Item", it: "Oggetto Chiave" },
      effect: {
        en: "A dull, grey rock that is immune to the Maw's corruption. It resonates when near the Maw, and can disrupt its energy field, making it vulnerable.",
        it: "Una roccia grigia e opaca immune alla corruzione delle Fauci. Risuona quando è vicina alle Fauci e può disturbarne il campo energetico, rendendole vulnerabili."
      },
      locationFound: {
        en: "In a lockbox in the scholar's abandoned room.",
        it: "In una cassetta di sicurezza nella stanza abbandonata dello studioso."
      }
    }
  ],
  heroes: [
    {
      name: { en: "Zora", it: "Zora" },
      gender: { en: "Female", it: "Femmina" },
      age: "85",
      race: { en: "Dwarf", it: "Nana" },
      class: { en: "Guardian", it: "Guardiana" },
      appearance: {
        en: "Stocky and powerful, with iron-grey braids and hands calloused from years of wielding a pickaxe. She wears sturdy, practical mining gear.",
        it: "Robusta e potente, con trecce grigio ferro e mani callose da anni di uso del piccone. Indossa un'attrezzatura da miniera robusta e pratica."
      },
      background: {
        en: "A seasoned prospector who has worked in dozens of mines. She knew Foreman Borin and finds the outpost's silence deeply unsettling.",
        it: "Una cercatrice esperta che ha lavorato in dozzine di miniere. Conosceva il caposquadra Borin e trova il silenzio dell'avamposto profondamente inquietante."
      },
      status: { en: "Determined", it: "Determinata" },
      stats: [
        { key: "maxHP", value: "95" },
        { key: "currentHP", value: "95" },
        { key: "dex", value: "d6" },
        { key: "ins", value: "d8" },
        { key: "mig", value: "d12" },
        { key: "wlp", value: "d8" }
      ],
      inventory: [
        { name: { en: "Heavy Pickaxe", it: "Piccone Pesante" }, quantity: "1", weight: "10" },
        { name: { en: "Lantern", it: "Lanterna" }, quantity: "1", weight: "2" }
      ]
    },
    {
      name: { en: "Silas", it: "Silas" },
      gender: { en: "Male", it: "Maschio" },
      age: "45",
      race: { en: "Human", it: "Umano" },
      class: { en: "Enigmatist", it: "Enigmista" },
      appearance: {
        en: "Tall and gaunt, with ink-stains on his fingers and spectacles perched on his nose. He carries a heavy satchel full of books and measuring tools.",
        it: "Alto e scarno, with macchie d'inchiostro sulle dita e occhiali posati sul naso. Porta una pesante borsa piena di libri e strumenti di misurazione."
      },
      background: {
        en: "A geologist and scholar from the Royal Academy, sent to investigate strange energy readings from Deepdelve. He suspects this is more than a simple mining accident.",
        it: "Un geologo e studioso dell'Accademia Reale, inviato per indagare su strane letture di energia da Deepdelve. Sospetta che sia più di un semplice incidente minerario."
      },
      status: { en: "Anxious", it: "Ansioso" },
      stats: [
        { key: "maxHP", value: "60" },
        { key: "currentHP", value: "60" },
        { key: "dex", value: "d8" },
        { key: "ins", value: "d10" },
        { key: "mig", value: "d6" },
        { key: "wlp", value: "d12" }
      ],
      inventory: [
        { name: { en: "Scholarly Tome", it: "Tomo Accademico" }, quantity: "1", weight: "5" },
        { name: { en: "Geological Tools", it: "Strumenti Geologici" }, quantity: "1", weight: "8" }
      ]
    }
  ],
  monsters: [
    {
      name: { en: "Crystal-touched Miner", it: "Minatore Toccato dai Cristalli" },
      attributes: [
        { key: "HP", value: "35" },
        { key: "Attack", value: "Crystal Shard (d6), can cause Bleeding" }
      ],
      inventory: []
    },
    {
      name: { en: "Maw Echo", it: "Eco delle Fauci" },
      attributes: [
        { key: "HP", value: "25" },
        { key: "Special", value: "Psychic Jab (d8 willpower damage), Phasing" }
      ],
      inventory: []
    }
  ]
};

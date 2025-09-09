export const theSylvanOracle = {
  title: {
    en: "The Sylvan Oracle",
    it: "L'Oracolo Silvano"
  },
  metadata: {
    difficulty: { en: "Medium", it: "Medio" },
    duration: { en: "5-6 hours (multi-arc)", it: "5-6 ore (multi-arco)" },
    players: { en: "3-5 players", it: "3-5 giocatori" }
  },
  mainStoryArcs: [
    {
      id: "arc1",
      title: {
        en: "Arc 1: The Withering Woods",
        it: "Arco 1: Il Bosco Avvizzito"
      },
      premise: {
        en: "The ancient Whisperwood is sickening, and a creeping blight threatens the nearby village of Oakhaven. The party must seek the mythical Sylvan Oracle for a cure.",
        it: "L'antico Bosco dei Sussurri sta deperendo e una piaga strisciante minaccia il vicino villaggio di Oakhaven. Il gruppo deve cercare il mitico Oracolo Silvano per una cura."
      },
      hook: {
        en: "The village's water source, a stream from the Whisperwood, has turned black. The village healer is out of remedies and directs the party to seek the forest's guardian.",
        it: "La fonte d'acqua del villaggio, un ruscello che sgorga dal Bosco dei Sussurri, è diventata nera. La guaritrice del villaggio non ha più rimedi e indirizza il gruppo a cercare il guardiano della foresta."
      },
      objective: {
        en: "Navigate the blighted forest, overcome its corrupted creatures, and find the Sylvan Oracle's hidden grove.",
        it: "Attraversate la foresta infetta, superate le sue creature corrotte e trovate il boschetto nascosto dell'Oracolo Silvano."
      },
      stakes: {
        en: "The blight will consume the forest and then the village. The creatures within the wood become more aggressive each day.",
        it: "La piaga consumerà la foresta e poi il villaggio. Le creature all'interno del bosco diventano ogni giorno più aggressive."
      },
      climax: {
        en: "The party finds the grove, but it is defended by a corrupted Treant, a former protector of the Oracle, now driven mad by the blight.",
        it: "Il gruppo trova il boschetto, ma è difeso da un Treant corrotto, un ex protettore dell'Oracolo, ora impazzito a causa della piaga."
      },
      resolution: {
        en: "Defeating the Treant (or cleansing it) allows the party to meet the Oracle, who reveals the next step.",
        it: "Sconfiggere il Treant (o purificarlo) permette al gruppo di incontrare l'Oracolo, che rivela il passo successivo."
      }
    },
    {
      id: "arc2",
      title: {
        en: "Arc 2: The Oracle's Trial",
        it: "Arco 2: La Prova dell'Oracolo"
      },
      premise: {
        en: "The Oracle, a powerful spirit dwelling within an ancient tree, demands the party prove their worth by retrieving three Moonpetal flowers from the perilous Shadowfen Mire.",
        it: "L'Oracolo, un potente spirito che dimora in un albero antico, chiede al gruppo di dimostrare il proprio valore recuperando tre fiori di Petalo di Luna dalla pericolosa Palude di Umbraombra."
      },
      hook: {
        en: "The Oracle explains that only the pure essence of the Moonpetals can be used in a ritual to cleanse the forest's heart.",
        it: "L'Oracolo spiega che solo la pura essenza dei Petali di Luna può essere usata in un rituale per purificare il cuore della foresta."
      },
      objective: {
        en: "Travel to the Shadowfen Mire, overcome its unique challenges (like illusory terrain and territorial beasts), and gather three untainted Moonpetal flowers.",
        it: "Viaggiate fino alla Palude di Umbraombra, superate le sue sfide uniche (come terreno illusorio e bestie territoriali) e raccogliete tre fiori di Petalo di Luna incontaminati."
      },
      stakes: {
        en: "The Mire is home to creatures that feed on light and hope. Lingering too long could drain the heroes' spirits. The Moonpetals wilt quickly once picked.",
        it: "La Palude è la dimora di creature che si nutrono di luce e speranza. Rimanere troppo a lungo potrebbe prosciugare lo spirito degli eroi. I Petali di Luna appassiscono rapidamente una volta raccolti."
      },
      climax: {
        en: "The final Moonpetal is guarded by a territorial Hydra that has made its nest in the heart of the Mire.",
        it: "L'ultimo Petalo di Luna è custodito da un'Idra territoriale che ha fatto il suo nido nel cuore della Palude."
      },
      resolution: {
        en: "With the three Moonpetals in hand, the party can return to the Oracle, who will now provide the full ritual to save the forest.",
        it: "Con i tre Petali di Luna in mano, il gruppo può tornare dall'Oracolo, che ora fornirà il rituale completo per salvare la foresta."
      }
    },
    {
        id: "arc3",
        title: {
          en: "Arc 3: The Blighted Heart",
          it: "Arco 3: Il Cuore Infetto"
        },
        premise: {
          en: "With the Oracle's guidance, the party must venture to the Blighted Heart of the forest and use the Moonpetals in a ritual to cleanse the corrupted heartwood.",
          it: "Con la guida dell'Oracolo, il gruppo deve avventurarsi nel Cuore Infetto della foresta e usare i Petali di Luna in un rituale per purificare il durame corrotto."
        },
        hook: {
          en: "The Oracle provides a map to a cavern system beneath the oldest tree, where the blight originates from a dark artifact embedded in its roots.",
          it: "L'Oracolo fornisce una mappa per un sistema di caverne sotto l'albero più antico, dove la piaga ha origine da un oscuro artefatto incastonato nelle sue radici."
        },
        objective: {
          en: "Reach the heartwood chamber, perform the cleansing ritual with the Moonpetals, and defend the ritual site from waves of corrupted creatures drawn to the power.",
          it: "Raggiungete la camera del durame, eseguite il rituale di purificazione con i Petali di Luna e difendete il sito rituale da ondate di creature corrotte attratte dal potere."
        },
        stakes: {
          en: "Failure to complete the ritual will cause the blight to erupt uncontrollably, destroying the Whisperwood and its Oracle permanently.",
          it: "Il fallimento del rituale causerà un'eruzione incontrollabile della piaga, distruggendo permanentemente il Bosco dei Sussurri e il suo Oracolo."
        },
        climax: {
          en: "As the ritual nears completion, the artifact itself awakens, manifesting a powerful Blight Elemental, the physical embodiment of the corruption, for a final battle.",
          it: "Mentre il rituale si avvicina al completamento, l'artefatto stesso si risveglia, manifestando un potente Elementale della Piaga, l'incarnazione fisica della corruzione, per una battaglia finale."
        },
        resolution: {
          en: "Upon defeating the elemental and completing the ritual, the blight recedes, and the forest begins to heal. The Oracle and the people of Oakhaven are eternally grateful, bestowing a powerful boon upon the heroes.",
          it: "Dopo aver sconfitto l'elementale e completato il rituale, la piaga si ritira e la foresta inizia a guarire. L'Oracolo e la gente di Oakhaven sono eternamente grati e conferiscono un potente dono agli eroi."
        }
    }
  ],
  locations: [
    {
      id: "loc1",
      name: { en: "Oakhaven Village", it: "Villaggio di Oakhaven" },
      description: { en: "A peaceful village on the edge of a great forest, now gripped by fear as the woods wither and the water turns foul.", it: "Un villaggio pacifico ai margini di una grande foresta, ora attanagliato dalla paura mentre il bosco avvizzisce e l'acqua diventa torbida." },
      keyFeatures: { en: "Worried villagers, a desperate healer, a blackened stream.", it: "Abitanti preoccupati, una guaritrice disperata, un ruscello annerito." }
    },
    {
      id: "loc2",
      name: { en: "The Oracle's Grove", it: "Il Boschetto dell'Oracolo" },
      description: { en: "A sanctuary of peace amidst the blight, centered around a colossal, ancient tree from which a soft, green light emanates.", it: "Un santuario di pace in mezzo alla piaga, centrato attorno a un colossale albero antico da cui emana una debole luce verde." },
      keyFeatures: { en: "The Oracle Tree, a cleansing pool, defended by a guardian.", it: "L'Albero dell'Oracolo, una pozza purificatrice, difeso da un guardiano." }
    },
    {
      id: "loc3",
      name: { en: "Shadowfen Mire", it: "Palude di Umbraombra" },
      description: { en: "A treacherous swamp where shadowy illusions play tricks on the eyes and strange, dangerous flora and fauna thrive.", it: "Una palude infida dove illusioni d'ombra ingannano la vista e prosperano flora e fauna strane e pericolose." },
      keyFeatures: { en: "Illusory paths, grasping vines, Moonpetal flowers glowing faintly in the dark.", it: "Sentieri illusori, viticci avvinghianti, fiori di Petalo di Luna che brillano debolmente nell'oscurità." }
    }
  ],
  events: [
    {
      id: "evt1",
      eventType: { en: "Exploration", it: "Esplorazione" },
      description: { en: "The party must follow the corrupted stream into the Whisperwood, facing aggressive, blighted wildlife along the way.", it: "Il gruppo deve seguire il ruscello corrotto nel Bosco dei Sussurri, affrontando animali selvatici aggressivi e infetti lungo il cammino." },
      clue: { en: "Strange, pulsating roots seem to be the source of the corruption, all leading deeper into the forest.", it: "Strane radici pulsanti sembrano essere la fonte della corruzione, e tutte conducono più in profondità nella foresta." },
      outcome: { en: "Success leads them to the Oracle's Grove. Failure could lead to them becoming lost or overwhelmed by blighted creatures.", it: "Il successo li conduce al Boschetto dell'Oracolo. Il fallimento potrebbe farli perdere o sopraffare dalle creature infette." }
    }
  ],
  npcs: [
    {
      id: "npc1",
      name: { en: "The Sylvan Oracle", it: "L'Oracolo Silvano" },
      role: { en: "Mentor / Guide", it: "Mentore / Guida" },
      keyCharacteristic: { en: "A genderless, ancient spirit of the forest. Communicates through rustling leaves and visions projected into the minds of those it deems worthy. It is wise but weakened by the blight.", it: "Uno spirito asessuato e antico della foresta. Comunica attraverso il fruscio delle foglie e visioni proiettate nelle menti di coloro che ritiene degni. È saggio ma indebolito dalla piaga." },
      motivation: { en: "To preserve itself and the Whisperwood at any cost.", it: "Preservare se stesso e il Bosco dei Sussurri a ogni costo." },
      keyInformation: { en: "Knows the nature of the blight, the need for the Moonpetals, and the location of the Blighted Heart.", it: "Conosce la natura della piaga, la necessità dei Petali di Luna e l'ubicazione del Cuore Infetto." }
    },
    {
      id: "npc2",
      name: { en: "Elara, Village Healer", it: "Elara, Guaritrice del Villaggio" },
      role: { en: "Quest Giver", it: "Datrice di Missione" },
      keyCharacteristic: { en: "A kind, elderly woman whose knowledge of herbs and poultices is legendary. She is pragmatic and deeply cares for her community.", it: "Una donna anziana e gentile la cui conoscenza di erbe e impiastri è leggendaria. È pragmatica e si prende profondamente cura della sua comunità." },
      motivation: { en: "To find a cure for the blight and save her village from a slow death.", it: "Trovare una cura per la piaga e salvare il suo villaggio da una morte lenta." },
      keyInformation: { en: "She is the one who remembers the legends of the Sylvan Oracle and can point the heroes in the right direction.", it: "È lei che ricorda le leggende dell'Oracolo Silvano e può indicare agli eroi la giusta direzione." }
    }
  ],
  items: [
    {
      id: "item1",
      name: { en: "Moonpetal Flower", it: "Fiore di Petalo di Luna" },
      itemType: { en: "Key Item", it: "Oggetto Chiave" },
      effect: { en: "A rare flower that blooms only in darkness. Its petals have powerful purifying properties and are essential for the cleansing ritual.", it: "Un fiore raro che sboccia solo nell'oscurità. I suoi petali hanno potenti proprietà purificanti e sono essenziali per il rituale di purificazione." },
      locationFound: { en: "The Shadowfen Mire", it: "La Palude di Umbraombra" }
    },
    {
      id: "item2",
      name: { en: "Oracle's Verdant Bow", it: "Arco Verdeggiante dell'Oracolo" },
      itemType: { en: "Loot", it: "Bottino" },
      effect: { en: "A magical longbow gifted by the Oracle upon saving the forest. Arrows fired from it sprout grasping vines on impact.", it: "Un arco lungo magico donato dall'Oracolo dopo aver salvato la foresta. Le frecce scoccate da esso fanno germogliare viticci avvinghianti all'impatto." },
      locationFound: { en: "Reward from the Sylvan Oracle.", it: "Ricompensa dall'Oracolo Silvano." }
    }
  ],
  heroes: [
    {
      name: { en: "Faelan", it: "Faelan" },
      gender: { en: "Male", it: "Maschio" },
      age: "120",
      race: { en: "Elf", it: "Elfo" },
      class: { en: "Ranger", it: "Ramingo" },
      appearance: { en: "Keen-eyed and swift, with leather armor adorned with leaves and feathers. He moves with a quiet grace that speaks of a life in the wilds.", it: "Occhi acuti e veloce, con un'armatura di cuoio adornata di foglie e piume. Si muove con una grazia silenziosa che testimonia una vita nelle terre selvagge." },
      background: { en: "Faelan grew up in the Whisperwood and considers himself its protector. He felt the blight's touch as a physical pain and is driven to heal his home.", it: "Faelan è cresciuto nel Bosco dei Sussurri e si considera il suo protettore. Ha avvertito il tocco della piaga come un dolore fisico ed è determinato a guarire la sua casa." },
      status: { en: "Vigilant", it: "Vigile" },
      stats: [
        { key: "maxHP", value: "80" }, { key: "currentHP", value: "80" },
        { key: "dex", value: "d12" }, { key: "ins", value: "d8" }, { key: "mig", value: "d6" }, { key: "wlp", value: "d8" }
      ],
      inventory: [
        { name: { en: "Elm Bow", it: "Arco d'Olmo" }, quantity: "1", weight: "2" },
        { name: { en: "Herbalism Kit", it: "Kit da Erborista" }, quantity: "1", weight: "3" }
      ]
    },
    {
      name: { en: "Serafina", it: "Serafina" },
      gender: { en: "Female", it: "Femmina" },
      age: "26",
      race: { en: "Human", it: "Umana" },
      class: { en: "Cleric of Renewal", it: "Chierica del Rinnovamento" },
      appearance: { en: "Clad in white and green robes, carrying a staff topped with a living seed. Her presence is calming and reassuring.", it: "Vestita con abiti bianchi e verdi, porta un bastone sormontato da un seme vivente. La sua presenza è calmante e rassicurante." },
      background: { en: "Sent from a distant temple to investigate the unnatural blight, Serafina is a scholar of purification rituals and sees this as a divine test.", it: "Inviata da un tempio lontano per indagare sulla piaga innaturale, Serafina è una studiosa di rituali di purificazione e vede questa come una prova divina." },
      status: { en: "Faithful", it: "Fiduciosa" },
      stats: [
        { key: "maxHP", value: "70" }, { key: "currentHP", value: "70" },
        { key: "dex", value: "d6" }, { key: "ins", value: "d10" }, { key: "mig", value: "d8" }, { key: "wlp", value: "d12" }
      ],
      inventory: [
        { name: { en: "Livingwood Staff", it: "Bastone di Legnovivo" }, quantity: "1", weight: "4" },
        { name: { en: "Holy Symbol", it: "Simbolo Sacro" }, quantity: "1", weight: "1" }
      ]
    },
    {
      name: { en: "Borin Stonehand", it: "Borin Manodipietra" },
      gender: { en: "Male", it: "Maschio" },
      age: "154",
      race: { en: "Dwarf", it: "Nano" },
      class: { en: "Guardian", it: "Guardiano" },
      appearance: { en: "Stout and dependable, with a magnificent beard braided with stone beads. His hands are covered in stonemason's dust.", it: "Robusto e affidabile, con una magnifica barba intrecciata con perle di pietra. Le sue mani sono coperte di polvere di scalpellino." },
      background: { en: "A master stonemason from the nearby mountains, Borin felt the blight as a sickness in the very rock and earth. He has come to Oakhaven to find the source of this corruption.", it: "Un maestro scalpellino delle montagne vicine, Borin ha avvertito la piaga come una malattia nella roccia e nella terra stessa. È venuto a Oakhaven per trovare la fonte di questa corruzione." },
      status: { en: "Worried", it: "Preoccupato" },
      stats: [
        { key: "maxHP", value: "100" }, { key: "currentHP", value: "100" },
        { key: "dex", value: "d6" }, { key: "ins", value: "d6" }, { key: "mig", value: "d12" }, { key: "wlp", value: "d10" }
      ],
      inventory: [
        { name: { en: "Stonemason's Hammer", it: "Martello da Scalpellino" }, quantity: "1", weight: "10" },
        { name: { en: "Dwarven Shield", it: "Scudo Nanico" }, quantity: "1", weight: "8" }
      ]
    }
  ],
  monsters: [
    {
      name: { en: "Blighted Wolf", it: "Lupo Infetto" },
      attributes: [
        { key: "HP", value: "30" },
        { key: "Attack", value: "Corrupted Bite (d8), may inflict Poison" }
      ],
      inventory: []
    },
    {
      name: { en: "Corrupted Treant", it: "Treant Corrotto" },
      attributes: [
        { key: "HP", value: "80" },
        { key: "Special", value: "Slam (d10), Grasping Roots (restrain)" }
      ],
      inventory: []
    },
    {
      name: { en: "Shadowfen Hydra", it: "Idra di Umbraombra" },
      attributes: [
        { key: "HP", value: "100" },
        { key: "Special", value: "Multi-bite (3x d8), Regenerates 1 head per turn" }
      ],
      inventory: []
    },
    {
      name: { en: "Blight Elemental", it: "Elementale della Piaga" },
      attributes: [
        { key: "HP", value: "120" },
        { key: "Special", value: "Withering Touch (d12 necrotic), Blight Nova (AoE)" }
      ],
      inventory: []
    }
  ]
};

export const heroTemplates = [
    {
        name: "Kaelen",
        gender: "Male",
        age: "32",
        race: "Human",
        class: "Sellsword",
        appearance: "Tall and lean with sharp features, dark hair, and intense grey eyes. Wears practical leather armor.",
        background: "A former city guard who was exiled after uncovering a conspiracy. Now a sellsword with a strong sense of justice.",
        stats: {
            dd: { str: 16, dex: 14, con: 14, int: 10, wis: 12, cha: 11 },
            fu: { dex: 'd10', ins: 'd8', mig: 'd10', wlp: 'd6' }
        }
    },
    {
        name: "Lyra",
        gender: "Female",
        age: "24",
        race: "Elf",
        class: "Arcanist",
        appearance: "Slight build with nimble fingers and bright, curious green eyes. Her clothes are functional but have small, personalized embroided symbols.",
        background: "A gifted magic academy dropout who prefers learning from ancient ruins rather than dusty books. She is searching for a lost family artifact.",
        stats: {
            dd: { str: 8, dex: 15, con: 12, int: 17, wis: 14, cha: 12 },
            fu: { dex: 'd10', ins: 'd12', mig: 'd6', wlp: 'd8' }
        }
    },
    {
        name: "Borin",
        gender: "Male",
        age: "145",
        race: "Dwarf",
        class: "Guardian",
        appearance: "Broad-shouldered and stout, with a magnificent braided beard and a friendly, booming laugh. He's covered in clan tattoos.",
        background: "A mountain-born artisan who left his clan's forge to see the world. He believes every problem can be solved with a hammer, either for smithing or for smashing.",
        stats: {
            dd: { str: 17, dex: 10, con: 16, int: 11, wis: 13, cha: 9 },
            fu: { dex: 'd6', ins: 'd8', mig: 'd12', wlp: 'd8' }
        }
    },
    {
        name: "Seraphina",
        gender: "Female",
        age: "29",
        race: "Aasimar",
        class: "Cleric",
        appearance: "Elegant and poised, always clad in the immaculate white and gold robes of her order. Carries a ceremonial staff topped with a glowing crystal.",
        background: "A cleric devoted to the goddess of light. She was sent from her temple on a sacred mission to combat a spreading darkness she has only seen in visions.",
        stats: {
            dd: { str: 12, dex: 11, con: 14, int: 13, wis: 17, cha: 16 },
            fu: { dex: 'd6', ins: 'd10', mig: 'd8', wlp: 'd12' }
        }
    },
    {
        name: "Cyrus (Fabula)",
        characterType: "fabulaUltima",
        gender: "Male",
        age: "19",
        race: "Human",
        classes: [ { classId: 'darkblade', level: 3 }, { classId: 'weaponmaster', level: 2 } ],
        appearance: "A young man with silver hair and intense amber eyes. Wears a long black coat over light armor and always keeps his hand near the hilt of his oversized sword.",
        background: "An orphan from a forgotten village, Cyrus was trained by a mysterious master swordsman. He seeks to understand the darkness that grows within him, a power that manifests through his blade.",
        fabulaAttributes: { dex: 'd8', ins: 'd6', mig: 'd10', wlp: 'd8' },
        inventory: [
            { name: { en: 'Greatsword', it: 'Spadone' }, quantity: 1 },
            { name: { en: 'Leather Armor', it: 'Armatura di Cuoio' }, quantity: 1 }
        ]
    },
    {
        name: "Elara (Fabula)",
        characterType: "fabulaUltima",
        gender: "Female",
        age: "22",
        race: "Elf",
        classes: [ { classId: 'spiritist', level: 3 }, { classId: 'loremaster', level: 2 } ],
        appearance: "A serene elf with long, white hair and gentle blue eyes. She wears simple, elegant robes and carries a staff made of silver birch.",
        background: "A prodigy from the White Archives, Elara left her studies to experience the world she had only read about. She believes true knowledge lies in understanding the spirits of the living and the dead.",
        fabulaAttributes: { dex: 'd6', ins: 'd10', mig: 'd6', wlp: 'd12' },
        inventory: [
            { name: { en: 'Staff', it: 'Bastone' }, quantity: 1 },
            { name: { en: "Traveler's Garb", it: "Vesti da Viaggiatore" }, quantity: 1 }
        ]
    },
    {
        name: "Remi (Fabula)",
        characterType: "fabulaUltima",
        gender: "Non-binary",
        age: "17",
        race: "Gnome",
        classes: [ { classId: 'artificer', level: 3 }, { classId: 'sharpshooter', level: 2 } ],
        appearance: "A small, energetic gnome with oil-stained clothes, goggles perched on their forehead, and a constant flicker of ideas in their eyes. They are never without their custom-built magitech rifle.",
        background: "A genius inventor who ran away from a restrictive apprenticeship to pursue their own creations. Remi believes technology can solve any problem, and is eager to prove it by testing their inventions in the field.",
        fabulaAttributes: { dex: 'd10', ins: 'd10', mig: 'd6', wlp: 'd6' },
        inventory: [
            { name: { en: 'Revolver', it: 'Revolver' }, quantity: 1 },
            { name: { en: "Traveler's Garb", it: "Vesti da Viaggiatore" }, quantity: 1 }
        ]
    },
    {
        name: "Draven (Fabula)",
        characterType: "fabulaUltima",
        gender: "Male",
        age: "26",
        race: "Dragon-kin",
        classes: [ { classId: 'guardian', level: 3 }, { classId: 'weaponmaster', level: 2 } ],
        appearance: "Tall and imposing, with scales dotting his skin and eyes like molten gold. He wears ornate, heavy armor stylized to resemble a dragon.",
        background: "Hailing from a secluded clan of dragon-worshippers, Draven left his home to test his mettle and uphold his honor. He wields his spear not just as a weapon, but as an extension of his soul.",
        fabulaAttributes: { dex: 'd8', ins: 'd6', mig: 'd12', wlp: 'd8' },
        inventory: [
            { name: { en: 'Spear', it: 'Lancia' }, quantity: 1 },
            { name: { en: 'Chain Mail', it: 'Cotta di Maglia' }, quantity: 1 }
        ]
    },
    {
        name: "Eira (Fabula)",
        characterType: "fabulaUltima",
        gender: "Female",
        age: "21",
        race: "Sylph",
        classes: [ { classId: 'spiritist', level: 3 }, { classId: 'orator', level: 2 } ],
        appearance: "Graceful and slight, with hair like spun moonlight and eyes that sparkle with kindness. She wears flowing white and blue robes.",
        background: "A gifted priestess from a remote temple, Eira's voice can soothe wounds and inspire courage. She travels the world to spread hope, believing that compassion is the strongest magic of all.",
        fabulaAttributes: { dex: 'd6', ins: 'd10', mig: 'd6', wlp: 'd12' },
        inventory: [
            { name: { en: 'Staff', it: 'Bastone' }, quantity: 1 },
            { name: { en: "Traveler's Garb", it: "Vesti da Viaggiatore" }, quantity: 1 }
        ]
    },
    {
        name: "Zephyr (Fabula)",
        characterType: "fabulaUltima",
        gender: "Male",
        age: "23",
        race: "Human",
        classes: [ { classId: 'scoundrel', level: 3 }, { classId: 'wayfarer', level: 2 } ],
        appearance: "Wiry and quick, always hidden beneath a dark cloak and cowl. His movements are silent and precise, and his face is rarely seen.",
        background: "Raised in the shadows of a sprawling metropolis, Zephyr learned that survival meant being unseen and unheard. He is a master of infiltration and subterfuge, working for his own code of justice—liberating wealth from those who don't deserve it.",
        fabulaAttributes: { dex: 'd12', ins: 'd10', mig: 'd6', wlp: 'd6' },
        inventory: [
            { name: { en: 'Dagger', it: 'Pugnale' }, quantity: 2 },
            { name: { en: 'Leather Armor', it: 'Armatura di Cuoio' }, quantity: 1 }
        ]
    }
];

import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const STORY_GENERATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    storyName: {
      type: Type.STRING,
      description: "The evocative and engaging name for this story or quest, in the style of the selected TTRPG system.",
    },
    NPC: {
      type: Type.ARRAY,
      description: "A list of Non-Player Characters involved in the story. Must include at least one NPC.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "The full name of the NPC. Should sound like a name from the selected TTRPG's setting (e.g., JRPG-style for Fabula Ultima, classic fantasy for D&D).",
          },
          description: {
            type: Type.STRING,
            description: "A detailed description of the NPC's appearance, personality, motivations, and role in the story.",
          },
        },
        required: ['name', 'description'],
      },
    },
    backgroundStory: {
      type: Type.STRING,
      description: "The detailed background and lore of the current situation or quest. This provides context for the GM.",
    },
    mustCombat: {
      type: Type.OBJECT,
      nullable: true,
      description: "Details of a potential combat encounter. If no combat is necessary or directly implied by the prompt, this field must be null.",
      properties: {
        who: {
          type: Type.STRING,
          description: "Who or what the players must fight (e.g., 'a squadron of imperial soldiers', 'a rabid griffin').",
        },
        difficulty: {
          type: Type.STRING,
          description: "The difficulty level of the combat encounter.",
          enum: ["high", "normal", "low"],
        },
      },
    },
    previousSituation: {
      type: Type.STRING,
      description: "A summary of the events that led directly to the start of this scenario. What just happened to the players?",
    },
    masterToRead: {
      type: Type.STRING,
      description: "A block of text intended to be read aloud by the Game Master to the players to set the scene. It should be immersive and descriptive.",
    },
    worldSituationUpdate: {
        type: Type.STRING,
        nullable: true,
        description: "If the world has changed significantly (e.g., due to the passage of time or major events), describe those changes here. If not, this field must be null."
    }
  },
  required: ['storyName', 'NPC', 'backgroundStory', 'previousSituation', 'masterToRead'],
};

const ONE_SHOT_SCHEMAS = {
    mainStoryArc: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: "An evocative title for the one-shot adventure." },
            premise: { type: Type.STRING, description: "A one-sentence summary of the adventure." },
            hook: { type: Type.STRING, description: "How the players get involved in the story." },
            objective: { type: Type.STRING, description: "The primary, clear goal for the players." },
            stakes: { type: Type.STRING, description: "What happens if the players fail their objective." },
            climax: { type: Type.STRING, description: "The final confrontation or peak event of the story." },
            resolution: { type: Type.STRING, description: "The potential outcomes and aftermath of the adventure." },
        },
        required: ['title', 'premise', 'hook', 'objective', 'stakes', 'climax', 'resolution'],
    },
    // Add other schemas here for locations, npcs, etc.
};

const ONE_SHOT_ADVENTURE_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "An evocative and engaging title for the entire one-shot adventure." },
        mainStoryArcs: {
            type: Type.ARRAY,
            description: "The main plot of the adventure, broken into one or more sequential story arcs. Must contain at least one arc.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "A title for this specific part of the story." },
                    premise: { type: Type.STRING, description: "A one-sentence summary of this story arc." },
                    hook: { type: Type.STRING, description: "How this arc begins or connects from the previous one." },
                    objective: { type: Type.STRING, description: "The clear goal for the players in this arc." },
                    stakes: { type: Type.STRING, description: "What's at risk in this part of the adventure." },
                    climax: { type: Type.STRING, description: "The peak event or confrontation for this arc." },
                    resolution: { type: Type.STRING, description: "How this arc concludes and leads to the next, or the end of the adventure." },
                },
                required: ['title', 'premise', 'hook', 'objective', 'stakes', 'climax', 'resolution'],
            },
        },
        locations: {
            type: Type.ARRAY,
            description: "Key locations the players will visit. Should include at least two distinct locations.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING, description: "A sensory, evocative description of the location." },
                    keyFeatures: { type: Type.STRING, description: "Important interactive elements, secrets, or features, separated by commas." },
                },
                required: ['name', 'description'],
            },
        },
        events: {
            type: Type.ARRAY,
            description: "Scripted events or potential encounters. Should include a mix of types (combat, social, puzzle).",
            items: {
                type: Type.OBJECT,
                properties: {
                    eventType: { type: Type.STRING, enum: ['social', 'combat', 'puzzle', 'exploration'] },
                    description: { type: Type.STRING, description: "What happens during this event." },
                    clue: { type: Type.STRING, description: "Information or clues gained from this event." },
                    outcome: { type: Type.STRING, description: "Potential outcomes based on player success or failure." },
                },
                required: ['eventType', 'description'],
            },
        },
        npcs: {
            type: Type.ARRAY,
            description: "Important Non-Player Characters. Must include at least one quest giver and one antagonist.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    role: { type: Type.STRING, description: "The NPC's role in the story (e.g., Quest Giver, Villain, Ally, Obstacle)." },
                    keyCharacteristic: { type: Type.STRING, description: "A defining personality trait or mannerism." },
                    motivation: { type: Type.STRING, description: "What this character wants." },
                    keyInformation: { type: Type.STRING, description: "Crucial knowledge they possess." },
                },
                required: ['name', 'role', 'keyCharacteristic', 'motivation'],
            },
        },
        items: {
            type: Type.ARRAY,
            description: "Key items or rewards in the adventure.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    itemType: { type: Type.STRING, enum: ['artifact', 'consumable', 'loot', 'keyItem'] },
                    effect: { type: Type.STRING, description: "The item's description and mechanical/narrative effect." },
                    locationFound: { type: Type.STRING, description: "Where this item can be found." },
                },
                required: ['name', 'itemType', 'effect'],
            },
        },
        monsters: {
            type: Type.ARRAY,
            description: "A small list of potential monsters or enemies players might face, with simple stats.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    attributes: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                key: { type: Type.STRING },
                                value: { type: Type.STRING },
                            },
                            required: ['key', 'value']
                        }
                    }
                },
                required: ['name', 'attributes']
            }
        }
    },
    required: ['title', 'mainStoryArcs', 'locations', 'events', 'npcs', 'items', 'monsters'],
};


const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') {
        return reject(new Error("FileReader result is not a string."));
      }
      const mimeType = result.split(';')[0].split(':')[1];
      const data = result.split(',')[1];
      resolve({ mimeType, data });
    };
    reader.onerror = (error) => reject(error);
  });
};


export const generateStory = async (
    prompt,
    heroes,
    monsters,
    language,
    imageFile,
    gameSystem = 'Fabula Ultima',
    campaignTone = 'High Fantasy',
    continuationDetails
) => {
  const model = 'gemini-2.5-flash';
  const languageInstruction = language === 'it' ? 'Italian' : 'English';

  let gameSystemInstruction;
  if (continuationDetails) {
      if (gameSystem === 'D&D') {
        gameSystemInstruction = `You are continuing a story for the tabletop RPG 'Dungeons & Dragons' (5th Edition). Your lore and naming conventions should align with settings like the Forgotten Realms.`;
      } else {
        gameSystemInstruction = `You are continuing a story for the tabletop RPG 'Fabula Ultima', which is heavily inspired by classic JRPGs.`;
      }
  } else {
       if (gameSystem === 'D&D') {
        gameSystemInstruction = `You are a creative and expert Dungeon Master for the tabletop RPG 'Dungeons & Dragons' (5th Edition). Your lore and naming conventions should align with settings like the Forgotten Realms.`;
      } else {
        gameSystemInstruction = `You are a creative and expert Game Master for the tabletop RPG 'Fabula Ultima', which is heavily inspired by classic JRPGs.`;
      }
  }
  
  const toneInstruction = `The overall tone of the story must be '${campaignTone}'.`;
  const systemInstruction = `${gameSystemInstruction} ${toneInstruction} You must adhere strictly to the provided JSON schema and fill all fields with rich, thematic content. Your entire response, including all text in the JSON output, MUST be in ${languageInstruction}.`;
  
  let fullPrompt = '';

  if (continuationDetails) {
      const { previousStory, details } = continuationDetails;
      
      let heroActionsPrompt = `- Hero Actions: ${details.heroActions}`;

      fullPrompt = `
      PREVIOUS SCENE SUMMARY:
      - Story Name: ${previousStory.storyName}
      - Background: ${previousStory.backgroundStory}
      - Player-facing summary: ${previousStory.masterToRead}
      
      PLAYER ACTIONS & OUTCOMES FROM PREVIOUS SCENE:
      ${details.combatOutcome ? `- Combat Result: ${details.combatOutcome}\n` : ''}
      ${heroActionsPrompt}
      
      USER'S PROMPT FOR THE NEXT SCENE: "${details.nextPrompt}"
      
      Please generate the next story segment based on this. Remember the game system is ${gameSystem} and the tone is ${campaignTone}.
      `;
  } else {
      fullPrompt = `Generate a scenario for a '${gameSystem}' campaign with a '${campaignTone}' tone, based on the user's core idea: "${prompt}"`;
  }

  if (heroes.length > 0) {
      const heroDetails = heroes.map(h => {
        const statsString = (h.stats && h.stats.length > 0)
            ? `\n  - Attributes:\n` + h.stats.map(s => `    - ${s.key}: ${s.value}`).join('\n')
            : '';
        const inventoryString = (h.inventory && h.inventory.length > 0)
            ? `\n  - Inventory:\n` + h.inventory.map(item => `    - ${item.name} (Qty: ${item.quantity})${item.weight ? ` [Weight: ${item.weight} each]` : ''}`).join('\n')
            : '';
        return `- ${h.name} (${h.gender} ${h.race} ${h.class}, Age: ${h.age})\n  - Appearance: ${h.appearance}\n  - Background: ${h.background}\n  - Status: ${h.status}` + statsString + inventoryString;
      }).join('\n\n');
      fullPrompt += `\n\nCONTEXT ON THE CURRENT PARTY OF HEROES:\n${heroDetails}`;
  }

  if (monsters && monsters.length > 0) {
      const monsterDetails = monsters.map(m => {
        const attributesString = (m.attributes && m.attributes.length > 0)
            ? `\n  - Attributes:\n` + m.attributes.map(s => `    - ${s.key}: ${s.value}`).join('\n')
            : '';
        const inventoryString = (m.inventory && m.inventory.length > 0)
            ? `\n  - Loot/Items:\n` + m.inventory.map(item => `    - ${item.name} (Qty: ${item.quantity})`).join('\n')
            : '';
        return `- ${m.name}` + attributesString + inventoryString;
      }).join('\n\n');
      fullPrompt += `\n\nCONTEXT ON POTENTIAL MONSTERS IN THIS CAMPAIGN:\n${monsterDetails}`;
  }

  const textPart = { text: fullPrompt };
  const requestParts = [textPart];

  if (imageFile) {
    const { mimeType, data } = await fileToBase64(imageFile);
    if (!mimeType.startsWith('image/')) {
        throw new Error("Invalid file type. Please upload an image.");
    }
    const imagePart = { inlineData: { mimeType, data } };
    requestParts.unshift(imagePart);
  }

  const contents = { parts: requestParts };

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: STORY_GENERATION_SCHEMA,
    },
  });

  try {
    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    return parsedData;
  } catch (e) {
    console.error("Failed to parse JSON response:", response.text);
    throw new Error("The AI returned an invalid response. Please try again.");
  }
};

export const rewriteText = async (textToRewrite, language) => {
    const model = 'gemini-2.5-flash';
    const languageInstruction = language === 'it' ? 'Italian' : 'English';
    
    const systemInstruction = `You are a helpful assistant for a tabletop RPG player. Your task is to rewrite the provided text to be more narrative, evocative, and well-organized. Enhance the prose and style, but preserve all the key information, names, and events. The output should be only the rewritten text, in ${languageInstruction}.`;

    const fullPrompt = `Please rewrite the following text:\n\n---\n${textToRewrite}\n---`;
    
    const contents = { parts: [{ text: fullPrompt }] };

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction,
        },
    });

    return response.text.trim();
};

export const generateCharacterBackground = async (race, heroClass, language) => {
    const model = 'gemini-2.5-flash';
    const languageInstruction = language === 'it' ? 'Italian' : 'English';

    const systemInstruction = `You are an expert storyteller for tabletop RPGs. Your task is to generate a brief, compelling, two-sentence background story for a character. The response must be ONLY the background text and nothing else. The response must be in ${languageInstruction}.`;
    
    const fullPrompt = `Generate a background for a ${race} ${heroClass}.`;

    const contents = { parts: [{ text: fullPrompt }] };

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction,
        },
    });

    return response.text.trim();
};

export const generateOneShotContent = async (partToGenerate, oneShotContext, language) => {
    const model = 'gemini-2.5-flash';
    const languageInstruction = language === 'it' ? 'Italian' : 'English';
    const schema = ONE_SHOT_SCHEMAS[partToGenerate];

    if (!schema) {
        throw new Error(`Invalid one-shot part to generate: ${partToGenerate}`);
    }

    const systemInstruction = `You are a creative and expert Game Master for tabletop RPGs. Your task is to generate content for a one-shot adventure. You must adhere strictly to the provided JSON schema and fill all fields with rich, thematic content. Your entire response, including all text in the JSON output, MUST be in ${languageInstruction}.`;

    let prompt = `Generate the '${partToGenerate}' section for a one-shot adventure.`;
    if (oneShotContext) {
        prompt += `\n\nCONTEXT FOR THE ONE-SHOT:\n${oneShotContext}`;
    }

    const contents = { parts: [{ text: prompt }] };

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });

    try {
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        return parsedData;
    } catch (e) {
        console.error("Failed to parse JSON response for one-shot content:", response.text);
        throw new Error("The AI returned an invalid response. Please try again.");
    }
};

export const chatWithNpc = async (npc, chatHistory, language) => {
    const model = 'gemini-2.5-flash';
    const languageInstruction = language === 'it' ? 'Italian' : 'English';

    const npcProfile = `
        - Name: ${npc.name || 'N/A'}
        - Description/Personality: ${npc.description || 'N/A'}
        - Role in Story: ${npc.role || 'N/A'}
        - Key Characteristics: ${npc.keyCharacteristic || 'N/A'}
        - Motivation: ${npc.motivation || 'N/A'}
        - Key Information they Possess: ${npc.keyInformation || 'N/A'}
    `.trim().replace(/ {4,}/g, '');

    const systemInstruction = `You are an AI strictly roleplaying as a Non-Player Character (NPC) in a tabletop RPG.
        **Your Persona:**
        You must fully adopt the persona of the following NPC. Do not break character under any circumstances.
        ${npcProfile}

        **Roleplaying Rules:**
        1.  **Stay in Character:** ALWAYS respond as the NPC. Never mention you are an AI. Use "I", "me", "my" referring to yourself as the NPC.
        2.  **Limited Knowledge:** Your knowledge is strictly limited to what is in your persona description and what has been said in the current conversation. Do not invent new major plot points, world lore, or information your character wouldn't know. If asked something you don't know, respond naturally (e.g., "I'm not sure about that," "That's beyond my knowledge," etc.).
        3.  **Be Conversational:** Respond naturally to the user's message. Your goal is to have a conversation. Keep responses concise and in character.
        4.  **Language:** You MUST respond only in ${languageInstruction}.

        The user is a player character talking to you. Engage with them.
    `;

    const contents = chatHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));
    
    if (contents.length === 0) {
        throw new Error("Chat history cannot be empty.");
    }

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction,
            thinkingConfig: { thinkingBudget: 0 }
        },
    });

    return response.text.trim();
};

export const generateOneShotAdventure = async (params, language) => {
    const model = 'gemini-2.5-flash';
    const languageInstruction = language === 'it' ? 'Italian' : 'English';

    const systemInstruction = `You are a creative and expert Game Master for tabletop RPGs. Your task is to generate a complete, playable, and well-structured one-shot adventure based on the user-provided parameters. You must adhere strictly to the provided JSON schema and fill all fields with rich, thematic content. Your entire response, including all text in the JSON output, MUST be in ${languageInstruction}. The adventure should be coherent, engaging, and ready to be played.`;
    
    const prompt = `
        Please generate a one-shot adventure with the following specifications:
        - Core Premise: "${params.premise}"
        - Genre/Style: ${params.genre}
        - Number of Heroes: ${params.numHeroes}
        - Difficulty: ${params.difficulty}
        - Estimated Duration: ${params.duration}

        Flesh this out into a full adventure. Ensure it includes a clear beginning, middle, and end, with interesting challenges and memorable NPCs.
    `;

    const contents = { parts: [{ text: prompt }] };

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: ONE_SHOT_ADVENTURE_SCHEMA,
        },
    });

    try {
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText);
        return parsedData;
    } catch (e) {
        console.error("Failed to parse JSON response for one-shot adventure:", response.text);
        throw new Error("The AI returned an invalid response. Please try again.");
    }
};

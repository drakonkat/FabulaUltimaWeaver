
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
    language,
    imageFile,
    gameSystem = 'Fabula Ultima',
    campaignTone = 'High Fantasy',
    continuationDetails,
    audioFile
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
      if (audioFile) {
        heroActionsPrompt = `- Hero Actions: The players' actions are described in the attached audio file. Please listen to it, summarize the key actions, and use that summary to generate the next scene.`;
      }

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
      const heroDetails = heroes.map(h => `- ${h.name} (${h.gender} ${h.race} ${h.class}, Age: ${h.age})\n  - Appearance: ${h.appearance}\n  - Background: ${h.background}\n  - Status: ${h.status}`).join('\n\n');
      fullPrompt += `\n\nCONTEXT ON THE CURRENT PARTY OF HEROES:\n${heroDetails}`;
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

  if (audioFile) {
    const { mimeType, data } = await fileToBase64(audioFile);
    if (!mimeType.startsWith('audio/')) {
        throw new Error("Invalid file type. Please upload an audio file.");
    }
    const audioPart = { inlineData: { mimeType, data } };
    requestParts.push(audioPart);
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


export const generateHeroPortrait = async (
    hero,
    gameSystem,
    campaignTone
) => {
    const prompt = `A high-quality fantasy art portrait of a character for a '${gameSystem}' campaign with a '${campaignTone}' tone.
The character's details are:
- Gender: ${hero.gender}.
- Age: ${hero.age}.
- Race: ${hero.race}.
- Class: ${hero.class}.
- Appearance: ${hero.appearance}.
The final image must be purely visual and must not contain any text, letters, numbers, or watermarks. Focus on a clean portrait of the character's face and upper body, in a style suitable for a TTRPG character sheet.`;

    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '3:4',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        return response.generatedImages[0].image.imageBytes;
    } else {
        throw new Error("Image generation failed to return an image.");
    }
};

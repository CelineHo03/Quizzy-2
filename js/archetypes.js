// Archetype definitions
const archetypes = [
    { 
        name: "Intellectual",
        logical: 9,
        emotional: 2,
        exploratory: 6,
        harmony_seeking: 5,
        control_need: 4,
        nurture_focus: 3,
        idealistic: 2,
        achievement_drive: 6,
        analytical: 10,
        authority_response: 4,
        independence: 7
    },
    { 
        name: "Achiever",
        logical: 8,
        emotional: 4,
        exploratory: 5,
        harmony_seeking: 3,
        control_need: 7,
        nurture_focus: 2,
        idealistic: 3,
        achievement_drive: 10,
        analytical: 6,
        authority_response: 5,
        independence: 8
    },
    { 
        name: "Leader",
        logical: 8,
        emotional: 5,
        exploratory: 5,
        harmony_seeking: 3,
        control_need: 10,
        nurture_focus: 3,
        idealistic: 4,
        achievement_drive: 8,
        analytical: 5,
        authority_response: 7,
        independence: 9
    },
    { 
        name: "Explorer",
        logical: 3,
        emotional: 5,
        exploratory: 10,
        harmony_seeking: 4, 
        control_need: 1,
        nurture_focus: 3,
        idealistic: 7,
        achievement_drive: 4,
        analytical: 2,
        authority_response: 6,
        independence: 8
    },
    { 
        name: "Rebel",
        logical: 3,
        emotional: 7,
        exploratory: 9,
        harmony_seeking: 1,
        control_need: 5,
        nurture_focus: 3,
        idealistic: 8,
        achievement_drive: 5,
        analytical: 3,
        authority_response: 10,
        independence: 10
    },
    { 
        name: "Peacemaker",
        logical: 5,
        emotional: 8,
        exploratory: 2,
        harmony_seeking: 10,
        control_need: 1,
        nurture_focus: 7,
        idealistic: 5,
        achievement_drive: 2,
        analytical: 4,
        authority_response: 1,
        independence: 2
    },
    { 
        name: "Dreamer",
        logical: 2,
        emotional: 9,
        exploratory: 8,
        harmony_seeking: 6,
        control_need: 2,
        nurture_focus: 5,
        idealistic: 10,
        achievement_drive: 3,
        analytical: 1,
        authority_response: 5,
        independence: 6
    },
    { 
        name: "Caregiver",
        logical: 3,
        emotional: 10,
        exploratory: 2,
        harmony_seeking: 8,
        control_need: 3,
        nurture_focus: 10,
        idealistic: 6,
        achievement_drive: 1,
        analytical: 3,
        authority_response: 2,
        independence: 1
    }
];

const dimensions = {
    // Keep base three
    emotional: 0,
    logical: 0,
    exploratory: 0,
    
    // Add these for proper archetype differentiation
    harmony_seeking: 0,      // High = Peacemaker, Low = Rebel
    control_need: 0,          // High = Leader, Low = go-with-flow
    nurture_focus: 0,         // High = Caregiver, Low = self-focused
    idealistic: 0,            // High = Dreamer, Low = Realist
    achievement_drive: 0,     // High = Achiever, Low = process-focused
    analytical: 0,            // High = Intellectual, Low = intuitive
    authority_response: 0,    // High = Rebel (challenges), Low = accepts
    independence: 0           // High = self-reliant, Low = collaborative
};

const archetypeTraits = {
    "Intellectual": {
        description: "You possess a highly analytical approach to life, keenly examining and dissecting information to understand things thoroughly. You have an insatiable curiosity and a deep thirst for knowledge that drives you to continuously learn and expand your understanding. You rely heavily on logic and rationality, preferring to make decisions based on facts and reasoned arguments rather than emotions. You're introspective and detail-oriented, often spending significant time in self-reflection and striving for accuracy in your endeavors."
    },
    "Achiever": {
        description: "You are highly driven to succeed and set lofty goals that you're determined to achieve. You have a strong desire to outperform others and seek recognition through your accomplishments. You're well-organized, meticulous in planning, and value efficiency. Your identity is closely tied to your professional achievements, and you possess an exceptional ability to concentrate on your goals. You're willing to take calculated risks and show strong resilience in recovering from setbacks."
    },
    "Leader": {
        description: "You have a strong sense of self-assurance and believe in your abilities to make decisions and lead others. You're known for making decisions efficiently under pressure and expressing your views assertively. You possess natural charisma that attracts and motivates others, combined with high emotional intelligence. You're a strategic thinker who can plan for the long-term, and you exhibit a strong sense of ethics and integrity that sets a moral example for others."
    }, 
    "Explorer": {
        description: "You are driven by a desire to explore and engage with new and diverse experiences. You're often seen as a thrill-seeker who relishes novel situations. You possess high levels of energy and enthusiasm, especially when pursuing activities that excite you. Your spontaneous nature means you often act on impulse, and you exhibit a fearless attitude, willing to take risks others might avoid. You're typically very adaptable, able to adjust to new environments with ease."
    },
    "Rebel": {
        description: "You value your independence highly and seek autonomy in your actions and decisions. You resist conforming to societal norms and often question traditional ways of doing things. You're naturally skeptical of authority and have a well-developed sense of justice, willing to fight for causes you believe in. You think outside the box and bring unconventional ideas to the table. Your non-conformist nature makes you seem unpredictable at times, but you're driven by idealism and principle."
    },
    "Peacemaker": {
        description: "You are naturally inclined towards maintaining harmony and balance in your environment. You prioritize peace over conflict and often go to great lengths to avoid upsetting situations. You're highly empathetic and capable of understanding others' feelings deeply. You possess a natural talent for diplomacy, often mediating disputes and helping resolve conflicts. You're patient, supportive, and nurturing, providing a calming presence to those around you."
    },
    "Dreamer": {
        description: "You are driven by a strong sense of vision and ideals, with lofty goals to make a significant impact. Your outlook on life is generally positive, seeing the best in people and focusing on possibilities. You possess a creative and imaginative mind, thinking outside the box and coming up with innovative ideas. You're introspective and emotionally sensitive, feeling emotions deeply and connecting with people on a profound level. Your actions are guided by ideals rather than practical considerations."
    },
    "Caregiver": {
        description: "You have an inherent desire to care for and nurture others, often putting their needs before your own. You're deeply empathetic and attuned to others' emotions and needs. You exhibit genuine concern for others' welfare and are often involved in helping activities. You show deep compassion and understanding, especially towards those in need. Others see you as reliable and dependable, often turning to you for emotional and practical support."
    }
};


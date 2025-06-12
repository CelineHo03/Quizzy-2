
// REDESIGNED QUESTIONS
const questions = {
    "1": {
        scenario: "You're planning a couple's trip. Your partner suggests their dream destination, but you've always wanted to go somewhere else. How do you handle this?",
        choices: [
            { 
                text: "Their happiness matters most - let's go where they want and I'll enjoy seeing them happy",
                next: "2",
                scores: { 
                    nurture_focus: 3,      // Caregiver
                    harmony_seeking: 2,    // Peacemaker tendency
                    achievement_drive: -1, // Not focused on personal goals
                    independence: -2       // Sacrificing own desires
                }
            },
            { 
                text: "Let's research both destinations and pick the one with better reviews, prices, and logistics",
                next: "2",
                scores: { 
                    logical: 3,           // Logical approach
                    analytical: 3,        // Intellectual
                    harmony_seeking: 1,   // Trying to find neutral ground
                    control_need: 1       // Taking charge of decision
                }
            },
            { 
                text: "How about we go to their place this time and mine next time - fair is fair",
                next: "2",
                scores: { 
                    achievement_drive: 2,  // Achiever - keeping score
                    logical: 2,           // Practical solution
                    independence: 1,      // Maintaining autonomy
                    harmony_seeking: 0    // Compromise but assertive
                }
            },
            { 
                text: "Actually, forget both - let's pick somewhere completely random neither of us has considered!",
                next: "2",
                scores: { 
                    exploratory: 3,       // Explorer
                    authority_response: 2, // Rejecting both 'authorities'
                    idealistic: 1,        // Spontaneous dreaming
                    control_need: -2      // Giving up control
                }
            }
        ]
    },

    "2": {
        scenario: "At the airport, security pulls your partner aside for 'random' screening - the third time this trip. They're visibly upset. What do you do?",
        choices: [
            { 
                text: "I'd file a complaint right there. This is profiling and it's not okay. We need to stand up to this.",
                next: "3",
                scores: { 
                    authority_response: 3,  // Rebel - challenging authority
                    harmony_seeking: -3,    // Creating conflict
                    nurture_focus: 1,       // Protecting partner
                    control_need: 2         // Taking control of situation
                }
            },
            { 
                text: "I'd comfort them and say 'Let's just get through this quickly and not let it ruin our trip'",
                next: "3",
                scores: { 
                    harmony_seeking: 3,     // Peacemaker
                    nurture_focus: 2,       // Caregiver
                    authority_response: -2, // Accepting authority
                    achievement_drive: -1   // Not goal-focused
                }
            },
            { 
                text: "I'd document everything - times, badge numbers, exact words. We'll need evidence for the formal complaint later.",
                next: "3",
                scores: { 
                    analytical: 3,          // Intellectual approach
                    logical: 3,             // Systematic thinking
                    achievement_drive: 2,   // Goal-oriented (justice)
                    emotional: -1           // Not emotionally reactive
                }
            },
            { 
                text: "I'd try to lighten the mood - 'Hey, at least they think you look interesting! Let's make up spy backstories while we wait'",
                next: "3",
                scores: { 
                    idealistic: 2,          // Dreamer - creating fantasy
                    exploratory: 2,         // Making adventure from bad situation
                    harmony_seeking: 1,     // Avoiding confrontation
                    nurture_focus: 1        // Trying to help emotionally
                }
            }
        ]
    },

    "3": {
        scenario: "Your hotel lost your reservation. It's late, you're tired, and the manager says there's nothing they can do. Your partner looks exhausted.",
        choices: [
            { 
                text: "Get me your manager's manager. I'll have this sorted in 10 minutes and we'll be upgraded for the inconvenience.",
                next: "4",
                scores: { 
                    control_need: 3,        // Leader
                    achievement_drive: 2,   // Goal-focused
                    harmony_seeking: -2,    // Will create conflict
                    independence: 2         // Self-reliant solution
                }
            },
            { 
                text: "Let me check three booking apps while you rest on that couch. I'll find us something even better.",
                next: "4",
                scores: { 
                    achievement_drive: 3,   // Achiever
                    logical: 2,             // Practical approach
                    nurture_focus: 1,       // Caring for tired partner
                    independence: 2         // Self-sufficient
                }
            },
            { 
                text: "You look exhausted, honey. Let's just find any place with a bed - even a hostel is fine. We just need rest.",
                next: "4",
                scores: { 
                    nurture_focus: 3,       // Caregiver
                    harmony_seeking: 2,     // Avoiding conflict
                    achievement_drive: -2,  // Not goal-focused
                    idealistic: -1          // Practical not dreamy
                }
            },
            { 
                text: "This is actually perfect! We're not tied to a boring hotel - let's explore the city at night and find somewhere unique!",
                next: "4",
                scores: { 
                    exploratory: 3,         // Explorer
                    idealistic: 2,          // Dreamer tendencies
                    control_need: -3,       // Embracing chaos
                    analytical: -2          // Not planning ahead
                }
            }
        ]
    },

    "4": {
        scenario: "Your partner gets food poisoning on day 2. They're miserable but insist you go see the main attraction you've both been excited about.",
        choices: [
            { 
                text: "Absolutely not. I'm staying here with you. The attraction will be there tomorrow - you need me now.",
                next: "5",
                scores: { 
                    nurture_focus: 3,       // Caregiver
                    emotional: 3,           // Emotional decision
                    achievement_drive: -2,  // Sacrificing goals
                    independence: -2        // Choosing connection
                }
            },
            { 
                text: "I'll go for just an hour to take photos and videos for us, then rush back with soup and medicine.",
                next: "5",
                scores: { 
                    achievement_drive: 2,   // Still meeting goals
                    nurture_focus: 2,       // But also caring
                    logical: 2,             // Practical compromise
                    independence: 1         // Balanced approach
                }
            },
            { 
                text: "If you insist, I'll go - but I'll set up everything you need first and check in every 30 minutes.",
                next: "5",
                scores: { 
                    harmony_seeking: 2,     // Following their wishes
                    analytical: 2,          // Systematic care plan
                    control_need: 1,        // Organizing the situation
                    nurture_focus: 1        // Still caring
                }
            },
            { 
                text: "This is a sign! We weren't meant to do touristy things - let's order room service and make our own adventure here.",
                next: "5",
                scores: { 
                    idealistic: 3,          // Dreamer
                    exploratory: 2,         // Finding new experiences
                    authority_response: 1,  // Rejecting plans
                    emotional: 2            // Romantic spin
                }
            }
        ]
    },

    "5": {
        scenario: "You stumble upon a local protest blocking your route. Signs are in a language you don't understand. Your partner seems nervous.",
        choices: [
            { 
                text: "Let's leave immediately. We don't know what this is about and it's not our fight.",
                next: "6",
                scores: { 
                    harmony_seeking: 3,     // Peacemaker - avoiding conflict
                    logical: 2,             // Safety first
                    authority_response: -2, // Not challenging anything
                    exploratory: -2         // Avoiding unknown
                }
            },
            { 
                text: "Hold on - let me use translation apps to understand what they're protesting. We should know what's happening.",
                next: "6",
                scores: { 
                    analytical: 3,          // Intellectual curiosity
                    logical: 2,             // Information gathering
                    exploratory: 1,         // Interested in understanding
                    control_need: 1         // Needing information
                }
            },
            { 
                text: "If they're protesting, they probably have good reason. Let's show solidarity - when in Rome!",
                next: "6",
                scores: { 
                    authority_response: 3,  // Rebel - joining protest
                    idealistic: 2,          // Assuming noble cause
                    harmony_seeking: -3,    // Risking conflict
                    independence: 2         // Making bold choice
                }
            },
            { 
                text: "Your safety is my priority. Let's find another route but ask a local what's happening so we're informed.",
                next: "6",
                scores: { 
                    nurture_focus: 3,       // Caregiver
                    control_need: 2,        // Leader - taking charge
                    logical: 1,             // Balanced approach
                    achievement_drive: 1    // Still goal-focused
                }
            }
        ]
    },

    "6": {
        scenario: "A charming local invites you both to their family's home for dinner. Your partner whispers they're uncomfortable with this.",
        choices: [
            { 
                text: "Then we're not going. Your comfort is more important than any experience.",
                next: "7",
                scores: { 
                    nurture_focus: 3,       // Caregiver
                    harmony_seeking: 2,     // With partner not locals
                    independence: -1,       // Following partner's lead
                    exploratory: -2         // Sacrificing adventure
                }
            },
            { 
                text: "Let's politely decline but ask if we can meet at a restaurant instead - safer but still cultural!",
                next: "7",
                scores: { 
                    logical: 3,             // Smart compromise
                    control_need: 2,        // Managing situation
                    achievement_drive: 2,   // Still achieving goal
                    analytical: 1           // Risk assessment
                }
            },
            { 
                text: "Come on, this is a once-in-a-lifetime opportunity! We'll regret missing this authentic experience.",
                next: "7",
                scores: { 
                    exploratory: 3,         // Explorer
                    idealistic: 2,          // Dreamer
                    nurture_focus: -2,      // Ignoring partner's needs
                    harmony_seeking: -2     // Pushing despite discomfort
                }
            },
            { 
                text: "I hear you're uncomfortable. Let's thank them but explain we have plans. No need to make it awkward.",
                next: "7",
                scores: { 
                    harmony_seeking: 3,     // Peacemaker
                    emotional: 2,           // Emotionally aware
                    nurture_focus: 2,       // Validating feelings
                    achievement_drive: -1   // Giving up opportunity
                }
            }
        ]
    },

    "7": {
        scenario: "You discover your partner has been texting their ex throughout the trip. They say it's nothing, just friendly catch-up.",
        choices: [
            { 
                text: "This is absolutely not okay. We need to have a serious conversation about boundaries right now.",
                next: "8",
                scores: { 
                    control_need: 3,        // Leader - setting boundaries
                    authority_response: 2,  // Challenging behavior
                    harmony_seeking: -3,    // Confrontational
                    independence: 2         // Self-advocacy
                }
            },
            { 
                text: "I trust you, but this makes me uncomfortable. Can we talk about why you felt the need to hide this?",
                next: "8",
                scores: { 
                    emotional: 3,           // Emotional intelligence
                    analytical: 2,          // Seeking understanding
                    nurture_focus: 1,       // Still caring
                    harmony_seeking: 1      // Trying to avoid fight
                }
            },
            { 
                text: "If you say it's nothing, then it's nothing. I don't want to ruin our trip over this.",
                next: "8",
                scores: { 
                    harmony_seeking: 3,     // Peacemaker
                    achievement_drive: -2,  // Avoiding confrontation
                    independence: -2,       // Not self-advocating
                    control_need: -3        // Giving up control
                }
            },
            { 
                text: "Well, this trip just got interesting! Let's invite them to join us - I'd love to meet this mysterious ex!",
                next: "8",
                scores: { 
                    exploratory: 3,         // Explorer - chaos as adventure
                    idealistic: 2,          // Unrealistic optimism
                    authority_response: 2,  // Unconventional response
                    analytical: -3          // Not thinking through
                }
            }
        ]
    },

    "8": {
        scenario: "Your travel blog post about the trip goes viral, but your partner is upset you shared personal moments without asking.",
        choices: [
            { 
                text: "I'm so sorry. You're right - I should have asked. Let me take it down immediately.",
                next: "9",
                scores: { 
                    nurture_focus: 3,       // Caregiver
                    harmony_seeking: 3,     // Peacemaker
                    achievement_drive: -2,  // Sacrificing success
                    control_need: -2        // Giving up control
                }
            },
            { 
                text: "I understand you're upset, but this is huge for my career. Can we discuss what parts you'd like me to edit?",
                next: "9",
                scores: { 
                    achievement_drive: 3,   // Achiever
                    logical: 2,             // Practical negotiation
                    control_need: 1,        // Maintaining some control
                    nurture_focus: 0        // Balanced approach
                }
            },
            { 
                text: "You're overreacting. I didn't share anything embarrassing and this kind of authenticity is what people want.",
                next: "9",
                scores: { 
                    independence: 3,        // High self-focus
                    authority_response: 2,  // Dismissing concerns
                    harmony_seeking: -3,    // Creating conflict
                    nurture_focus: -3       // Ignoring partner's feelings
                }
            },
            { 
                text: "Let's use this! We could become travel influencers together - imagine the adventures we could afford!",
                next: "9",
                scores: { 
                    idealistic: 3,          // Dreamer
                    exploratory: 2,         // Seeing opportunity
                    analytical: -2,         // Missing the point
                    emotional: -1           // Not reading emotions
                }
            }
        ]
    },

    "9": {
        scenario: "Last day: Your partner wants to buy an expensive souvenir that you think is overpriced tourist junk.",
        choices: [
            { 
                text: "If it makes you happy and we can afford it, then absolutely get it!",
                next: "10",
                scores: { 
                    nurture_focus: 3,       // Caregiver
                    harmony_seeking: 2,     // Avoiding conflict
                    logical: -2,            // Ignoring practical concerns
                    independence: -1        // Going along
                }
            },
            { 
                text: "Let me negotiate the price down first. I bet I can get it for half.",
                next: "10",
                scores: { 
                    achievement_drive: 3,   // Achiever
                    control_need: 2,        // Taking charge
                    logical: 2,             // Practical approach
                    nurture_focus: 1        // Still helping partner
                }
            },
            { 
                text: "That's a waste of money. Let's find something authentic at a local market instead.",
                next: "10",
                scores: { 
                    logical: 3,             // Practical
                    authority_response: 2,  // Rejecting tourist trap
                    exploratory: 1,         // Seeking authentic
                    harmony_seeking: -2     // Disagreeing directly
                }
            },
            { 
                text: "You know what? Life's short! Get it, and let's get matching ones as a memory of this trip!",
                next: "10",
                scores: { 
                    idealistic: 3,          // Dreamer
                    emotional: 3,           // Emotional decision
                    exploratory: 1,         // Embracing experience
                    logical: -3             // Ignoring practicality
                }
            }
        ]
    },

    "10": {
        scenario: "Flight home is delayed 6 hours. Your partner starts complaining about everything that went wrong on the trip.",
        choices: [
            { 
                text: "I make a joke: 'And yet you're still here with me - I must be doing something right!' Then suggest we list our favorite moments.",
                next: "end",
                scores: { 
                    idealistic: 2,          // Positive reframing
                    harmony_seeking: 2,     // Deflecting negativity
                    emotional: 2,           // Managing emotions
                    nurture_focus: 1        // Gentle redirection
                }
            },
            { 
                text: "Let's do a trip debrief! What worked, what didn't, and how can we make the next one better?",
                next: "end",
                scores: { 
                    analytical: 3,          // Intellectual approach
                    achievement_drive: 2,   // Improvement focused
                    logical: 2,             // Systematic thinking
                    control_need: 1         // Structuring situation
                }
            },
            { 
                text: "You're tired and frustrated. Let's find a quiet corner, and you can vent all you need. I'm here to listen.",
                next: "end",
                scores: { 
                    nurture_focus: 3,       // Caregiver
                    emotional: 3,           // Emotional support
                    harmony_seeking: 1,     // Allowing venting
                    independence: -2        // Other-focused
                }
            },
            { 
                text: "You know what? You're right. This airline sucks, that hotel was terrible - let's write scathing reviews together!",
                next: "end",
                scores: { 
                    authority_response: 3,  // Rebel against bad service
                    exploratory: 1,         // Making fun from frustration
                    harmony_seeking: 0,     // Joining not calming
                    achievement_drive: 1    // Action-oriented
                }
            }
        ]
    }
};


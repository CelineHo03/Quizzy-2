

// Helper function for archetype-specific protection tips
function getProtectionTips(archetypeName) {
    const tips = {
        "Intellectual": `
            <ul style="text-align: left; line-height: 1.8; margin-left: 20px;">
                <li>✓ Trust actions over words - especially with those who claim to be misunderstood geniuses</li>
                <li>✓ Notice when you feel intellectually challenged but emotionally neglected</li>
                <li>✓ Your danger phrase: "But they're so brilliant..."</li>
                <li>✓ Red flag: Anyone who makes you feel stupid for having feelings</li>
            </ul>
        `,
        "Achiever": `
            <ul style="text-align: left; line-height: 1.8; margin-left: 20px;">
                <li>✓ Trust actions over words - especially with those who promise they'll change</li>
                <li>✓ Notice when you feel exhausted from trying to "fix" someone</li>
                <li>✓ Your danger phrase: "I can help them reach their potential..."</li>
                <li>✓ Red flag: Anyone who makes their problems your projects</li>
            </ul>
        `,
        "Leader": `
            <ul style="text-align: left; line-height: 1.8; margin-left: 20px;">
                <li>✓ Trust actions over words - especially with those who seem like equals</li>
                <li>✓ Notice when you feel your power being subtly undermined</li>
                <li>✓ Your danger phrase: "Finally, someone on my level..."</li>
                <li>✓ Red flag: Anyone who competes with you instead of complementing you</li>
            </ul>
        `,
        "Explorer": `
            <ul style="text-align: left; line-height: 1.8; margin-left: 20px;">
                <li>✓ Trust actions over words - especially with exciting but unstable people</li>
                <li>✓ Notice when chaos stops feeling like adventure and starts feeling like crisis</li>
                <li>✓ Your danger phrase: "But they make life so interesting..."</li>
                <li>✓ Red flag: Anyone whose drama becomes your daily reality</li>
            </ul>
        `,
        "Rebel": `
            <ul style="text-align: left; line-height: 1.8; margin-left: 20px;">
                <li>✓ Trust actions over words - especially with other "misunderstood" souls</li>
                <li>✓ Notice when rebellion becomes destruction</li>
                <li>✓ Your danger phrase: "They just get my need for freedom..."</li>
                <li>✓ Red flag: Anyone who encourages your worst impulses</li>
            </ul>
        `,
        "Peacemaker": `
            <ul style="text-align: left; line-height: 1.8; margin-left: 20px;">
                <li>✓ Trust actions over words - especially with those who need constant soothing</li>
                <li>✓ Notice when keeping peace means losing yourself</li>
                <li>✓ Your danger phrase: "I just want everyone to be happy..."</li>
                <li>✓ Red flag: Anyone who weaponizes your kindness</li>
            </ul>
        `,
        "Dreamer": `
            <ul style="text-align: left; line-height: 1.8; margin-left: 20px;">
                <li>✓ Trust actions over words - especially with grand romantic gestures</li>
                <li>✓ Notice when fantasy overshadows reality</li>
                <li>✓ Your danger phrase: "It's just like a fairy tale..."</li>
                <li>✓ Red flag: Anyone who love-bombs you with impossible promises</li>
            </ul>
        `,
        "Caregiver": `
            <ul style="text-align: left; line-height: 1.8; margin-left: 20px;">
                <li>✓ Trust actions over words - especially with those who always need rescue</li>
                <li>✓ Notice when caring becomes enabling</li>
                <li>✓ Your danger phrase: "They need me..."</li>
                <li>✓ Red flag: Anyone who makes you responsible for their happiness</li>
            </ul>
        `
    };
    
    return tips[archetypeName] || "";
}

// Helper function to frame traits positively
function getPositiveSpin(archetypeName) {
    const spins = {
        "Intellectual": "brilliant and analytical",
        "Achiever": "driven and accomplished",
        "Leader": "confident and decisive",
        "Explorer": "adventurous and spontaneous",
        "Rebel": "independent and authentic",
        "Peacemaker": "harmonious and diplomatic",
        "Dreamer": "creative and idealistic",
        "Caregiver": "compassionate and nurturing"
    };
    
    return spins[archetypeName] || "unique";
}

// Helper function to describe vulnerability type
function getVulnerabilityType(archetypeName) {
    const vulnerabilities = {
        "Intellectual": "those who exploit your need to understand",
        "Achiever": "those who become your projects",
        "Leader": "those who secretly compete with your power",
        "Explorer": "those who mistake chaos for excitement",
        "Rebel": "those who weaponize your independence",
        "Peacemaker": "those who abuse your kindness",
        "Dreamer": "those who sell you beautiful lies",
        "Caregiver": "those who drain your compassion"
    };
    
    return vulnerabilities[archetypeName] || "manipulation";
}

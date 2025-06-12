let demographics = { ethnicity: '', orientation: '' };
let currentQuestion = "1";
let scores = { emotional: 0, logical: 0, exploratory: 0 };
let selectedChoices = new Set();
let multiSelectNexts = [];
let pendingQuestions = [];
let isInMultiSelectSequence = false;
let multiSelectProgress = 0;
let archetype = null; 

// Start quiz function
// Modified start quiz function to show demographics first
function startJourney() {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('demographics-screen').style.display = 'block';
}
document.addEventListener('mousemove', (e) => {
    const icons = document.querySelectorAll('.floating-icon');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    icons.forEach((icon, index) => {
        const speed = (index + 1) * 2;
        icon.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
    });
});

function initializeQuiz() {
    // Reset all scores to 0
    scores = {
        emotional: 0,
        logical: 0,
        exploratory: 0,
        harmony_seeking: 0,
        control_need: 0,
        nurture_focus: 0,
        idealistic: 0,
        achievement_drive: 0,
        analytical: 0,
        authority_response: 0,
        independence: 0
    };
    
    // Reset other quiz state
    currentQuestion = "1";
    selectedChoices.clear();
    multiSelectNexts = [];
    pendingQuestions = [];
    isInMultiSelectSequence = false;
    multiSelectProgress = 0;
}

// New function to store demographics and start the actual quiz
function startActualQuiz() {
    // Get the selected values
    const ethnicity = document.getElementById('ethnicity-select').value;
    const orientation = document.getElementById('orientation-select').value;
    
    // Check if both are selected
    if (!ethnicity || !orientation) {
        alert('Please select both fields to continue');
        return;
    }
    
    // Store the values (you can use these later)
    demographics.ethnicity = ethnicity;
    demographics.orientation = orientation;
    
    // Hide demographics screen and show quiz
    document.getElementById('demographics-screen').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    
    // Reset quiz state and start
    initializeQuiz()
    
    showQuestion(currentQuestion);
}   

// Show question function
function showQuestion(questionId) {
    const question = questions[questionId];
    const container = document.getElementById('question-content');
    
    let html = `<div class="question-container">`;
    
    // Add indicator if this is from a multi-select sequence
    if (isInMultiSelectSequence) {
        html += `<div style="text-align: center; color: #f39c12; margin-bottom: 20px; font-size: 0.9em;">Activity ${multiSelectProgress} of 2</div>`;
    }
    
    html += `<div class="scenario">${question.scenario}</div>`;
    
    if (question.multiSelect) {
        html += `<div class="multi-select-info">Select exactly ${question.multiSelect} options</div>`;
    }
    
    html += `<div class="choices">`;
    
    question.choices.forEach((choice, index) => {
        html += `<div class="choice" onclick="selectChoice('${questionId}', ${index})">${choice.text}</div>`;
    });
    
    html += `</div>`;
    html += `<button class="next-btn" id="next-btn" onclick="nextQuestion()" disabled>Continue</button>`;
    html += `</div>`;
    
    container.innerHTML = html;
    selectedChoices.clear();
    multiSelectNexts = [];
}

// Select choice function
function selectChoice(questionId, choiceIndex) {
    const question = questions[questionId];
    const choice = question.choices[choiceIndex];
    const choiceElements = document.querySelectorAll('.choice');
    
    if (question.multiSelect) {
        // Multi-select logic
        if (selectedChoices.has(choiceIndex)) {
            selectedChoices.delete(choiceIndex);
            choiceElements[choiceIndex].classList.remove('selected');
        } else if (selectedChoices.size < question.multiSelect) {
            selectedChoices.add(choiceIndex);
            choiceElements[choiceIndex].classList.add('selected');
        }
        
        // Enable/disable next button
        document.getElementById('next-btn').disabled = selectedChoices.size !== question.multiSelect;
    } else {
        // Single select logic
        choiceElements.forEach(el => el.classList.remove('selected'));
        choiceElements[choiceIndex].classList.add('selected');
        selectedChoices.clear();
        selectedChoices.add(choiceIndex);
        document.getElementById('next-btn').disabled = false;
    }
}

// Next question function
function nextQuestion() {
    const question = questions[currentQuestion];
    let nextQuestionId = null;
    
    // Calculate scores for ALL dimensions
    selectedChoices.forEach(index => {
        const choice = question.choices[index];
        
        // Add scores for all dimensions that exist in the choice
        Object.keys(choice.scores).forEach(dimension => {
            if (scores[dimension] !== undefined) {
                scores[dimension] += choice.scores[dimension];
            }
        });
        
        if (question.multiSelect) {
            multiSelectNexts.push(choice.next);
        } else if (pendingQuestions.length === 0) {
            nextQuestionId = choice.next;
        }
    });
    
    // Rest of the function remains the same...
    if (question.multiSelect && multiSelectNexts.length > 0) {
        isInMultiSelectSequence = true;
        multiSelectProgress = 1;
        pendingQuestions = [...multiSelectNexts];
        multiSelectNexts = [];
        nextQuestionId = pendingQuestions.shift();
    } else if (pendingQuestions.length > 0) {
        multiSelectProgress = 2;
        nextQuestionId = pendingQuestions.shift();
    } else {
        if (isInMultiSelectSequence) {
            isInMultiSelectSequence = false;
            multiSelectProgress = 0;
        }
        if (!nextQuestionId) {
            const choiceIndex = [...selectedChoices][0];
            nextQuestionId = question.choices[choiceIndex].next;
        }
    }
    
    if (nextQuestionId === "end" || !questions[nextQuestionId]) {
        showResults();
    } else {
        currentQuestion = nextQuestionId;
        showQuestion(currentQuestion);
    }
}

// Fix 2: Update calculateArchetype to use Euclidean distance with all dimensions
function calculateArchetype(userScores) {
    console.log("Raw scores:", userScores); // Debug log
    
    let minDistance = Infinity;
    let closestArchetype = null;
    
    const normalizedScores = normalizeScores(userScores);
    console.log("Normalized scores:", normalizedScores); // Debug log
    
    archetypes.forEach(archetype => {
        let distance = 0;
        
        Object.keys(dimensions).forEach(dim => {
            const userValue = normalizedScores[dim] || 0;
            const archetypeValue = archetype[dim] || 0;
            distance += Math.pow(userValue - archetypeValue, 2);
        });
        
        distance = Math.sqrt(distance);
        console.log(`Distance to ${archetype.name}: ${distance}`); // Debug log
        
        if (distance < minDistance) {
            minDistance = distance;
            closestArchetype = archetype;
        }
    });
    
    console.log("Closest archetype:", closestArchetype?.name); // Debug log
    return closestArchetype;
}

// Helper function to normalize scores to 0-10 scale
function normalizeScores(rawScores) {
    const normalized = {};
    
    // Calculate actual min/max from your questions
    // Let's say each dimension can appear in 5-10 questions with scores from -3 to +3
    const expectedRanges = {
        emotional: { min: -30, max: 30 },
        logical: { min: -30, max: 30 },
        exploratory: { min: -30, max: 30 },
        harmony_seeking: { min: -15, max: 15 },
        control_need: { min: -15, max: 15 },
        nurture_focus: { min: -15, max: 15 },
        idealistic: { min: -15, max: 15 },
        achievement_drive: { min: -15, max: 15 },
        analytical: { min: -15, max: 15 },
        authority_response: { min: -15, max: 15 },
        independence: { min: -15, max: 15 }
    };
    
    Object.keys(dimensions).forEach(dim => {
        const value = rawScores[dim] || 0;
        const range = expectedRanges[dim] || { min: -20, max: 20 };
        
        // Normalize to 0-10 scale
        normalized[dim] = Math.max(0, Math.min(10, 
            ((value - range.min) / (range.max - range.min)) * 10
        ));
    });
    
    return normalized;
}

// Show results
        // Show results with swipe interface
function showResults() {
    archetype = calculateArchetype(scores);
    const vulnerabilities = vulnerabilityMappings[archetype.name] || [];
    const traits = archetypeTraits[archetype.name] || { description: "" };

    // GA tracking (keep existing)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'quiz_completed', {
            'archetype': archetype.name,
            'emotional_score': scores.emotional,
            'logical_score': scores.logical,
            'exploratory_score': scores.exploratory,
            'harmony_seeking': scores.harmony_seeking,
            'control_need': scores.control_need,
            'nurture_focus': scores.nurture_focus,
            'idealistic': scores.idealistic,
            'achievement_drive': scores.achievement_drive,
            'analytical': scores.analytical,
            'authority_response': scores.authority_response,
            'independence': scores.independence,
            'ethnicity': demographics.ethnicity,
            'orientation': demographics.orientation
        });
    }
    document.body.classList.add('results-page');
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    let html = '';

    // Hook Section
    html += `<div class="results-hero">`;
    html += `<span class="journey-complete">✈️ Journey Complete</span>`;
    html += `<h1 class="results-title">Your travel story is complete, but the real journey begins now...</h1>`;
    html += `<p class="results-subtitle">`;
    html += `Every choice you made `;
    html += `revealed something deeper about who you are and who you're `;
    html += `drawn to in relationships.`;
    html += `</p>`;
    html += `</div>`;
    
    // Personality Reveal
    html += `<div class="personality-reveal">`;
    html += `<p class="personality-label">Your Travel Personality Revealed</p>`;
    html += `<div class="personality-description">${traits.description}</div>`;
    html += `<p style="text-align: center; margin-top: 20px; color: rgba(255, 255, 255, 0.7); font-style: italic;">`;
    html += `These aren't just travel preferences. They're the patterns that shape every relationship you'll ever have.`;
    html += `</p>`;
    html += `</div>`;
    
    // Algorithm Match Reveal
    html += `<div class="matches-intro">`;
    html += `<div style="text-align: center; margin-bottom: 30px;">`;
    html += `<h2 style="color: #f39c12; font-size: 1.8em; margin-bottom: 15px;">🔍 MATCH ANALYSIS COMPLETE</h2>`;
    html += `<p style="font-size: 1.2em; line-height: 1.6;">`;
    html += `Based on your personality traits, our algorithm found <strong>${vulnerabilities.length} matches</strong> who would `;
    html += `find you irresistible. Not because you're compatible...<br><br>`;
    html += `<strong style="color: #e74c3c;">But because you're exactly their type of target.</strong>`;
    html += `</p>`;
    html += `</div>`;
    html += `</div>`;
    
    // Dating App Reveal
    html += `<div class="dating-app-header">`;
    html += `<h2 style="font-size: 1.5em; margin-bottom: 10px;">Welcome to <span style="color: #e74c3c;">ToxicMatch™</span></h2>`;
    html += `<p style="font-style: italic; opacity: 0.8; margin-bottom: 20px;">"The dating app you never wanted to join"</p>`;
    html += `<div style="display: flex; flex-direction: column; gap: 10px; align-items: center; margin: 20px 0;">`;
    html += `<span>⚠️ Warning: All profiles have been flagged for manipulative behavior</span>`;
    html += `<span>💔 100% of matches will lovebomb you</span>`;
    html += `<span>🚩 Hidden red flags revealed on scroll</span>`;
    html += `</div>`;
    html += `<div class="matches-count">`;
    html += `<strong>${vulnerabilities.length} MATCHES WAITING</strong>`;
    html += `</div>`;
    html += `</div>`;
    
    // Swipe container with simplified cards
    html += `<div class="swipe-container" id="swipeContainer">`;
    html += `<div class="stack-indicator"></div>`;
    html += `<div class="stack-indicator-2"></div>`;

    // Generate simplified cards
    // In showResults()
    vulnerabilities.reverse().forEach((vuln, index) => {
        const characterName = vuln.characters[0].split(" (")[0];
        const characterSource = vuln.characters[0].match(/\((.*?)\)/)?.[1] || "";
        const emoji = "💔";
        const matchPercentage = 75 + Math.floor((scores.emotional + scores.logical + scores.exploratory + index * 3) % 25);
        
        html += `<div class="swipe-card" data-index="${index}">`;
        html += `<div class="card-content">`;
        
        // Match badge (now stays visible during scroll)
        html += `<span class="match-badge">${matchPercentage}% MATCH</span>`;
        
        // Add scrollable area
        html += `<div class="card-scroll-area" data-card-index="${index}">`;
        
        // Initial visible content
        html += `<div class="initial-content">`;
        
        // Profile section
        html += `<div class="profile-section">`;
        html += `<div class="character-avatar">${emoji}</div>`;
        html += `<h3 class="character-name">${characterName}</h3>`;
        html += `<p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 5px;">${vuln.datingProfile.subtitle}</p>`;
        html += `<p style="font-size: 0.9em; opacity: 0.6;">📍 ${vuln.datingProfile.location}</p>`;
        html += `</div>`;
        
        // Bio section
        html += `<div class="bio-section">`;
        html += `<p class="bio-text">"${vuln.datingProfile.bio}"</p>`;
        html += `</div>`;
        
        // Why you swipe right
        html += `<div class="attraction-section">`;
        html += `<p class="section-label">💕 Why You'd Swipe Right</p>`;
        html += `<p class="attraction-text">${vuln.whyYouSwipeRight}</p>`;
        html += `</div>`;
        
        html += `</div>`; // End initial content
        
        // Hidden content - The Truth
        html += `<div class="hidden-content" id="hidden-content-${index}">`;
        
        // Warning section
        html += `<div class="truth-warning">`;
        html += `<h3>⚠️ THE TRUTH ⚠️</h3>`;
        html += `<p>What they're really hiding...</p>`;
        html += `</div>`;
        
        // Red flags
        html += `<div class="truth-section">`;
        html += `<p class="section-label">🚩 RED FLAGS REVEALED</p>`;
        html += `<div class="red-flags-container">`;
        
        // Parse the truth into individual red flags
        const truthParts = vuln.theTruth.split('. ');
        truthParts.forEach(part => {
            if (part.trim() && part.includes(':')) {
                const [label, description] = part.split(':');
                html += `<div class="red-flag-item">`;
                html += `<span class="flag-label">${label.trim()}:</span>`;
                html += `<span class="flag-description">${description.trim()}.</span>`;
                html += `</div>`;
            } else if (part.trim()) {
                html += `<div class="red-flag-item">${part.trim()}.</div>`;
            }
        });
        
        html += `</div>`;
        html += `</div>`;
        
        // Punchline
        if (vuln.punchline) {
            html += `<div class="punchline-section">`;
            html += `<p class="punchline-text">"${vuln.punchline}"</p>`;
            html += `</div>`;
        }
        
        html += `</div>`; // End hidden content
        
        // Scroll indicator
        html += `<div class="scroll-indicator" id="scroll-indicator-${index}">`;
        html += `<div class="scroll-hint">Scroll for the truth</div>`;
        html += `<div class="scroll-arrow">⬇️</div>`;
        html += `</div>`;
        
        html += `</div>`; // End scroll area
        
        // Swipe labels
        html += `<div class="nope-label">NOPE</div>`;
        html += `<div class="like-label">TOXIC</div>`;
        
        html += `</div>`; // End card content
        html += `</div>`; // End swipe card
    });

    html += `</div>`; 
    // Swipe Actions
    html += `<div class="swipe-actions">`;
    html += `<button class="swipe-btn reject-btn" onclick="swipeCard('left')">❌</button>`;
    html += `<button class="swipe-btn accept-btn" onclick="swipeCard('right')">😱</button>`;
    html += `</div>`;

    // Card Indicator
    html += `<div class="card-indicator">`;
    html += `<span id="cardCounter">1</span> of ${vulnerabilities.length} toxic matches`;
    html += `</div>`;

    // Protection Protocol
    html += `<div class="protection-protocol">`;
    html += `<h3 class="protocol-title">`;
    html += `<span>🛡️</span>`;
    html += `<span>YOUR PROTECTION PROTOCOL</span>`;
    html += `</h3>`;
    html += `<p style="line-height: 1.8; margin-bottom: 20px;">`;
    html += `Now you understand your patterns. Here's how to protect yourself:`;
    html += `</p>`;
    html += getProtectionTips(archetype.name);
    html += `<p style="margin-top: 20px; font-style: italic; text-align: center;">`;
    html += `<strong>Remember:</strong> The traits that make you ${getPositiveSpin(archetype.name)} `;
    html += `also make you vulnerable to ${getVulnerabilityType(archetype.name)}. Awareness is your armor.`;
    html += `</p>`;
    html += `</div>`;

    // Next Steps
    html += `<div class="next-steps">`;
    html += `<h3 class="next-steps-title">Recognize These Patterns in Someone You Know?</h3>`;
    html += `<p style="max-width: 600px; margin: 0 auto 30px; line-height: 1.6;">`;
    html += `Our AI Relationship Coach can analyze your specific situation and help you `;
    html += `determine if you're living this story right now. Get personalized guidance `;
    html += `based on your unique vulnerabilities.`;
    html += `</p>`;
    html += `<div class="action-buttons">`;
    html += `<a href="https://6848340aa0a2233a0e0a63e9--partner-assessment-tool.netlify.app/" class="primary-cta">Talk to AI Coach</a>`;
    html += `<a href="https://tally.so/r/w8gx25" class="secondary-cta">Share Your Results</a>`;
    html += `</div>`;
    html += `<p style="text-align: center; margin-top: 40px; font-style: italic; color: rgba(255, 255, 255, 0.7);">`;
    html += `"The right person won't feel like a project, a mystery, or a challenge. They'll feel like home."`;
    html += `</p>`;
    html += `</div>`;


// After setting innerHTML, initialize the scrollable functionality
document.getElementById('result-content').innerHTML = html;

// Initialize scrollable cards
initializeScrollableCards();
setTimeout(debugCheckResults, 100);
}



// Initialize floating icons
document.addEventListener('mousemove', (e) => {
    const icons = document.querySelectorAll('.floating-icon');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    icons.forEach((icon, index) => {
        const speed = (index + 1) * 2;
        icon.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
    });
});

// ADD THESE FUNCTIONS TO YOUR JAVASCRIPT

// Initialize scrollable cards
function initializeScrollableCards() {
    const cards = document.querySelectorAll('.swipe-card');
    
    cards.forEach((card, index) => {
        const scrollArea = card.querySelector('.card-scroll-area');
        if (scrollArea) {
            // Reset scroll position
            scrollArea.scrollTop = 0;
            
            // Add scroll event listener
            scrollArea.addEventListener('scroll', function() {
                handleCardScroll(this, index);
            });
        }
    });
    
    // Reattach swipe functionality to top card
    attachSwipeToTopCard();
}

// Handle scroll events to reveal content
function handleCardScroll(scrollElement, cardIndex) {
    const hiddenContent = document.getElementById(`hidden-content-${cardIndex}`);
    const scrollIndicator = document.getElementById(`scroll-indicator-${cardIndex}`);
    
    if (!hiddenContent || !scrollIndicator) return;
    
    // Calculate scroll percentage
    const scrollTop = scrollElement.scrollTop;
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    // Show hidden content when scrolled past 30%
    if (scrollPercentage > 30) {
        hiddenContent.classList.add('revealed');
    }
    
    // Hide scroll indicator when scrolled
    if (scrollTop > 50) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
    
    // Track if user has seen the red flags (optional analytics)
    if (scrollPercentage > 70 && !scrollElement.hasAttribute('data-truth-seen')) {
        scrollElement.setAttribute('data-truth-seen', 'true');
        
        // Optional: Track with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'truth_revealed', {
                'character_index': cardIndex,
                'archetype': calculateArchetype().name
            });
        }
    }
}

// UPDATE your swipeCard function to handle scrollable cards
function swipeCard(direction) {
    if (isAnimating) return;
    
    const cards = document.querySelectorAll('.swipe-card');
    const currentCard = cards[cards.length - 1]; // Top card
    
    if (!currentCard) {
        showSwipeComplete();
        return;
    }
    
    // Check if user scrolled to see the truth
    const scrollArea = currentCard.querySelector('.card-scroll-area');
    const sawTruth = scrollArea && scrollArea.hasAttribute('data-truth-seen');
    
    // Optional: Track swipe with truth visibility
    if (typeof gtag !== 'undefined' && archetype) {
        gtag('event', 'card_swiped', {
            'direction': direction,
            'saw_truth': sawTruth,
            'archetype': archetype.name  // Use stored archetype
        });
    }
    
    isAnimating = true;
    
    // Apply animation directly instead of using classes
    currentCard.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    if (direction === 'right') {
        currentCard.style.transform = 'translateX(150%) rotate(20deg)';
    } else {
        currentCard.style.transform = 'translateX(-150%) rotate(-20deg)';
    }
    currentCard.style.opacity = '0';
    
    // Continue with existing swipe logic...
    setTimeout(() => {
        currentCard.remove();
        currentCardIndex++;
        isAnimating = false;
        
        // Update counter
        if (archetype) {
            const totalCards = vulnerabilityMappings[archetype.name]?.length || 0;
            const counter = document.getElementById('cardCounter');
            if (counter && currentCardIndex < totalCards) {
                counter.textContent = currentCardIndex + 1;
            }
        }
        
        // Check if more cards exist
        const remainingCards = document.querySelectorAll('.swipe-card');
        if (remainingCards.length > 0) {
            // Initialize scroll for new top card
            initializeScrollableCards();
        } else {
            showSwipeComplete();
        }
    }, 600);
}

// Optional: Add a subtle hint animation
function addScrollHint() {
    const topCard = document.querySelector('.swipe-card:last-child');
    if (!topCard) return;
    
    const scrollArea = topCard.querySelector('.card-scroll-area');
    if (!scrollArea) return;
    
    // After 3 seconds, show a subtle scroll hint
    setTimeout(() => {
        scrollArea.scrollTo({
            top: 80,
            behavior: 'smooth'
        });
        
        // Scroll back up after a moment
        setTimeout(() => {
            scrollArea.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 800);
    }, 3000);
}

// Call this after initializing cards if you want the hint
// addScrollHint();

function debugCheckResults() {
    console.log("=== DEBUG CHECK ===");
    
    // Check if main containers exist
    console.log("Result container exists:", !!document.getElementById('result-container'));
    console.log("Result content exists:", !!document.getElementById('result-content'));
    
    // Check if key sections exist
    console.log("Swipe container:", !!document.querySelector('.swipe-container'));
    console.log("Number of cards:", document.querySelectorAll('.swipe-card').length);
    console.log("Protection protocol:", !!document.querySelector('.protection-protocol'));
    console.log("Next steps:", !!document.querySelector('.next-steps'));
    console.log("Action buttons:", !!document.querySelector('.action-buttons'));
    
    // Check for unclosed divs
    const resultContent = document.getElementById('result-content');
    if (resultContent) {
        const openDivs = (resultContent.innerHTML.match(/<div/g) || []).length;
        const closeDivs = (resultContent.innerHTML.match(/<\/div>/g) || []).length;
        console.log(`Open divs: ${openDivs}, Close divs: ${closeDivs}`);
        if (openDivs !== closeDivs) {
            console.error(`DIV MISMATCH! Missing ${openDivs - closeDivs} closing tags`);
        }
    }
}

let currentCardIndex = 0;
let isAnimating = false;

function initializeSwipeCards() {
    attachSwipeToTopCard();
}

function attachSwipeToTopCard() {
    const cards = document.querySelectorAll('.swipe-card');
    if (cards.length === 0) return;
    
    // Only attach events to the LAST card (which is on top due to z-index)
    const topCard = cards[cards.length - 1];
    
    let startX = null;
    let currentX = null;
    let isDragging = false;
    
    // Touch events
    topCard.addEventListener('touchstart', handleStart, {passive: true});
    topCard.addEventListener('touchmove', handleMove, {passive: true});
    topCard.addEventListener('touchend', handleEnd);
    
    // Mouse events
    topCard.addEventListener('mousedown', handleStart);
    topCard.addEventListener('mousemove', handleMove);
    topCard.addEventListener('mouseup', handleEnd);
    topCard.addEventListener('mouseleave', handleEnd);
    
    function handleStart(e) {
        if (isAnimating) return;
        isDragging = true;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        topCard.classList.add('dragging');
    }
    
    function handleMove(e) {
        if (!startX || isAnimating || !isDragging) return;
        
        currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const diffX = currentX - startX;
        const rotate = diffX * 0.05;
        
        topCard.style.transform = `translateX(${diffX}px) rotate(${rotate}deg)`;
        
        // Show/hide labels
        if (diffX > 80) {
            topCard.classList.add('tilting-right');
            topCard.classList.remove('tilting-left');
        } else if (diffX < -80) {
            topCard.classList.add('tilting-left');
            topCard.classList.remove('tilting-right');
        } else {
            topCard.classList.remove('tilting-left', 'tilting-right');
        }
    }
    
    function handleEnd(e) {
        if (!startX || isAnimating || !isDragging) return;
        
        isDragging = false;
        topCard.classList.remove('dragging');
        
        const diffX = currentX - startX || 0;
        const threshold = 120;
        
        if (Math.abs(diffX) > threshold) {
            swipeCardWithReattach(diffX > 0 ? 'right' : 'left');
        } else {
            // Snap back
            topCard.style.transition = 'transform 0.3s ease-out';
            topCard.style.transform = '';
            topCard.classList.remove('tilting-left', 'tilting-right');
            
            setTimeout(() => {
                topCard.style.transition = '';
            }, 300);
        }
        
        startX = null;
        currentX = null;
    }
}

function swipeCardWithReattach(direction) {
    if (isAnimating) return;
    
    const cards = document.querySelectorAll('.swipe-card');
    const currentCard = cards[cards.length - 1]; // Top card
    
    if (!currentCard) {
        showSwipeComplete();
        return;
    }
    
    isAnimating = true;
    
    // Clear transform and add animation
    currentCard.style.transform = '';
    currentCard.classList.add(direction === 'right' ? 'swiping-right' : 'swiping-left');
    
    setTimeout(() => {
        currentCard.remove();
        currentCardIndex++;
        isAnimating = false;
        
        // Update counter
        if (currentArchetype) {
            const totalCards = vulnerabilityMappings[currentArchetype.name].length;
            const counter = document.getElementById('cardCounter');
            if (counter && currentCardIndex < totalCards) {
                counter.textContent = currentCardIndex + 1;
            }
        }
        // Check if more cards exist
        const remainingCards = document.querySelectorAll('.swipe-card');
        if (remainingCards.length > 0) {
            // Attach swipe to the new top card
            attachSwipeToTopCard();
        } else {
            showSwipeComplete();
        }
    }, 600);
}

// Update your button swipe function


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
    if (typeof gtag !== 'undefined') {
        gtag('event', 'card_swiped', {
            'direction': direction,
            'saw_truth': sawTruth,
            'archetype': calculateArchetype().name
        });
    }
    
    isAnimating = true;
    
    // Add animation class
    currentCard.classList.add(direction === 'right' ? 'swiping-right' : 'swiping-left');
    
    // Continue with existing swipe logic...
    setTimeout(() => {
        currentCard.remove();
        currentCardIndex++;
        isAnimating = false;
        
        // Update counter
        const totalCards = vulnerabilityMappings[calculateArchetype().name].length;
        const counter = document.getElementById('cardCounter');
        if (counter && currentCardIndex < totalCards) {
            counter.textContent = currentCardIndex + 1;
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

function showSwipeComplete() {
    const container = document.getElementById('swipeContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <h3 style="color: #2ecc71; font-size: 2em; margin-bottom: 20px;">✅ Swipe Complete!</h3>
            <p style="font-size: 1.2em; margin-bottom: 30px;">You've reviewed all your matches.</p>
            <p style="opacity: 0.8;">Remember: Knowing these toxic patterns is your first defense against them!</p>
        </div>
    `;
}
let previousUrl = '';
let isRunning = false; // Flag to prevent multiple executions

// Function to check for AI content
function checkForAI() {
    if (isRunning) return; // Prevent re-entry if already running
    isRunning = true; // Set the flag to prevent further executions

    // A short delay to allow all elements to load
    setTimeout(() => {
        
        // Set Variables
        let IsAi = false;
        const bannedWords = ['Midjourney', 'aidrawing', 'AI', "Ai", 'Artificial intelligence', 'Machine learning', 'ai', 'nijijourney', 'aiart', 'stablediffustion', 'aidrawing', 'aiartanime', 'midjourneyart', 'aiイラスト', 'aiillustration'];

        
        
        // Select all elements with the class "text-container" that could contain ai
        const textContainerElements = document.querySelectorAll('.text-container');
        const headingElements = document.querySelectorAll('h1, h4, h5, h6');
        const descriptionElements = document.querySelectorAll('[data-test-id="truncated-description"]');

        // Combine all NodeLists into a single array
        const allElements = [
            ...textContainerElements,
            ...headingElements,
            ...descriptionElements
        ];

        
        // Check if any elements were found
        if (allElements.length > 0) {
            console.log('Elements :');
            allElements.forEach((element) => {
                const textContent = element.textContent.trim();
                // Only log elements that contain banned words
                if (contains(textContent, bannedWords)){
                    //sets AI to true
                    IsAi = true
                    // Only log elements that have non-empty text content
                    if (textContent.length > 0) {
                        if (element.hasAttribute('data-test-id') && element.getAttribute('data-test-id') === 'truncated-description') {
                            const textContentnohash = textContent.replace(/#/g, ' ');
                            console.log(`Description contains AI | "${textContentnohash}"`);
                        } else {
                            if (element.tagName.toLowerCase() == "span") {console.log(`Commnet contains AI | "${element.textContent.trim()}"`);} else{
                            console.log(`${element.tagName.toLowerCase()} contains AI | "${element.textContent.trim()}"`);}
                        }
                    }
                } // Logs elements without AI >>  else {console.log(`${element.tagName.toLowerCase()} | Does not contain AI.`);}
            });
        } 
        
        // Check for main image
        mainImgElement = document.querySelector('[data-test-id="closeup-body-image-container"] img');
        if (mainImgElement) {
            if (mainImgElement && IsAi) {
                console.log("Image replaced with AI image.");
                AiIsDetected(mainImgElement)
            } else {
                console.log("AI not detected.");
            }
        } else {
            console.log("Main image element not found.");
        }
        
        isRunning = false; // Reset the flag after processing
    }, 2500); // Adjust the delay as needed (300 ms here)
}

// Function to handle URL changes
const handleUrlChange = () => {
    const currentUrl = window.location.href;
    if (currentUrl !== previousUrl) {
        console.log(`URL data changed to ${currentUrl}`);
        previousUrl = currentUrl;

        // Wait for the DOM to be fully loaded
        checkForAI(); // Call the function directly to check after delay
    }
};

// Use MutationObserver to detect URL changes
const observer = new MutationObserver(handleUrlChange);
observer.observe(document.body, {
    childList: true,
    subtree: true
});

function AiIsDetected(MainImage) {
    MainImage.src = "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg"; // Replace image if AI is detected
}

// function that checks if a word is in a string
function contains(target, pattern) {
    return pattern.some(word => target.includes(word));
}

// Initial call in case the script is loaded on an existing Pinterest pin
handleUrlChange();

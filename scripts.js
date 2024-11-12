console.log('scripts.js loaded');

// Sample documentation data (replace with real documentation content later)
const documentationData = [
    { title: "Introduction to Oro", content: "Oro is a language designed to simplify text processing..." },
    { title: "Syntax Overview", content: "Oro syntax is intuitive, with commands like..." },
    { title: "Working with Large Text Files", content: "Efficient text file manipulation with Oro..." },
    { title: "Error Handling in Oro", content: "Oro offers structured error handling to help you debug..." },
    // Add more documentation sections here
];

// Prevent form from submitting and reloading the page
document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();  // Stop form from submitting
    console.log("Form submission prevented");
});

// Debounce function to prevent too many API calls or UI updates
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Function to show autosuggest as user types
function showSuggestions(query) {
    const suggestionsBox = document.getElementById('suggestions');
    //const searchResults = document.getElementById('search-results');

    // Clear previous suggestions
    suggestionsBox.innerHTML = '';
    suggestionsBox.style.display = 'none';

    if (query.length > 0) {
        // Filter the documentation data based on query
        const suggestions = documentationData.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        // Display suggestions
        if (suggestions.length > 0) {
            suggestionsBox.style.display = 'block';
            suggestions.forEach(suggestion => {
                const p = document.createElement('p');
                p.innerHTML = suggestion.title;
                p.onclick = (e) => {
                    e.preventDefault();  // Prevent any default behavior on click
                    showResult(suggestion);
                    suggestionsBox.style.display = 'none'; // Hide suggestions when item clicked
                };
                suggestionsBox.appendChild(p);
            });
        }
    }
}

// Function to show the search result page
function showResult(item) {
    const searchResults = document.getElementById('search-results');
    
    // Load the search result content
    searchResults.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.content}</p>
    `;
}

// Debounced version of showSuggestions to reduce flicker and improve performance
document.getElementById('search').addEventListener('input', debounce((e) => {
    e.preventDefault();  // Prevent any default behavior
    showSuggestions(e.target.value);
}, 300));

// Detect focus to avoid disappearing suggestions when the input is clicked
document.getElementById('search').addEventListener('focus', (e) => {
    e.preventDefault();  // Prevent any form or page submission
    const query = document.getElementById('search').value;
    if (query.length > 0) {
        showSuggestions(query);
    }
});

// Clear suggestions when clicking outside the input or suggestions box
document.addEventListener('click', (event) => {
    e.preventDefault();
    const searchInput = document.getElementById('search');
    const suggestionsBox = document.getElementById('suggestions');
    
    // If click is outside both the input and suggestions, hide the suggestions
    if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
        suggestionsBox.style.display = 'none';
    }
});


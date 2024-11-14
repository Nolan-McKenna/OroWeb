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
            suggestionsBox.classList.add('animate'); // Add animation class
            suggestions.forEach(suggestion => {
                const p = document.createElement('p');
                p.innerHTML = suggestion.title;
                p.onclick = (e) => {
                    e.preventDefault();
                    showResult(suggestion);
                    suggestionsBox.style.display = 'none';
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

    // Trigger the fade-in animation
    searchResults.classList.add('animate');
}

// Detect page load to trigger animations
window.addEventListener('load', () => {
    // Trigger hero section fade-in
    const heroSection = document.querySelector('.hero-section');
    heroSection.classList.add('animate');

    // Trigger about section slide-in
    const aboutSection = document.querySelector('.about-section');
    aboutSection.classList.add('animate');

    // Trigger release section slide-in
    const releaseSection = document.querySelector('.release-section');
    releaseSection.classList.add('animate');
});

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
    event.preventDefault();
    const searchInput = document.getElementById('search');
    const suggestionsBox = document.getElementById('suggestions');
    
    // If click is outside both the input and suggestions, hide the suggestions
    if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
        suggestionsBox.style.display = 'none';
    }
});


// Version history data structure
const versionHistory = [
    {
      version: "0.7.0",
      releaseDate: "January 2024",
      features: [
        "Initial text processing engine",
        "Basic command line interface",
        "Core text manipulation functions",
        "Simple file handling capabilities"
      ]
    },
    {
      version: "0.8.0",
      releaseDate: "February 2024",
      features: [
        "Enhanced performance optimizations",
        "Extended function library",
        "Improved error handling",
        "Better documentation structure"
      ]
    },
    {
      version: "0.9.0",
      releaseDate: "March 2024",
      features: [
        "Beta testing phase began",
        "Advanced pattern matching",
        "Memory usage optimizations",
        "New text analysis tools"
      ]
    },
    {
      version: "1.0.0",
      releaseDate: "May 2025 (Scheduled)",
      features: [
        "Efficient syntax for processing large datasets",
        "Optimized performance for fast text analysis",
        "Diverse built-in functions for processing large text files",
        "Production-ready release"
      ]
    }
  ];
  
  let currentVersionIndex = versionHistory.length - 1; // Start with latest version
  
  // Function to update the release section content
  function updateReleaseContent(index) {
    const version = versionHistory[index];
    const releaseSection = document.querySelector('.release-details');
    
    releaseSection.innerHTML = `
      <div class="version-navigation">
        <button class="nav-arrow left" ${index === 0 ? 'disabled' : ''}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div class="version-info">
          <h3>Version ${version.version}</h3>
          <p class="release-date">${version.releaseDate}</p>
        </div>
        <button class="nav-arrow right" ${index === versionHistory.length - 1 ? 'disabled' : ''}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
      <ul class="feature-list">
        ${version.features.map(feature => `<li>${feature}</li>`).join('')}
      </ul>
      ${index === versionHistory.length - 1 ? 
        '<a href="#" class="download-button">Download Oro Soon</a>' : 
        '<button class="view-docs-button">View Documentation</button>'}
    `;
  
    // Add event listeners to the navigation buttons
    const leftArrow = releaseSection.querySelector('.nav-arrow.left');
    const rightArrow = releaseSection.querySelector('.nav-arrow.right');
  
    leftArrow.addEventListener('click', () => {
      if (currentVersionIndex > 0) {
        currentVersionIndex--;
        updateReleaseContent(currentVersionIndex);
      }
    });
  
    rightArrow.addEventListener('click', () => {
      if (currentVersionIndex < versionHistory.length - 1) {
        currentVersionIndex++;
        updateReleaseContent(currentVersionIndex);
      }
    });
  
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && currentVersionIndex > 0) {
        currentVersionIndex--;
        updateReleaseContent(currentVersionIndex);
      } else if (e.key === 'ArrowRight' && currentVersionIndex < versionHistory.length - 1) {
        currentVersionIndex++;
        updateReleaseContent(currentVersionIndex);
      }
    });
  }
  
  // Initialize the release section with the latest version
  document.addEventListener('DOMContentLoaded', () => {
    updateReleaseContent(currentVersionIndex);
  });


  // Get search bar elements
const searchInput = document.getElementById('search');
const suggestionsBox = document.getElementById('suggestions');
const searchResults = document.getElementById('search-results');

// Create and append clear button to search container
const searchContainer = document.querySelector('.search-container');
const clearButtonContainer = document.createElement('div');
clearButtonContainer.className = 'clear-button-container';

const clearButton = document.createElement('button');
clearButton.className = 'search-clear-button';
clearButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
`;
clearButtonContainer.appendChild(clearButton);
searchContainer.appendChild(clearButtonContainer);

// Function to clear search
function clearSearch() {
  searchInput.value = '';
  suggestionsBox.style.display = 'none';
  searchResults.innerHTML = '';
  clearButtonContainer.style.display = 'none';
  searchInput.focus();
}

// Show/hide clear button based on input
searchInput.addEventListener('input', () => {
  clearButtonContainer.style.display = searchInput.value ? 'flex' : 'none';
});

// Clear button click handler
clearButton.addEventListener('click', clearSearch);

// Add escape key functionality
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    clearSearch();
  }
});

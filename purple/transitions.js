// Function to handle page transitions
function navigateTo(url) {
  // Get the transition overlay
  const transitionElement = document.querySelector('.page-transition');
  
  // Activate the transition (fade in overlay)
  transitionElement.classList.add('active');
  
  // Wait for the transition to complete before navigating
  setTimeout(() => {
    // Store the current scroll position in session storage
    sessionStorage.setItem('scrollPosition', window.scrollY);
    
    // Navigate to the new page
    window.location.href = url;
  }, 500); // This should match the CSS transition duration
}

// When the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Get the transition overlay
  const transitionElement = document.querySelector('.page-transition');
  
  // If we're coming from another page (transition in)
  if (sessionStorage.getItem('scrollPosition')) {
    // Start with the overlay visible
    transitionElement.classList.add('active');
    
    // After a short delay, fade out the overlay
    setTimeout(() => {
      transitionElement.classList.remove('active');
      
      // Restore scroll position
      const scrollPosition = parseInt(sessionStorage.getItem('scrollPosition') || '0');
      window.scrollTo(0, scrollPosition);
    }, 100);
  }
  
  // Add click event listeners to all links that should have transitions
  document.querySelectorAll('.logo a, .nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default navigation
      const url = this.getAttribute('href');
      navigateTo(url);
    });
  });
});
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle scroll event
function handleScroll() {
  const elements = document.querySelectorAll(".animate-left-to-right");
  elements.forEach((element) => {
    if (isInViewport(element)) {
      element.classList.add("animated");
    } else {
      element.classList.remove("animated"); // Remove the class if not in viewport
    }
  });
}

// Function to handle transition end event
function handleTransitionEnd(event) {
  if (event.propertyName === "opacity" && !isInViewport(event.target)) {
    event.target.classList.remove("animated");
  }
}

// Add scroll event listener
window.addEventListener("scroll", handleScroll);

// Add transition end event listener to each animated element
const animatedElements = document.querySelectorAll(".animate-left-to-right");
animatedElements.forEach((element) => {
  element.addEventListener("transitionend", handleTransitionEnd);
});

// Initial check on page load
handleScroll();

// Get the elements with the class "typewriter"
const typewriterElements = document.querySelectorAll(".typewriter");

// Function to apply typewriter effect
function applyTypewriterEffect(element) {
  const text = element.innerHTML.trim();
  element.innerHTML = "";
  // Get typing speed from data attribute, default to 50 if not specified
  const typingSpeed = parseInt(element.dataset.typingSpeed) || 150  ;

  let i = 0;
  const typeInterval = setInterval(() => {
    element.innerHTML += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typeInterval);
    }
  }, typingSpeed); // Adjust typing speed if needed
}

// Initialize Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        applyTypewriterEffect(entry.target);
        observer.unobserve(entry.target); // Stop observing once the effect is applied
      }
    });
  },
  { threshold: 0.5 }
); // Adjust threshold as needed

// Get typewriter elements and observe them

typewriterElements.forEach((element) => {
  if (isInViewport(element)) {
    applyTypewriterEffect(element);
  } else {
    observer.observe(element);
  }
});

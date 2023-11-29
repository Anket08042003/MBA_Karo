// Your existing JavaScript without changes
function toggleNav() {
    var navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
    function toggleDarkMode() {
        // Toggle a class on the body to switch between light and dark styles
        document.body.classList.toggle("dark-mode");

        // Save the user's preference in localStorage
        const isDarkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("dark-mode", isDarkMode);
    }

    // Function to set initial dark mode state based on user preference
    function setInitialDarkMode() {
        const isDarkMode = localStorage.getItem("dark-mode") === "true";
        document.body.classList.toggle("dark-mode", isDarkMode);
    }

    // Call the function to set initial dark mode state when the page loads
    window.onload = setInitialDarkMode;
}

document.addEventListener('DOMContentLoaded', function() {
    // Hide the main content initially
    console.log('DOMContentLoaded: Main content hidden.');
});

// Function to dynamically load content
function loadContent(page) {
    fetch(page)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        document.getElementById('main-content').innerHTML = data;
        document.getElementById('main-content').style.display = 'block';
        window.scrollTo(0, 0); // Scroll to the top of the page
        console.log(`${page} content loaded.`);
    })
    .catch(error => console.error('Error loading content:', error));
}

// Function to load contact form 
function showContactForm() { 
    loadContent('contact.html'); 
} 
// Function to close the contact form 
function closeContactForm() { 
     document.getElementById('main-content').innerHTML = '';
}

// Function to load header.html
async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        document.getElementById('header-placeholder').innerHTML = text;
        console.log('Header loaded.');
    } catch (error) {
        console.error('Error loading header:', error);
    }
}
loadHeader();


// Function to show a specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
    }
}


// Function to load footer.html
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        if (!response.ok) throw new Error('Network response was not ok');
        const text = await response.text();
        document.getElementById('footer-placeholder').innerHTML = text;
        console.log('Footer loaded.');
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}
loadFooter();

// Handle the loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.querySelector('header').style.display = 'block';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('footer-placeholder').style.display = 'block';
        loadContent('about.html'); // Load the "About Me" content by default after loading screen
        console.log('Loading screen hidden, About Me content loaded.');
        document.body.style.overflow = 'auto'; // Allow scrolling after loading screen
    }, 2000); // 2 seconds
});


// START SCREEN ASSISTANT 

// Initial font size percentage
let fontSizePercentage = 100;

function toggleAssistantMenu() {
    const menu = document.getElementById('assistantMenu');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

function updateZoomDisplay() {
    document.getElementById('zoomPercentage').innerText = fontSizePercentage + '%';
}

function zoomIn() {
    if (fontSizePercentage < 500) {
        fontSizePercentage += 25;
        document.body.style.fontSize = fontSizePercentage + '%';
        updateZoomDisplay();
    }
}

function zoomOut() {
    if (fontSizePercentage > 25) {
        fontSizePercentage -= 25;
        document.body.style.fontSize = fontSizePercentage + '%';
        updateZoomDisplay();
    }
}

function toggleReadableFont() {
    const currentFont = document.body.style.fontFamily;
    document.body.style.fontFamily = (currentFont === 'Arial, sans-serif') ? '' : 'Arial, sans-serif';
}

function toggleUnderlineLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => link.style.textDecoration = link.style.textDecoration === 'underline' ? 'none' : 'underline');
}

function highlightLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.style.backgroundColor === 'yellow') {
            link.style.backgroundColor = '';
        } else {
            link.style.backgroundColor = 'yellow';
        }
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleGreyscale() {
    const images = document.querySelectorAll('img');
    images.forEach(img => img.classList.toggle('greyscale'));
}

function removeAnimations() {
    const animatedElements = document.querySelectorAll('*');
    animatedElements.forEach(elem => {
        elem.style.animation = 'none';
        elem.style.transition = 'none';
    });
}

function clearCookies() {
    document.cookie.split(";").forEach(function(c) {
        document.cookie = c.split("=")[0] + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
    alert('Cookies cleared and settings reset!');

    // Reset all adjustments made by the assistant
    document.body.style.fontSize = '100%';
    fontSizePercentage = 100;
    updateZoomDisplay();
    document.body.style.fontFamily = '';
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.style.textDecoration = 'none';
        link.style.backgroundColor = '';
    });
    document.body.classList.remove('dark-mode');
    const images = document.querySelectorAll('img');
    images.forEach(img => img.classList.remove('greyscale'));
    const animatedElements = document.querySelectorAll('*');
    animatedElements.forEach(elem => {
        elem.style.animation = '';
        elem.style.transition = '';
    });
}

function toggleNightMode() {
    document.body.classList.toggle('night-mode');
    const assistantMenu = document.getElementById('assistantMenu');
    assistantMenu.classList.toggle('night-mode');
}

let scrollPosition = 'top';

function toggleScroll() {
    if (scrollPosition === 'top') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        scrollPosition = 'bottom';
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        scrollPosition = 'top';
    }
}

function updateBrightness(value) { 
    const content = document.querySelector('.page-content'); 
    if (content) { content.style.filter = `brightness(${value})`;
  } 
}

//***END SCREEN ASSISTANT


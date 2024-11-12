// ASSETS EDITS

// Just add/remove line to modify elements and script will accommodate
// Make sure to add commas between each element (but last element no comma)

// array of static images displayed inside carousel
const images = [
    "assets/images/IMG_3084_1.webp", // First image loaded dynamically
    "assets/images/IMG_3084_2.webp",
    "assets/images/IMG_3084_3.webp",
    "assets/images/IMG_3084_4.webp"
];

// team members array data (name + position)
const teamMembers = [
    { name: "Alessandro Brotto", position: "Founder & director" },
    { name: "Alessandro Martin", position: "Junior visualiser" },
    { name: "Alessandro Nicolardi", position: "Junior visualiser" },
    { name: "Anna Bukowy", position: "Senior visualiser" },
    { name: "Célia Remba", position: "Office manager & senior visualiser" },
    { name: "Giulia Vit", position: "Intern" },
    { name: "Isabelle Boulein", position: "Administration" },
    { name: "Matthieu Sagot", position: "Project manager & senior visualiser" },
    { name: "Nicolò Ciccotti", position: "Senior visualiser" },
    { name: "Paolo Cirelli", position: "Senior visualiser" },
    { name: "Yulia Dorofieieva", position: "Project manager & senior visualiser" },
    { name: " ", position: "© ailleurs.studio 2024" } // last space used for copyright — do not remove and add person above if modifying team list!
];

// ———————————————————————————————————————————————————————————————————— //
// NON-EDITABLE SCRIPT:

let currentIndex = 0; // keeping track of current image displayed in carousel
const imgElement = document.getElementById('carousel-image'); // grab img element from DOM
imgElement.src = images[0]; // setting initial image source to the first image in the array
let carouselInterval; // variable to switch img every 7 seconds
const videoUrl = "assets/images/video.mp4"; // storing URL of video file
let videoElement = null; // variable for video element added to DOM, null until video is added
let isTeamVisible = false; // flag if team section is visible or not

// function to dynamically create members (name + position) and populate team section
function populateTeam() {
    const teamDiv = document.getElementById('team');
    teamDiv.innerHTML = '';

    teamMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');

        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = member.name;

        const positionElement = document.createElement('div');
        positionElement.classList.add('position');
        positionElement.textContent = member.position;

        memberDiv.appendChild(nameElement);
        memberDiv.appendChild(positionElement);
        teamDiv.appendChild(memberDiv);
    });
}

// function to change/update image displayed in the carousel
function changeImage() {
    currentIndex = (currentIndex + 1) % images.length; // Move to next image and loop over again
    imgElement.src = images[currentIndex]; // Change the image source
}

// start the image carousel using setInterval to call changeImage() every 7s
function startCarousel() {
    carouselInterval = setInterval(changeImage, 7000);
}

// pause the image carousel for when team section is open
function stopCarousel() {
    clearInterval(carouselInterval); // stopping/clearing the interval and pause image switch
}

// function to create or play the video (only shown on desktop, hidden on mobile)
function playVideo() {
    const carouselDiv = document.getElementById('carousel');
    if (!videoElement) {
        videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        videoElement.style.position = 'absolute'; // Position the video absolutely
        videoElement.style.top = '0';
        videoElement.style.left = '0';
        carouselDiv.appendChild(videoElement);
    }

    // Ensure the carousel div occupies the full viewport height when showing the video
    carouselDiv.style.height = '100vh';
    imgElement.style.display = 'none';
    videoElement.style.display = 'block';
    videoElement.currentTime = 0;
    videoElement.play();
}

// function to show image carousel
function showCarousel() {
    if (videoElement) {
        videoElement.style.display = 'none'; // hiding video
    }
    imgElement.style.display = 'block'; // showing image carousel
    imgElement.src = images[currentIndex]; // ensure current image is displayed
    startCarousel(); // starting carousel again
}

// function to adjust carousel height to match team section height only in mobile landscape
function adjustCarouselHeight() {
    const carouselDiv = document.getElementById('carousel');
    const teamDiv = document.getElementById('team');
    const isMobileLandscape = window.innerWidth < 576 && window.innerWidth > window.innerHeight;

    if (isTeamVisible && isMobileLandscape) {
        // Match team's height only in mobile landscape mode
        const teamHeight = teamDiv.offsetHeight;
        carouselDiv.style.height = `${teamHeight}px`;
    } else {
        // Default to full viewport height in other cases
        carouselDiv.style.height = '100vh';
    }
}

// at each page load, carousel will restart
document.addEventListener('DOMContentLoaded', () => {
    startCarousel(); // starting carousel on page load
});

// event listener to toggle team's visibility and video
document.getElementById('center').addEventListener('click', () => {
    const carouselDiv = document.getElementById('carousel');
    const teamDiv = document.getElementById('team');
    const screenWidth = window.innerWidth; // get current screen width

    if (teamDiv.style.display === 'none' || teamDiv.style.display === '') {
        // when showing team section:
        carouselDiv.style.flex = '1 1 50%'; // carousel takes 50% width
        teamDiv.style.display = 'flex'; // show team section
        teamDiv.style.flex = '1 1 50%'; // team takes 50% width

        // if current screen width is desktop-sized:
        if (screenWidth > 576) {
            playVideo(); // show and play the video every time team is shown
            stopCarousel(); // stop image carousel when the video shows
        } else {
            carouselDiv.style.display = 'none'; // hide carousel on small screens under 576px
            stopCarousel(); // stopping carousel (and video) for mobile
        }

        populateTeam();  // populate the team members in the team section
        adjustCarouselHeight(); // adjust carousel height to match team section if mobile landscape
        isTeamVisible = true; // flag if team is visible

    } else {
        // hiding team section and resuming the image carousel
        carouselDiv.style.display = 'flex'; // carousel visible again
        carouselDiv.style.flex = '1 1 100%'; // carousel full width flex
        teamDiv.style.display = 'none'; // hiding team section
        carouselDiv.style.height = '100vh'; // reset carousel to full viewport height
        showCarousel(); // showing carousel with images
        isTeamVisible = false; // flagging that team is hidden
    }
});

// event listener for window resize to handle showing/hiding the carousel + video
window.addEventListener('resize', () => {
    if (isTeamVisible) {
        adjustCarouselHeight(); // adjust height if the team is visible
    }
});

// function to adjust container margin based on orientation
function adjustContainerMargin() {
    const containerDiv = document.getElementById('container');
    if (window.innerWidth > window.innerHeight) {
        // tipping phone into landscape mode
        containerDiv.style.marginBottom = '15.5px'; // add an extra bottom margin
    } else {
        // portrait mode
        containerDiv.style.marginBottom = '0'; // no extra bottom margin
    }
}

// Call the function on window resize to adjust container margin based on orientation
window.addEventListener('resize', adjustContainerMargin);

// Initial call to set the margin based on the current orientation
adjustContainerMargin();

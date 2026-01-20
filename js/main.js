
/* =========================================
    LIGHT BOX IMAGE OPENER
    ========================================= */
document.addEventListener("DOMContentLoaded",()=>{

  const images = [...document.querySelectorAll(".cert-grid img, .gallery-grid img")];
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  // Safety Check: Only run if these elements exist on the current page
  if (!lightbox || !images.length) return;
  
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.querySelector(".lightbox-nav.prev");
  const nextBtn = document.querySelector(".lightbox-nav.next");

  let currentIndex = 0;

  function showImage(i){
    currentIndex = (i + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
    lightbox.style.display = "flex";
  }

  images.forEach((img,i)=>{
    img.onclick = ()=> showImage(i);
  });

// Use optional chaining or if-checks for navigation buttons
  if (prevBtn) prevBtn.onclick = () => showImage(currentIndex - 1);
  if (nextBtn) nextBtn.onclick = () => showImage(currentIndex + 1);
  if (closeBtn) closeBtn.onclick = () => lightbox.style.display = "none";

  lightbox.onclick = e => {
    if (e.target === lightbox) lightbox.style.display = "none";
  };

  document.addEventListener("keydown", e=>{
    if(e.key === "Escape") lightbox.style.display="none";
    if(e.key === "ArrowRight") showImage(currentIndex + 1);
    if(e.key === "ArrowLeft") showImage(currentIndex - 1);
  });

});

/* =========================================*/

/*=============================================
SCROLL REVEAL ANIMATION
=============================================*/
const reveals=document.querySelectorAll('.gallery-grid > div');

window.addEventListener('scroll',()=>{
  reveals.forEach(el=>{
    const top=el.getBoundingClientRect().top;
    if(top<window.innerHeight-80) el.classList.add('active');
  })
})
/*=============================================*/


/* =========================================
    REUSABLE COMPONENT LOADER
   ========================================= */
async function loadComponent(elementId, filePath) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const content = await response.text();
            element.innerHTML = content;
            
            // Highlight active link after header loads
            if (elementId === 'site-header') {
                highlightActiveLink();
            }
        }
    } catch (error) {
        console.error("Error loading component:", error);
    }
}

function highlightActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav__link");
    
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("site-header", "./includes/header-partial.html");
    loadComponent("site-footer", "./includes/footer-partial.html");

});

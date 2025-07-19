// Menú 
const menuBtn = document.getElementById('menu-btn');
const hamburguerBtn = document.getElementById('burguer-menu');

if (menuBtn && hamburguerBtn) {
  menuBtn.addEventListener("click", () => {
    hamburguerBtn.classList.toggle("hidden");
  });
}



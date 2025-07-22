window.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle-theme");

    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }

    toggleBtn.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");

      if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  });

  // Configuración de Tailwind para activar el modo oscuro por clase
  tailwind.config = {
    darkMode: 'class',
  }


  
  
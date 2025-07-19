// Dark Mode
tailwind.config = {
    darkMode: 'class', 
  }
  
  const toggleBtn = document.getElementById("toggle-theme");
  
  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
  
  
  });
  
  
  
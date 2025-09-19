// Menú 
const menuBtn = document.getElementById('menu-btn');
const hamburguerBtn = document.getElementById('burguer-menu');

if (menuBtn && hamburguerBtn) {
  menuBtn.addEventListener("click", () => {
    hamburguerBtn.classList.toggle("hidden");
  });
}

// Firebase
import { firebaseConfig } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mostrar habilidades en el contenedor
async function cargarHabilidades() {
  const contenedor = document.getElementById("habilidades-container");
  const snapshot = await getDocs(collection(db, "ComponentHabilidad"));

  snapshot.forEach((doc) => {
  const { title, number, ProcesoDeAprendizaje } = doc.data(); 

  let colorClass = "text-zinc-600";

if (number <= 40) {
  colorClass = "text-red-500";
} else if (number <= 70) {
  colorClass = "text-yellow-400";
} else {
  colorClass = "text-green-500";
}

//Crea la clase y sus estilos
  const card = document.createElement("div");
  card.className = "bg-white dark:bg-zinc-700 rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-transform";

  card.innerHTML = `
    <h4 class="text-xl font-semibold text-zinc-900 dark:text-white mb-2">${title}</h4>
    <p class="text-sm text-zinc-600 dark:text-zinc-300">Aprendizaje: ${ProcesoDeAprendizaje} 🚀</p>
    <br>
    <p class="text-sm ${colorClass}">Nivel: ${number}%</p>

  `;

  contenedor.appendChild(card);
});

}

//Importa la sección de proyectos
const section = document.getElementById("project-list");

async function cargarProyectos() {
  const querySnapshot = await getDocs(collection(db, "Proyectos"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
//Crea la clase y sus estilos 
    const div = document.createElement("div");
    div.className = "bg-white shadow p-4 rounded mb-4 dark:bg-zinc-900 ";

    div.innerHTML = `
      <h4 class="text-xl font-bold mb-2 ">${data.title}</h4>
      <p class="mb-2">${data.description || "Sin descripción"}</p>
      <a href="${data.url}" target="_blank" class="text-blue-600 hover:underline">Ver proyecto</a>
    `;

    section.appendChild(div);
  });
}

const cardImg = document.getElementById("card-img"); 

async function cargarImg() {
  const querySnapshot = await getDocs(collection(db, "imgCard"));
  querySnapshot.forEach((doc) => {
    const { title, url } = doc.data();

    const card = document.createElement("div");
    card.className = "bg-white text-zinc-600 rounded-xl  p-4 flex flex-col items-center justify-center  dark:bg-gray-900";

    card.innerHTML = `
      <img src="${url}" alt="${title}" class="w-16 h-16 object-contain mx-auto" />
      <h4 class="mt-2 text-sm font-semibold dark:text-white">${title}</h4>
    `;

    cardImg.appendChild(card);
  }

  );
}

cargarImg();

cargarProyectos();

cargarHabilidades();



// -------------------------
// Firebase Config 
// -------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCosIr32zEdNLcQXpvc7wpRB-FcI2oAb94",
  authDomain: "portafolioangel-34a19.firebaseapp.com",
  projectId: "portafolioangel-34a19",
  storageBucket: "portafolioangel-34a19.firebasestorage.app",
  messagingSenderId: "29589044797",
  appId: "1:29589044797:web:d57bc2b84122dd8c4ff454"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Crea y devuelve un elemento HTML con clases y contenido
 */
function createElement(tag, className, innerHTML = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}
// -------------------------
// Habilidades
// -------------------------
async function cargarHabilidades() {
  const contenedor = document.getElementById("habilidades-container");
  if (!contenedor) return;

  try {
    const snapshot = await getDocs(collection(db, "ComponentHabilidad"));
    snapshot.forEach((doc) => {
      const { title, number, ProcesoDeAprendizaje } = doc.data();

      const colorClass =
        number <= 40 ? "text-red-500" :
        number <= 70 ? "text-yellow-400" :
        "text-green-500";

      const card = createElement(
        "div",
        "bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg p-4 shadow-lg dark:shadow-md w-full",
        `
          <h4 class="text-xl font-semibold text-zinc-900 dark:text-white mb-2">${title}</h4>
          <p class="text-sm text-zinc-600 dark:text-zinc-300">
            Aprendizaje: ${ProcesoDeAprendizaje} 🚀
          </p>
          <br>
          <p class="text-sm ${colorClass}">Nivel: ${number}%</p>
        `
      );

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando habilidades:", error);
  }
}
// -------------------------
// Proyectos
// -------------------------
async function cargarProyectos() {
  const section = document.getElementById("project-list");
  if (!section) return;

  try {
    const snapshot = await getDocs(collection(db, "Proyectos"));
    snapshot.forEach((doc) => {
      const { title, description, url } = doc.data();

      const div = createElement(
        "div",
        "bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg p-4 shadow-lg dark:shadow-md ",
        `
          <h4 class="text-xl font-bold mb-2">${title}</h4>
          <p class="mb-2">${description || "Sin descripción"}</p>
          <a href="${url}" target="_blank" rel="noopener noreferrer"
             class="text-indigo-700 hover:underline">
            Ver proyecto
          </a>
        `
      );

      section.appendChild(div);
    });
  } catch (error) {
    console.error("Error cargando proyectos:", error);
  }
}
// -------------------------
// Imágenes
// -------------------------
async function cargarImg() {
  const cardImg = document.getElementById("card-img");
  if (!cardImg) return;

  try {
    const snapshot = await getDocs(collection(db, "imgCard"));
    snapshot.forEach((doc) => {
      const { title, url } = doc.data();

      const card = createElement(
        "div",
        "bg-white text-zinc-600 rounded-xl p-4 flex flex-col items-center justify-center dark:bg-neutral-900",
        `
          <img src="${url}" alt="${title}" loading="lazy"
               class="w-16 h-16 object-contain mx-auto" />
          <h4 class="mt-2 text-sm font-semibold dark:text-white">${title}</h4>
        `
      );

      cardImg.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando imágenes:", error);
  }
}


// -------------------------
// ANUNCIO PRINCIPAL
// -------------------------
async function cargarAnuncios() {
  const container = document.getElementById("anuncios-container");
  if (!container) return;

  try {
    const snapshot = await getDocs(collection(db, "AnunciosAnuncioPrincipal"));
    snapshot.forEach((doc) => {
      const { url, title, Description, date } = doc.data();

      const anuncio = createElement(
        "div",
        // Anuncio principal ocupa la mitad de la grilla horizontal y varias filas
        "col-span-2 md:col-span-2 row-span-2 bg-white dark:bg-neutral-900 dark:border-neutral-800 rounded-lg p-4 shadow-lg dark:shadow-md w-full rounded-xl shadow-lg p-6 text-left hover:scale-105 transition-transform",
        `
        <h4 class="text-xl font-bold mb-2">📣 ${title}</h4> 
        <img src="${url}" alt="${title}" loading="lazy" 
     class="mt-4 float-right w-full h-60 object-cover ml-4 mb-4" />

        <p class="mt-12 text-sm text-gray-500">Fecha:${Description}</p>
        <p class="mt-4 text-indigo-700 dark:text-indigo-400">${date}</p>

        `
      );

      container.appendChild(anuncio);
    });
  } catch (error) {
    console.error("Error cargando anuncios:", error);
  }
}

// -------------------------
// IDEAS
// -------------------------
async function cargarIdeas() {
  const container = document.getElementById("anuncios-container");
  if (!container) return;

  try {
    const snapshot = await getDocs(collection(db, "SeccionIdeas"));
    snapshot.forEach((doc) => {
      const { title, Description } = doc.data();

      const idea = createElement(
        "div",
        // Ideas ocupan la otra mitad de la grilla
        "col-span-2 md:col-span-1 row-span-1 bg-white dark:bg-neutral-900 dark:border-neutral-800 rounded-lg p-4 shadow-lg dark:shadow-md w-full rounded-xl shadow-lg p-6 text-left hover:scale-105 transition-transform",
        `
        <h4 class="text-lg font-bold mb-1 text-indigo-700 dark:text-indigo-400"> 💡${title}</h4> 
        <p class="text-sm text-gray-500">${Description}</p>
        `
      );

      container.appendChild(idea);
    });
  } catch (error) {
    console.error("Error cargando ideas:", error);
  }
}

// -------------------------
// IDEA SECUNDARIA
// -------------------------
async function cargarIdeaSecundaria() {
  const container = document.getElementById("anuncios-container");
  if (!container) return;

  try {
    const snapshot = await getDocs(collection(db, "IdeaSegunda"));
    snapshot.forEach((doc) => {
      const { title, Desciption } = doc.data();

      const idea = createElement(
        "div",
        "col-span-2 md:col-span-1 row-span-1 bg-white dark:bg-neutral-900 dark:border-neutral-800 rounded-lg p-4 shadow-lg dark:shadow-md w-full rounded-xl shadow-lg p-6 text-left hover:scale-105 transition-transform",
        `
        <h4 class="text-lg font-bold mb-1 text-indigo-700 dark:text-indigo-400">💡${title}</h4> 
        <p class="text-sm text-gray-500">${Desciption}</p>
        `
      );

      container.appendChild(idea);
    });
  } catch (error) {
    console.error("Error cargando idea secundaria:", error);
  }
}

// -------------------------
// Inicialización
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  cargarImg();
  cargarProyectos();
  cargarHabilidades();
  cargarAnuncios();
  cargarIdeas();
  cargarIdeaSecundaria();
});

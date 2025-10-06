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


document.addEventListener("DOMContentLoaded", () => {
  cargarAnuncios();
  cargarIdeas();
  cargarIdeaSecundaria();

});

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
// Inicialización con Loader
// -------------------------
document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.getElementById("loader");
  const header = document.getElementById("main-header");

  try {
    await Promise.all([
      cargarImg(),
      cargarProyectos(),
      cargarHabilidades()
    ]);

    loader.classList.add("opacity-0", "pointer-events-none");

    setTimeout(() => {
      loader.style.display = "none";
      header.style.opacity = "1";
      header.style.pointerEvents = "auto";
    }, 700);
  } catch (error) {
    console.error("Error inicializando la app:", error);
    loader.innerHTML = `<p class="text-red-400 mt-4">Error al cargar contenido 😢</p>`;
  }
});

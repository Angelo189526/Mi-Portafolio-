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
// PERFIL (Timeline)
// -------------------------
async function cargarPerfil() {
const contenedor = document.getElementById("timeline");
if (!contenedor) return;

try {
const snapshot = await getDocs(collection(db, "VerPerfil"));
snapshot.forEach((doc) => {
const { icon, title, Description } = doc.data();

  const item = createElement(
    "div",
    "relative flex flex-col md:flex-row items-center md:items-start gap-4",
    `
      <div class="z-10 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-500 text-white shadow-md">
        ${icon}
      </div>
      <div class="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg p-4 shadow-lg dark:shadow-md w-full md:w-3/4">
        <h3 class="font-semibold">${title}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          ${Description || "Sin descripción"}
        </p>
      </div>
    `
  );
  contenedor.appendChild(item);   
});
} catch (error) {
console.error("Error cargando perfil:", error);
}
}


document.addEventListener("DOMContentLoaded", async () => {
  const loader = document.getElementById("loader");
  const header = document.getElementById("main-header");

  try {
    await Promise.all([
         cargarPerfil()
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

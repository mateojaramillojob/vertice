import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./estilos/index.css";

// Igual que en mercar: el service worker nuevo toma el control solo, y recargar
// al cambiar de controlador hace que cada despliegue llegue de una.
if ("serviceWorker" in navigator) {
  let recargando = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (recargando) return;
    recargando = true;
    location.reload();
  });
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

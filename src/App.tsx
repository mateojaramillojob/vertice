import { lazy, Suspense, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from "react-router-dom";
import { BolsaProvider } from "@/hooks/useBolsa";
import { GuardadosProvider } from "@/hooks/useGuardados";
import { MarcoPestanas } from "@/componentes/Marcos";
import { Cargando } from "@/ui/Estados";
import Inicio from "@/pantallas/Inicio";
import NoEncontrada from "@/pantallas/NoEncontrada";

const CatalogoUI = lazy(() => import("@/pantallas/CatalogoUI"));
const Pendiente = lazy(() => import("@/pantallas/Pendiente"));

const consultas = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false } },
});

const perezosa = (nodo: ReactNode) => <Suspense fallback={<Cargando />}>{nodo}</Suspense>;

function Raiz() {
  return (
    <>
      {/* Al volver del detalle, el catálogo queda donde estaba. */}
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

const rutas = createBrowserRouter(
  [
    {
      element: <Raiz />,
      children: [
        {
          element: <MarcoPestanas />,
          children: [
            { index: true, element: <Inicio /> },
            { path: "explorar", element: perezosa(<Pendiente titulo="Explorar" />) },
            { path: "guardados", element: perezosa(<Pendiente titulo="Guardados" />) },
            { path: "perfil", element: perezosa(<Pendiente titulo="Perfil" />) },
          ],
        },
        { path: "prenda/:id", element: perezosa(<Pendiente titulo="Detalle de prenda" pantalla />) },
        { path: "buscar", element: perezosa(<Pendiente titulo="Búsqueda" pantalla />) },
        { path: "notificaciones", element: perezosa(<Pendiente titulo="Notificaciones" pantalla />) },
        { path: "bolsa", element: perezosa(<Pendiente titulo="Bolsa" pantalla />) },
        { path: "vender", element: perezosa(<Pendiente titulo="Vender" pantalla />) },
        { path: "ui", element: perezosa(<CatalogoUI />) },
        { path: "*", element: <NoEncontrada /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

export default function App() {
  return (
    <QueryClientProvider client={consultas}>
      <GuardadosProvider>
        <BolsaProvider>
          <RouterProvider router={rutas} />
        </BolsaProvider>
      </GuardadosProvider>
    </QueryClientProvider>
  );
}

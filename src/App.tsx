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
const Detalle = lazy(() => import("@/pantallas/Detalle"));
const Busqueda = lazy(() => import("@/pantallas/Busqueda"));
const Explorar = lazy(() => import("@/pantallas/Explorar"));
const Guardados = lazy(() => import("@/pantallas/Guardados"));
const Perfil = lazy(() => import("@/pantallas/Perfil"));
const Notificaciones = lazy(() => import("@/pantallas/Notificaciones"));
const Bolsa = lazy(() => import("@/pantallas/Bolsa"));
const Vender = lazy(() => import("@/pantallas/Vender"));

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
            { path: "explorar", element: perezosa(<Explorar />) },
            { path: "guardados", element: perezosa(<Guardados />) },
            { path: "perfil", element: perezosa(<Perfil />) },
          ],
        },
        { path: "prenda/:id", element: perezosa(<Detalle />) },
        { path: "buscar", element: perezosa(<Busqueda />) },
        { path: "notificaciones", element: perezosa(<Notificaciones />) },
        { path: "bolsa", element: perezosa(<Bolsa />) },
        { path: "vender", element: perezosa(<Vender />) },
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

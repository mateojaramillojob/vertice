import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/cn";
import { Icono } from "@/ui/Icono";
import type { NombreIcono } from "@/ui/iconos";

const PESTANAS: { a: string; icono: NombreIcono; texto: string }[] = [
  { a: "/", icono: "home", texto: "Inicio" },
  { a: "/explorar", icono: "explore", texto: "Explorar" },
  { a: "/guardados", icono: "bookmark", texto: "Guardados" },
  { a: "/perfil", icono: "account_circle", texto: "Perfil" },
];

function Pestana({ a, icono, texto }: (typeof PESTANAS)[number]) {
  return (
    <NavLink
      to={a}
      end
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center justify-center min-w-[56px] h-12",
          // El peso del ícono sigue al font-weight: la activa se ve más gruesa, como en el handoff.
          isActive ? "text-primary font-semibold" : "text-on-surface-variant hover:text-primary transition-colors",
        )
      }
    >
      <Icono nombre={icono} tam={22} />
      <span className="font-label text-micro mt-0.5 tracking-tight">{texto}</span>
    </NavLink>
  );
}

/** Tab bar del handoff con el FAB central "+". z-40: el bottom sheet (z-50) queda encima (A1). */
export function BarraPestanas() {
  return (
    <nav
      aria-label="Principal"
      className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-app z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-outline-subtle shadow-tabbar"
    >
      <div className="flex justify-between items-center h-16 px-3">
        <Pestana {...PESTANAS[0]} />
        <Pestana {...PESTANAS[1]} />
        <Link
          to="/vender"
          aria-label="Vender una prenda"
          className="flex items-center justify-center -mt-4 w-12 h-12 rounded-full bg-primary text-white shadow-fab hover:bg-primary-light active:scale-95 transition-all ring-4 ring-white"
        >
          <Icono nombre="add" tam={26} />
        </Link>
        <Pestana {...PESTANAS[2]} />
        <Pestana {...PESTANAS[3]} />
      </div>
    </nav>
  );
}

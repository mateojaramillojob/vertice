import type { ReactNode } from "react";
import { Drawer } from "vaul";
import { cn } from "@/lib/cn";
import { BotonIcono } from "./BotonIcono";

interface Props {
  abierta: boolean;
  onCambio: (abierta: boolean) => void;
  /** Si el contenido no trae <HojaTitulo>, este texto la nombra para lectores de pantalla. */
  tituloAccesible?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Bottom sheet del handoff (#quickBuyModal) sobre vaul: arrastre para cerrar,
 * trampa de foco, Esc y role="dialog". Queda por encima de la tab bar (A1).
 */
export function Hoja({ abierta, onCambio, tituloAccesible, children, className }: Props) {
  return (
    <Drawer.Root open={abierta} onOpenChange={onCambio}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-scrim/60 backdrop-blur-sm" />
        {/* vaul agrega un ::after alto bajo el contenido (para el rebote al arrastrar):
            el scroll va en un div interno para no poder desplazarse hacia ese hueco. */}
        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md bg-white rounded-t-2xl shadow-sheet flex flex-col max-h-[min(777px,92dvh)] outline-none"
        >
          {tituloAccesible && <Drawer.Title className="sr-only">{tituloAccesible}</Drawer.Title>}
          <div className={cn("overflow-y-auto overscroll-contain p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]", className)}>
            {/* Manija y cerrar, como en el handoff: la manija va centrada en el espacio libre. */}
            <div className="flex items-center justify-between pb-3">
              <div aria-hidden="true" className="w-10 h-1 bg-on-primary-variant rounded-full mx-auto" />
              <BotonIcono etiqueta="Cerrar" icono="close" variante="suave" className="-mr-1" onClick={() => onCambio(false)} />
            </div>
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export const HojaTitulo = Drawer.Title;

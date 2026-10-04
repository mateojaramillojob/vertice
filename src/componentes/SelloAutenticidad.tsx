import { Icono } from "@/ui/Icono";

/** Sello de verificación del bottom sheet del handoff. */
export function SelloAutenticidad() {
  return (
    <div className="bg-surface-container border border-outline-subtle p-3 rounded-xl flex items-center gap-3 my-2">
      <Icono nombre="verified" tam={24} className="text-cobalt" />
      <div className="flex flex-col">
        <span className="text-xs font-headline font-semibold text-primary">Garantía de Autenticidad Vértice</span>
        {/* "Fideicomiso" tal cual el diseño: pendiente de revisión legal (ver CLAUDE.md). */}
        <span className="text-meta text-on-surface-variant font-body">
          Tu dinero permanece en fideicomiso hasta que recibes y apruebas la prenda.
        </span>
      </div>
    </div>
  );
}

import type { Categoria } from "@/datos/tipos";
import { useConteoCategorias } from "@/datos/consultas";
import { CATEGORIAS_INICIO, NOMBRE_CATEGORIA } from "@/lib/categorias";
import { Chip } from "@/ui/Chip";

interface Props {
  actual: Categoria | null;
  onCambio: (c: Categoria | null) => void;
  categorias?: Categoria[];
}

/** Píldoras horizontales del handoff. "Todas (48)" lleva el conteo, como en el diseño. */
export function FilaCategorias({ actual, onCambio, categorias = CATEGORIAS_INICIO }: Props) {
  const { data: conteo } = useConteoCategorias();
  return (
    // py de 7 px y margen negativo: el área táctil de 44 px no se recorta con el
    // overflow, y el layout queda igual que en el handoff (py-0.5).
    <div role="group" aria-label="Categorías" className="flex items-center gap-2 overflow-x-auto no-scrollbar py-[7px] -my-[5px]">
      <Chip activo={actual === null} onClick={() => onCambio(null)}>
        Todas{conteo ? ` (${conteo.todas})` : ""}
      </Chip>
      {categorias.map((c) => (
        <Chip key={c} activo={actual === c} onClick={() => onCambio(c)}>
          {NOMBRE_CATEGORIA[c]}
        </Chip>
      ))}
    </div>
  );
}

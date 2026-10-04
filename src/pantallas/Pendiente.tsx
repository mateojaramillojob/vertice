import { useNavigate } from "react-router-dom";
import { MarcoPantalla } from "@/componentes/Marcos";
import { EstadoVacio } from "@/ui/Estados";

/** Marcador temporal de las pantallas que aún no se construyen. */
export default function Pendiente({ titulo, pantalla }: { titulo: string; pantalla?: boolean }) {
  const navegar = useNavigate();
  const contenido = (
    <EstadoVacio
      icono="schedule"
      titulo={`${titulo}: en construcción`}
      texto="Esta pantalla llega en las siguientes entregas."
      accion={{ texto: "Volver al inicio", onClick: () => navegar("/") }}
    />
  );
  return pantalla ? <MarcoPantalla titulo={titulo}>{contenido}</MarcoPantalla> : contenido;
}

import { useNavigate } from "react-router-dom";
import { MarcoPantalla } from "@/componentes/Marcos";
import { EstadoVacio } from "@/ui/Estados";

export default function NoEncontrada() {
  const navegar = useNavigate();
  return (
    <MarcoPantalla titulo="Página no encontrada">
      <EstadoVacio
        icono="help"
        titulo="Esta página no existe"
        texto="Puede que el enlace esté mal o que la prenda ya no esté publicada."
        accion={{ texto: "Ir al inicio", icono: "home", onClick: () => navegar("/") }}
      />
    </MarcoPantalla>
  );
}

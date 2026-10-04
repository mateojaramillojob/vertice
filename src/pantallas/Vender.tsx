import { useNavigate } from "react-router-dom";
import { MarcoPantalla } from "@/componentes/Marcos";
import { EstadoVacio } from "@/ui/Estados";

/** FAB "+" del handoff. El flujo de publicar espera la decisión del modelo de negocio. */
export default function Vender() {
  const navegar = useNavigate();
  return (
    <MarcoPantalla titulo="Vender una prenda">
      <EstadoVacio
        icono="photo_camera"
        titulo="Publicar prenda: pendiente"
        texto="El flujo depende del modelo de negocio: inspección física para todas las prendas o venta directa con verificación opcional. Se diseña en cuanto esté definido."
        accion={{ texto: "Volver al inicio", icono: "home", onClick: () => navegar("/") }}
      />
    </MarcoPantalla>
  );
}

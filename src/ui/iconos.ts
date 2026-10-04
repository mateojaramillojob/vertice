// Única lista de íconos de la app. De aquí salen el tipo del componente <Icono>
// y la URL de Material Symbols que vite.config.ts inyecta en index.html: Google
// sirve solo estos glifos (unos KB) en vez de la fuente entera (~3 MB).
// Si un ícono no está aquí, se ve como texto plano.
export const ICONOS = [
  "account_circle",
  "add",
  "arrow_back",
  "arrow_forward",
  "bookmark",
  "check",
  "check_circle",
  "chevron_right",
  "close",
  "delete",
  "done",
  "error",
  "expand_more",
  "explore",
  "help",
  "history",
  "home",
  "image_not_supported",
  "inventory_2",
  "local_offer",
  "local_shipping",
  "location_on",
  "lock",
  "notifications",
  "person",
  "photo_camera",
  "receipt_long",
  "refresh",
  "schedule",
  "search",
  "sell",
  "settings",
  "share",
  "shopping_bag",
  "star",
  "straighten",
  "trending_down",
  "tune",
  "unfold_less",
  "verified",
  "verified_user",
  "wifi_off",
] as const;

export type NombreIcono = (typeof ICONOS)[number];

// Mismos ejes que el handoff (wght 100–700, FILL 0–1): el peso del ícono sigue
// al font-weight del padre, como la pestaña activa del diseño.
export const urlMaterialSymbols = () =>
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1" +
  `&icon_names=${[...ICONOS].sort().join(",")}&display=block`;

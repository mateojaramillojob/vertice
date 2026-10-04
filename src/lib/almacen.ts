// localStorage puede no existir o lanzar (modo privado, cuota llena): nunca
// debe tumbar la app. Lo guardado aquí es solo del dispositivo; con backend,
// guardados y bolsa pasan al repositorio.

export function leer<T>(clave: string, porDefecto: T): T {
  try {
    const crudo = localStorage.getItem(clave);
    return crudo ? (JSON.parse(crudo) as T) : porDefecto;
  } catch {
    return porDefecto;
  }
}

export function escribir(clave: string, valor: unknown) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // sin almacenamiento: el estado vive solo en memoria
  }
}

import type { Config } from "tailwindcss";

// Los nombres son los del export de Stitch (design/code.html): una clase del
// diseño como `bg-surface-container` significa lo mismo aquí.
const color = (variable: string) => `rgb(var(--${variable}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: color("primary"),
        "primary-light": color("primary-light"),
        cobalt: color("cobalt"),
        "cobalt-light": color("cobalt-light"),
        "on-primary": color("on-primary"),
        "on-primary-variant": color("on-primary-variant"),
        surface: color("surface"),
        "surface-container": color("surface-container"),
        "surface-container-high": color("surface-container-high"),
        "surface-container-lowest": color("surface-container-lowest"),
        "on-surface": color("on-surface"),
        "on-surface-variant": color("on-surface-variant"),
        "outline-subtle": color("outline-subtle"),
        scrim: color("scrim"),
        success: color("success"),
        error: color("error"),
        warning: color("warning"),
      },
      fontFamily: {
        headline: ['"Bodoni Moda"', "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        // En el handoff `label` y `mono` eran la misma fuente; queda solo `label`.
        label: ['"Space Grotesk"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Mínimo de 12 px (B3, aprobado 04-10-2026). Valor del diseño en el comentario.
        micro: ["12px", { lineHeight: "16px" }], // diseño 10/15
        meta: ["12px", { lineHeight: "17px" }], // diseño 11/16.5
        logo: ["22px", { lineHeight: "33px" }],
      },
      borderRadius: {
        DEFAULT: "0.125rem", // 2 px: badges
        lg: "0.375rem", // 6 px
        xl: "0.75rem", // 12 px: tarjetas, buscador, botones
        "2xl": "1rem", // 16 px: bottom sheet
      },
      boxShadow: {
        header: "0 1px 10px rgba(15, 23, 42, 0.03)",
        tabbar: "0 -2px 12px rgba(15, 23, 42, 0.03)",
        buscador: "0 2px 8px rgba(15, 23, 42, 0.03)",
        cta: "0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)",
        fab: "0 4px 16px rgba(15, 23, 42, 0.35)",
        sheet: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      maxWidth: {
        app: "480px", // columna centrada en pantallas anchas (C9)
      },
    },
  },
  plugins: [],
} satisfies Config;

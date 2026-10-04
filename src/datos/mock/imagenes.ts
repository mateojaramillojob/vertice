// ⚑ FOTOS DEL MOCK: todas las imágenes de la app salen de aquí.
// Son las 9 del handoff de Stitch (alojadas en lh3.googleusercontent.com, pueden
// caducar). Para usar las fotos definitivas basta con cambiar las URLs; si una
// deja de cargar, la tarjeta muestra un placeholder en vez de romperse.
// Nota: la foto del vestido trae texto incrustado ("Modo A – Marketplace…").

const base = "https://lh3.googleusercontent.com/aida-public/";

export const IMAGENES = {
  trench: {
    url: `${base}AB6AXuBccISSi78Pty06kDJGxEvhPYHLN1zI5qCJczI8iMHZd8lxFbvXPX5xR537M1IvMDrBYfjtzwyPoLD4VTw5b_8cW7_n1vHbRTTPBzH0QAZWgB_sBR3xj08k1MdqngA5GkuQmtsAbEdOlnJnxuo17Q07zKMuUCu0ZMr2jbVuH3riLlCBYjeymG8zJf1mRzFbttDlZPL2ZFhz9fcLqvsTOiW6ikFq7ftdjjqsFVa-eHFxwqA_p9Z1JEc`,
    alt: "Gabardina oversize de gamuza color caramelo colgada sobre fondo blanco",
  },
  pantalon: {
    url: `${base}AB6AXuAPpkyyZq1ZyMpvDtU7_faebixfYYL9waJmmWU5W9YyO1rjWXFV5wEWnbA9oh3XBgYnfNYzPxXo5dwlkAubVi1mmLutllD5xbGAqlIuP4-uXTH1DIuQXx6rtkwT_hFxVMKCJvB3AzsYE_vVlKMNLNjrwPc4685Qssz9YnqaJqnrWiP7K9WmaHX18-JmcaceQs4jaj64deE-k-clkClWKTGvtD5mErzsGjiyExcpC4LzehMHZEbYps0`,
    alt: "Pantalón de lana gris carbón con pinzas, doblado sobre fondo claro",
  },
  botin: {
    url: `${base}AB6AXuBHmRPwv63JlsXMAmo9tWpV9Iyt1IF4sNRuxESSTSpZjq8l_Klx_YXu1nXjrNRmX91tWgDk_ksATF6kAp5GyfkGqKnSXm6Odf6AHAYknL9JwJBwMk9uau_LJEns-q0DwUYgk4An66Uq27Ci4VrSxI0ZDCEjlxpnDj_ZeP4Q2dpM9shLWBVPf8TUfVshnO1bgD9BA7HnmUOrUg-kjksq1nAEAhOxSX-0JN21llmaUBgki1BmIpyobNM`,
    alt: "Par de botines Chelsea de piel negra con punta cuadrada sobre un pedestal blanco",
  },
  cazadora: {
    url: `${base}AB6AXuDght_KgQ6IFfvGIX4N8HrNtjglNuIwNnQCXIqF4PkDBGsYO1THF5eJc6ealMOKxTYZrcxEogxXLY_VLFYetmeuJkfl_t5SaKLnrHY5kSpJD9zfO2gm6xBqPc9RBza3JHIyxkihtFzzNAYt6r0v7D99N_EYNHjxWckK1gkg0vmtidA75QnxIzODTzxmOj0hzxzq8hIHj7wlpql4cRH92WbOILIZ8Er4nbqyjZt6pAjUWBdSxz6IizY`,
    alt: "Chamarra bomber de piel café envejecida extendida sobre piso blanco",
  },
  vestido: {
    url: `${base}AB6AXuCS5zzAfl21NJ6db_-k7fEgTE7D-X6pM8YyOdlAoMeEdIuzDtwNbhUZMKyq9ZxYlwDgSUVtRolhhibUkJzp_AZoIP4V8HCmVIrYgRAQdSgwosPaSR24yxoVviLqMms1-VzJzB18VviNOtcd3wQLsCZ83GURFrPiZBBtxaoKCeocgR81aQMXjpZjUvWoUGNysOOUS79ibp2tIY3Ey9CSxV52UKCFo9nQAgzBCcXyqFg8IDEv4eIObJo`,
    alt: "Vestido columna de lino crudo color marfil en maniquí invisible",
  },
  blazer: {
    url: `${base}AB6AXuBYD4pRDSvQ8SOt44nn3UdP4DyIe7riNFPh8AyxyN37DhAU3774tGQPVvZ7UWHbg-taA2cHTRPCEpWGucAU1Drr5E47wIeUm6n30KzVyknrVK3RSc4GKxxxnq913AiKCnhD-i9NIMXJzt6sEE9uP5M_-rrSuxERWHcQ0rH1v9qQ9VpJaOrWW38kcukbyTe5GQiUDzhQ5jfxoLa_2h5-Hm6Ipv2ZOSwSJTyJ7mxV8rhyexVADd3tAVI`,
    alt: "Blazer oversize de lana color terracota colgado en un riel",
  },
  bolso: {
    url: `${base}AB6AXuDk4GKn7RyhxMcIWuAqu2TKFytxII9YTAf7U9lM7PMMhTpwfvYRJJ0s1iqPNTPfOQAY0bhrOhlF1wO4LKbd99Zl-1Bq6wPrKBHFD_NVe0amkGLX53hN2KBfwzlSf9FW2Z61Og5owdFk1dgRTTUrZMwTX37pVf4kNjIIGJ-3CFU0q7bF-sCJpLljSXAm6tLL5l0Jj85Br30h-zPMBNpviwH6x2O6S0u80pThud4TphLflkFZ8iMGHf0`,
    alt: "Bolso de hombro en forma de media luna de piel verde oliva sobre fondo blanco",
  },
  jeans: {
    url: `${base}AB6AXuDSlkANofAEMX-deq8ZeO8Oe6414B5GbKiiWusnbGc_MkWcqIOd-lElN39c7NpQxpT7sYJZ2k0WFoVMro-qXeCU1Mq244SapQIlJPrPIfsSiYavC6Y3LNN-XmpgcQ-KpyW67VF_WGdjKJ3J4qtGhIc2K7a7UEVDGpmvGSPqIV_qqbB9E4hOEzZV8SAvun7mBl5h-iNA_fNkJ78LEwdnGkCMAJJZk823iVx3j_-EOfVcLgthEBjGzgQ`,
    alt: "Jeans rectos de mezclilla índigo doblados sobre fondo claro",
  },
  /** Placeholder que el handoff pone en la miniatura del bottom sheet antes de cargar la prenda. */
  miniatura: {
    url: `${base}AB6AXuAFA6bz1MJbX9I8247c-PymPqeNchDtjmf7a3xoAHpD2r7vPBKcSTlbL4UsU4UZtiv03-ohsWskk85H_jP0GF0VCV3oKStzvHz-as1JnrmBgfwu9YvNbKMx6xLCvPLa2MA7uUE4GkrEllr0l_L798eEmkc1Y6o4yns5UGuhiAyI6erDfWOhqxhwzRlKaPdm0gAt_W87TBSPIjwqk8k9uyJsPseM1sNEpdqdmwtzmqdZ12zwi38JsgE`,
    alt: "Prenda en estudio con luz blanca",
  },
} as const;

export type ClaveImagen = Exclude<keyof typeof IMAGENES, "miniatura">;

# Hub personal de Alberto de Pablo López

Web estática para GitHub Pages. El CV ocupa el primer lugar de la portada y el resto de espacios comparte su identidad visual: Inter, Space Grotesk, fondos neutros oscuros y tarjetas redondeadas.

## Estructura

```text
CV/
  index.html                              # Portfolio y CV interactivo ES / EN
  CV Alberto de Pablo Lopez.pdf           # Currículum en español
  CV Alberto de Pablo Lopez - English.pdf # Resume en inglés
  CV.md                                   # Currículum en Markdown
  cv.txt                                  # Currículum en texto plano
aprendizaje/                              # Base de conocimiento
Homelab_Vmware/                            # Laboratorio de virtualización
Nvim/                                     # Guía de Neovim
Tuto_OhmyPosh/                             # Guía de personalización del shell
scripts/build-guide.cjs                    # Generador de la guía Oh My Posh
index.html                                # Portada del hub
hub.css                                   # Composición de la portada y guía
 theme.css                                # Identidad visual común
vpn.html                                  # Infraestructura y VPN
resume.html                               # Redirección al nuevo CV/
backup/                                   # Copia anterior conservada
```

Abre `index.html` o sirve la raíz con un servidor estático. No requiere instalación ni compilación. Las fuentes y los recursos externos del CV necesitan conexión.

Para actualizar la versión web de la guía después de editar su Markdown:

```sh
node scripts/build-guide.cjs
```

La carpeta `CV/` contiene los documentos profesionales y su página web. Los recursos compartidos siguen en la raíz. `resume.html` conserva el acceso desde enlaces anteriores. Cada sección tiene un enlace de vuelta al hub. La publicación utiliza el flujo de GitHub Pages del repositorio.

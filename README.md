# RCB Studio

Sitio web profesional para RCB Studio, desarrollado con React y TypeScript.

## 🚀 Despliegue Automático

Este proyecto está configurado con GitHub Actions para despliegue automático en GitHub Pages. Cada vez que se haga push a la rama `main`, el sitio se construirá y desplegará automáticamente.

### Configuración Requerida

1. **Habilitar GitHub Pages**:
   - Ve a tu repositorio en GitHub
   - Ve a `Settings` > `Pages`
   - En `Source`, selecciona `GitHub Actions`

2. **Configurar Permisos**:
   - Ve a `Settings` > `Actions` > `General`
   - En `Workflow permissions`, selecciona `Read and write permissions`
   - Marca la casilla `Allow GitHub Actions to create and approve pull requests`

### URL del Sitio

Una vez configurado, tu sitio estará disponible en:
`https://[tu-usuario].github.io/RCB_Studio/`

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev

# Construir para producción
pnpm build

# Vista previa de la build
pnpm preview
```

## 📁 Estructura del Proyecto

- `src/components/` - Componentes reutilizables
- `src/views/` - Vistas principales de la aplicación
- `src/assets/` - Imágenes y recursos estáticos
- `src/ts/interfaces/` - Interfaces TypeScript

## 🚀 Tecnologías

- React 19
- TypeScript
- Vite
- CSS Modules
- pnpm

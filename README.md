# Panel Totalum - Prueba Técnica

Este proyecto es una prueba técnica desarrollada en Angular para la oferta de programadora web fullstack publicada por **Totalum**.

Incluye un panel administrativo con tres secciones:

- **Productos**
- **Pedidos**
- **Clientes**

Cada sección muestra una tabla con datos obtenidos desde la API de Totalum, con paginación, buscador y posibilidad de crear y eliminar elementos.

---

## 🛠 Tecnologías utilizadas

- **Angular 19.2.7**
- **SDK de Totalum**
- **HTML + SCSS + Angular Material**

---

## 📁 Estructura del proyecto

La lógica compartida entre los componentes se ha abstraído en:

- `BaseListadoComponent`: componente base reutilizable con lógica de listado, búsqueda, paginación, creación y eliminación.
- `TotalumBaseService`: servicio base para centralizar operaciones CRUD con la API de Totalum.

Los tres servicios (`productos`, `clientes` y `pedidos`) extienden de este servicio base.  
Los componentes específicos (`ProductosComponent`, `PedidosComponent`, `ClientesComponent`) heredan del componente base.

---

## ▶️ Cómo ejecutar el proyecto

1. **Clonar el repositorio**

2. **Instalar las dependencias**

   ```bash
   npm install
   ```

3. **Añadir tu clave API de Totalum** en el archivo `src/environments/environment.secret.ts`:

   ```ts
   export const secretEnvironment = {
     totalumApiKey: "TU_API_KEY_AQUÍ",
   };
   ```

   ⚠️ Este archivo está incluido en `.gitignore` por seguridad y **no debe subirse al repositorio**.

4. **Ejecutar la aplicación**

   ```bash
   ng serve
   ```

5. **Abrir el navegador** en [http://localhost:4200](http://localhost:4200)

---

## 💡 Notas

- Para este desarrollo me he basado en las indicaciones proporcionadas en el vídeo de Totalum incluido en la oferta de empleo.
- He decidido no usar un backend personalizado porque Totalum ya genera automáticamente la API REST para cada tabla creada. Las llamadas se gestionan directamente desde Angular mediante servicios.
- He incorporado funcionalidad adicional para permitir la creación, edición y eliminación de registros desde el panel, utilizando formularios en modales, edición en línea y botones con retroalimentación visual.
- He implementado un sistema de exportación de datos a CSV.
- La interfaz cuenta con un diseño responsive, y he trabajado especialmente la accesibilidad (atributos aria-\*, contraste, estructura) para asegurar una experiencia adecuada en distintos dispositivos y perfiles de usuario.

---

Gracias por la oportunidad 🙌  
**Clara Manzano Corona**

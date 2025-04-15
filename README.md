# Panel Totalum - Prueba Técnica

Este proyecto es una prueba técnica desarrollada en Angular para la oferta de programadora web fullstack publicada por **Totalum**.

Incluye un panel administrativo con tres secciones:

- **Productos**
- **Pedidos**
- **Clientes**

Cada sección muestra una tabla con datos obtenidos desde la API de Totalum, con paginación, buscador y posibilidad de crear y eliminar elementos.

---

## 🛠 Tecnologías utilizadas

- **Angular 16+**
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

- El proyecto se ha desarrollado siguiendo las indicaciones del vídeo aportado por Totalum en la oferta de empleo.
- Se ha añadido funcionalidad adicional para la creación y eliminación de registros desde el panel, mediante formularios modales y botones con feedback visual.

---

Gracias por la oportunidad 🙌  
**Clara Manzano Corona**

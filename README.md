## API REST de Blog Paloma Belen, Leonel Valenzuela, Marcelo Caballero ##

### Descripción:

Esta API RESTful, construida con Node.js y ReactJS, permite a los usuarios loggearse, crear, leer, actualizar y eliminar artículos en un blog.

### Tecnologías:

* **Node.js:** Entorno de ejecución JavaScript para el backend.
* **Express.js:** Framework de Node.js para construir el backend.
* **JWT:** JSON Web Tokens para autenticación y autorización.
* **Cloudinary:** Servicio de almacenamiento de imágenes para almacenar las imágenes subidas por los usuarios.
* **ReactJS:** Framework de JavaScript para construir el frontend.
* **MongoDB:** Base de datos NoSQL para almacenar los datos.

### Instalación:

**Prerrequisitos:**
* **Node.js:** Instala Node.js desde (nodejs.org)[https://nodejs.org/en/].
* **MongoDB:** Crea una cuenta en MongoDB y crea una base de datos en (mongodb.com)[https://www.mongodb.com/].
* **Clodiniary:** Crea una cuenta en (cloudinary.com)[https://cloudinary.com/].

**Pasos:**

1. **Clonar el repositorio:**
   git clone https://github.com/palomabgz/proyectoback-dpmt.git

2. **Instalar las dependencias:**
abrir la terminal de la carpeta del frontend y backend del proyecto y ejecutar el siguiente comando para instalar las dependencias:
npm install

3. **Ejecucion:**
npm run dev

### Documentación:

En el archivo .env.template borrar el '.template' dejandolo como .env y completar los datos de la base de datos, JWT, etc.


MONGODB_URI = mongodb+srv://USER:PASSWORD@cluster0.0c5y.mongodb.net/blog?retryWrites=true&w=majority
JWT_SECRET = SECRET123
etc.
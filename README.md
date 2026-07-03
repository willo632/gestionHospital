# \# Sistema de Gestión de Hospitales

# 

# Aplicación full-stack para gestionar Pacientes, Doctores y Citas Médicas.

# 

# \- \*\*Backend:\*\* NestJS + TypeORM + MySQL

# \- \*\*Frontend:\*\* Angular (standalone components)

# 

# \## Requisitos previos

# 

# \- Node.js (v18 o superior)

# \- npm

# \- MySQL corriendo localmente (con la base de datos `hospital` creada)

# 

# \## Backend (NestJS)

# 

# ```bash

# cd api-gestion

# npm install

# npm run start:dev

# ```

# 

# El servidor queda corriendo en `http://localhost:3000`.

# 

# \*\*Nota:\*\* antes de levantar el backend por primera vez, asegúrate de tener la base de datos creada en MySQL:

# 

# ```sql

# CREATE DATABASE hospital;

# ```

# 

# Con `synchronize: true` en `app.module.ts`, TypeORM crea automáticamente las tablas `pacientes`, `doctores` y `citas` al iniciar.

# 

# \## Frontend (Angular)

# 

# ```bash

# cd front-gestion

# npm install

# ng serve

# ```

# 

# La aplicación queda corriendo en `http://localhost:4200` y consume la API en `http://localhost:3000` (configurado en `src/environments/environment.development.ts`).

# 

# Otros comandos útiles:

# 

# \## Orden recomendado para correr el proyecto completo

# 

# 1\. Levantar MySQL y verificar que la base `hospital` exista.

# 2\. En una terminal: `cd api-gestion \&\& npm run start:dev`

# 3\. En otra terminal: `cd front-gestion \&\& ng serve`

# 4\. Abrir `http://localhost:4200` en el navegador.


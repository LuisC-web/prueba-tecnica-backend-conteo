# Prueba técnica backend conteo

- Para poder implementar la API se clona el repositorio
  ```bash
  git clone https://github.com/LuisC-web/prueba-tecnica-backend-conteo.git
  ```
- Se instalan las dependencias con:
  ```bash
  npm install # ó pnpm install 
  ```
- Se crea el archivo .env en la raíz con las siguientes variables
  ```dotenv
  DATABASE_URL="uri_mongodb/prueba_backend"
  PORT=3000
  LIMIT=5
  ```
  Donde `DATABASE_URL` se refiere a la URI dada por la interfaz de [MongoDB](https://www.mongodb.com) online, `PORT` se refiere al puerto a usar (3000 según la prueba) y `LIMIT` indica el número máximo de elementos devueltos en la paginación de usuarios.
  - Se ejecuta el comando de desarrollo
  ```bash
  npm run dev
  ```
  - Por seguridad de adjuntará el .env al correo de la prueba técnica.

## Uso de la API

### Rutas disponibles

#### **1. Crear un usuario**

- **POST /usuarios** → Crea un usuario en la base de datos.
  - **Ejemplo de petición:**
    ```json
    {
      "nombre": "Luis Camargo",
      "email": "lus@gmail.co",
      "edad": 25,
      "direcciones": [
        {
          "calle": "Av. Siempre Viva",
          "ciudad": "Lima",
          "pais": "Perú",
          "codigo_postal": "15001"
        }
      ]
    }
    ```
- **Respuesta sin errores:**
  ```json
  {
    "msg": "Usuario creado"
  }
  ```

#### **2. Obtener la lista de usuarios**

- **GET /usuarios** → Obtiene la lista de usuarios con paginación.
  - **Ejemplo de petición:**
    ```http
    GET /usuarios?page=1&limit=5
    ```
  - **Ejemplo de respuesta:**
    ```json
    {
      "total": 1,
      "page": 1,
      "limit": 5,
      "totalPages": 1,
      "users": [
        {
          "_id": "67d94086274db3c372604f4e",
          "nombre": "Luis Camargo",
          "email": "lus@gmail.co",
          "fecha_creacion": "2025-03-18T09:44:27.948Z",
          "direcciones": [
            {
              "calle": "hola",
              "ciudad": "Manizales",
              "pais": "Colombia",
              "codigo_postal": "2020",
              "_id": "67d94086274db3c372604f4f"
            }
          ],
          "__v": 0
        }
      ]
    }
    ```

#### **3. Obtener un usuario por su ID**

- **GET /usuarios/:id** → Obtiene un usuario por su ID.
  - **Ejemplo de petición:**
    ```http
    GET /usuarios/67d94086274db3c372604f4e
    ```

#### **4. Actualizar un usuario por su ID**

- **PUT /usuarios/:id** → Actualiza un usuario por su ID (solo los campos proporcionados).
  - **Ejemplo de petición:**
    ```json
    {
      "nombre": "Luis Camargo Modificado",
      "email": "lus.modificado@gmail.co"
    }
    ```

#### **5. Eliminar un usuario por su ID**

- **DELETE /usuarios/:id** → Elimina un usuario por su ID.
  - **Ejemplo de petición:**
    ```http
    DELETE /usuarios/67d94086274db3c372604f4e
    ```

#### **6. Buscar usuarios por ciudad**

- **GET /usuarios/buscar** → Busca usuarios que tengan una dirección en una ciudad específica.
  - **Ejemplo de petición:**
    ```http
    GET /usuarios/buscar?ciudad=Manizales
    ```
  - **Ejemplo de respuesta:**
    ```json
    [
      {
        "_id": "67d94086274db3c372604f4e",
        "nombre": "Luis Camargo",
        "email": "lus@gmail.co",
        "direcciones": [
          {
            "calle": "hola",
            "ciudad": "Manizales",
            "pais": "Colombia",
            "codigo_postal": "2020"
          }
        ]
      }
    ]
    ```


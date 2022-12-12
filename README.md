# vaccinationRecords

<hr/>

Instalar los paquetes de Node.js:
### `npm i`

Crear y asignar variables de entorno dentro del archivo .env en la raíz del proyecto:

### `TIME_OUT=60s`
### `HOST=localhost`
### `DATABASE=vaccinationrecords`
### `USER=root`
### `PASSWORD=secret`
### `PORT=33061`
<hr/>

Para ejecutar la aplicacion
### `npm run dev`

Para ejecutar test
### `npm run test`

Para ejecutar test
### `npm run test`

Base de datos mysql en docker:

Primero que todo tener instalado docker para posteriormente crear un contenedor de mysql de la siguiente manera

### docker run -d -p 33061:3306 --name mysql57 -e MYSQL_ROOT_PASSWORD=secret mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci

Una vez ejecutado el comando, tendremos corriendo un servidor de MySQL.

Para conectarnos al servidor usando el proprio docker:

### docker exec -it mysql57 mysql -uroot -p

Ingresamos la contraseña del usuario root, en nuestro ejemplo "secret" y ya estamos dentro de mysql para gestionar nuestras bases de datos.
El dump que utiliza esta aplicación se localiza en la carpeta database para utilizarlo como archivo de importación, al igual que el archivo json que se encuentra en la carpeta postman_collection para testear la api a través de la aplicación postman
# DELIAHRESTO API

Bienvenidos a mi API de pedidos de comida en linea. Es un aplicación enfocada en backend, con Node.js y MySQL.

# Instalación

- Abre el siguiente link y descarga el archivo DeliahrestoDB.sql https://drive.google.com/file/d/10nC_z3WJeXoE_Anem68T3InGvObNbmlh/view?usp=sharing.
- Abre tu programa MySQL Workbench y crea una conexión nueva, ten presente el username y password que tienes en tu programa ya que lo necesitaremos en la parte de conexión más adelante.
- Una vez creado la conexión ingresa a ella y entra a opción **Server** -> **Data Import**. una vez estes en Data import clickea en la opción **Import from Self-Contained File** y selecciona el path en donde guardaste el archivo que descargaste previamente. Luego creas un nuevo esquema por defecto (**Default Target Schema**) con el nombre `deliahresto`. Finalmente le das **Start Import**.
- Una vez importado la base de datos, ya puedes acceder a todas las tablas de ella junto a los datos existentes.

## Conexión y ejecución

- Clona este repositorio en tu máquina local.
- ingresa al archivo parameters.js y cambia el valor de las variables `conf_user `y `conf_password` por su username y password respectivamente.

Instalar las dependencias

> npm install

Iniciar el servidor

> npm run dev

## Manual de uso

La documentación de esta API contiene toda la información necesaria para el uso de esta misma.

- Ingresa a https://drive.google.com/file/d/10nC_z3WJeXoE_Anem68T3InGvObNbmlh/view?usp=sharing e instala el archivo Deliahresto_documentation.yaml.
- Abre tu aplicación swagger e importa el archivo previamente descargado. En el caso que no tengas swagger descargado, lo puedes usar la versión web.
- Finalmente abre Postman y prueba mi API!

## Tener en cuenta

- Tener instalado `Node js`.
- Tener instalado `Workbench` o algun programa de bases de datos MySQL.
- Tener instalado `Postman` .

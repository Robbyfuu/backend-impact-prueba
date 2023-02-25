# Rest API Impact APP

## Crear Archivo .env

    agregar las siguientes variables de entorno:
    - SECRETORPRIVATEKEY

## Ejecutar Archivo .sql

    ejecutar el archivo .sql que se encuentra en la carpeta raíz del proyecto

## Instalar dependencias

     En la carpeta raiz del projecto ejecutar npm install

## Ejecutar APP

    node app

# REST API

## Login

### Request

`POST /api/auth/login`

    curl --location 'http://localhost:8000/api/auth/login' \
        --data-raw '{
            "email": "admin@admin.com",
            "password": "admin"
        }'

### Response

    {
    "ok": true,
    "usuario": {
        "id": 2,
        "nombre": "Roberto Arce",
        "email": "admin@admin.com",
        "estado": true,
        "password":
    "$2a$10$q7B3qlF7nbVo2a5VG/6Lhefp3G5yeJ7.weV4ySbk3pY6.yoTxRTxm",
        "role": "ADMIN_ROLE",
        "createdAt": "2023-02-23T04:53:42.000Z",
        "updatedAt": "2023-02-23T04:53:42.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTY3NzM1OTYxOCwiZXhwIjoxNjc3OTY0NDE4fQ.H7oQ9PvcnSFstw-IN_EwjY1ZfM2WTpirLlRlAnKKhDc"
    }

## Registro

### Request

`POST /api/usuarios/`

    curl --location --request POST 'http://localhost:8000/api/usuarios' \  
    --header 'Content-Type: application/json' \
    --data-raw '{
        "nombre": "R",
        "email": "admin1@admin.com",
        "password":"admin",
        "role":"ADMIN_ROLE"
    }'

### Response

    {
        "usuario": {
            "estado": true,
            "id": 3,
            "nombre": "Roberto Arce",
            "email": "admin1@admin.com",
            "password": "$2a$10$EgNggCI1ta62Vv7Pd6Mx/ewJCwKgO.WALUwUC3ofKR.qsFozA4Yim",
            "role": "ADMIN_ROLE",
            "updatedAt": "2023-02-25T00:26:01.809Z",
            "createdAt": "2023-02-25T00:26:01.809Z"
        },
        "token":        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTY3NzI4NDc2MSwiZXhwIjoxNjc3ODg5NTYxfQ.c2yjNMAj2Zc0LFXYk26IfqF8nLcMJr8XT_fTEZeb5as",
        "ok": true
    }

## Crear Usuario

### Request

`POST /api/trabajador/`

     curl --location --request POST 'http://localhost:8000/api/trabajador/' \
    --header 'x-token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTY3NzI4NDc2MSwiZXhwIjoxNjc3ODg5NTYxfQ.c2yjNMAj2Zc0LFXYk26IfqF8nLcMJr8XT_fTEZeb5as' \
    --header 'Content-Type: application/json' \
      --data '{
            "id": 2,
            "apellido_paterno": "Arce",
            "nombre": "Roberto Hernán",
            "apellido_materno": "Muñoz",
            "email": "rarcemu@gmail.com",
            "telefono": "996419674"
        }'

### Response

    {
        "ok": true,
        "trabajador": {
            "id": 2,
            "apellido_paterno": "Arce",
            "nombre": "Roberto Hernán",
            "apellido_materno": "Muñoz",
            "email": "rarcemu@gmail.com",
            "telefono": "996419674",
            "createdAt": "2023-02-25T02:02:17.128Z",
            "updatedAt": "2023-02-25T02:02:17.128Z"
        }
    }
## Actualizar Usuario

### Request

`PUT /api/trabajador/:id`

     curl --location --request PUT 'http://localhost:8000/api/trabajador/2' \
    --header 'x-token:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTY3NzI4NDc2MSwiZXhwIjoxNjc3ODg5NTYxfQ.c2yjNMAj2Zc0LFXYk26IfqF8nLcMJr8XT_fTEZeb5as' \
    --header 'Content-Type: application/json' \
      --data '{
            "id": 2,
            "apellido_paterno": "Arce",
            "nombre": "Roberto Hernán",
            "apellido_materno": "Muñoz",
            "email": "rarcemu@gmail.com",
            "telefono": "996419674"
        }'

### Response

    {
        "ok": true,
        "trabajador": {
            "id": 2,
            "apellido_paterno": "Arce",
            "nombre": "Roberto Hernán",
            "apellido_materno": "Muñoz",
            "email": "rarcemu@gmail.com",
            "telefono": "996419674",
            "createdAt": "2023-02-25T02:02:17.128Z",
            "updatedAt": "2023-02-25T02:02:17.128Z"
        }
    }
## Eliminar Usuario

### Request

`DELETE /api/trabajador/:id`

    curl --location --request DELETE 'http://localhost:8000/api/trabajador/2' \
    --header 'x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTY3NzI4NDc2MSwiZXhwIjoxNjc3ODg5NTYxfQ.c2yjNMAj2Zc0LFXYk26IfqF8nLcMJr8XT_fTEZeb5as'


### Response

    {
        "ok": true,
        "trabajador": {
            "id": 2,
            "apellido_paterno": "Arce",
            "nombre": "Roberto Hernán",
            "apellido_materno": "Muñoz",
            "email": "rarcemu@gmail.com",
            "telefono": "996419674",
            "createdAt": "2023-02-25T02:02:17.128Z",
            "updatedAt": "2023-02-25T02:02:17.128Z"
        }
    }
## Obtener Usuario

### Request

`GET /api/trabajador/:id`

    curl --location --request GET 'http://localhost:8000/api/trabajador/2' \
    --header 'x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE2NCwiaWF0IjoxNjcyMDA5OTk0LCJleHAiOjE2NzI2MTQ3OTR9.5DRsAFuNPecCZq5GM0ElBJdwRtCFmWTsFoPxBaFSPns'


### Response

    {
        "ok": true,
        "trabajador": {
            "id": 2,
            "apellido_paterno": "Arce",
            "nombre": "Roberto Hernán",
            "apellido_materno": "Muñoz",
            "email": "rarcemu@gmail.com",
            "telefono": "996419674",
            "createdAt": "2023-02-25T02:02:17.128Z",
            "updatedAt": "2023-02-25T02:02:17.128Z"
        }
    }
## Obterner Usuarios

### Request

`GET /api/trabajador/`

    curl --location --request GET 'http://localhost:8000/api/trabajador/' \
    --header 'x-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjMsImlhdCI6MTY3NzI4NDc2MSwiZXhwIjoxNjc3ODg5NTYxfQ.c2yjNMAj2Zc0LFXYk26IfqF8nLcMJr8XT_fTEZeb5as'


### Response

    {
        "ok": true,
        "trabajadores": [{
            "id": 2,
            "apellido_paterno": "Arce",
            "nombre": "Roberto Hernán",
            "apellido_materno": "Muñoz",
            "email": "rarcemu@gmail.com",
            "telefono": "996419674",
            "createdAt": "2023-02-25T02:02:17.128Z",
            "updatedAt": "2023-02-25T02:02:17.128Z"
        },
        {
            "id": 3,
            "apellido_paterno": "Arce",
            "nombre": "Roberto Hernán",
            "apellido_materno": "Muñoz",
            "email": "rarcemu@gmail.com",
            "telefono": "996419674",
            "createdAt": "2023-02-25T02:02:17.128Z",
            "updatedAt": "2023-02-25T02:02:17.128Z"
        }...]
    }

### Para fines practicos y utilización de está API en el Front-end, está API tiene un deploy en Railway en el siguiente link:<a href="https://backend-bsale-roberto.herokuapp.com"> Heroku</a>

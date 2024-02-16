# Proyecto de Chat con React.js y Firebase

Este proyecto es una aplicación de chat construida con React.js y Firebase. Utiliza React para la gestión del estado de la aplicación y Firebase para la autenticación y la base de datos.

## Estructura del Proyecto
El proyecto se estructura de la siguiente manera:

- src/: Contiene los componentes principales de la aplicación.
    - App.js: El componente principal de la aplicación.
    - components/: Contiene componentes reutilizables como AddContactDialog.js, AddConversationDialog.js, Contacts.js, Conversations.js, Conversation.js, Footer.js, Message.js, NavBar.js y PrivateRoute.js.
    - contexts/: Contiene AuthContext.js que proporciona un contexto de autenticación para la aplicación.
    - firebase.js: Configuración e inicialización de Firebase.
    - index.js: Punto de entrada de la aplicación.
    - models/: Contiene contactsModel.js y model.js que definen los modelos de datos utilizados en la aplicación.
    - routes/: Contiene los componentes de las páginas de la aplicación como About.js, Home.js, Login.js, NotFoundPage.js, ResetPassword.js, Settings.js y SingUp.js.
    - public/: Contiene los archivos estáticos de la aplicación como index.html, manifest.json y robots.txt.
    - package.json: Define las dependencias del proyecto y los scripts de npm.

## Cómo ejecutar el proyecto

Para ejecutar este proyecto, primero necesitarás instalar las dependencias con npm:

``` npm install ```

Luego, puedes iniciar el servidor de desarrollo con:

``` npm start ```

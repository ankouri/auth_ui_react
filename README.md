# Auth UI using react 
> React UI with login , registration, forget password, activation account features, using NodeJS API 

## EndPoints : 
1. `POST` | `/api/auth/login` : login endpoint with email and password.  
2. `POST` | `/api/auth/registre` : register endpoint with username, email, password.
3. `GET` | `/api/auth/activate/:token` : activate endpoint to activate account after registration.
4. `POST` | `/api/auth/forgot` : forgot endpoint to send an email for updating password.
5. `GET` | `/api/auth//reset/:id` : reset endpoint to verify and update the current password.
6. `GET` | `/api/auth/logout` : logout endpoint.  

## Technologies Used
1.  Reactjs
2.  Material ui
4.  styled components

## Installation

##### Clone the latest Repository

`git clone https://github.com/ankouri/auth_ui_react.git`

##### Into the project directory

`cd client folder` 

##### Installing NPM dependencies

`npm install`


#### The Server should now be running at http://localhost:3000/

`npm start`

#### Preview app : https://cocky-engelbart-6d410e.netlify.app/

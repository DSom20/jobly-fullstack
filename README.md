# Jobly (Fullstack)


Jobly is a mock job board where users can register, search for companies/jobs,and apply. The frontend is built 
with React, the backend with Node/Express and PostgreSQL. 

See a live demo at https://jobly.demo.davidcsommers.dev/

## To run this repo locally:


### Prerequisites:
1. Install Node.js and npm
2. Install PostgreSQL

### Setup
1. Git clone this repo
2. `createdb jobly`

#### Backend
1. `cd backend`
2. `psql jobly < data.sql`
3. `npm install`
4. `npm start` or `nodemon`

#### Frontend
1. `cd frontend` from base directory
2. `npm install`
3. `npm start`

## Tech Stack
### Backend
1. Node - Server Runtime Environment
2. Express - Node Web App Framework
3. PostgreSQL - Relational Database
4. JSON Web Tokens - for authentication/authorization
5. bcrypt - for hashing passwords at login/registration
6. jsonshema - data validation in controller

### Frontend

1. React - FE JS Framework
2. React-Router - Library to create single page app
3. axios - http client

## Contributors
https://github.com/GroverW

Rithm Staff

Note: This was a pair project at Rithm bootcamp. The backend and frontend were separate projects. I created a backend
separately (see https://github.com/DSom20/jobly), but this particular rendition was focused on building the front end with React. The frontend was
entirely built by Will and myself (I came back afterwards and tweaked it). The backend is optimized code kindly provided 
by Rithm staff.

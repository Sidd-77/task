
# Code Submissions

## Description

  

This project is a full-stack web application built with Express.js, MySQL, Redis, React, and Next UI. It uses Express.js for the backend, MySQL for the database, Redis for caching, React for the frontend, and Next UI for the UI library. It also executes code online using Judge0 api although impletention is partial.

  

## Tech Stack

  

-  **Backend**: Express.js

-  **Database**: MySQL

-  **Caching**: Redis

-  **Frontend**: React

-  **UI Library**: Next UI

- **Online Code Exection**: Judge0

## Environment Variables

  

The project uses the following environment variables for backend:

  

-  `DB_HOST`: The host of the MySQL database.

-  `DB_USER`: The user for the MySQL database.

-  `DB_PASSWORD`: The password for the MySQL database.

-  `DB_NAME`: The name of the MySQL database.

-  `DB_PORT`: The port of the MySQL server.

-  `REDIS_URL`: Url provided by redis provider(Upstash).

-  `FRONTEND_URL`: Frontend url for cors.

  

The project uses the following environment variables for frontend:

  

-  `BACKEND_URL`: Backend url for frontend.

  
  

## Installation

  

1. Clone the repository:

  

	`git clone https://github.com/sidd=77/task.git`

  

2. Install the dependencies:

  
	for frontend : 
	`cd frontend`
	`npm install`

  
	for backend :
	`cd backend`
	`npm install`

  

3. Create a `.env` file in the root of the frontend and backend folders of project and set the environment variables.

  

4. Start the backend server:

	`node index.js`

5. Start the frontend server:

	`npm run dev`
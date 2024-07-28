# node-backend-template
A basic setup for a NodeJs app with mongoDb and docker-compose


## Project Name

Node Backend Template

## Description

This is a basic setup for a Node.js application with MongoDB and Docker Compose.

## Features

- Express.js server
- MongoDB integration
- Docker Compose configuration

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js
- Docker
- Docker Compose

## Getting Started

1. Clone this repository:

  ```bash
  git clone https://github.com/your-username/node-backend-template.git
  ```

2. Create your .env file:

  ```bash
  cp .env.example .env
  ```

  Update the `.env` file with your MongoDB connection string:

  ```bash
  MONGO_URI=mongodb://mongo:27017/test_db
  ```

  If you are running the MongoDB server locally, you can use the following connection string:

  ```bash
  MONGO_URI=mongodb://localhost:27017/test_db
  ```

3. Build the containers:

  ```bash
  cd node-backend-template
  docker-compose -f docker-compose.yml -f docker-compose.mongo.yml build: for building both the node and mongo containers
  docker-compose -f docker-compose.yml build: for building only the node container
  ```

4. Start the containers:

  ```bash
  docker-compose -f docker-compose.yml -f docker-compose.mongo.yml up: for starting both the node and mongo containers
  docker-compose -f docker-compose.yml up: for starting only the node container
  ```

5. Your Node.js application should now be running on `http://localhost:3001` and the MongoDB server should be running on `http://localhost:27017` with a database named `test_db`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the ISC License. 
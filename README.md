# MERN Dashboard

This is a full-stack MERN dashboard application with a client-side and a server-side.

## Description

The application is a dashboard that displays data in various forms, including charts, tables, and maps. It has a client-side built with React and a server-side built with Node.js, Express, and MongoDB.

## Technologies Used

### Client
- React
- Redux
- React Router
- Material-UI
- Nivo
- MUI X-Data-Grid

### Server
- Node.js
- Express
- Mongoose
- Cors
- Dotenv
- Helmet
- Morgan
- Body-parser

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
2. Install NPM packages for the client
   ```sh
   cd client
   npm install
   ```
3. Install NPM packages for the server
   ```sh
   cd server
   npm install
   ```

### Running the project

1. Start the server
   ```sh
   cd server
   npm start
   ```
2. Start the client
   ```sh
   cd client
   npm start
   ```

## Folder Structure

```
/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── scenes/
│       └── state/
└── server/
    ├── controllers/
    ├── data/
    ├── models/
    └── routes/
```

## Features

- Dashboard with various charts and data grids
- Light and dark mode
- Responsive design
- Client-side routing
- Server-side API with routes for different data types
- MongoDB database for storing data

# Project Name

A brief description of your project.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend (Laravel)](#backend-laravel)
  - [Frontend (React)](#frontend-react)
- [Running the Application](#running-the-application)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a web application that uses React for the frontend and Laravel for the backend. It provides [brief description of the functionality, e.g., "a platform to convert Wikipedia pages to PDFs with customizable sections, images, and links."]

## Features

- Convert Wikipedia pages to PDF
- Customizable sections, images, and links
- User account management
- Blog section

## Technologies Used

- **Frontend:** React, HTML, CSS, JavaScript
- **Backend:** Laravel, PHP
- **Database:** MySQL (or any other database you are using)
- **Others:** JWT for authentication, Axios for HTTP requests

## Prerequisites

- Node.js
- npm or yarn
- PHP
- Composer
- MySQL (or your chosen database)

## Installation

### Backend (Laravel)

1. Clone the repository:

  ```bash
   git clone https://github.com/raxidbou4nja/wiki2pdf.git
   cd wiki2pdf
   ```

2. Install the dependencies:

   ```bash
   composer install
   ```

3. Copy the `.env.example` file to `.env` and configure your environment variables:

   ```bash
   cp .env.example .env
   ```

4. Generate the application key:

   ```bash
   php artisan key:generate
   ```

5. Set up the database:

   - Open the `.env` file and update the following lines with your database details:

     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=your_database_name
     DB_USERNAME=your_database_user
     DB_PASSWORD=your_database_password
     ```

6. Run the database migrations:

   ```bash
   php artisan migrate
   ```

7. (Optional) Seed the database:

   ```bash
   php artisan db:seed
   ```

### Frontend (React)

1. Navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the `frontend` directory and configure the environment variables. Here is an example:

   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   ```

## Running the Application

### Backend

Start the Laravel development server:

```bash
php artisan serve
```

### Frontend

Start the React development server:

```bash
npm start
# or
yarn start
```

The application should now be running. Open your browser and navigate to `http://localhost:3000` for the frontend and `http://localhost:8000` for the backend.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This version includes detailed steps for setting up and running both the backend and frontend parts of the project. Adjust the paths, environment variables, and other details according to your specific setup and requirements.

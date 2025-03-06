# InsideJob

InsideJob is a web application inspired by Glassdoor, providing a platform for employees to share their experiences and reviews about their workplaces.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setting up the Development Environment](#setting-up-the-development-environment)
        - [Using Laravel Sail](#using-laravel-sail)
    - [Using Devcontainer](#using-devcontainer)
- [License](#license)

## Features

- Employee reviews and ratings of companies
- Company profiles with detailed information
- Job listings and application tracking
- User authentication and profiles
- Admin dashboard for managing content

## Technologies Used

- **Laravel**: Backend framework
- **Inertia.js**: For single-page application behavior
- **React**: Frontend library
- **shadcn/ui**: UI components

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install) (for Windows users)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (Ensure it is configured to run within WSL on Windows)
- [Docker Engine](https://docs.docker.com/engine/install/) (for Linux users)

### Setting up the Development Environment

#### Using Laravel Sail

1. **Clone the repository:**

    ```bash
    git clone https://github.com/inz-inside-job/inside-job.git
    cd inside-job
    ```

2. **Copy `.env.example` to `.env` and update the `DB_PASSWORD`:**

    ```bash
    cp .env.example .env
    # Open .env in your favorite text editor and update the DB_PASSWORD field
    ```

3. **Start the development environment using Sail:**

    ```bash
    ./vendor/bin/sail up -d
    ```

4. **Run database migrations and generate application key:**

    ```bash
    ./vendor/bin/sail artisan migrate
    ./vendor/bin/sail artisan key:generate
    ```

5. **Start dev server:**

    ```bash
    ./vendor/bin/sail composer dev
    ```

6. **Access the application:**

    Open your browser and navigate to `http://localhost`.

### Using Devcontainer

This project includes a devcontainer configuration, which allows you to develop inside a containerized environment using Visual Studio Code and the Remote - Containers extension. Ensure you have set up the project using Laravel Sail before proceeding with this step.

1. **Open the project in Visual Studio Code.**

2. **Reopen in Container:**

    Press `F1` and select `Remote-Containers: Reopen in Container`.

3. **Wait for the container to build and start.**

4. **Start dev server:**

    ```bash
    composer dev
    ```

5. **Access the application:**

    Open your browser and navigate to `http://localhost`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

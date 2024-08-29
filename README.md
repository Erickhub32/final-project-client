
# MeetSpot

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## Overview
This project is a web application designed to manage user-generated content, such as posts. Users can create, edit, and delete their posts, as well as update their profile information. The application includes authentication and authorization mechanisms to ensure secure access. It also features dynamic filtering options to help users easily find posts based on specific criteria.

## Features
- **User Authentication**: Secure login and registration using JWT tokens.
- **Profile Management**: Users can update their profile information, including their avatar.
- **Post Management**: Users can create, edit, delete, and view their posts.
- **Filtering**: Dynamic filtering of posts by title and category on the home page.
- **Responsive Design**: Mobile-friendly interface using Bootstrap.
- **Category Management**: Posts can be categorized, and users can filter posts based on these categories.

## Installation
### Prerequisites
- Node.js (version v20.13.1)
- MongoDB (version v7.0.12)
- Git (optional, for cloning the repository)
- Any other required software or services (e.g., Auth0 for authentication)

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-project-name.git
    ```
2. Navigate into the project directory:
    ```bash
    cd your-project-name
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the required environment variables (e.g., `MONGO_URI`, `AUTH0_SECRET`):
    ```bash
    MONGO_URI=mongodb://localhost:27017/your-database
    AUTH0_SECRET=your-auth0-secret
    AUTH0_CLIENT_ID=your-auth0-client-id
    AUTH0_DOMAIN=your-auth0-domain
    ```


5. Start the development server:
    ```bash
    npm run dev
    ```

## Usage
Once the server is running, you can access the application at `http://localhost:3000`.



### Example
- **Login**: Use your credentials to log in.
- **Create a Post**: Navigate to the "Create Post" section and fill in the details.
- **Filter Posts**: Use the search bar and category dropdown on the home page to filter posts.


## API Documentation
The API provides endpoints for managing users, posts, and categories. Below is a brief overview:

### API routes

## Post routes

| HTTP METHOD | PATH                           | ACTION                              | PROTECTED |
|-------------|-------------------------------|--------------------------------------|-----------|
| GET         | `/posts`                      | Get all posts                        |           |
| GET         | `/posts/my-posts`             | Get all posts from the logged-in user|     ✔️     |
| GET         | `/posts/my-posts/liked`       | Get all liked posts by the user      |     ✔️     |
| GET         | `/posts/:postId`              | Get a specific post by its ID        |     ✔️     |
| POST        | `/posts`                      | Create a new post                    |     ✔️     |
| PUT         | `/posts/post/:postId`         | Update a specific post by its ID     |     ✔️     |
| PUT         | `/posts/:postId`              | Update likes of a specific post      |     ✔️     |
| PUT         | `/posts/post/:postId/like`    | Like a specific post                 |     ✔️     |
| PUT         | `/posts/post/:postId/unlike`  | Unlike a specific post               |     ✔️     |
| DELETE      | `/posts/post/:postId`         | Delete a specific post by its ID     |     ✔️     |




## Comments routes

| HTTP METHOD | PATH                                | ACTION                | PROTECTED |
|-------------|-------------------------------------|-----------------------|-----------|
| GET         | `/api/comments`                     | Get all comments      |     ✔️     | 
| GET         | `/api/comments/post/:postId`        | Get comments by post  |     ✔️     |
| POST        | `/api/comments/post/:postId`        | Create a new comment  |     ✔️     |
| PUT         | `/api/comments/:commentId`          | Update a comment      |     ✔️     |
| PUT         | `/api/comments/post/:postId/like`   | Like a comment        |     ✔️     |
| PUT         | `/api/comments/post/:postId/unlike` | Unlike a comment      |     ✔️     |
| DELETE      | `/api/comments/:commentId`          | Delete a comment      |     ✔️     |


## Profile routes


| HTTP METHOD | PATH                    | ACTION                                            | PROTECTED |
|-------------|-------------------------|---------------------------------------------------|-----------|
| GET         | `/profile/edit-profile` | Get the logged-in user's profile data for editing |      ✔️    |
| GET         | `/profile`              | Get the logged-in user's profile data             |      ✔️    |
| PUT         | `/profile`              | Update the logged-in user's profile data          |      ✔️    |
| DELETE      | `/profile`              | Delete the logged-in user's account               |      ✔️    |




## Upload routes


| HTTP METHOD | URL          | Description                                | Protected |
|-------------|--------------|--------------------------------------------|-----------|
| POST        | `/image`     | Upload one or more images using Cloudinary |           |



## Client routes

| URL                         | DESCRIPTION                          | PROTECTED |
|-----------------------------|--------------------------------------|-----------|
| `/`                         | Posts page                           |           |
| `/signup`                   | Signup page                          |           |
| `/login`                    | Login page                           |           |
| `*`                         | 404 Not Found page                   |           |
| `/aboutus`                  | About Us page                        |           |
| `/profile`                  | User profile page                    |     ✔️     |
| `/profile/edit-profile`     | Edit profile page                    |     ✔️     |
| `/post/edit/:postId`        | Edit post page                       |     ✔️     |
| `/post/:postId`             | Post details page                    |     ✔️     |
| `/create-post`              | Create new post page                 |     ✔️     |





### Authentication
Most endpoints require a valid JWT token in the `Authorization` header.


## Auth routes

| HTTP METHOD | PATH          | ACTION                                        | PROTECTED |
|-------------|---------------|-----------------------------------------------|-----------|
| POST        | `/auth/signup`| Signup a new user                             |           |
| POST        | `/auth/login` | Login a user and return a JWT auth token      |           |
| GET         | `/auth/verify`| Verify the JWT token and return user payload  |     ✔️     |



## Authentication & Authorization
The application uses Auth0 for authentication. JWT tokens are used to secure the API endpoints. Users must log in to access their posts and profile information.

### JWT Token
- The JWT token is stored in `localStorage` upon successful login.
- It is sent in the `Authorization` header for all API requests.


Authorization: Bearer your-jwt-token

## Testing
Testing is done using Jest and React Testing Library.

### Running Tests
To run the tests, use the following command:

npm test

## Deployment
The project can be deployed to cloud services like Heroku or AWS.

### Steps for Deployment on Heroku
1. Create a Heroku app:
heroku create

2. Push the code to Heroku:
git push heroku main

3. Set environment variables on Heroku:
heroku config:set MONGO_URI=your-mongo-uri AUTH0_SECRET=your-auth0-secret

## Technologies Used
Front-End: React, React-Bootstrap, React-Router-DOM,
Back-End: Node.js, Express.js
Database: MongoDB
Authentication: Auth0
Testing: Jest, React Testing Library

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any inquiries or issues, please contact:

- alex092697@outlook.es
- erick.arevalolopez25@gmail.com





















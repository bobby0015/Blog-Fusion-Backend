# BlogFusion Backend

The backend for BlogFusion, a vibrant blogging platform that empowers users to share ideas, stories, and expertise. Built using modern technologies, this backend handles user authentication, blog management, media uploads, and more.

## Features

- **User Authentication**: Secure signup, login, and logout functionality.
- **Blog Management**: Create, read, update, and delete blogs.
- **Media Uploads**: Upload and manage images using Cloudinary.
- **Robust API**: RESTful APIs for seamless integration.

## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Backend framework.
- **MongoDB**: Database for storing data.
- **Mongoose**: ODM for MongoDB.
- **Cloudinary**: Media storage and management.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blogfusion-backend.git
   cd blogfusion-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an `.env` file in the root directory and add the following variables:
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLOUDINARY_FOLDER_NAME=your_cloudinary_folder_name
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:8080`.

## API Endpoints

### Authentication
- `POST /user/signup`: Register a new user.
- `POST /user/signin`: Log in an existing user.

### User Management
- `GET /user/:id`: Get a particular user.
- `PUT /user/:id`: Update a particular user.
- `DELETE /user/:id`: Delete a particular user.

### Blog Management
- `GET /api/v2/blog/fetch-all-blog`: Fetch all blogs.
- `POST api/v2/blog/:id`: Create a new blog.
- `PUT /api/blogs/:id`: Update a blog by ID.
- `DELETE /api/blogs/:id`: Delete a blog by ID.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

---

**Note**: Replace placeholders in the `.env` file with your actual credentials. Never share sensitive information publicly.

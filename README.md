
#  A MERN Blog APP
## About the app
A Blog App, with full CRUD using NodeJS, Express, Mongoose, MongoDB, React.  Allows user to register though the auth route, where the user receives a token.  With the token the user can view and create blogs.  The user can update and delete the user's own blogs.  The user can also add comments and like a blog.
This app is deployed on Render at [MERNBlogAPP](https://blogappfrontend-8j2e.onrender.com/ "MERNBlogAPP")

## Front-end Technologies Used
* React - A JavaScript library for building user interfaces. React makes it easy to create interactive user interfaces. It allows for the creation of simple views for each state in an application. React will efficiently update and render just the right components when the data changes. 

* React Router DOM -  an npm package that enables you to implement dynamic routing in a web app. It allows you to display pages and allow users to navigate them.

* Bootstrap - a collection of HTML, CSS, and JavaScript tools for creating and building web pages and web applications. 

* Cors - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served



## Backend Technologies Used
### Server
* Node.js - an open source asynchronous event-driven server environment that executes JavaScript code outside a web browser. 
* Express - a back end web application framework for Node.js
* Nodemon - a tool that automatically restarts a node application when file changes in the directory are detected.

### Database 
* MongoDB - a non-relational document database that stores data in a format similar to Javascript Object Notation.
* Mongoose - a JavaScript library that creates a connection between MongoDB and the Express web application framework.

### Middleware
* MORGAN  - an Express middleware to log HTTP requests and errors, and simplifies the process.
* HELMET  - an Express middleware that helps secure HTTP headers returned by an Express apps.
* Express-Validator - an express middleware that provides validation and sanitization functions

### Encryption
* Bcrypt  - a library to help you hash passwords.

### Tokens
* jsonwebtoken - an implementation of JSON Web Token (JWT), which is a standard for sharing security information between a client and a server. Each JWT contains encoded data that is cryptographically signed with a secret value that can act like a "key". It can be sent to a client as proof of authenticity and sent back to the server on subsequent requests as proof of the client's authenticity.

### Loading Environmental Variables
* dotenv - module that loads environment variables from a .env file into process.env

## Environmental Variables
These variables are needed in the .env file
* MONGODB_URI
* SECRET_KEY

## Installation Instructions to Run Locally

### Clone the project 
1. Create a folder for project on your local machine.
2. Open a bash shell.
3. cd into folder that was created in step 1
3. In the terminal type: git clone https://github.com/jsnmui/blogapi.git 

### Node.js
1. Go to https://nodejs.org/en/download/
2. Download the correct installer for your system.
3. Run the installer.

### MongoDB
1. Create account on https://www.mongodb.com/
2. Create a new cluster.
3. Click connect to get connection string,
4. Add connection string to MONGODB_URI in .env file.

### Install dependencies and Start Application
1. Type 'npm install'
2. Type 'npm start'


## Endpoints, Parameters, Schema
### Routes
In server.js, root route for app.get(/) returns "Welcome to my API"

#### auth route for login and registration
* post('/registration') - Register new users. userSchema is used. Password hasehd with bcrypt.hash. Token generated with jwt.sign. 
* post('/login') - Login with user's email and password. Token generated with jwt.sign

#### blogs route
* get('/') - Retrieves all blogs. User must be registered and have a valid token. Sorted by date in descending order.
* post('/') - Creates a new blog post. User needs to be registered and have a valid token.
* put('/:id') - Update a blog by sending the blog id as the parameter. User needs to be registered and have a valid token.
* delete('/:id') - Delete a blog by sending the blog id as the parameter. User needs to be registered and have a valid token.

### Schemas
#### userSchema
* username: type: String, required: true
* email: type: String, required: true, unique: true
* password: type: String, required: true

#### blogSchema
* creator_id: type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true 
* created_by: type: String, required: true
* created_at: type: Date, required: true, default: Date.now()
* blog_title: type: String,required: true
* blog_content: type: String,required: true
* private: type: Boolean, default: false
    
## authMiddleware
* Token taken from req.header('x-auth-token').  x-auth-token was set to the token generated at users/login or users/registration routes.
* Token is verified using the jwt.verify method and the unique SECRET_KEY.
* Decoded data that is returned from jwt.verify is saved in req.user to be used in other routes.
  

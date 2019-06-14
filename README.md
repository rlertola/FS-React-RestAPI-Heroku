# TREEHOUSE TECHDEGREE PROJECT 10 - Full Stack App with React and a REST API

This combines the project 9 school database REST API with a React frontend. Users can create an account, signin/signout, create, update and delete courses, view course detail, and a full list of courses.

This project was built using React, Express, Mongo DB and Mongoose; routing with React-Router, and simple animation with React Spring.

NOTE: This app was reconfigured specifically to be deployed to Heroku (https://fs-app-with-react-and-restapi.herokuapp.com/). For the original, see https://github.com/rlertola/Full-Stack-App-with-React-and-a-REST-API.

#### Getting Started

cd to **/api** and type

```
npm install
```

To start mongo, cd to **/api** and type:

```
mongod
```

Start the application.

In another terminal, cd to **/api** and type:

```
npm start
```

In another terminal, cd to **/client** and type:

```
npm install
```

then:

```
npm start
```

To load sample info from the database, cd to /api and type:

```
npm run seed

```

#### Pages

**Courses**
This is the home page. It renders the Courses component which displays each Course component and NewCourseButton. When a course is clicked on, they are directed to the CourseDetail page.

**Header**
Header is displayed throughout the application. It contains links to the SignIn and SignUp pages. When a user is logged in, it will display user's name and a signout option.

**SignIn, SignUp, SignOut & AuthContext**
Global state is handled in the AuthContext component. The user's credentials are persisted on page refresh. The global signOut method in AuthContext signs the user out and clears the user's credentials from localStorage. After signing up, user is automatically signed in and taken to the main course list.

**CreateCourse & UpdateCourse**
These routes are wrapped in a ProtectedRoute component. When user tries to click on NewCourseButton and aren't signed in, they are redirected to SignIn, and redirected back after login.

**Errors**
Errors are displayed via the ValidationErrors component in SignUp, CreateCourse and UpdateCourse if the user leaves any of the required inputs empty.

If a bad url or bad course id is entered, the NotFound component is rendered. If there is a 500 error, the UnhandledError component will render.

An unauthenticated or unregistered owner of that particular course cannot access the update or delete buttons on the CourseDetail page. If the /update or /create urls are entered manually, the user must be signed in to create, and must be signed in and own the course to update, or they will be redirected to the /forbidden route.

**Markdown Support**
User may use markdown to enter text in the course fields and it will display correctly.

```

```

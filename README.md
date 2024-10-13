# Multi-step User Registration Form 

## Overview

This project is a multi-step user registration form built with **Next.js** for the frontend and a **Node.js** API for the backend. The registration process is divided into three steps, collecting user personal information, account details, and preferences. The application incorporates form validation using **Yup** and **react-hook-form**, and data is managed using the **Context API**. The backend is a simple Express server that handles user registration requests.

## Features

- **Multi-step Form**: The registration process is divided into three steps:
  - Personal Information
  - Account Details
  - User Preferences
- **Dynamic Field Rendering**: Based on user input, certain fields may appear or change dynamically.
- **Conditional Rendering**: Form fields can be conditionally rendered based on user choices.
- **Form Validation**: The forms utilize Yup for validation to ensure data integrity before submission.
- **Context API**: Data from the forms is stored and managed using the Context API.
- **Node.js API**: A simple backend API to handle registration requests.

## Project Structure

```
/teleport-assignment
|-- /api                  # Backend code
|   |-- index.js          # Main API file
|-- /app                  # Next.js pages
    |-- globals.css       # CSS styles
|   |-- page.js           # Home page
|   |-- form              # Registration form pages
|   |   |-- step-one
            |--page.js    # Personal Information Step
|   |   |-- step-two
            |-- page.js   # Account Details Step
|   |   |-- step-three
            |-- page.js   # User Preferences Step
|   |   |-- completed
            |-- page.js   # Summary of submitted data
|-- /components           # React components
|   |-- ProgressBar.js    # Progress bar component
|-- /context              # Context API setup
|   |-- FormContext.js    # Context for managing form state

|-- package.json          # Project metadata and dependencies
|-- README.md             # Project documentation
```

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd teleport-assignment
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Backend API**:
   Navigate to the `api` folder:

   ```bash
   cd api
   npm install
   node index.js
   ```

4. **Run the Frontend**:
   Open another terminal window, navigate back to the main project folder, and run:

   ```bash
   npm run dev
   ```

5. **Access the Application**: Open your browser and go to `http://localhost:3000`.

## Dynamic and Conditional Rendering

- The forms use **conditional rendering** to show or hide specific fields based on user input. For example, certain fields in the preferences form may be displayed based on previously selected options.

- **Dynamic field rendering** is implemented using state management through React Hooks, enabling the form to adapt to user choices in real time.

You can find the dynamic and conditional rendering logic in the following files:

- **Personal Information Form**: `app/form/step-one.js`
- **Account Details Form**: `app/form/step-two.js`
- **User Preferences Form**: `app/form/step-three.js`

### Example of Conditional Rendering

In the User Preferences form, certain fields appear only if specific options are selected by the user.

## Backend Code Overview

The backend API is set up using **Express.js**. Below is a summary of the main functionalities in the `api/index.js` file.

### Sample Code for API

```javascript
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let users = [];
app.post("/api/register", (req, res) => {
  const userData = req.body.formData;
  console.log(userData);
  if (!userData.firstName || !userData.lastName) {
    return res
      .status(400)
      .json({ message: "First name and last name are required." });
  }

  users.push(userData);

  res.status(201).json({ message: "User registered successfully!", userData });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Functionality

- The API accepts a POST request at the `/api/register` endpoint.
- It validates the incoming data and adds the user information to an in-memory array.
- Returns a success message upon successful registration.

## Conclusion

This project showcases a complete user registration workflow with a responsive design, validating user input at each step, and a simple backend API to handle registration requests. Feel free to modify and expand upon this project to fit your needs!

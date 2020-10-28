# Would You Rather project

This is the code repository of the _Would You Rather_ project app for the Udacity React & Redux final assessment.

## Installation

1. Create a clone of this repository.
2. Navigate to the project folder on your machine.
3. Install project dependencies with `npm install`.
4. Start the development server with `npm start`.

## Production server

### Frontend

The latest version of the project is hosted as a production build on [my website](https://schmiczy.eu/would-you-rather).

### Backend

The project uses an actual backend server built with Express, GraphQL, and MySql. The data is persistent in the database. The connection between the application and the backend server is secured with `https`.

## How to use the app?

### Register

You need a user account to use the app.

1. From the login page, follow the _Register_ link.
2. Choose an avatar.
3. Enter a username.
4. Enter your name.
5. Enter your password.

  Clicking the eye icon toggles the visibility of the password in the input field.
  **Note:** Although the app uses a secure connection to communicate with the database, and passwords are stored in hashed form, for security reasons, do not use the same password as on other sites.
6. Confirm your password.  
7. Click **Register**.

### Login

1. On the login page, enter your username.
2. Enter your password.
3. Click **Log in**.

### Navigation

You can use the icons in the app header to navigate between the pages.

* [Dashboard](#dashboard)
* [Leaderboard](#leaderboard)
* [Submit new poll](#submit-new-poll)

### Profile management

Clicking your avatar in the top-right corner of the app opens up the profile management panel. The following action are available from this menu:

* View profile
* Change avatar
* Change password
* Log out

### Dashboard

The dashboard displays an overview of the polls the users have submitted. The dashboard menu on the left side of the app can be used to find the ones you are most interested in.

* **Search:** Typing a word filters the polls in real time to show only those that contain the entered string.
* **Filter:** You can choose to see only the answered or unanswered polls, or both.
* **Sort:** You can sort the polls by creation date and popularity (number of answers), either in ascending or descending order.

Clicking on a poll takes you to the page with the [details](#poll-details) of selected poll.

### Leaderboard

The leaderboard lists all users in descending order of their contribution. The following activities are awarded with contribution points:

* **Submit a new poll** (5 points)
* **Answer a poll** (1 point)

### Submit new poll

1. Enter the first answer option.
2. Enter the second answer option.
3. Click **Submit new poll**.

### Poll details

Content of this page depends on whether you have answered the poll already.

* For unanswered polls, the creator of the poll is visible, along with the answers. To choose an answer, simply click on it.
* For answered polls, statistics about the answers are shown as well. You can see how many users have chosen a given option, and their proportion compared to all who submitted an answer. Your choice is marked with an arrow. The data is also displayed on a chart.

### User details

Clicking on the name of a user either on the leaderboard page, or on a page with poll details takes you to the profile page of the given user. An overview of every poll submitted by them is displayed on this page.

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Using `redux-logic` with `axios` and `async/await`: [redux-logic examples](https://github.com/jeffbski/redux-logic-examples/tree/master/examples/async-await)
Redux store setup: [Redux recipes](https://redux.js.org/recipes/recipe-index)
Avatars are designed by [VectorOpenStock.com](https://www.vectoropenstock.com/) and distributed by [Webdesigner Depot](https://www.webdesignerdepot.com).
Icons are distributed by [Tabler Icons](https://tablericons.com/).

Special thanks to all my friends and colleagues who contributed by registering and submitting polls and answers.

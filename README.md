# Fitness Tracker Project (Backend)(WIP)

Welcome to my fitness tracker app! This project aims to create a fitness tracker social network where users can post their meals and workouts, add friends, like and leave comments to posts, and track their daily calories. The inspiration for this project came from an acquaintance who mentioned that she messages her group chat whenever she does a dowkout or eats out so that her friends can keep her on track with her diet. The backend of this project was made using Typescript, Node.js, Mongoose, and Nest.js. This backend connects to the frontend [here](https://github.com/connk95/Fitness-Tracker), made using Typescript, React, and RTK. This backend is deployed using Render.

## Table of Contents

- [Features](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/README.md#features)
- [Installation](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/README.md#installation)
- [Code Description](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/README.md#code-description)
- [Contributing](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/README.md#contributing)
- [License](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/README.md#license)
- [Acknowledgements](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/README.md#acknowledgements)

## Features

- Handles requests from the frontend to create or retrieve user, post, and message data.
- Implements Passport strategies for authentication.
- Connects the Fitness Tracker app to MongoDB.

## Installation

1. Clone this repository using the following command:

   ```
   git clone https://github.com/connk95/Fitness-Tracker-Backend.git
   ```

2. Navigate to the project directory:

   ```
   cd Fitness-Tracker-Backend
   ```

3. Run the app and view in your browser (You must run the frontend to make use of this app!)
   ```
   npm run start
   ```

## Code Description

[Auth](https://github.com/connk95/Fitness-Tracker-Backend/tree/main/src/auth) - Contains the [Auth Controller](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/src/auth/auth.controller.ts) which handles post and get requests from the frontend for logging in, logging out, and retrieving profile data. [Auth Service](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/src/auth/auth.service.ts) contains logic for validating user credentials, and retrieving data from the database.

[Comments](https://github.com/connk95/Fitness-Tracker-Backend/tree/main/src/comments) - Contains the [Comments Controller](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/src/comments/comment.controller.ts) which handles post and get requests from the frontend for creating and retrieving comments. [Comments Service](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/src/comments/comment.service.ts) contains logic for attributing a comment to its respective parent post, and its user, as well as retrieving comment data from the database.

[Activities](https://github.com/connk95/Fitness-Tracker-Backend/tree/main/src/activity) - Contains the [Activity Controller](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/src/activity/activity.controller.ts) which handles post and get requests from the frontend for creating and retrieving activities, including foods and workouts. [Activity Service](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/src/activity/activity.service.ts) contains logic for creating activities and attributing it to the user, retrieving single or multiple activities, and attributing comments to the parent activity.

[Users](https://github.com/connk95/Fitness-Tracker-Backend/tree/main/src/users) - Contains the [Users Controller](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/src/users/users.controller.ts) which handles post and get requests from the frontend for creating and retrieving users. [Users Service](https://github.com/connk95/Fitness-Tracker-Backend/blob/main/src/users/users.service.ts) contains logic for creating users, retrieving single or multiple users, and attributing activities or comments to the user.

## Contributing

Contributions to this project are welcome! If you find any bugs or have ideas for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- This project was created by Connor Ketcheson.

Enjoy your fitness app experience! If you have any questions or feedback, please don't hesitate to contact me.

---

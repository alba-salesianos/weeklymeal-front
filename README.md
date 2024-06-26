# Weekly Meal Planner

Weekly Meal Planner is a mobile application that allows to generate and manage weekly menus based on custom recipes uploaded to the application by the user.

## Dependencies

- **React Native**: Main framework for mobile application development.
- **Axios**: For making HTTP requests to the backend.
- **Moment.js**: For date handling.
- **react-native-paper**: For UI components.
- **react-navigation**: For navigation between screens.
- **@expo/vector-icons/Ionicons**: For icons.
- **react-native-toastify**: For notifications.

## Prerequisites

- Node.js
- npm o yarn
- Android Studio o Expo Go (para emulación)

## Installation

### 1. Clone the repository:

```
git clone https://github.com/alba-salesianos/weekly-meal-front.git
cd weekly-meal-front
```

### 2. Install dependencies

```
npm install
```

### 3. Configure the Back-End

Ensure that the IP address is the correct one, and run both Docker and Spring Tool Suite.

### 4. Run the application

```
npm run start
```

### 5. Usage

- Sign Up/Log In: Create an account or log in with an existing account.
- Add Recipes: Navigate to the recipes section and add your favorite recipes.
- Generate Menu: Use the generate menu option to create a weekly menu based on your preferences.
- View Daily Menu: Check today's recipe on the main screen.

### 6. Screens

#### [Authentification screen](./weeklymeal/docs/AutthentificationScreen.MD)

#### [Homepage](./weeklymeal/docs/Homepage.md)

#### [Weekly Menu](./weeklymeal/docs/WeeklyMenu.md)

#### [Recipes](./weeklymeal/docs/Recipes.md)

#### [User](./weeklymeal/docs/User.md)

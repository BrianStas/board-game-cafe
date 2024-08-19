## Action Phase

Action Phase is a web application designed to mimic the software used in a board game cafe. The app allows users to browse a game library, watch rule explanation videos, track food orders through a universal shopping cart, and place orders to the front desk. It leverages Firebase for authentication and Firestore as the backend database.

## Features

- **Universal Shopping Cart**: Track food orders, which can be sent to the front desk when ready.
- **Game Library**: Explore the cafe's game collection, with each game listing including a video explaining the rules and main features.
- **Authentication**: Secure login using Firebase Authentication with Google Single Sign-On (SSO).
- **Backend**: Built with Firestore, managing collections for games, food, and the shopping cart.

## Tech Stack

- **Frontend**: React, Tailwind CSS, DaisyUI
- **Backend**: Firebase Firestore
- **Authentication**: Firebase with Google SSO

## Getting Started

Follow these instructions to set up and run the application on your local machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Firebase Account**: You'll need a Firebase account and a project set up with Firestore and Authentication enabled.

### Installation

1. **Clone the repository**:
   ```
   bash
   git clone https://github.com/your-username/action-phase.git
   cd action-phase
   ```

2. **Install Dependencies**:
    ```
    npm install
    ```

3. **Set up Firebase**:
- Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)
- Enable Firestore and Firebase Authentication (I used Google as the provider).
- Copy your Firebase configuration (you can find this in the Firebase console under Project Settings) and create a '.env' file in the root of your project with the following variables:
    ```
    REACT_APP_FIREBASE_API_KEY=your-api-key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
    REACT_APP_FIREBASE_PROJECT_ID=your-project-id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    REACT_APP_FIREBASE_APP_ID=your-app-id
    ```

4. **Run the application**:
    ```
    npm start
    ```
    The app should now be running on [https://localhost:3000](https://localhost:3000)

## Usage
Once the app is running, you'll need to uncomment a few portions of code to access the backend and add data. 
- in the 'src' folder, go to the 'layout' folder and find the 'NavBar.js' file. Here, you'll find this code is commented out:
```
{/* <li>
    <Link to={'/newgame'}>New Game Form</Link>
</li>
<li>
    <Link to={'/newfood'}>New Food Form</Link>
</li> */}
```
- Highlight this text and hit 'ctrl + ?' to add it back. You should now have access in-app to add games and food to the backend.
- Run the application and click the 'expand button at the far left of the Nav Bar to access these pages.
- **Note**: There are no validation mechanics in place for the database. NoSQL doesn't have innate rules, and the necessary data for this app is quite limited. Just be extra careful when adding information.

## Contributions
Contributions are always welcome! Please feel free to submit a Pull Request if you would like to contribute.
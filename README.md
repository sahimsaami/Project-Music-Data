# 🎧 Music Data Project

This project is a small web application that analyzes music listening data and presents useful insights about users' listening habits.

The main goal of this project is to process data using **JavaScript** and display the results through a simple **HTML interface**. The focus of the project is on **data processing logic**, not UI design.

## 🌐 Live Demo

You can view the deployed project here:

https://project-music-data-sahim.netlify.app/

## 📊 Features

The application analyzes listening events and calculates several statistics for each user, including:

- Most listened **song** (by number of listens)
- Most listened **artist** (by number of listens)
- Most listened song on **Friday nights** (between 5pm – 4am)
- Most listened **song and artist by listening time**
- **Longest streak** of the same song played consecutively
- Songs that were listened to **every day**
- **Top genres** based on number of listens

## ⚙️ How It Works

The project uses a provided `data.mjs` module that supplies the dataset through the following functions:

- `getUserIDs()` – returns a list of user IDs
- `getListenEvents(userID)` – returns listening events for a specific user
- `getSong(songID)` – returns metadata about a song

The application reads this data dynamically and calculates the results for the selected user.

## 👤 User Selection

The website includes a **dropdown menu** where a user can be selected.

Once a user is selected, the application automatically calculates and displays the listening statistics related to that user.

If a question does not apply (for example, no Friday night listens), that section will not be displayed.

If a user has no listening data, a clear message is shown.

## 🧪 Testing

The project includes **unit tests** to verify that the data processing functions work correctly.

To run the tests:

## 🛠 Technologies

- JavaScript (ES Modules)
- HTML5
- Node.js (for testing)
- Netlify (deployment)

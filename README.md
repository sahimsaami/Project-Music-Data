# 🎵 Music Data Analysis Project

## 📝 Overview
This project analyzes music listening data and presents useful insights for each user. The application processes raw listening events and calculates key statistics while focusing on **data processing and logic** rather than UI design.

## 🎯 Project Goals
This project demonstrates the ability to:
* Process structured data dynamically.
* Handle edge cases correctly.
* Write reusable logic functions.
* Separate data logic from UI rendering.
* Implement accessible semantic HTML.
* Write unit tests for non-trivial logic.

## 🛠 Technologies Used
* **HTML5** (Semantic structure)
* **JavaScript** (ES6+ Modules)
* **CSS3** (Basic layout)
* **Jest/Vitest** (For Unit Testing)
* **GitHub Actions** (For CI/CD deployment)

## ⚙️ How It Works
1.  **Selection:** A dropdown allows selecting one of four users.
2.  **Dynamic Retrieval:** Listening data is retrieved dynamically via `data.js`.
3.  **Calculation:** All statistics are calculated from scratch (no precomputed values).
4.  **Display:** Results are displayed in semantic HTML sections.
5.  **Smart UI:** If a question does not apply, it is completely hidden. If a user has no data, a clear message is shown.

## 📊 Data Processing Strategy
The application logic includes:
* **Grouping:** Categorizing events by song, artist, or genre.
* **Time Analysis:** Filtering events for Friday nights (5 PM - 4 AM).
* **Streak Detection:** Identifying consecutive listens of the same song.
* **Consistency Check:** Computing if any songs were listened to every single day the user was active.

## ♿ Accessibility & Edge Cases
* **Lighthouse Score:** 100% Accessibility achieved through semantic tags and proper labeling.
* **Empty States:** Graceful handling of users with zero listening history.
* **Tie Handling:** Support for multiple songs if they share the longest streak.

---
*Developed as a technical assessment for CodeYourFuture.*
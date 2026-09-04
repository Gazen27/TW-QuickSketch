# QuickSketch
Draw it. Guess it.\
A web platform where creativity and intuition meet in a challenging drawing challenge.
## Overview
QuickSketch is a full-stack web application where registered users can create sketches by choosing a word from a predefined set and drawing it on a canvas within a limited amount of time. Once published, sketches become available to other users, who can try to guess the associated word with up to 10 attempts.

The platform also provides leaderboards and statistics, allowing users to track and compare their performance.
## Functionalities
- **Create sketches:** authenticated users can choose a word and draw it on a canvas within a time limit.
- **Explore:** all users, including unregistered ones, can browse published sketches.
- **Guess words:** authenticated users can try to guess the word associated to a sketch within 10 attempts.
- **Leaderboards:** rankings for the best artists and best players.
- **Personal statistics:** authenticated users can view statistics about their sketches and guesses.
## Technologies
- **Enviroment:** Node.js
- **Languages:** Typescript, HTML, CSS
- **Frameworks:** Angular, Express
- **ORM:** Prisma
- **Database:** SQLite3
## Getting started
*Node.js and npm are required.*
### Installation
1. Install dependencies *(both in backend and frontend)*
```
npm install
```
### Executing
2. Starting local server *(in backend)*
```
npm run dev
```
3. Starting Angular frontend *(in frontend)*
```
ng serve
```
4. Open http://localhost:4200 in your browser
## Work in progress
- Implementing [entities.txt](https://github.com/user-attachments/files/31801896/entities.txt) in backend
## License
This project is licensed under the MIT License.\
See the [LICENSE](https://github.com/Gazen27/TW-QuickSketch/blob/main/LICENSE) file for more information.

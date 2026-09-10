![license: MIT](https://badgen.net/badge/license/MIT/blue)
![status: under development](https://badgen.net/badge/status/under_development/green)
![release: none](https://badgen.net/badge/release/none/purple)
![academic year: 2026](https://badgen.net/badge/academic%20year/2026/orange)
# QuickSketch
Draw it. Guess it.\
A web platform where creativity and intuition meet in a drawing challenge.
## Overview
QuickSketch is a full-stack web application where registered users can create sketches by choosing a word from a predefined set and drawing it on a canvas within a limited amount of time. Once published, sketches become available to other users, who can try to guess the associated word with up to 10 attempts.

The platform also provides leaderboards and statistics, allowing users to track and compare their performance.
## Functionalities
- **Create sketches:** authenticated users can choose a word and draw it on a canvas within a time limit.
- **Explore:** all users, including unregistered ones, can browse published sketches.
- **Guess words:** authenticated users can try to guess the word associated with a sketch with up to 10 attempts.
- **Leaderboards:** rankings for the best artists and best players.
- **Personal statistics:** authenticated users can view statistics about their sketches and guesses.
## Technologies
- **Environment:** Node.js
- **Languages:** TypeScript, HTML, CSS
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
### Execution
2. Start the local server *(in backend)*
```
npm run dev
```
3. Start the Angular frontend *(in frontend)*
```
ng serve
```
4. Open http://localhost:4200 in your browser
## License
This project is licensed under the MIT License.\
See the [LICENSE](https://github.com/Gazen27/TW-QuickSketch/blob/main/LICENSE) file for more information.

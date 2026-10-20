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
1. Install dependencies in both `backend/` and `frontend/`
```
npm install
```
### Database setup
2. Create the database and apply the migrations from the `backend/` directory
```
npx prisma migrate dev
```
3. Populate the database with the predefined words and aliases
```
npx prisma db seed
```
*Prisma Client generation is automatically handled by the `postinstall` script in `package.json`.*
### Execution
4. Start the local server from the `backend/` directory:
```
npm run dev
```
5. Start the Angular frontend from the `frontend/` directory:
```
npx ng serve
```
6. Open http://localhost:4200 in your browser
## Future improvements
- **Admin view:** admins will have access to exclusive functionalities.
- **Profile Avatar:** users will be able to choose an icon as their avatar.
- **Sketch Portfolio:** the profile section will provide a "my sketches" button.
- **Likes:** users will have the possibility to like other users' profile.
- **Frutiger Aero theme:** a Frutiger Aero-inspired theme is coming soon.
## License
This project is licensed under the MIT License.\
See the [LICENSE](https://github.com/Gazen27/TW-QuickSketch/blob/main/LICENSE) file for more information.
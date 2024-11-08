# Task Board App

<h1 align="center">
  <br>
  <img src="Logo.svg" alt="Task Board App" width="200">
  
  <br>
  Task Board App
  <br>
</h1>

<h4 align="center">A straightforward task board app built with <a href="https://react.dev/" target="_blank">React</a> and <a href="https://nodejs.org/en/" target="_blank">NodeJs</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
</p>

## Preview

https://github.com/user-attachments/assets/557a3ee7-0f7d-430b-a25e-1b92c4607cde



![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) <br>
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express](https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316D36?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

## Key Features

This application it's not only an application to manage tasks, where you can create, modify and delete them, but it also adds complete authentication based on user sessions. <br>
Authentication allows the user to register, log in, reset password, generate new password and verify email address. <br>
The flow is based on the fact that when the user registers correctly, two authentication tokens are created (access and refresh) which are sent to the client's cookies. Both with different durations and functionalities. The access token only lasts 15 minutes from the login and the refresh token lasts 30 days. After 15 minutes of expiration of the access token, the user will not need to log in again as long as the refresh token is valid, which after being verified by the back-end will generate both tokens again. <br>
The user can also see and delete the sessions in which they logged in, showing on the screen which device they were made from and the corresponding timestamps.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/gonferreyra/pern-task-board.git

# Go into the repository
$ cd pern-task-board

# Install dependencies
$ npm install

# Run the app
$ npm start - Back-end
$ npm run dev - Front-end
```

> **Note**
> Keep in mind that you have to install the dependencies of both the client and server folders.

## Credits

This software uses the following open source packages:

### FrontEnd:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/es/docs/intro)
- [TanStack Query](https://tanstack.com/query/latest/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Zod](https://zod.dev/)
- [TailwindCSS](https://tailwindcss.com/)

### BackEnd:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [Zod](https://zod.dev/)
- [Winston](https://github.com/winstonjs/winston)

## Author

<a href="https://www.linkedin.com/in/ferreyragonzalo/">
  <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>

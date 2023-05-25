<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://i.ibb.co/CMYzDvn/logo-white.png">
  <source media="(prefers-color-scheme: light)" srcset="https://i.ibb.co/pR1by1g/logo-black.png">
  <img alt="MegaK HeadHunter logo" src="https://i.ibb.co/pR1by1g/logo-black.png">
</picture>

# About The Project

![screenshot of the app](https://i.ibb.co/mSzmTB6/browser-mockup.png)

MegaK HeadHunter is a project made by participants of a Polish webdev course called [MegaKurs](https://megak.pl). It was a team-based (agile/scrum) effort, that was assigned as a final project.

MegaK HeadHunter is an IT employment-focused platform, which allows the students, who have completed the abovementioned course, to apply for their first jobs. It allows head hunters from various companies to browse each sudent's CV's and appoint interviews.

# Check out our video 

**https://youtu.be/CeIFVlNlzPw**

# Live demos

**https://www.webdevjs.pl**

OR

**https://headhunter.mwyso.usermd.net**

Test student account credentials:

**login**: student@hh.com
**password**: Test123

Test headhunter account credentials:

**login**: hr@hh.com
**password**: Test123

# Features 🔧

- Three types of accounts: administrator, headhunter and student
- Authorization and authentication (JWT/bearer)
- All accounts are created by administrator either by CSV file upload or a special form
- Account activation or password-reset links sent through e-mail
- Responsive for mobile

# About this repo🔍

This is a frontend client for the MegaK HeadHunter app. It was made using:

- React [![react][react]][react-url]
- Typescript [![typescript][typescript]][typescript-url]
- Tailwind [![tailwind][tailwind]][typescript-url]
- DaisyUI [![DaisyUI][DaisyUI]][DaisyUI-url]
- React Hook Form [![React Hook Form][React Hook Form]][React Hook Form-url]
- packages like [react-icons](https://react-icons.github.io/react-icons/), [Yup](https://github.com/jquense/yup) and others

### Install locally

To install HeadHunter app locally:

1. Clone the repo
   ```sh
   git clone https://github.com/Nieopodal/headhunter-front.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. run npm start
   ```sh
   npm start
   ```

### Configure your port and API url

By default, the app runs on port 3001. You can change it in the scripts section of `package.json` file:

```
"scripts": {
"start": "set PORT=3001 && react-app-rewired start",
...
},
```

There, you can also change the API url

```
"scripts": {
    "build:win": "set REACT_APP_API_URL=/your_api_url&& react-app-rewired  build",
    "build:unix": "REACT_APP_API_URL=/your_api_url react-app-rewired  build",
...
},
```

The default API address is `http://localhost:3000` and it can be found and changed in the `src/config/api.ts` file:

```
export const apiUrl = process.env.REACT_APP_API_URL ?? `http://localhost:3000`;
```

### Backend app

<span style="color:#e02735">You _will_ need the MegaK HeadHunter backend app for this to work</span>.

Check it out at [https://github.com/Nieopodal/headhunter-back](https://github.com/Nieopodal/headhunter-back)

⚠️ Make sure the file structure of both apps is this _(and mind the folder names)_:

```
├─ //your folder
│   ├── headhunter-back
│   ├── headhunter-front
```

# For future:

* Dynamic url forms
* More Code refactor
* Finish hosting our app (**in progress**)


# About the authors

This version of MegaK HeadHunter app was made by participants of the group #2 from the 2nd edition of [MegaKurs](https://megak.pl) webdev course:

- Maciej [https://github.com/Nieopodal/](https://github.com/Nieopodal)
- Marcin [https://github.com/mp-martin/](https://github.com/mp-martin/)
- Mateusz [https://github.com/MWyso](https://github.com/MWyso)
- Irek [https://github.com/IrePro78](https://github.com/IrePro78)
- Wojtek [https://github.com/RavenPl](https://github.com/RavenPl)
- Paweł [https://github.com/Now1k](https://github.com/Now1k)
- Radek [https://github.com/RadekK1996](https://github.com/RadekK1996)
- Arek [https://github.com/bubelarek](https://github.com/bubelarek)

It was a great co-working experience 🤝

<!-- MARKDOWN LINKS & IMAGES -->

[react]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[React Hook Form]: https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white
[React Hook Form-url]: https://react-hook-form.com/
[DaisyUI]: https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white
[DaisyUI-url]: https://daisyui.com/

[//]: # ([NestJS]: https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
[//]: # ([NestJS-url]: https://https://nestjs.com/)
# Contribution Guidelines

Kindly note that the technologies for this project are strictly:

- NextJS
- TypeScript
- Tailwindcss
- Cloudinary
- NextAuth.js/Supabase

## Setting up your dev environment

- Fork this repo to your github profile
- Clone the forked repo from your github profile
- Create your branch (example name: `sub-branch`)
- Check out to the branch you created and write your code.
- It is very important that you confirm you are not committing directly to the main branch to help manage changes
- Always check main remote repo to sync your forked repo with main repo to stay upto date.
- Whenever you finish coding or before coding, make sure to run `git pull --rebase origin main` to rebase your local changes to be up to date with remote repo
- In cases of conflict, please reach out to confirm you are not making breaking changes or merge with care to resolve conflict
- After pushing your code to your forked repo, make a pull request so your changes would be merged.

- Use `pnpm` to install packages.

- To run this project in development, run `pnpm install` to install all dependencies and dev-dependencies, and `pnpm run dev` to start the server.

```bash
pnpm install

pnpm dev
```

- Take your time to observe the structure of the codebase so that you would align with the file system. It a folder already exists for what you want to do, kindly create the file in that folder rather than duplicating the folder.

## Colors

Currently, main colors are as follows and should be consistent in any component a Frontend Developer is working on.

- Text-light mode: text-black,
- Text-dark mode: text-white
- border: border-blue-500. ...recommend you check out extisting implementation on inputs and container borders
- icons should be SVG and I remmend you paste and export raw SVG in the icons component - check out for the icons.tsx file. Color recommended for svg is `text-blue-500`, hover state can be `text-blue-600`.

`blue-500` = `#3B82F6` = `rgb(59, 130, 246, 100)`
`blue-600` = `#2563EB` = `rgb(37, 99, 235, 100)`

```bash
:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
```

## What is currently open for contribution

- Login page
- Sign up page
- Contact page
- Authentication
- More may be added to this list.

## Important Note

Kindly update this section with your name and what you worked on for this project from your forked repo.

Name: Abosede Omotoso

What You Worked On:

1. I worked on the login page for this project. 

I created a login-form file and a button file directly form the app folder. The button file was imported into the login-form.  After which a login folder was created with the page routed in it. Furthermore, dependencies were installed to aid the use of some icons and clsx.

2. I worked on the contact page for this project.

I created a contact folder and routed the page in it.

3. I worked on the Sign uppage for this project. 

I created a sign-up folder and routed the page in it.

Please don't hesitate to reach out to me for clarity on any topic or questions you might have. I am open to your suggestions and ideas as well. Also do check this guide in cases of update.

In cases of conflict, be sure not to push breaking changes. Always write meaningful commit messages.

Let's go! 🚀



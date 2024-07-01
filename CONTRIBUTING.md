# Contribution Guidelines

Kindly note that the technologies for this project are strictly:

- NextJS
- TypeScript
- Tailwindcss
- Cloudinary
- NextAuth.js/Supabase

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

## What is open for contribution 

- Login page
- Sign up page
- Contact page
- Authentication
- More may be added to this list.

## Important Note

Kindly update this section with your name and what you worked on for this project.

Name: ...

What You Worked On: ...

Please don't hesitate to reach out to me for clarity on any topic or questions you might have. I am open to your suggestions and ideas as well. Also do check this guide in cases of update.

In cases of conflict, be sure not to push breaking changes.

Let's go! 🚀

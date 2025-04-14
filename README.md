# Winston

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The project integrates Firebase for authentication and other services, Tailwind CSS for styling, and follows modern development practices.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Firebase Configuration](#firebase-configuration)
- [Linting and Code Quality](#linting-and-code-quality)
- [Styling](#styling)
- [Deployment](#deployment)
- [Learn More](#learn-more)

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

---

## Project Structure

The project is organized as follows:

```
winston/
├── .next/                # Next.js build output
├── public/               # Static assets (images, icons, etc.)
├── src/                  # Source code
│   ├── app/              # Application logic and pages
│   ├── firebase/         # Firebase configuration and initialization
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions and helpers
│   ├── hooks/            # Custom React hooks
├── tailwind.config.ts    # Tailwind CSS configuration
├── eslint.config.mjs     # ESLint configuration
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

---

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Firebase**: Used for authentication and other backend services.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: Strongly typed JavaScript for better developer experience.
- **ESLint**: Linting tool for maintaining code quality.

---

## Firebase Configuration

The Firebase configuration is located in [`src/app/firebase/config.tsx`](src/app/firebase/config.tsx). It initializes the Firebase app and provides access to Firebase Authentication.

### Environment Variables

The Firebase configuration uses the following environment variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Ensure these variables are set in your `.env` file.

---

## Linting and Code Quality

The project uses ESLint for linting. The configuration is defined in [`eslint.config.mjs`](eslint.config.mjs). It extends the `next/core-web-vitals` and `next/typescript` rules for Next.js and TypeScript projects.

Run the following command to lint your code:

```bash
npm run lint
```

---

## Styling

The project uses Tailwind CSS for styling. The configuration is defined in [`tailwind.config.ts`](tailwind.config.ts). Global styles are located in `src/app/globals.css`.

### Customizations

- **Base Color**: `neutral`
- **CSS Variables**: Enabled
- **Icon Library**: `lucide`

---

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Learn More

To learn more about the tools and technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Firebase Documentation](https://firebase.google.com/docs) - Learn about Firebase services.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Learn about TypeScript.

---

## Feedback and Contributions

Your feedback and contributions are welcome! Feel free to open issues or submit pull requests to improve this project.

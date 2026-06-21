# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 💻 Development & Git Workflow

After making changes to the project, use the following commands to save and push your work to GitHub:

```bash
# 1. Check in you're logged in to Olkilinna github
gh auth status

# 2. If not, log out and in
gh auth logout
gh auth login

# 3. Stage all modified files
git add .

# 4. Commit the changes with a descriptive message
git commit -m "Describe your changes here"

# 5. Push the changes to GitHub
git push
```

## 🚀 Production Keystatic Setup (GitHub Mode)

Currently, the Keystatic admin panel only works locally (`npm run dev`). To enable the admin panel on the live Netlify site (e.g., `olkilinna.fi/admin`), you must switch Keystatic to **GitHub Mode**. This allows the live site to authenticate with GitHub and commit content changes directly to the repository.

### Steps to Enable:

1. **Create a GitHub App**: Run the Keystatic CLI tool to generate the app configuration:

   ```bash
   npx @keystatic/create-app
   ```

   Follow the prompts to create the app in the `olkilinna` GitHub organization. Save the provided **App ID** and **Private Key**.

2. **Update `keystatic.config.tsx`**: Change the storage mode to GitHub:

   ```typescript
   export default config({
     storage: {
       kind: 'github',
       repo: { owner: 'olkilinna', name: 'olkilinna' },
     },
     // ... existing collections
   })
   ```

3. **Update `astro.config.mjs`**: Remove the development-only restriction so Keystatic loads in production:

   ```javascript
   integrations: [
     react(),
     markdoc(),
     keystatic(), // Removed the `isDev ? ... : null` check
   ]
   ```

4. **Add Environment Variables to Netlify**: In your Netlify project settings, add the following environment variables so the live site can authenticate:
   - `KEYSTATIC_GITHUB_APP_ID` (Your App ID)
   - `KEYSTATIC_GITHUB_APP_PRIVATE_KEY` (Your Private Key, ensure it includes the `-----BEGIN PRIVATE KEY-----` lines)

Once deployed, visiting `/admin` on the live site will prompt a GitHub login, and any saved changes will automatically trigger a new Netlify build.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

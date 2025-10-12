Style•Facts — Frontend (Next.js)

Modern, accessible, magazine-style blog UI for Style•Facts.
Powered by Next.js, Strapi (CMS), and optional AI helpers (summaries & related posts).

✨ Features

Clean browsing experience: categories, featured/latest sections
Article page with great typography + dark/light theme (persisted)
AI helpers: Summarize content and Recommend related posts
Accessible by default (keyboard/focus/labels)
Fast by design: image optimization, SSR/ISR


🧱 Tech Stack

Framework: Next.js (App Router)
CMS: Strapi (REST)
Styles: Tailwind / Shadcn
AI: Google Gemini
Deployment: Vercel


🚀 Quick Start

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


Required environment variables

| `NEXT_PUBLIC_STRAPI_API`      | `xxxxx` | Your Strapi API  |
| `NEXT_PUBLIC_BACKEND_API_URL` | `http://localhost:1337` | Your Strapi base |
| `GEMINI_API_KEY`              | `xxxx`  | Ai content generation


📁 Project Structure

src/
  app/
    (routes)/
      blog/
        _components/
        [cname]/           # blog detail by canonical name (slug)
      search/
        _components/
        [category]/        # category listing (dynamic route)
      add-your-story/
        _components/
          formCategorySelect.jsx
          formFileInput.jsx
          formInput.jsx
          formMarkdownEditor.jsx
          formSubmitButton.jsx
          formTagsCheckboxes.jsx
          storyForm.jsx
          successDialog.jsx
        page.jsx           # submit-a-story page
    api/
      blog-content/        # POST summarize (AI)
      recommend-blogs/     # POST related posts (AI)
    layout.js              
    page.js                
  components/
    custom/
    ui/
  lib/
    utils.js
    validation-rules.js
  service/
    GlobalApi.js
public/
  favicon.svg
styles/
  globals.css              

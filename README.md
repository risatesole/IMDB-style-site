# What to Watch

**What to Watch** is a simple and user-friendly website that helps you find the most popular TV shows and movies right now. It shows you what's trending and lets you easily explore information about your favorite entertainment, all in one convenient place.

## Features

- Browse currently popular TV shows and movies.
- View detailed information about each show or movie, including images, overviews, and links.
- Clean, responsive interface optimized for quick browsing.
- Powered by [themoviedb](https://www.themoviedb.org/) api.

## Tech Stack

- Next.js with React and TypeScript
- Server-side API routes for fetching data in the same project
- CSS Modules for styling
- Uses TMDb (The Movie Database) API for content data

## Getting Started

1. Clone the repository.
2. Create a `.env` file with your TMDb API key:

   ```sh
   THEMOVIEDB='moviedbapikeyhttps://www.themoviedb.org/'
   NEXT_PUBLIC_BASEAPIURL='localhost:3000 or port/url where the project is hosted'
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open your browser at [http://localhost:3000](http://localhost:3000) to start exploring.

## Folder Structure

- `app/` — Contains Next.js pages, API routes, and components.
- `styles/` — CSS module files for styling.

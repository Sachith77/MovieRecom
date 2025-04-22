# NexFlix - Movie Recommendation App

A modern, responsive web application for discovering and exploring movies, built with React, Vite, and the TMDB API.

## Features

- Browse trending, popular, and upcoming movies
- View detailed movie information and recommendations
- Search for movies by title, actor, or keyword
- Responsive design with elegant animations
- Dynamic movie card components with hover effects

## Technologies

- React 19
- Vite 6
- React Router v7
- Framer Motion for animations
- Three.js with React Three Fiber for 3D effects
- Axios for API requests
- CSS custom properties for theming

## Prerequisites

- Node.js 18+ 
- npm or yarn
- TMDB API key (get one from [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nexflix.git
   cd nexflix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your TMDB API key:
   ```
   VITE_MOVIE_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

1. Update the `.env` file with production settings:
   ```
   VITE_MOVIE_API_KEY=your_tmdb_api_key_here
   VITE_APP_ENV=production
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Preview the production build locally:
   ```bash
   npm run preview
   ```

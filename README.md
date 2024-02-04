# Rick and Morty Character Viewer
[Live](https://character-viewer.vercel.app/) See this app 

## Introduction
This React application allows users to explore and search for characters from the popular TV show "Rick and Morty." Users can view details about each character, add them to favorites, and explore the episodes in which they appear.

## Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [Components](#components)
- [API Integration](#api-integration)
- [Local Storage](#local-storage)
- [Styling](#styling)
- [Modal Component](#modal-component)

## Getting Started
1. Clone this repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Run the application using `npm start` or `yarn start`.
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- Search characters by name using the search bar.
- View a list of characters based on the search query.
- Select a character to view detailed information and a list of episodes.
- Add characters to favorites for quick access.
- View the list of favorite characters in a modal.

## Components
### App Component
- Main application component orchestrating the layout and state.
- Manages character data, loading states, search queries, and favorites.
- Utilizes React hooks (`useState`, `useEffect`) to handle state and lifecycle events.

### Navbar Component
- Displays the application logo and holds the search bar and favorite characters section.
- Contains the `Search`, `SearchResult`, and `Favourite` components.

### CharacterList Component
- Displays a list of characters based on the search query.
- Uses the `Character` component to render each character item.

### Character Component
- Represents an individual character item.
- Displays character information and an eye icon to toggle details visibility.

### CharectorDetails Component
- Displays detailed information about a selected character.
- Shows character details, last known location, and a list of episodes.

### Modal Component
- Presents a modal for displaying the list of favorite characters.
- Uses the `Character` component for each favorite character item.

## API Integration
- Utilizes the Rick and Morty API (https://rickandmortyapi.com/) to fetch character and episode data.
- The `axios` library is employed for making asynchronous requests.

## Local Storage
- Stores favorite characters in the local storage to persist data across sessions.

## Styling
- Applies styles using the "App.css" file and Tailwind CSS utility classes.

## Modal Component
- Implements a reusable `Modal` component for displaying various modals within the application.

Feel free to explore and enhance the application further!

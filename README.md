# PlaylistSync

## App overview

* Purpose
    * Give users the ability to manage their Youtube and Spotify playlists in a single location, especially in the case where users want to keep playlists stored in both places synchronized with each other
* What it will look like
    * Make account with email and password (or G-Suite, or perhaps facebook)
        * Log in with spotify and youtube
    * The "Now Playing" view
        * Pick Spotify or Youtube as the platform you're streaming from
            * Show what is currently playing
        * Pick which playlists you want to add to for Spotify and Youtube (or save, add to favorites, etc.).
            * Selections will persist between songs and sessions.
        * A button to add song to both playlists
            * automatically saves and adds to the primary platform, then searches the secondary and lets you choose which matches.
        * If there are no matches, it will go into a list storing any songs that aren't synchronized between the two playlists
* Technical implementation details
    * OAuth 2.0 (store secret keys securely on the server/cloud)
        * Be sure to hash and salt the passwords (find a library for all your auth stuff)
    * How to get "Now playing" information
        * get information from Spotify
            * Spotify doesn't have event listening/publishing or Long polling (shame!)
            * No choice but to poll the crap out of their service to keep up to date with what's playing.
            * keep it to every 5 seconds for right now
        * Get information from the phone
            * iOS has an API that exposes the music player
            * ionic framework has a way of accessing it as well: check "Music Controls" in ionic-native, aka cordova-music-controls-plugin

## How to run it locally
* Navigate to root directory of project
* `ionic serve`
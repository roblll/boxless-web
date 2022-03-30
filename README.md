# Boxless - Frontend

Web app available at

[boxlesslessmusic.com](https://boxlessmusic.com/?username=rob&password=lenon)

## Description

Stream the top songs from a selected date range and genres. The app randomly picks songs on the Billboard chart then plays it in YouTube based on the user's selected preference, including chart range (1 - 100), date range (from 1960 - present), and genre (Alternative, Country, Dance, Electronic, Latin, Pop, Rap, R&B, and Rock). The app will continuously load and play songs. There are additional features including: no repeats, clean version, play the music video, audio, or lyrics version, and limit the song's play length. The controls section displays the current song and allows the play/pause/previous/next functionality. There is a tab navigation on the bottom. The first tab shows the main controls, options and the video player. The next tab allows the user to select between random 2 videos to add to the playlist queue. The third allows the user to search for a specific song and add to the playlist queue. The fourth shows all the songs that have been added to the playlist and the current song playing.

## Frontend Implementation

The frontend is built using React. The app first ensures that the user is authenticated. A token is provided once the proper credentials are entered. The token is used for all future API calls. Next, the app will request a song from the backend API. It sends all of the selected options, including genre, date range, chart range, and more. Once it receives the data, it adds it to the play queue. The controls display the current song title and artist, can pause and play the current song, skip to the next song, or play the previous song again. Once a song ends, an event is initiated to play the next song. If there are songs waiting in the queue, it will play the next song in line. If there are no queued songs, the app will play a cached song. After playing a new song, the app will request the backend API for a song to put in the cache. This improves the performance of the app.

Built using: JavaScript, React, HTML, CSS

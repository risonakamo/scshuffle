# things do
- figure out where to put button to trigger shuffle
- icon

- ~~need to fix scroll to bottom function~~

# usage plan
- expects all the songs in the tracklist to be the desired songs to shuffle over

# execution actions
- open tracklist
- duplicate 1st song or currently selected song
- scrolls to bottom of tracklist
- keep scrolling until autoplay button is visible
- trigger the autoplay button
- activates shuffle
- closes track list
- re opens tracklist
- presses next button

# possible complications
- what happens when a song is currently playing?
    - shouldnt matter, the nextbutton should move to the next song
- what happens if we are not on the 1st song?
    - should duplicate from the current song, ignoring all old songs
    - shuffle function handles ignoring old songs also
- what if the shuffle button is already activated?
    - need to check, if already activated, double press it
- the track list is already open?
    - need to check, if already open, does not need to open
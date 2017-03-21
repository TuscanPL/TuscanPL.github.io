/*
Nothing to do here basically. You can try to implement the Play/Pause button. I even have the logic behind it ready somewhere, lol. I'll comment the code anyway if you want to learn something. It's really crude and I really want to do it a litle bit differently. Anyhooo, it works, so whatever.

Global variables taken:
    - player
    - volume
    - usableEventVariable
    - event
    - isPlaying
*/

//This code embeds the YT script on the website. Works better because it lets YT load by itself.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Creates the iFrame witch produces sound and lets us control the video
function onYouTubeIframeAPIReady(){
createPlayer(); //Why the fuck did I even
};

//Creates the iFrame with a given playlist and parameters
function createPlayer(){ //Really, why the fuck did I even, lol.
    player = new YT.Player('player', {
          height: '0',
          width: '0',
          playerVars: {
            listType: 'playlist',
            list: 'PLfXNkhy5rqCE54qjwFxnpZJ6DO67JsOep' //Input playlist link here
          },
          events: { //Events are pretty important later on. There's only 3 of them tho, I use 2. Sasuga MemeTube.
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
    });
};
//This function gets called when the iFrame is ready.
function onPlayerReady(event){
        player.setPlaybackQuality("hd720");
        player.setLoop(true);
        player.setShuffle(false); //It's false so I can manually change songs.
        volume = 0;
        player.setVolume(volume);   
        updateVolumeCounter();  //Those three set the initial volume.
        $("#tuneInButtonContainer").fadeIn(1500);
        $("#tuneInButton").click(()=>{
        var playlistLength = player.getPlaylist().length;
        var rn = rN(0,playlistLength - 1); //Those two setup the random starting song
        console.log("Random number: " + rn);
        event.target.playVideoAt(rn); //This one plays a random song
        usableEventVariable = event; //Sets the global variable for the script for the event player.
        isPlaying = true; //For stopping and skipping
    });
}

//This function is called when the player state changes. Read the iFrame api for more.
var lastPlayerState;
function onPlayerStateChange(event){
        if (player.getPlayerState() == 1 && lastPlayerState != 2){
        showName(player.getVideoData().title); //Sets the song name
    }
    lastPlayerState = player.getPlayerState();
     if (player.getPlayerState() == 3 ){ //summons the buffer icon if buffering in progres
        $("#bufferIcon").fadeIn(500); 
    }
    else   {
        $("#bufferIcon").fadeOut(500);
    }     
}

//Shows the song name in the topBar. Also handles fade outs for the paragraph.
function showName(name){
    $("#nowPlaying").fadeOut(800);
    setTimeout(()=>{$("#nowPlaying").text(name);}, 800);
    $("#nowPlaying").fadeIn(800);
};

//Random number generator
function rN(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Song skipping function. Playlist modular.
function nextSong(){
    var playlistLength = player.getPlaylist().length;
    var rnNext = rN(0,playlistLength - 1);
    if (player.getPlaylistIndex() != rnNext){ //Doesn't let the same song to repeat.
    usableEventVariable.target.playVideoAt(rnNext);
    }
    else{
        nextSong();
    }
}

//Sets the volume counter number. It had to be done like that, because of the autistic Youtube API.
function updateVolumeCounter(){
    if (volume > 100){
        volume = 100;
    }
    if (volume < 0){
        volume = 0;
    }
    $("#volumeCounter p").text(volume);
}

//Self explanatory
function addVolume(){
    volume = volume + 10;
    player.setVolume(volume);
    updateVolumeCounter();
}

//Self explanatory too
function substractVolume(){
    volume = volume - 10;
    player.setVolume(volume);
    updateVolumeCounter();
}

function keyStrokeListener(e) {
    if (e.keyCode == 74) {
       substractVolume();
    }
     if (e.keyCode == 76) {
       addVolume();
    }
    if (e.keyCode == 75) {
       playPause();
    }
    if (e.keyCode == 73) {
       nextSong();
    } 
}

function playPause(){
    if (isPlaying == true){
        player.pauseVideo();
        isPlaying = false;
    }
    else {
        player.playVideo();
        isPlaying = true;
    }
}
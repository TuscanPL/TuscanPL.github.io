/*
Nothing to do here basically. You can try to implement the Play/Pause button. I even have the logic behind it ready somewhere, lol. I'll comment the code anyway if you want to learn something. It's really crude and I really want to do it a litle bit differently. Anyhooo, it works, so whatever.

Global variables taken:
    - player
    - volume
    - usableEventVariable
    - event
    - isPlaying
*/

var listForPlaylist = ['ev9-hE38C1w','4rw6EKl5hPs','qi1e4nnsVl8','4pS18HgV-rk','3KliuMG7NpQ','7W52quVcxHk','kf6kfbiOMLg','2a-ilPxb4mA','F9wnMMoW450','SGo5UJKfDVQ','2Ony6A1WcTM','u2JPCnLrLDE','lsTJURh-Iqo','OZtsoISv5zo','97AP2aeu91o','E3a4omT9eeA','AbXsnaPiO1Q','EB8iQBJvj90','UR9nOoWOWWQ','T5yBVZm0t_g','yTPkOw2G3Y8','vJpNoMDU1B8','6yiQKfTcPrI','nMRthCWWUtQ','gjZkdcjO2MY','evWHCTu-4o0','We7XWcL5Qm8','AFR3QVAW5GU','2rkBkADR9CQ','3MRb8zJv5JU','pFzjw1-LHlo','dJWh_0--lzg','OGYj7QBUtNI','03Amb9I3PP0','iU-f7q2qyfc','39IWVK2Ibjw','XksOs4Rp5HE','VAzihQcVRVA','Rdu1xTWETZU','n8JxFOFdkB8','gCBn1056e6M','mnKUuuf5iHA','HKc5Y3yqcsM','Lnjx0kGaMmc','IBj3AmzQp3M','xS7ZiOT5n8k','5NdMMx5v1as','tPkgnDOMOpg','v5Xt4X9RbQo'];

//This code embeds the YT script on the website. Works better because it lets YT load by itself.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//Creates the iFrame witch produces sound and lets us control the video
function onYouTubeIframeAPIReady(){
createPlayer(); //Why the fuck did I even
};

//Shows the song name in the topBar. Also handles fade outs for the paragraph.
function showName(name){
    $("#nowPlaying").fadeOut(800);
    setTimeout(()=>{$("#nowPlaying").text(name);}, 800);
    $("#nowPlaying").fadeIn(800);
};

//Creates the iFrame with a given playlist and parameters
function createPlayer(){ //Really, why the fuck did I even, lol.
    player = new YT.Player('player', {
          height: '0',
          width: '0',
          events: { //Events are pretty important later on. There's only 3 of them tho, I use 2. Sasuga MemeTube.
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
    });
};

//This function gets called when the iFrame is ready.
function onPlayerReady(event){
        event.target.setPlaybackQuality("hd720");
        player.setLoop(true);
        player.setShuffle(false); //I'll prolly set it to false for the request system.
        volume = 100;
        player.setVolume(volume);   
        updateVolumeCounter();  //Those three set the initial volume.
        $("#tuneInButtonContainer").fadeIn(1500);
        $("#tuneInButton").click(()=>{
        var playlistLength = listForPlaylist.length;
        var rn = rN(0,playlistLength - 1); //Those two setup the random starting song
        console.log("Random number: " + rn);
        player.loadVideoById(listForPlaylist[rn]);
        player.playVideo();
        isPlaying = true; //For stopping and skipping
        });
}

//This function is called when the player state changes. Read the iFrame api for more.
function onPlayerStateChange(event){
        if (player.getPlayerState() == 1){
        showName(player.getVideoData().title); //Sets the song name
        $("#skipButton").click(()=>{nextSong()}); //Sets the handler for song skipping. Why is this here, lol.
    }
}

//Random number generator
function rN(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//Song skipping function. Playlist modular.
function nextSong(){
    var playlistLength = listForPlaylist.length;
    var rnNext = rN(0,playlistLength - 1);
    player.loadVideoById(listForPlaylist[rnNext]);
    player.playVideo();
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



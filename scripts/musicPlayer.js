var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady(){
createPlayer();
};

function showName(name){
    $("#nowPlaying").fadeOut(800);
    setTimeout(()=>{$("#nowPlaying").text(name);}, 800);
    $("#nowPlaying").fadeIn(800);
};

function createPlayer(){
    player = new YT.Player('player', {
          height: '0',
          width: '0',
          playerVars: {
            listType: 'playlist',
            list: 'PLfXNkhy5rqCE54qjwFxnpZJ6DO67JsOep' //Input playlist link here
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
    });
};

function onPlayerReady(event){
        player.setPlaybackQuality("hd720");
        player.setLoop(true);
        player.setShuffle(true);
        volume = 100;
        player.setVolume(volume);
        //Debug for possible volume resets
        updateVolumeCounter();
        $("#tuneInButtonContainer").fadeIn(1000);
        $("#tuneInButton").click(()=>{
        var rn = rN(0,54);
        console.log(rn);
        event.target.playVideoAt(rn);
        console.log(player.getPlayerState());
        usableEventVariable = event;
    });
}

function onPlayerStateChange(event){
    console.log(player.getPlayerState());
        if (player.getPlayerState() == 1){
        showName(player.getVideoData().title);
        $("#skipButton").click(()=>{nextSong()});
    }
}

function rN(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function nextSong(){
    var playlistLength = player.getPlaylist().length;
    console.log("Playlist length: " + playlistLength);
    var rnNext = rN(0,playlistLength-1);
    if (player.getPlaylistIndex() != rnNext){
    usableEventVariable.target.playVideoAt(rnNext);
    }
    else{
        nextSong();
    }
}

function updateVolumeCounter(){
    if (volume > 100){
        volume = 100;
    }
    if (volume < 0){
        volume = 0;
    }
    $("#volumeCounter p").text(volume);
}

function addVolume(){
    volume = volume + 10;
    player.setVolume(volume);
    updateVolumeCounter();
}

function substractVolume(){
    volume = volume - 10;
    player.setVolume(volume);
    updateVolumeCounter();
}



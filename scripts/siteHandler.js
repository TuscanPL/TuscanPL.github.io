/*
Script setter. Should be pretty self explanatory. Added comment.
*/
$(document).ready(()=>{
    $("#bufferIcon").hide();
    $("#topBar").hide();
    $("#botBar").hide();
    $("#tuneInButtonContainer").hide();
    aboutText();
    $("#instructions").hide();
    $("#aboutPane").hide();
    $(window).ready(function(){
        getWindowSize();
        repositionElements();
        $("#tuneInButton").addClass("transitionButton");
        $("#mainLogo").addClass("transitionButton");
        $("#tuneInButton").click(()=>{
            $("#tuneInButtonContainer").fadeOut(1000);
            setTimeout(()=>{
                $("#topBar").fadeIn(1000);
                $("#botBar").fadeIn(1000);
            }, 1000);
        });
        $("#qMark").click(()=>{
            $("#instructions").fadeToggle(1000);
        });    
        $("#aboutButton").click(()=>{
            $("#aboutPane").fadeToggle(1000);
        });
        $("#skipButton").click(()=>{
            nextSong();
        });
        $("#volumePlus").click(()=>{
            addVolume();
        });
        $("#volumeMinus").click(()=>{
            substractVolume();
        });
        $("#playPause").click(()=>{
            playPause();
        });
        document.addEventListener("keyup", keyStrokeListener, false);
    });
    $(window).resize(function(){
        getWindowSize();
        repositionElements();
    });
});
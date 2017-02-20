/*
Script setter. Should be pretty self explanatory.
*/
$(document).ready(()=>{
    $("#topBar").hide();
    $("#botBar").hide();
    $("#tuneInButtonContainer").hide();
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
        $("#aboutButton").click(()=>{
            $("#aboutPane").fadeToggle(1000);
        });
        $("#volumePlus").click(()=>{
            addVolume();
        });
        $("#volumeMinus").click(()=>{
            substractVolume();
        });
        document.addEventListener("keyup", keyStrokeListener, false);
    });
    $(window).resize(function(){
        getWindowSize();
        repositionElements();
    });
});
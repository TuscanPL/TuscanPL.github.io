/*
Main positioning script. Captures the browsers width and height, and based on those values sets the size of every element of the website. This has to be rewritten, because almost 70% of it is attainable through pure CSS.

browserHeight, browserWidth, imageHeight and imageWidth are public variables and are not to be overwritten at any part of the code. Be mindful of them. They are the main variables that set the website size.

Even without CSS this code can be further refactored and minimized. Most prolly I'll do it, unless you feel brave young warriors, lol.

Good CSS might render this code obsolete, lol.
*/

function getWindowSize() {
    browserHeight = $(window).height();
    browserWidth = $(window).width();
    imageHeight = $("#mainLogo").height()/2;
    imageWidth = $("#mainLogo").width()/2;
}

function repositionElements() {
    $("#mainLogo").css({
        "margin": (browserHeight/2 - imageHeight) + "px " 
                + (browserWidth/2 - imageWidth) + "px"
    });

    $("#tuneInButton").css({
        "margin": (browserHeight/2 + imageHeight/2) + "px " 
                + (browserWidth/2 - imageWidth/2.1) + "px",
        "width": imageWidth + "px"
    });

    var tuneInButtonWidth = $("#tuneInButton").width();
    $("#tuneInButton p").css({
        "left": tuneInButtonWidth/3 + "px"
    });

    $("#topBar").css({"width": browserWidth + "px ", "height": browserHeight*0.08 + "px"});
    var topbarHeight = $("#topBar").height();
    $("#topBar p").css({"font-size": topbarHeight*0.9 + "px", "margin-top":topbarHeight*0.1 + "px"});
    
    $("#botBar").css({"width": browserWidth + "px ", "height": browserHeight*0.08 + "px"});
    var botBarHeight = $("#botBar").height();
    $("#botBar p").css({"font-size": botBarHeight*0.9 + "px", "margin-top": botBarHeight*0.1 + "px"});
    $("#volumeCounter").css({"left": (browserWidth/2 - $("#volumeCounter").width()) + "px"});
    $("#volumeMinus").css({"left": (browserWidth/2 - $("#volumeCounter").width()*2.5) + "px"});
    $("#volumePlus").css({"left": (browserWidth/2 + $("#volumeCounter").width()*1.5) + "px"});
    
    $("#volumeCounter p").css({"font-size": botBarHeight*0.9 + "px"});

    $("#skipButton p").css({"margin-left": ($("#skipButton").width()/3) + "px"});
    $("#aboutButton p").css({"margin-left": ($("#skipButton").width()/4) + "px"});

    $("#aboutPane").css({
        "width": browserWidth + "px ", 
        "height": (browserHeight-topbarHeight*2) + "px ",
        "margin-left": 0 + "px ",
        "margin-top": topbarHeight + "px"
    });
};
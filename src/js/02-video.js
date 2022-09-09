
    // libraries import
    import Player from '@vimeo/player';
    import throttle from "lodash.throttle";

    //finding iframe element
    const iframe = document.querySelector('iframe');

    //initializing player
    const player = new Player(iframe);

    //updating video starting time (if needed)
    setPlayerTime();
    
    //From library - example of intaraction witn library interface
/*     player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    }); */

    //adding event listener for time update
    player.on('timeupdate', throttle(onTimeUpdateHandler, 500) );

    //handler for time update definition
    function onTimeUpdateHandler (data) {
       //console.log(data.seconds);
       localStorage.setItem("videoplayer-current-time", `${data.seconds}`);
       //console.log(localStorage.getItem("videoplayer-current-time"));
    }

    //definition of function for setting starting time
    function setPlayerTime()
    {
        const playerTimingPreset = localStorage.getItem("videoplayer-current-time");
        if (!playerTimingPreset)
        return;
        player.setCurrentTime(localStorage.getItem("videoplayer-current-time"));
    }
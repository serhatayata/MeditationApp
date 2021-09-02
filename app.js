const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    const sounds = document.querySelectorAll(".sound-picker button");
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button");
    //Length of outline - we will invoke the function
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);
    //Time of songs
     outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Picture changing sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function() {
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        })
    })
    play.addEventListener("click", () => {
        checkPlaying(song);
    })
    // Change the period
    timeSelect.forEach(element => {
        element.addEventListener("click",function() {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        })
    });
    // Stop and play buttons
    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        }
        else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    }
    // Animated circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //Circle
        let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // Text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime=0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    }
}
app();


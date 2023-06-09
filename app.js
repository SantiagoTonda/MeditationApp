const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button')
    //Get the length of the outline
    const outlineLength = outline.getTotalLength();
    //Duration
    let fakeDuration = 300;
    let minutes = Math.floor(fakeDuration / 60);
    let seconds = Math.floor(fakeDuration % 60);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    timeDisplay.textContent = `${minutes}:${seconds}`;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Pick different sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            outline.style.stroke = this.getAttribute("data-stroke")
            checkPlaying(song);
            // play.src = './svg/play.svg';
        })
    })

    //Play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Select time
    timeSelect.forEach(option => {

        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute("data-time");
            let seconds = Math.floor(fakeDuration % 60);
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${seconds}`;
            song.currentTime = 0;
            timeSelect.forEach(option => {
                option.style.background = "none";
                option.style.color = "white";
            })
            option.style.background = "white";
            option.style.color = "black";
        });
    });

    //Create a function specific to stop and play the sounds
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //We can animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        let minutes = Math.floor(elapsed / 60);

        //Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }
    }
};

/*
Agregar más videos y sonidos (fogata, espacio, viento, cascada, etc)
Cambiar los videos por unos de mejor calidad
Modificar función para que no se resetee el timer y el audio cuando se cambia de video
Agregar media query para cambiar tamaños en tablet
Agregar media query para cuando se rota la pantalla en celu
Por qué en mi celu se ve el video en negro al principio?
*/

app();
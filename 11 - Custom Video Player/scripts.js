/* Get Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenBtn = player.querySelector('.player__button__fullscreen')

/* Build functions */
function togglePlay() {
    if(video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
    // OR 
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();
}

function updateBtn() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar['style']['flexBasis'] = `${percent}%`;
    /* same as *///progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

/* Hook up the event listensers */
// Toggle video
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// Toggle Button
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);

// Skip
skipButtons.forEach(button => button.addEventListener('click', skip));

// Range changes
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

// Update progress bar
video.addEventListener('timeupdate', handleProgress);

// Scrub progress bar
let scrubbing = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => scrubbing && scrub(e));
progress.addEventListener('mousedown', () => scrubbing = true);
progress.addEventListener('mouseup', () => scrubbing = false);

// Fullscreen button
fullscreenBtn.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
});

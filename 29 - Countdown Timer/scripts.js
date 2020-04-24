let countdown;
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
function timer(sec) {
    clearInterval(countdown)
    const now = Date.now();
    const then = now + sec*1000
    displayTimeLeft(sec)
    displayEndTime(then)
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000)
        if (secondsLeft < 0) {
            clearInterval(countdown)
            return;
        }
        displayTimeLeft(secondsLeft)
    }, 1000);
}

function displayTimeLeft(sec) {
    const minutes = Math.floor(sec/60)
    const remainderSec = sec % 60
    const display = `${minutes}:${remainderSec < 10 ? '0' : '' }${remainderSec}`
    document.title = display
    timerDisplay.textContent = display
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp)
    const hr = end.getHours()
    const min = end.getMinutes()
    endTime.textContent = `Be Back at ${hr > 12 ? hr - 12 : hr}:${min < 10 ? '0' : ''}${min}`
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds)
    console.log(this)
}

buttons.forEach(button => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const min = this.minutes.value
    timer(min*60)
    this.reset()
})

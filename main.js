  let radios = Array.from(document.getElementsByName('radios'));
  let startScreen = document.querySelector('.content-box');
  let easyGame = document.querySelector('.easy-game');
  let mediumGame = document.querySelector('.medium-game');
  let hardGame = document.querySelector('.hard-game');
  let stopwatchBox = document.querySelector('.stopwatch');
  let minutesBox = document.querySelector('.minutes');
  let secondsBox = document.querySelector('.seconds');
  let level;
  let interval;
  let minutes = 0;
  let seconds = 0;


function sendData() {
  event.preventDefault();
  startScreen.classList.remove('visible');
  stopwatchBox.classList.add('visible');

  radios.forEach(radio => {
    if(radio.checked) {
      level = radio.value
    }
    
  })

    if(level == 'Easy')  {
      easyGame.classList.add('visible-cards')
    } else if (level == 'Medium') {
      mediumGame.classList.add('visible-cards')
    } else if (level == 'Hard') {
      hardGame.classList.add('visible-cards')
    }

    const startStopwatch = () => {
      seconds++;
      secondsBox.innerHTML = '0' + seconds;

      if(seconds > 9) {
        secondsBox.innerHTML = seconds;
      }

      if(seconds > 59) {
        minutes++;
        minutesBox.innerHTML = '0' + minutes;
        seconds = 0;
      }

      if(minutes > 9) {
        minutesBox.innerHTML = minutes;
      }
    }

    if(stopwatchBox) {
      interval = setInterval(startStopwatch, 1000);
    }
}

function beginGame() {
  // let radios = Array.from(document.getElementsByName('radios'));
  // let startScreen = document.querySelector('.content-box');
  // let easyGame = document.querySelector('.easy-game');
  // let mediumGame = document.querySelector('.medium-game');
  // let hardGame = document.querySelector('.hard-game');
  // let stopwatchBox = document.querySelector('.stopwatch');
  // let minutesBox = document.querySelector('.minutes');
  // let secondsBox = document.querySelector('.seconds');
   
   minutes = 0;
   seconds = 0;

  startScreen.classList.add('visible');
  easyGame.classList.remove('visible-cards');
  hardGame.classList.remove('visible-cards');
  mediumGame.classList.remove('visible-cards');
  stopwatchBox.classList.remove('visible');

}

beginGame()
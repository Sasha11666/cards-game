

function beginGame() {
  let radios = Array.from(document.getElementsByName('radios'));
  let startScreen = document.querySelector('.content-box');
  let easyGame = document.querySelector('.easy-game');
  let mediumGame = document.querySelector('.medium-game');
  let hardGame = document.querySelector('.hard-game');
  let stopwatchBox = document.querySelector('.stopwatch');
  let minutesBox = document.querySelector('.minutes');
  let secondsBox = document.querySelector('.seconds');
  let level = 'Easy';
  let interval;
  let minutes = 0;
  let seconds = 0;

  startScreen.classList.add('visible');
  easyGame.classList.remove('visible-cards');
  hardGame.classList.remove('visible-cards');
  mediumGame.classList.remove('visible-cards');
  stopwatchBox.classList.remove('visible');

  radios.forEach(radio => {
    radio.addEventListener('click', () => {
     level = radio.value;
    })

  });

  document.getElementById('start-button') && document.getElementById('start-button').addEventListener('click', () => {
    startScreen.classList.remove('visible');
    stopwatchBox.classList.add('visible');

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

  })

}

beginGame()
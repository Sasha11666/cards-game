function createCards() {
    let allCards = []
    for (let i = 1; i < 37; i++) {
        allCards.push(
            `<div class="card card${i}" data-index="${i}">
            <div class="card-back card-face"></div>
            <div class="card-front card-face"></div>
          </div>`
        )
    }
    return allCards
}

function canFlipCard(card, busy, cardToCompare) {
    return !busy && cardToCompare !== card
}

function chooseLevel({
    startScreen,
    stopwatchBox,
    createCards,
    radios,
    level,
    easyGame,
    mediumGame,
    hardGame,
    showEasyScreen,
    showMediumScreen,
    showHardScreen,
}) {
    // event.preventDefault()
    startScreen.classList.remove('visible')
    stopwatchBox.classList.add('visible')
    let cardsArray = createCards()

    radios.forEach((radio) => {
        if (radio.checked) {
            level = radio.value
        }
    })

    if (level === 'Easy') {
        easyGame.classList.add('visible-cards')
        showEasyScreen(cardsArray)
    } else if (level === 'Medium') {
        mediumGame.classList.add('visible-cards')
        showMediumScreen(cardsArray)
    } else if (level === 'Hard') {
        hardGame.classList.add('visible-cards')
        showHardScreen(cardsArray)
    }

    return level
}

const startStopwatch = ({ seconds, secondsBox, minutes, minutesBox }) => {
    seconds++
    secondsBox.innerHTML = '0' + seconds

    if (seconds > 9) {
        secondsBox.innerHTML = seconds
    }

    if (seconds > 59) {
        minutes++
        minutesBox.innerHTML = '0' + minutes
        seconds = 0
    }

    if (minutes > 9) {
        minutesBox.innerHTML = minutes
    }
}

const settInterval = (stopwatchBox) => {
    if (stopwatchBox) {
        setInterval(startStopwatch, 1000)
    }
}

module.exports = {
    createCards,
    canFlipCard,
    chooseLevel,
    startStopwatch,
    settInterval,
}

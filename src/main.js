import './styles.css'

let radios = Array.from(document.getElementsByName('radios'))
let startScreen = document.querySelector('.content-box')
let easyGame = document.querySelector('.easy-game')
let mediumGame = document.querySelector('.medium-game')
let hardGame = document.querySelector('.hard-game')
let stopwatchBox = document.querySelector('.stopwatch')
let minutesBox = document.querySelector('.minutes')
let secondsBox = document.querySelector('.seconds')
let formElement = document.querySelector('.form')
let level = 'Easy'
let minutes = 0
let seconds = 0
let cardToCompare = 0
let busy

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

function canFlipCard(card) {
    return !busy && cardToCompare !== card
}

function checkForCardMatch(card) {
    setTimeout(() => {
        if (card.dataset.index === cardToCompare.dataset.index) {
            alert('Вы проиграли :(')
        } else {
            alert('Вы выиграли!')
        }
    }, 1000)

    cardToCompare = null
}

function flipCards() {
    let cards = Array.from(document.getElementsByClassName('card'))
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if (canFlipCard(card)) {
                card.classList.add('visible')
                if (cardToCompare) {
                    checkForCardMatch(card)
                } else {
                    cardToCompare = card
                }
            }
        })
    })
}

function shuffleCardsAndShow() {
    let cards = Array.from(document.getElementsByClassName('card'))

    for (let i = cards.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1))
        cards[randIndex].style.order = i
        cards[i].style.order = randIndex
    }

    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.add('visible')
        })
    }, 1000)

    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove('visible')
        })
        busy = false
    }, 5000)
}

// function compareCards() {
//     let cards = Array.from(document.getElementsByClassName('card'));
//     cards.add
// }

function showEasyScreen(cardsArray) {
    let easyCards = []
    let IndexToCompare = '0'
    for (let i = 3; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (35 + 1))
        if (+randIndex !== +IndexToCompare) {
            easyCards.push(cardsArray[randIndex])
            easyCards.push(cardsArray[randIndex])
            IndexToCompare = randIndex
        } else {
            i++
        }
    }

    console.log(easyCards)

    let easyCardsHTML = ''
    easyCards.forEach((card) => {
        easyCardsHTML += card
    })

    easyGame.innerHTML = easyCardsHTML
    shuffleCardsAndShow()
    flipCards()
}

function showMediumScreen(cardsArray) {
    let mediumCards = []
    let IndexToCompare = 'd'
    for (let i = 6; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (35 + 1))
        if (+randIndex !== +IndexToCompare) {
            mediumCards.push(cardsArray[randIndex])
            mediumCards.push(cardsArray[randIndex])
            IndexToCompare = randIndex
        } else {
            i++
        }
    }

    let mediumCardsHTML = ''
    mediumCards.forEach((card) => {
        mediumCardsHTML += card
    })

    mediumGame.innerHTML = mediumCardsHTML
    shuffleCardsAndShow()
    flipCards()
}

function showHardScreen(cardsArray) {
    let hardCards = []
    let IndexToCompare = '0'
    for (let i = 9; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (35 + 1))
        if (+randIndex !== +IndexToCompare) {
            hardCards.push(cardsArray[randIndex])
            hardCards.push(cardsArray[randIndex])
            IndexToCompare = randIndex
        } else {
            i++
        }
    }

    let hardCardsHTML = ''
    hardCards.forEach((card) => {
        hardCardsHTML += card
    })

    hardGame.innerHTML = hardCardsHTML
    shuffleCardsAndShow()
    flipCards()
}

function chooseLevel() {
    event.preventDefault()
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

    const startStopwatch = () => {
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

    if (stopwatchBox) {
        setInterval(startStopwatch, 1000)
    }
}

function beginGame() {
    minutes = 0
    seconds = 0
    busy = true
    cardToCompare = null

    startScreen.classList.add('visible')
    easyGame.classList.remove('visible-cards')
    hardGame.classList.remove('visible-cards')
    mediumGame.classList.remove('visible-cards')
    stopwatchBox.classList.remove('visible')

    formElement.addEventListener('submit', chooseLevel)
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', beginGame())
} else {
    beginGame()
}

import './styles.css'

const radios = Array.from(
    document.querySelectorAll<HTMLInputElement>('.radios')
)
const startScreen = document.querySelector('.content-box')
const victoryScreen = document.querySelector('.victory-lose-screen')
const spentMinutes = document.querySelector('.time-spent-minutes')
const spentSeconds = document.querySelector('.time-spent-seconds')
const victoryButton = document.getElementById('victory-restart-button')
const victoryLoseText = document.querySelector('.victory-lose-text')
const victoryLoseIcon = document.querySelector('.victory-lose-icon')
const easyGame = document.querySelector('.easy-game')
const mediumGame = document.querySelector('.medium-game')
const hardGame = document.querySelector('.hard-game')
const restartButton = document.querySelector('.restart-button')
const stopwatchBox = document.querySelector('.stopwatch')
const minutesBox = document.querySelector('.minutes')
const secondsBox = document.querySelector('.seconds')
const formElement = document.querySelector('.form')
const button = document.querySelector('button')
let level = 'Easy'
let minutes = 0
let seconds = 0
let cardToCompare: HTMLElement | null = null
let busy: boolean
let result = ''
let interval: number
let matchedCards: HTMLElement[] = []
const flipSound = new Audio('../static/audio/card-flip.mp3')
const matchSound = new Audio('../static/audio/success.mp3')
const victorySound = new Audio('../static/audio/victory.mp3')
const gameOverSound = new Audio('../static/audio/game-over.mp3')
const clickSound = new Audio('../static/audio/click.mp3')
button?.addEventListener('click', () => {
    clickSound.play()
})

function createCards() {
    const allCards: string[] = []
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

function canFlipCard(card: Element) {
    return !busy && cardToCompare !== card
}

function showVictoryLoseScreen() {
    victoryScreen?.classList.add('visible')
    stopwatchBox?.classList.remove('visible')
    easyGame?.classList.remove('visible-cards')
    mediumGame?.classList.remove('visible-cards')
    hardGame?.classList.remove('visible-cards')
    if (spentMinutes && minutesBox)
        spentMinutes.innerHTML = minutesBox.innerHTML
    if (spentSeconds && secondsBox)
        spentSeconds.innerHTML = secondsBox.innerHTML
    if (victoryButton)
        victoryButton.addEventListener('click', () => {
            clickSound.play()
            beginGame()
        })
    if (result === 'victory') {
        if (victoryLoseText) victoryLoseText.innerHTML = 'Вы выиграли!'
        victoryLoseIcon?.classList.remove('dead')
        victoryLoseIcon?.classList.add('celebration')
    } else {
        if (victoryLoseText) victoryLoseText.innerHTML = 'Вы проиграли!'
        victoryLoseIcon?.classList.remove('celebration')
        victoryLoseIcon?.classList.add('dead')
    }
}

function checkForCardMatch(card: HTMLElement, nums: string[]) {
    setTimeout((): void => {
        if (card.dataset.index === cardToCompare?.dataset.index) {
            matchSound.play()
            matchedCards.push(card)
            if (cardToCompare) {
                matchedCards.push(cardToCompare)
            }
            console.log(nums)
            console.log(matchedCards)
            if (matchedCards.length === nums.length) {
                victorySound.play()
                result = 'victory'
                showVictoryLoseScreen()
            }
        } else {
            gameOverSound.play()
            result = 'lose'
            showVictoryLoseScreen()
        }

        cardToCompare = null
        busy = false
    }, 1000)
}

function flipCards(nums: string[]) {
    const cards: HTMLElement[] = Array.from(document.querySelectorAll('.card'))
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if (canFlipCard(card)) {
                flipSound.play()
                card.classList.add('visible')
                if (cardToCompare) {
                    busy = true
                    checkForCardMatch(card, nums)
                } else {
                    cardToCompare = card
                }
            }
        })
    })
}

function shuffleCardsAndShow() {
    const cards: HTMLElement[] = Array.from(document.querySelectorAll('.card'))

    for (let i = cards.length - 1; i > 0; i--) {
        const randIndex = Math.floor(Math.random() * (i + 1))
        cards[randIndex].style.order = String(i)
        cards[i].style.order = String(randIndex)
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

function showEasyScreen(cardsArray: string[]) {
    const easyCards = []
    const indexes: string[] = []
    for (let i = 3; i > 0; i--) {
        const randIndex = Math.floor(Math.random() * (35 + 1))
        if (!indexes.includes(String(randIndex))) {
            easyCards.push(cardsArray[randIndex])
            easyCards.push(cardsArray[randIndex])
            indexes.push(String(randIndex))
        } else {
            i++
        }
    }

    let easyCardsHTML = ''
    easyCards.forEach((card) => {
        easyCardsHTML += card
    })

    if (easyGame) easyGame.innerHTML = easyCardsHTML
    shuffleCardsAndShow()
    flipCards(easyCards)
}

function showMediumScreen(cardsArray: string[]) {
    const mediumCards = []
    const indexes: string[] = []
    for (let i = 6; i > 0; i--) {
        const randIndex = Math.floor(Math.random() * (35 + 1))
        if (!indexes.includes(String(randIndex))) {
            mediumCards.push(cardsArray[randIndex])
            mediumCards.push(cardsArray[randIndex])
            indexes.push(String(randIndex))
        } else {
            i++
        }
    }

    let mediumCardsHTML = ''
    mediumCards.forEach((card) => {
        mediumCardsHTML += card
    })

    if (mediumGame) mediumGame.innerHTML = mediumCardsHTML
    shuffleCardsAndShow()
    flipCards(mediumCards)
}

function showHardScreen(cardsArray: string[]) {
    const hardCards = []
    const indexes: string[] = []
    for (let i = 9; i > 0; i--) {
        const randIndex = Math.floor(Math.random() * (35 + 1))
        if (!indexes.includes(String(randIndex))) {
            hardCards.push(cardsArray[randIndex])
            hardCards.push(cardsArray[randIndex])
            indexes.push(String(randIndex))
        } else {
            i++
        }
    }

    let hardCardsHTML = ''
    hardCards.forEach((card) => {
        hardCardsHTML += card
    })

    if (hardGame) hardGame.innerHTML = hardCardsHTML
    shuffleCardsAndShow()
    flipCards(hardCards)
}

function chooseLevel() {
    if (event) event.preventDefault()
    startScreen?.classList.remove('visible')
    stopwatchBox?.classList.add('visible')
    restartButton?.addEventListener('click', () => {
        clickSound.play()
        beginGame()
    })
    const cardsArray = createCards()

    radios.forEach((radio) => {
        if (radio.checked) {
            level = radio.value
        }
    })

    if (level === 'Easy') {
        easyGame?.classList.add('visible-cards')
        showEasyScreen(cardsArray)
    } else if (level === 'Medium') {
        mediumGame?.classList.add('visible-cards')
        showMediumScreen(cardsArray)
    } else if (level === 'Hard') {
        hardGame?.classList.add('visible-cards')
        showHardScreen(cardsArray)
    }

    const startStopwatch = (): void => {
        seconds++
        if (secondsBox && minutesBox) {
            secondsBox.innerHTML = '0' + seconds

            if (seconds > 9) {
                secondsBox.innerHTML = String(seconds)
            }

            if (seconds > 59) {
                minutes++
                minutesBox.innerHTML = '0' + minutes
                seconds = 0
            }

            if (minutes > 9) {
                minutesBox.innerHTML = String(minutes)
            }
        }
    }

    if (stopwatchBox) {
        setTimeout(() => {
            interval = Number(setInterval(startStopwatch, 1000))
        }, 5000)
    }
}

function beginGame() {
    minutes = 0
    seconds = 0
    busy = true
    cardToCompare = null
    matchedCards = []
    if (secondsBox) secondsBox.innerHTML = '00'
    if (minutesBox) minutesBox.innerHTML = '00'
    clearInterval(interval)
    gameOverSound.pause()
    victorySound.pause()
    gameOverSound.currentTime = 0
    victorySound.currentTime = 0

    startScreen?.classList.add('visible')
    easyGame?.classList.remove('visible-cards')
    hardGame?.classList.remove('visible-cards')
    mediumGame?.classList.remove('visible-cards')
    stopwatchBox?.classList.remove('visible')
    victoryScreen?.classList.remove('visible')

    if (formElement) formElement.addEventListener('submit', chooseLevel)
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', beginGame)
} else {
    beginGame()
}

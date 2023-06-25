/**
 * @jest-environment jsdom
 */

const { it, expect, describe } = require('@jest/globals')
const {
    createCards,
    canFlipCard,
    startStopwatch,
    chooseLevel,
    settInterval,
} = require('./cards.js')

function getExampleDOM() {
    const div = document.createElement('div')
    div.innerHTML = `<div data-testid="start-screen"></div>`
    const levelBox = document.createElement('div')
    levelBox.innerHTML = `<p>Выбери сложность</p>

    <form class="form">
        <div class="levels-box">
            <input
                type="radio"
                id="radio1"
                name="radios"
                value="Easy"
                data-testid="radio"
                
            />
            <label class="level" for="radio1">1</label>
            <input
                type="radio"
                id="radio2"
                name="radios"
                value="Medium"
                data-testid="radio"
                checked = true
            />
            <label class="level" for="radio2">2</label>

            <input
                type="radio"
                id="radio3"
                name="radios"
                value="Hard"
                data-testid="radio"
            />
            <label class="level" for="radio3">3</label>
        </div>
        <button id="start-button" type="submit" class="button">
            Старт
        </button>
    </form>`
    div.appendChild(levelBox)

    const gameScreen = document.createElement('div')
    gameScreen.innerHTML = `<div class="game-screen">
      <div class="stopwatch" data-testid="stopwatch">
          <div>
              <span data-testid="minutes-box" class="interval minutes">00</span>
              <span class="colon">.</span>
              <span data-testid="seconds-box" class="interval seconds">00</span>
          </div>
          <button class="restart-button">Начать заново</button>
      </div>
      <div data-testid="easy-game" class="easy-game cards"></div>
      <div data-testid="medium-game" class="medium-game cards"></div>
      <div data-testid="hard-game" class="hard-game cards"></div>
        `
    div.appendChild(gameScreen)

    return div
}

const { queryByTestId, getAllByTestId } = require('@testing-library/dom')

it('should return an array of cards with a length of 36', () => {
    expect(createCards()).toHaveLength(36)
})

it('should return true when card equals cardToCompare and busy is false', () => {
    expect(
        canFlipCard(
            `<div class="card card1" data-index="1">
    <div class="card-back card-face"></div>
    <div class="card-front card-face"></div>
  </div>`,
            false,
            `<div class="card card1" data-index="1">
  <div class="card-back card-face"></div>
  <div class="card-front card-face"></div>
</div>`
        )
    ).toBe(true)
})

describe('should hide the start screen and show game screen', () => {
    it('should show the easy-game screen', () => {
        const container = getExampleDOM()
        const startScreen = queryByTestId(container, 'start-screen')
        const stopwatchBox = queryByTestId(container, 'stopwatch')
        const radios = getAllByTestId(container, 'radio')
        const easyGame = queryByTestId(container, 'easy-game')
        let level = 'Simple'
        const showEasyScreen = () => {
            return 'easy screen is shown'
        }
        radios[0].checked = 'true'

        chooseLevel({
            startScreen,
            stopwatchBox,
            createCards,
            radios,
            level,
            easyGame,

            showEasyScreen,
        })

        expect(startScreen.classList).toMatchObject({})
        expect(stopwatchBox.classList).toMatchObject({
            0: 'stopwatch',
            1: 'visible',
        })
        expect(easyGame.classList).toMatchObject({
            0: 'easy-game',
            1: 'cards',
            2: 'visible-cards',
        })

        expect(
            chooseLevel({
                startScreen,
                stopwatchBox,
                createCards,
                radios,
                level,
                easyGame,
                showEasyScreen,
            })
        ).toBe('Easy')
    })
    it('should show the medium-game screen', () => {
        const container = getExampleDOM()
        const startScreen = queryByTestId(container, 'start-screen')
        const stopwatchBox = queryByTestId(container, 'stopwatch')
        const radios = getAllByTestId(container, 'radio')
        const mediumGame = queryByTestId(container, 'medium-game')
        let level = 'Simple'
        const showMediumScreen = () => {
            return 'medium screen is shown'
        }
        radios[1].checked = 'true'

        chooseLevel({
            startScreen,
            stopwatchBox,
            createCards,
            radios,
            level,
            mediumGame,
            showMediumScreen,
        })

        expect(startScreen.classList).toMatchObject({})
        expect(stopwatchBox.classList).toMatchObject({
            0: 'stopwatch',
            1: 'visible',
        })
        expect(mediumGame.classList).toMatchObject({
            0: 'medium-game',
            1: 'cards',
            2: 'visible-cards',
        })

        expect(
            chooseLevel({
                startScreen,
                stopwatchBox,
                createCards,
                radios,
                level,
                mediumGame,
                showMediumScreen,
            })
        ).toBe('Medium')
    })
    it('should show the hard-game screen', () => {
        const container = getExampleDOM()
        const startScreen = queryByTestId(container, 'start-screen')
        const stopwatchBox = queryByTestId(container, 'stopwatch')
        const radios = getAllByTestId(container, 'radio')
        const hardGame = queryByTestId(container, 'hard-game')
        let level = 'Simple'
        const showHardScreen = () => {
            return 'hard screen is shown'
        }
        radios[2].checked = 'true'

        chooseLevel({
            startScreen,
            stopwatchBox,
            createCards,
            radios,
            level,
            hardGame,
            showHardScreen,
        })

        expect(startScreen.classList).toMatchObject({})
        expect(stopwatchBox.classList).toMatchObject({
            0: 'stopwatch',
            1: 'visible',
        })
        expect(hardGame.classList).toMatchObject({
            0: 'hard-game',
            1: 'cards',
            2: 'visible-cards',
        })

        expect(
            chooseLevel({
                startScreen,
                stopwatchBox,
                createCards,
                radios,
                level,
                hardGame,
                showHardScreen,
            })
        ).toBe('Hard')
    })
})

describe('should change innerHTML of stopwatch depending on seconds value', () => {
    it('should change innerHTML of secondsBox to 0X if seconds value less than 9', () => {
        let seconds = 0
        let minutes = 0
        const container = getExampleDOM()
        const secondsBox = queryByTestId(container, 'seconds-box')
        const minutesBox = queryByTestId(container, 'minutes-box')
        startStopwatch({ seconds, secondsBox, minutes, minutesBox })
        expect(secondsBox.innerHTML).toBe('01')
    })
    it('should change innerHTML of secondsBox to X if seconds value greater than 9', () => {
        let seconds = 10
        let minutes = 0
        const container = getExampleDOM()
        const secondsBox = queryByTestId(container, 'seconds-box')
        const minutesBox = queryByTestId(container, 'minutes-box')
        startStopwatch({ seconds, secondsBox, minutes, minutesBox })
        expect(secondsBox.innerHTML).toBe('11')
    })
    it('should increase minutes value by one, set seconds value to zero and change innerHTML of minutesBox to 0X if seconds value greater than 59', () => {
        let seconds = 60
        let minutes = 0
        const container = getExampleDOM()
        const secondsBox = queryByTestId(container, 'seconds-box')
        const minutesBox = queryByTestId(container, 'minutes-box')
        startStopwatch({ seconds, secondsBox, minutes, minutesBox })
        expect(secondsBox.innerHTML).toBe('61')
        expect(minutesBox.innerHTML).toBe('01')
    })
    it('should increase minutes value by one, set seconds value to zero and change innerHTML of minutesBox to X if seconds value greater than 59 and minutes greater than 9', () => {
        let seconds = 60
        let minutes = 9
        const container = getExampleDOM()
        const secondsBox = queryByTestId(container, 'seconds-box')
        const minutesBox = queryByTestId(container, 'minutes-box')
        startStopwatch({ seconds, secondsBox, minutes, minutesBox })
        expect(secondsBox.innerHTML).toBe('61')
        expect(minutesBox.innerHTML).toBe('10')
    })
})

it('should set interval', () => {
    let seconds = 0
    let minutes = 0
    const container = getExampleDOM()
    const secondsBox = queryByTestId(container, 'seconds-box')
    const minutesBox = queryByTestId(container, 'minutes-box')
    settInterval(startStopwatch({ seconds, secondsBox, minutes, minutesBox }))
    setTimeout(() => {
        expect(secondsBox.innerHTML).toBe('00')
        expect(minutesBox.innerHTML).toBe('01')
    }, 60000)
})

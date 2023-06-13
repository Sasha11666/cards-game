/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");

var radios = Array.from(document.querySelectorAll('.radios'));
var startScreen = document.querySelector('.content-box');
var victoryScreen = document.querySelector('.victory-lose-screen');
var spentMinutes = document.querySelector('.time-spent-minutes');
var spentSeconds = document.querySelector('.time-spent-seconds');
var victoryButton = document.getElementById('victory-restart-button');
var victoryLoseText = document.querySelector('.victory-lose-text');
var victoryLoseIcon = document.querySelector('.victory-lose-icon');
var easyGame = document.querySelector('.easy-game');
var mediumGame = document.querySelector('.medium-game');
var hardGame = document.querySelector('.hard-game');
var restartButton = document.querySelector('.restart-button');
var stopwatchBox = document.querySelector('.stopwatch');
var minutesBox = document.querySelector('.minutes');
var secondsBox = document.querySelector('.seconds');
var formElement = document.querySelector('.form');
var level = 'Easy';
var minutes = 0;
var seconds = 0;
var cardToCompare = null;
var busy;
var result = '';
var interval;
function createCards() {
    var allCards = [];
    for (var i = 1; i < 37; i++) {
        allCards.push("<div class=\"card card".concat(i, "\" data-index=\"").concat(i, "\">\n      <div class=\"card-back card-face\"></div>\n      <div class=\"card-front card-face\"></div>\n    </div>"));
    }
    return allCards;
}
function canFlipCard(card) {
    return !busy && cardToCompare !== card;
}
function showVictoryLoseScreen() {
    victoryScreen === null || victoryScreen === void 0 ? void 0 : victoryScreen.classList.add('visible');
    stopwatchBox === null || stopwatchBox === void 0 ? void 0 : stopwatchBox.classList.remove('visible');
    easyGame === null || easyGame === void 0 ? void 0 : easyGame.classList.remove('visible-cards');
    mediumGame === null || mediumGame === void 0 ? void 0 : mediumGame.classList.remove('visible-cards');
    hardGame === null || hardGame === void 0 ? void 0 : hardGame.classList.remove('visible-cards');
    if (spentMinutes && minutesBox)
        spentMinutes.innerHTML = minutesBox.innerHTML;
    if (spentSeconds && secondsBox)
        spentSeconds.innerHTML = secondsBox.innerHTML;
    if (victoryButton)
        victoryButton.addEventListener('click', beginGame);
    if (result === 'victory') {
        if (victoryLoseText)
            victoryLoseText.innerHTML = 'Вы выиграли!';
        victoryLoseIcon === null || victoryLoseIcon === void 0 ? void 0 : victoryLoseIcon.classList.remove('dead');
        victoryLoseIcon === null || victoryLoseIcon === void 0 ? void 0 : victoryLoseIcon.classList.add('celebration');
    }
    else {
        if (victoryLoseText)
            victoryLoseText.innerHTML = 'Вы проиграли!';
        victoryLoseIcon === null || victoryLoseIcon === void 0 ? void 0 : victoryLoseIcon.classList.remove('celebration');
        victoryLoseIcon === null || victoryLoseIcon === void 0 ? void 0 : victoryLoseIcon.classList.add('dead');
    }
}
function checkForCardMatch(card) {
    setTimeout(function () {
        if (card.dataset.index === (cardToCompare === null || cardToCompare === void 0 ? void 0 : cardToCompare.dataset.index)) {
            result = 'victory';
            showVictoryLoseScreen();
        }
        else {
            result = 'lose';
            showVictoryLoseScreen();
        }
        cardToCompare = null;
    }, 1000);
}
function flipCards() {
    var cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            if (canFlipCard(card)) {
                card.classList.add('visible');
                if (cardToCompare) {
                    checkForCardMatch(card);
                }
                else {
                    cardToCompare = card;
                }
            }
        });
    });
}
function shuffleCardsAndShow() {
    var cards = Array.from(document.querySelectorAll('.card'));
    for (var i = cards.length - 1; i > 0; i--) {
        var randIndex = Math.floor(Math.random() * (i + 1));
        cards[randIndex].style.order = String(i);
        cards[i].style.order = String(randIndex);
    }
    setTimeout(function () {
        cards.forEach(function (card) {
            card.classList.add('visible');
        });
    }, 1000);
    setTimeout(function () {
        cards.forEach(function (card) {
            card.classList.remove('visible');
        });
        busy = false;
    }, 5000);
}
function showEasyScreen(cardsArray) {
    var easyCards = [];
    var IndexToCompare = '0';
    for (var i = 3; i > 0; i--) {
        var randIndex = Math.floor(Math.random() * (35 + 1));
        if (+randIndex !== +IndexToCompare) {
            easyCards.push(cardsArray[randIndex]);
            easyCards.push(cardsArray[randIndex]);
            IndexToCompare = String(randIndex);
        }
        else {
            i++;
        }
    }
    console.log(easyCards);
    var easyCardsHTML = '';
    easyCards.forEach(function (card) {
        easyCardsHTML += card;
    });
    if (easyGame)
        easyGame.innerHTML = easyCardsHTML;
    shuffleCardsAndShow();
    flipCards();
}
function showMediumScreen(cardsArray) {
    var mediumCards = [];
    var IndexToCompare = 'd';
    for (var i = 6; i > 0; i--) {
        var randIndex = Math.floor(Math.random() * (35 + 1));
        if (+randIndex !== +IndexToCompare) {
            mediumCards.push(cardsArray[randIndex]);
            mediumCards.push(cardsArray[randIndex]);
            IndexToCompare = String(randIndex);
        }
        else {
            i++;
        }
    }
    var mediumCardsHTML = '';
    mediumCards.forEach(function (card) {
        mediumCardsHTML += card;
    });
    if (mediumGame)
        mediumGame.innerHTML = mediumCardsHTML;
    shuffleCardsAndShow();
    flipCards();
}
function showHardScreen(cardsArray) {
    var hardCards = [];
    var IndexToCompare = '0';
    for (var i = 9; i > 0; i--) {
        var randIndex = Math.floor(Math.random() * (35 + 1));
        if (+randIndex !== +IndexToCompare) {
            hardCards.push(cardsArray[randIndex]);
            hardCards.push(cardsArray[randIndex]);
            IndexToCompare = String(randIndex);
        }
        else {
            i++;
        }
    }
    var hardCardsHTML = '';
    hardCards.forEach(function (card) {
        hardCardsHTML += card;
    });
    if (hardGame)
        hardGame.innerHTML = hardCardsHTML;
    shuffleCardsAndShow();
    flipCards();
}
function chooseLevel() {
    if (event)
        event.preventDefault();
    startScreen === null || startScreen === void 0 ? void 0 : startScreen.classList.remove('visible');
    stopwatchBox === null || stopwatchBox === void 0 ? void 0 : stopwatchBox.classList.add('visible');
    restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener('click', beginGame);
    var cardsArray = createCards();
    radios.forEach(function (radio) {
        if (radio.checked) {
            level = radio.value;
        }
    });
    if (level === 'Easy') {
        easyGame === null || easyGame === void 0 ? void 0 : easyGame.classList.add('visible-cards');
        showEasyScreen(cardsArray);
    }
    else if (level === 'Medium') {
        mediumGame === null || mediumGame === void 0 ? void 0 : mediumGame.classList.add('visible-cards');
        showMediumScreen(cardsArray);
    }
    else if (level === 'Hard') {
        hardGame === null || hardGame === void 0 ? void 0 : hardGame.classList.add('visible-cards');
        showHardScreen(cardsArray);
    }
    var startStopwatch = function () {
        seconds++;
        if (secondsBox && minutesBox) {
            secondsBox.innerHTML = '0' + seconds;
            if (seconds > 9) {
                secondsBox.innerHTML = String(seconds);
            }
            if (seconds > 59) {
                minutes++;
                minutesBox.innerHTML = '0' + minutes;
                seconds = 0;
            }
            if (minutes > 9) {
                minutesBox.innerHTML = String(minutes);
            }
        }
    };
    if (stopwatchBox) {
        setTimeout(function () {
            interval = Number(setInterval(startStopwatch, 1000));
        }, 5000);
    }
}
function beginGame() {
    minutes = 0;
    seconds = 0;
    busy = true;
    cardToCompare = null;
    if (secondsBox)
        secondsBox.innerHTML = '00';
    if (minutesBox)
        minutesBox.innerHTML = '00';
    clearInterval(interval);
    startScreen === null || startScreen === void 0 ? void 0 : startScreen.classList.add('visible');
    easyGame === null || easyGame === void 0 ? void 0 : easyGame.classList.remove('visible-cards');
    hardGame === null || hardGame === void 0 ? void 0 : hardGame.classList.remove('visible-cards');
    mediumGame === null || mediumGame === void 0 ? void 0 : mediumGame.classList.remove('visible-cards');
    stopwatchBox === null || stopwatchBox === void 0 ? void 0 : stopwatchBox.classList.remove('visible');
    victoryScreen === null || victoryScreen === void 0 ? void 0 : victoryScreen.classList.remove('visible');
    if (formElement)
        formElement.addEventListener('submit', chooseLevel);
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', beginGame);
}
else {
    beginGame();
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
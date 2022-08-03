const WIDTH = 750;
const CONTAINER = document.querySelector('.container');
const colorRegex = /rgb\((?<red>\d{1,3}), (?<green>\d{1,3}), (?<blue>\d{1,3})\)/;

function decreaseByPercentage(colorStr, percentage) {
    const color = Number.parseInt(colorStr);
    return Math.max(0, color - Math.round(color * percentage));
}

function changeColorByPercentage(rgbColor) {
    const match = colorRegex.exec(rgbColor);
    if (match) {
        const red = decreaseByPercentage(match.groups.red, 0.1);
        const green = decreaseByPercentage(match.groups.green, 0.1);
        const blue = decreaseByPercentage(match.groups.blue, 0.1);

        return `rgb(${red}, ${green}, ${blue})`;
    }
}

function removeAllChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function createRandomRGBcolor() {
    const red = Math.round(Math.random() * 255);
    const green = Math.round(Math.random() * 255);
    const blue = Math.round(Math.random() * 255);
    return `rgb(${red}, ${green}, ${blue})`;
}

function createSquare(numSquares) {
    const square = document.createElement('div');
    square.style.width = `${Math.floor(WIDTH / numSquares) - 1}px`;
    square.style.height = `${Math.floor(WIDTH / numSquares) - 1}px`;
    square.style.backgroundColor = 'peru';
    return square;
}

function handleMouseOver(event) {
    const currentColor = event.target.style.backgroundColor;
    if (currentColor === 'peru') {
        event.target.style.backgroundColor = createRandomRGBcolor();
    } else {
        event.target.style.backgroundColor = changeColorByPercentage(currentColor);
    }
}

function createBoard(numSquares) {
    for (let i = 0; i < numSquares; i++) {
        const squareContainer = document.createElement('div');
        squareContainer.classList.add('square-container')
    
        for (let j = 0; j < numSquares; j++) {
            const square = createSquare(numSquares);
            square.addEventListener('mouseover', handleMouseOver);
            squareContainer.appendChild(square)
        }
        CONTAINER.appendChild(squareContainer);
    }
}

function handleReset() {
    let numSquares = Number.parseInt(
        prompt('Enter number of squares per side (max 100): ')
    );
    while (Number.isNaN(numSquares)) {
        numSquares = Number.parseInt(
            prompt('Enter number of squares per side (max 100): ')
        );
    }
    removeAllChild(CONTAINER);
    createBoard(numSquares);
}


const resetButton = document.querySelector('.start-new-btn');
resetButton.addEventListener('click', () => handleReset());

createBoard(4);
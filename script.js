const WIDTH = 750;
const CONTAINER = document.querySelector('.container');

function removeAllChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createSquare(numSquares) {
    const square = document.createElement('div');
    square.style.width = `${Math.floor(WIDTH / numSquares) - 1}px`;
    square.style.height = `${Math.floor(WIDTH / numSquares) - 1}px`;
    square.style.backgroundColor = 'peru';
    return square;
}

function createBoard(numSquares) {
    for (let i = 0; i < numSquares; i++) {
        const squareContainer = document.createElement('div');
        squareContainer.classList.add('square-container')
    
        for (let j = 0; j < numSquares; j++) {
            const square = createSquare(numSquares);
            square.addEventListener('mouseover', (event) => {
                event.target.style.backgroundColor = "blue";
            })
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
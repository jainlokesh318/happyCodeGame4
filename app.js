document.addEventListener('DOMContentLoaded', () => {
    const moveBtn = document.querySelector('#move');


    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));

    let message = document.querySelector('#message');
    const warning = "Can't move anymore...";
    const greeting = "Let's Play!";
    const invalidControl = "Please Give Right Instruction!"

    const width = 10;
    let currentPosition = 99;
    let currentRow = 9;
    let currentColumn = 9; 

    function setupGrid() {
        let blockedCells = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        
        for(let i = 0; i <= blockedCells; i++)
        {
            let blockedCell = Math.floor(Math.random() * (85 - 1 + 1)) + 1;
            squares[blockedCell].classList.add('blockedBlock');
        }
    }

    setupGrid();

    function draw() {
      squares[currentPosition].classList.add('currentBlock');  
    }

    function undraw() {
        squares[currentPosition].classList.remove('currentBlock');
    }

   draw();

   function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

   async function handleControl() {

       document.getElementById("move").disabled = true;
       
        let givenInstructions = (document.getElementById("direct").value).toLowerCase();
        let directions = givenInstructions.split(",");
        console.log("hello", directions.length);
        
        for(let i = 0; i < directions.length; i++)
        {
            let given = directions[i];
            
            if(message.innerHTML === warning) {
                break;
            } else if(given === "up") {
                moveUp();
            } else if(given === "down") {
                moveDown();
            } else if(given === "left") {
                moveLeft();
            } else if (given === "right") {
                moveRight();
            } else {
                message.innerHTML = invalidControl;
                break;
            }
            await sleep(1000);        
        }

        document.getElementById("move").disabled = false;
   }

   moveBtn.addEventListener('click', handleControl);

    function moveUp() {
        if(currentColumn >= 0 && currentRow > 0 && !squares[currentPosition-width].classList.contains("blockedBlock")){
            undraw();
            currentPosition -= width;
            draw();
            currentRow--;
            message.innerHTML = greeting;
        } else {
            message.innerHTML = warning;
        }
    }
    
    function moveLeft() {
        if(currentColumn > 0 && currentRow >= 0 && !squares[currentPosition-1].classList.contains("blockedBlock"))
        {
            undraw();
            currentPosition -= 1;
            draw();
            currentColumn--;
            message.innerHTML = greeting;
        } else {
            message.innerHTML = warning;
        }
    }

    function moveDown() {
        if(currentRow < 9 && !squares[currentPosition+width].classList.contains("blockedBlock"))
        {
            undraw();
            currentPosition += width;
            draw();
            currentRow++;
            message.innerHTML = greeting;
        } else {
            message.innerHTML = warning;
        }
    }

    function moveRight() {
        if(currentColumn < 9 && !squares[currentPosition+1].classList.contains("blockedBlock")) {
            undraw();
            currentPosition += 1;
            draw();
            currentColumn++;
            message.innerHTML = greeting;
        } else {
            message.innerHTML = warning;
        }
    }
});
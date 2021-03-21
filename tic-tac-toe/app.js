document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid')
const width = 8
const scoreDisplay = document.getElementById('score')
const squares = []
let score = 0

const candyColors = [
    'url(Images/alternative-blue.png',
    'url(Images/alternative-yellow.png',
    'url(Images/alternative-orange.png',
    'url(Images/alternative-purple.png', 
    'url(Images/alternative-green.png',
    'url(Images/alternative-red.png',
    
]
//Create Board 
function createBoard() {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        square.setAttribute('draggable', true)
        square.setAttribute('id', i)
        let randomColor = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundImage = candyColors[randomColor]
        grid.appendChild(square)
        squares.push(square)
    }
}
createBoard()


//Drag the shapes 
let colorBeingDragged
let colorBeingReplaced
let squareIDBeingDragged
let squareIDBeingReplaced


squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart() {
    colorBeingDragged = this.style.backgroundImage
    squareIDBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
    console.log(this.id, 'dragstart')
}

function dragOver(e) {
    e.preventDefault()
    console.log(this.id, 'dragover')
}

function dragEnter(e) {
    e.preventDefault()
    console.log(this.id, 'dragenter')
}

function dragLeave() {
    console.log(this.id, 'dragleave')
}

function dragDrop() {
    console.log(this.id, 'drop')
    colorBeingReplaced = this.style.backgroundImage
    squareIDBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIDBeingDragged].style.backgroundImage = colorBeingReplaced
}

function dragEnd() {
    console.log(this.id, 'dragend')
    //Where can the items move
    let validMoves = [squareIDBeingDragged -1 , 
        squareIDBeingDragged -width, 
        squareIDBeingDragged +1, 
        squareIDBeingDragged +width]
    let validMove = validMoves.includes(squareIDBeingReplaced)

    if (squareIDBeingReplaced && validMove) {
        squareIDBeingReplaced = null
    }  else if (squareIDBeingReplaced && !validMove) {
       squares[squareIDBeingReplaced].style.backgroundImage = colorBeingReplaced
       squares[squareIDBeingDragged].style.backgroundImage = colorBeingDragged
    } else  squares[squareIDBeingDragged].style.backgroundImage = colorBeingDragged
}

function moveDown() {
    for (i = 0; i < 55; i++) {
        if (squares[i + width].style.backgroundImage === '') {
          squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
          squares[i].style.backgroundImage = ''   
          const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
          const isFirstRow = firstRow.includes(i)
          if (isFirstRow && squares[i].style.backgroundImage === '') {
              let randomColor = Math.floor(Math.random() * candyColors.length)
              squares[i].style.backgroundImage = candyColors[randomColor]
          }
        }
    }
}


function checkRowForThree() {
     for (i = 0; i < 61; i++) {
         let rowOfThree = [i, i+1, i+2]
         let decidedColor = squares[i].style.backgroundImage
         const isBlank = squares[i].style.backgroundImage === ''

         const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
         if (notValid.includes(i)) continue

         if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            scoreDisplay.innerHTML = score
            rowOfThree.forEach(index => {
                 squares[index].style.backgroundImage = ''
             })
         }
     }
}
checkRowForThree()

function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
        let ColumnOfThree = [i, i+width, i+width*2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        if(ColumnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
           score += 3
           scoreDisplay.innerHTML = score
           ColumnOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkColumnForThree()

function checkRowForFour() {
    for (i = 0; i < 60; i++) {
        let rowOfFour = [i, i+1, i+2, i+3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''

        const notValid = [ 6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 53, 54, 55]
        if (notValid.includes(i)) continue

        if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
           score += 4
           scoreDisplay.innerHTML = score
           rowOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkRowForFour()

function checkColumnForFour() {
   for (i = 0; i < 39; i++) {
       let columnOfFour = [i, i+width, i+width*2, i+width*3]
       let decidedColor = squares[i].style.backgroundImage
       const isBlank = squares[i].style.backgroundImage === ''

       if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
          score += 4
          scoreDisplay.innerHTML = score
          columnOfFour.forEach(index => {
               squares[index].style.backgroundImage = ''
           })
       }
   }
}
checkColumnForFour()




window.setInterval(function(){
    moveDown()
    checkRowForFour()
    checkColumnForFour
    checkColumnForThree()
    checkRowForThree()
   
    
},100)

})
var randomNumber1 = Math.floor(Math.random()*6)+1

var randomNumber2 = Math.floor(Math.random()*6)+1


var imageStringstart = "images/dice"

var imageStringend = ".png"


document.querySelector(".img1").setAttribute("src",imageStringstart + randomNumber1 + imageStringend);

document.querySelector(".img2").setAttribute("src",imageStringstart + randomNumber2 + imageStringend);

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 1 has won!"
} else if (randomNumber2 > randomNumber1) {
    document.querySelector("h1").innerHTML = "Player 2 has won!"
} else {
  document.querySelector("h1").innerHTML = "Its a Draw!"  
}
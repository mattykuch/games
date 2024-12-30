var randomNumber1 = Math.floor(Math.random()*6)+1 // generates a random number between 1 and 6

var randomNumber2 = Math.floor(Math.random()*6)+1

// Create 2 variables that we'll combine in the "src" SetAttribute
var imageStringstart = "images/dice"

var imageStringend = ".png"

// Select img1 class and change its "src" attribute
document.querySelector(".img1").setAttribute("src",imageStringstart + randomNumber1 + imageStringend);

// Select img2 class and change its "src" attribute
document.querySelector(".img2").setAttribute("src",imageStringstart + randomNumber2 + imageStringend);

// Use if-else to dynamically change "h1" based on which player has bigger random number or has drawn
if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 1 has won!"
} else if (randomNumber2 > randomNumber1) {
    document.querySelector("h1").innerHTML = "Player 2 has won!"
} else {
  document.querySelector("h1").innerHTML = "Its a Draw!"  
}
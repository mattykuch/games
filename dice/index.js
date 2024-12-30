var randomNumber1 = Math.floor(Math.random()*5)+1

var imageStringstart = "images/dice"

var imageStringend = ".png"


document.querySelector(".img1").setAttribute("src",imageStringstart + randomNumber1 + imageStringend);
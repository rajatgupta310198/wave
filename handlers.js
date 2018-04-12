const musicEngine = require('./musicEngine').musicEngine
var player = require("./player")
var ul = document.createElement("ul")
var listOfMp3s = musicEngine.listOfMp3s



for(var i = 0; i < listOfMp3s.length ; i++){
    var li = document.createElement("li")
    var link = document.createElement("a")
    link.setAttribute("href", listOfMp3s[i]['path'])
    link.addEventListener("click", function(e){
        e.preventDefault()
        var music = this.getAttribute("href")
        player.addSongs(music)
        
        //console.log(player.playList())
    })
    link.appendChild(document.createTextNode(listOfMp3s[i]['file']))
    li.appendChild(link)
    ul.appendChild(li)
    
}
document.body.appendChild(ul)


var button = document.createElement("button")
button.appendChild(document.createTextNode('Play'))
button.addEventListener("click", function(e){
    //console.log(this.innerHTML === 'Play')
   if(this.innerHTML == "Play" ){
    
        this.innerHTML = "Pause"
        player.play()
    }
    else{
        this.innerHTML = "Play"
        
        player.pause()
    }

})
document.body.appendChild(button)




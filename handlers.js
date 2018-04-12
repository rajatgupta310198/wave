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


var playBtn = document.createElement("button")
playBtn.appendChild(document.createTextNode('Play'))
playBtn.addEventListener("click", function(e){
    //console.log(this.innerHTML === 'Play')
   if(this.innerHTML == "Play"){

        this.innerHTML = "Pause"
        player.play()

    }
    else if(this.innerHTML == "Pause"){
        console.log('pause')
        this.innerHTML = "Resume"
        player.pause()

    }
    else if(this.innerHTML == "Resume"){
        console.log('resume')
        this.innerHTML = "Pause"
        player.resume()

    }

})

var nextBtn = document.createElement("button")
nextBtn.appendChild(document.createTextNode("Next"))
nextBtn.addEventListener("click", function(e){
    player.next()
})

var stopBtn = document.createElement("button")
stopBtn.appendChild(document.createTextNode("Stop"))
stopBtn.addEventListener("click", function(e){
    player.stop()
})

document.body.appendChild(playBtn)
document.body.appendChild(nextBtn)
document.body.appendChild(stopBtn)




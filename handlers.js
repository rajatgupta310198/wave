const musicEngine = require('./musicEngine').musicEngine
var player = require("./player")


// adding songs
var ul = document.getElementById("songs")

var listOfMp3s = musicEngine.listOfMp3s



for(var i = 0; i < listOfMp3s.length ; i++){
    var li = document.createElement("li")
    var link = document.createElement("a")
    link.setAttribute("href", listOfMp3s[i]['path'])
    link.setAttribute("class", "grey-text text-darken-1")
    link.addEventListener("click", function(e){
        e.preventDefault()
        var music = this.getAttribute("href")
        player.addSongs(music)
    })
    link.appendChild(document.createTextNode(listOfMp3s[i]['file']))
    li.setAttribute("class", "collection-item")
    li.appendChild(link)
    ul.appendChild(li)
    
}


// adding control buttons

var playBtn = document.createElement("button")
playBtn.appendChild(document.createTextNode('Play'))
playBtn.setAttribute("id", "playBtn")
playBtn.setAttribute("class", "btn btn-waves waves effect blue")
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
nextBtn.setAttribute("class", "btn btn-waves waves effect blue")
nextBtn.addEventListener("click", function(e){
    player.next()
})

var stopBtn = document.createElement("button")
stopBtn.appendChild(document.createTextNode("Stop"))
stopBtn.setAttribute("class", "btn btn-waves waves effect blue")
stopBtn.addEventListener("click", function(e){
    player.stop()
    playBtn.innerHTML = "Play"
})




// appending to main body
var pl = document.getElementById("pl")
pl.appendChild(playBtn)
var nxt = document.getElementById("nxt")
nxt.appendChild(nextBtn)
var pa = document.getElementById("pa")
pa.appendChild(stopBtn)




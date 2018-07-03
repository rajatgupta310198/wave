const musicEngine = require('./musicEngine').musicEngine
var Howler = require('howler')
var mm = require("musicmetadata")

playList = []
currentPlaying = 0
previouslyPlaying = -1
playing = false 
paused = false
vol = 0.5
songID = null
howlerbank = []


var Player = function(){
    this.playlist = []
    this.howlerbank = []
    this.playing = false
    this.paused = false
    this.index = -1
}
Player.prototype.Init = (SongsDB) =>{
    this.playlist = playList
    this.howlerbank = howlerbank
    this.playing = playing
    this.paused = paused
    this.index = -1
    this.SongsDB_ = SongsDB
    this.repeat = false
}
Player.prototype.setRepeat = () =>{
    if(this.repeat==false)
    {
        this.repeat = true
        var repeatBtn = document.getElementById("repeatBtn")
        repeatBtn.setAttribute("class", "btn-floating tooltipped waves-effect waves-light grey text-darken-2")
        repeatBtn.setAttribute("data-tooltip", "off repeat")
    }
    else
    {
        this.repeat = false
        
        var repeatBtn = document.getElementById("repeatBtn")
        repeatBtn.setAttribute("class", "tooltipped grey-text")
        repeatBtn.setAttribute("data-tooltip", "repeat")
        // repeatBtn.setAttribute("class", "btn-floating  waves-effect waves-light grey text-darken-1")
    }
}
Player.prototype.Play = () =>{
    // plays first track in playlist
    this.index = this.index + 1
    this.playing = true
    
    console.log(this.index)
    console.log(this.howlerbank[this.index])
    var song = this.howlerbank[this.index]
    song.play()
}
Player.prototype.Resume = () =>{
    if(this.paused == true){
        this.paused = false
        var song = this.howlerbank[this.index]
        song.play()
    }
}
Player.prototype.Pause = () =>{
    if(this.paused == false){
        this.paused = true
        var song = this.howlerbank[this.index]
        song.pause()
    }
}
Player.prototype.Stop = () =>{

    if(this.playing == true){
        this.playing = false;
        var timeElement = document.getElementById("time")
            timeElement.innerHTML = ""
        var currentPlaying_ = document.getElementById("current-playing")
            while(currentPlaying_.hasChildNodes()){
                currentPlaying_.removeChild(currentPlaying_.lastChild)
            }
            var prog = document.getElementById("prog")
            prog.removeAttribute("class")
        var art = document.getElementById("current-playing-art")
        art.src =  "images/music.png"
        var playbtn_ = document.getElementById("playBtn").firstChild
        playbtn_.innerHTML = "play_arrow"
        this.howlerbank[this.index].stop()
        howlerbank = []
        playList = []

        this.playlist = []
        this.howlerbank = []
        
        this.index  = -1
    }
    // this.Init()
}
Player.prototype.Next = () =>{
    var currentPlaying_ = document.getElementById("current-playing")
    while(currentPlaying_.hasChildNodes()){
        currentPlaying_.removeChild(currentPlaying_.lastChild)
    }
    if(this.index < this.howlerbank.length -1)
    {
        this.index = this.index + 1
        this.howlerbank[this.index-1].stop()
        this.howlerbank[this.index].play()
    }
    else{
        this.howlerbank[this.index].stop()
        this.index = 0
        this.howlerbank[this.index].play()
    }
}
Player.prototype.GetPlayList = ()=>{
    return this.playlist
}
Player.prototype.IsPlaying = ()=>{
    return this.playing
}
Player.prototype.IsPaused = ()=>{
    return this.paused
}
function formatTime(secs){
    var minutes = Math.floor(secs/60) || 0
    var seconds = (secs - minutes * 60) || 0
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
function step(){
    var sound = this.howlerbank[this.index]
    var seek = sound.seek() || 0;
    var timeElement = document.getElementById("time")
    // var progress = document.getElementsByClassName("pro")
    // progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';
    timeElement.innerHTML = formatTime(Math.round(seek))
    if(sound.playing){
        requestAnimationFrame(step.bind(this))
    }
}
Player.prototype.AddSongs = (songs) => {
    playList.push(songs)
    this.playlist = playList
    
    var ho = new Howler.Howl({
        src:[songs],
        
        onplay:()=>{
            var timeElement = document.getElementById("time")
            var prog = document.getElementById("prog")
            prog.removeAttribute("class")
            prog.setAttribute("class", "indeterminate")
            timeElement.innerHTML = formatTime(Math.round(this.howlerbank[this.index].duration()))
            requestAnimationFrame(step.bind(this))
            var playbtn_ = document.getElementById("playBtn").firstChild
            var currentPlaying_ = document.getElementById("current-playing")
            var currentArt = document.getElementById("current-playing-art")
            playbtn_.innerHTML = "pause"
            // currentPlaying_.innerHTML = this.playlist
            if(currentPlaying_.hasChildNodes()==false)
            {console.log(this.SongsDB_)
            var indexLocal = this.SongsDB_['path'].findIndex(result => result==songs)
            console.log(indexLocal)
            var tags = this.SongsDB_['tags'][indexLocal]
            console.log(tags)
            var img = tags['picture']
            console.log(img, img.length)
            if(img.length == 1){
                 
                    var b64 = ""
                    for(let i=0; i<img[0]['data'].length; i++){
                        b64 += String.fromCharCode(img[0]['data'][i])
                    }
                    var b64img = 'data:image/' + img[0]['format'] + ';base64,' + window.btoa(b64)
                    currentArt.setAttribute("src", b64img)
                    
                 
                     
                    var b64img = 'data:image/png;base64,' + window.btoa(b64)
                    currentArt.setAttribute("src", b64img)
                 
            }
            else{
                currentArt.setAttribute("src", "images/music.png")
            }
            if(tags['title']!="" && tags['title']!=undefined)
                {currentPlaying_.appendChild(document.createTextNode(tags['title']))}
            else{
                currentPlaying_.appendChild(document.createTextNode("Unknown"))
            }
            
            currentPlaying_.appendChild(document.createElement("br"))
            var divArtist = document.createElement("div")
            divArtist.setAttribute("class", "grey-text text-darken-1")
            if(tags['artist'][0]!=""&&tags['artist'][0]!=undefined){
                
                divArtist.appendChild(document.createTextNode(tags['artist'][0]))
                // currentPlaying_.appendChild(divArtist)
            }
            else{
                divArtist.appendChild(document.createTextNode("Unknown"))
                
            }
            divArtist.appendChild(document.createElement("br"))
            if(tags['album']!=""&&tags['album']!=undefined){
                divArtist.appendChild(document.createTextNode(tags['album']))
            }
            else{
                divArtist.appendChild(document.createTextNode("Unknown"))
            }
            currentPlaying_.appendChild(divArtist)}
            
            

        },
        onend:() =>{
            var currentPlaying_ = document.getElementById("current-playing")
            while(currentPlaying_.hasChildNodes()){
                currentPlaying_.removeChild(currentPlaying_.lastChild)
            }
            var prog = document.getElementById("prog")
            prog.removeAttribute("class")
            var timeElement = document.getElementById("time")
            timeElement.innerHTML = ""
            var currentArt = document.getElementById("current-playing-art")
            currentArt.setAttribute("src", "images/music.png")
            console.log(this.playlist.length-1 > this.index)
            if(this.playlist.length-1 > this.index){
                console.log("here onend")
                this.index = this.index + 1
                this.howlerbank[this.index-1].stop()
                this.howlerbank[this.index].play()
                
            }
            if(this.repeat == true && this.index == this.playlist.length-1){
                this.index = 0
                this.howlerbank[this.index].play()
            }
            else{
                console.log("here onend else")
                var playbtn_ = document.getElementById("playBtn").firstChild
                playbtn_.innerHTML = "play_arrow"
                this.index = -1
                this.playing = false
            }
            
        },
        onpause: () =>{
            var playbtn_ = document.getElementById("playBtn").firstChild
            playbtn_.innerHTML = "play_arrow"
        },
        buffer: true,
        rate:1.0
    })
    howlerbank.push(ho)

    this.howlerbank = howlerbank
    // console.log(howlerbank)
     
}

var addHowler = (song) => {
    return new Howler.Howl({
        src:[song],
        onend:() =>{
            
             
            if(playList.length != 0){
                
                howlerbank[0]['player'].play()
            }
            if(playList.length == 0){
                 
                var elm = document.getElementById("playBtn").firstChild
                elm.innerHTML = "play_arrow"
                playing = false
            }
        },
        buffer: true,
        rate:1.0
    })
}

var addHowlerBank = (song) => {
    return new Howler.Howl({
        src:[song],
        onend:() =>{
            howlerbank.splice(0, 1)
            playList.splice(0, 1)
             
            if(playList.length != 0){
                
                howlerbank[0]['player'].play()
            }
            if(playList.length == 0){
                 
                var elm = document.getElementById("playBtn").firstChild
                elm.innerHTML = "play_arrow"
                playing = false
            }
        },
        buffer: true,
        rate:1.0
    })
}


module.exports = {
    'Player':Player,

}

// module.exports = {
//     playList:() =>{
//         return playList
//     },
//     addSongs:(music) =>{
//         playList.push(music)
//         //console.log(currentPlaying)
//         howlerbank.push({'player':addHowlerBank(music), 'path':music})
//     },
//     play:() => {
//         if(playList == [] && howlerbank == []){
//             console.log('Enpmty playlist')
//         }
//         if(playing == false){
//             howlerbank[0]['player'].play()
//             playing = true
//             paused = false
//         } 
        
//     },
//     resume:() => {
//         if(paused == true){
//             howlerbank[0]['player'].play()
//             paused = false
//         }
//     },
//     pause:()=>{
//         if(playing == true && paused == false){
//             howlerbank[0]['player'].pause()
//             paused = true
//         }
//     },
//     next:() => {
//         if(playList.length>1){
//             //previouslyPlaying = currentPlaying
//             howlerbank[0]['player'].stop()
            
//             howlerbank.splice(0, 1)

//             howlerbank[0]['player'].play()
//             playList.splice(0, 1)
//             //currentPlaying = currentPlaying + 1
            
//         }
//     },
//     stop:() =>{
//         if(playing == true || paused == true || paused == false){
//             if(howlerbank != [])
//             {   console.log('Inside')
//                 howlerbank[0]['player'].stop()
//                 howlerbank = []
//                 playList = []
//                 playing = false
//                 var elm = document.getElementById("playBtn")
//                 elm.innerHTML = "Play"
//             }
            
//         }
//     }

// }

// var div = document.createElement("div")
//             div.setAttribute("class", "row")
//             var colDiv = document.createElement("div")
//             colDiv.setAttribute("class", "col l3")
//             var card = document.createElement("div")
//             card.setAttribute("class", "card")
            
//             console.log(element)
//             // var listOfSongs = []
//             // for(var i=0;i<db["path"].length; i++){
//             //     if(element == db["album"][i]){
//             //         console.log(db["path"][i])
//             //         listOfSongs.push({"path":db["path"][i], "tags":db["tags"][i]})
//             //     }
//             // }
//             // var song = listOfSongs[0]
//             var cardImage = document.createElement("div")
//             cardImage.setAttribute("class", "card-image")
//             var titleSpan = document.createElement("span")
//             titleSpan.setAttribute("class", "card-title")
//             titleSpan.appendChild(document.createTextNode(element))
//             cardImage.appendChild(titleSpan)
//             card.appendChild(cardImage)
//             colDiv.appendChild(card)
//             div.appendChild(colDiv)
//             document.body.appendChild(div)
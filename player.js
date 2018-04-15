const musicEngine = require('./musicEngine').musicEngine
var Howler = require('howler')

playList = []
currentPlaying = 0
previouslyPlaying = -1
playing = false 
paused = false
vol = 0.5
songID = null
howlerbank = []


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
                 
                var elm = document.getElementById("playBtn")
                elm.innerHTML = "Play"
                playing = false
            }
        },
        buffer: true,
        rate:1.0
    })
}



module.exports = {
    playList:() =>{
        return playList
    },
    addSongs:(music) =>{
        playList.push(music)
        //console.log(currentPlaying)
        howlerbank.push({'player':addHowlerBank(music), 'path':music})
    },
    play:() => {
        if(playList == [] && howlerbank == []){
            console.log('Enpmty playlist')
        }
        if(playing == false){
            howlerbank[0]['player'].play()
            playing = true
            paused = false
        } 
        
    },
    resume:() => {
        if(paused == true){
            howlerbank[0]['player'].play()
            paused = false
        }
    },
    pause:()=>{
        if(playing == true && paused == false){
            howlerbank[0]['player'].pause()
            paused = true
        }
    },
    next:() => {
        if(playList.length>1){
            //previouslyPlaying = currentPlaying
            howlerbank[0]['player'].stop()
            
            howlerbank.splice(0, 1)

            howlerbank[0]['player'].play()
            playList.splice(0, 1)
            //currentPlaying = currentPlaying + 1
            
        }
    },
    stop:() =>{
        if(playing == true || paused == true || paused == false){
            if(howlerbank != [])
            {   console.log('Inside')
                howlerbank[0]['player'].stop()
                howlerbank = []
                playList = []
                playing = false
                var elm = document.getElementById("playBtn")
                elm.innerHTML = "Play"
            }
            
        }
    }

}
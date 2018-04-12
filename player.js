const musicEngine = require('./musicEngine').musicEngine
var Howler = require('howler')

var musicPlayer  = new Howler.Howl({
    src:[]
})

playList = []
playing = false 
paused = false
vol = 0.5
songID = null
function resume(songID){
    if(paused == true){
        console.log("called resume" +' '+ songID)
        musicPlayer.play(songID)
        paused = false
    }
}
module.exports = {
    playList: () =>{
        return playList
    },
    
    addSongs: (music) =>{
        playList.push(music)
        if(playing == true){
            musicPlayer._src = playList
            console.log(musicPlayer._src)
        }
        //console.log(playList)
    },
    play: () =>{
        
        if(paused == true){
            console.log('calling resume')
            resume(songID)
        }
        else{
            musicPlayer  = new Howler.Howl({
                src:playList,
                
            })
            songID = musicPlayer.play()
            playing = true
            console.log(playList)
            playList.splice(0, 1)
            
            //musicPlayer.changeSrc(playList)
            //songID = musicPlayer.play()
        }
        
    },
    pause:(songID) =>{
        if(playing === true){
            musicPlayer.pause(songID)
            paused = true
        }
    },
    
    state:{
        'playing':playing
    }
    
}

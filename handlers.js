const {ipcRenderer} = require('electron')
const UI = require('./ui').UI
const Core = require('./core').Core
var player = require("./player")
var fs = require("fs")
var Player_ = new player.Player()
var core = new Core()
UI.LoadControlButtons(Player_)
UI.playlistDisplay(Player_)
var songsLoaderFirstTime = true
ipcRenderer.send('check', 1)
var pathLib = ""
ipcRenderer.on('libpath', (event, arg) =>{
    if(arg == ""){

    }
    else{
        console.log(arg)
        if(window.songsLoaderFirstTime==true)
        {UI.songsLoader('create')
        
            console.log(window.songsLoaderFirstTime)}
        else{
            UI.songsLoader('show')
            console.log(window.songsLoaderFirstTime)
        }
        core.add(arg).then(
            function(SongsDB){
                var ele = document.getElementById("drag-file")
                
                var so = document.getElementById("songs")
                so.style.display = 'block'
                so.style.backgroundImage = 'linear-gradient(to top, #86377b 20%, #27273c 80%);'
                UI.songsLoader('hide')
                if(window.songsLoaderFirstTime==true){
                Player_.Init(SongsDB)
                window.songsLoaderFirstTime = false
                console.log("here")
                }
                else{
                    console.log("here")
                    Player_.AddSongsDataBase(SongsDB)
                }
                UI.ListDisplaySongs(SongsDB, Player_)
                UI.hideDragAndDrop()
                M.toast({html: 'Songs Added', classes: 'rounded'})
            }
        )
    }
})

    
        // var lib = core.Init(libPath)
        // drop.style.display = 'none'
UI.showDragAndDrop('create')
document.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var pathLib = ""
    for (let f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path)
        pathLib = f.path
    }
    
    if(window.songsLoaderFirstTime==true)
    {UI.songsLoader('create')
    
        console.log(window.songsLoaderFirstTime)}
    else{
        UI.songsLoader('show')
        console.log(window.songsLoaderFirstTime)
    }
    console.log(pathLib)
    core.add(pathLib).then(
        function(SongsDB){
            // setTimeout(()=>{
            
                var ele = document.getElementById("drag-file")
                
                var so = document.getElementById("songs")
                so.style.display = 'block'
                so.style.backgroundImage = 'linear-gradient(to top, #86377b 20%, #27273c 80%);'
                UI.songsLoader('hide')
                if(window.songsLoaderFirstTime==true){
                Player_.Init(SongsDB)
                window.songsLoaderFirstTime = false
                console.log("here")
                }
                else{
                    console.log("here")
                    Player_.AddSongsDataBase(SongsDB)
                }
                UI.ListDisplaySongs(SongsDB, Player_)
                UI.hideDragAndDrop()
                M.toast({html: 'Songs Added', classes: 'rounded'})
                ipcRenderer.send('lib', pathLib)
                // setPath(path)
        }
    )
    
    
    });
    document.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
    });



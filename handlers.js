const UI = require('./ui').UI
const Core = require('./core').Core
var player = require("./player")
var fs = require("fs")
var Player_ = new player.Player()
var core = new Core()
console.log(Player_)
UI.LoadControlButtons(Player_)
UI.playlistDisplay(Player_)
var songsLoaderFirstTime = true
if(fs.existsSync(__dirname + '/config.json')){
    UI.songsLoader()
    var jobj = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf-8'))
    var pathLib = jobj["libPath"]
    core.add(pathLib).then(
        function(SongsDB){
            // setTimeout(()=>{
            var l = document.getElementById("songs-loader")
            l.style.display = 'none'
            var so = document.getElementById("songs")
            so.style.display = 'block'
            so.style.backgroundImage = 'linear-gradient(to top, #86377b 20%, #27273c 80%);'
            Player_.Init(SongsDB)
            UI.ListDisplaySongs(SongsDB, Player_)
            M.toast({html: 'Songs Added', classes: 'rounded'});
            // }, 1)
        }
    )
}
else{
    
        // var lib = core.Init(libPath)
        // var drop = document.getElementById("drag")
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
                        M.toast({html: 'Songs Added', classes: 'rounded'})
                        var config = {
                            "libPath":pathLib
                        }
                        // var  jsCONTENT = JSON.stringify(config)
                        // fs.writeFile("config.json", jsCONTENT, "utf-8", function(err){
                        //     if(err){
                        //         console.log(err)
                        //     }
                        //     else{
                        //         console.log("saved")
                        //     }
                        // })
                    
                    // }, 1)
                }
            )
            
            // setTimeout(() => {
    
            //     if(lib == 0){
            
            //     }
            //     else{
            //         console.log("loading songs")
            //         Player_.Init(lib.GetSongsDB())
            //         UI.ListDisplaySongs(lib.GetSongsDB(), Player_)
            //         // UI.ListDisplayAlbum(lib.GetSongsDB(), Player_)
                    
            //     }
            
            // }, 3200);
          });
          document.addEventListener('dragover', function (e) {
            e.preventDefault();
            e.stopPropagation();
          });



}
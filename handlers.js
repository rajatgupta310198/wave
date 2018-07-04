const UI = require('./ui').UI
const core = require('./core').core
var player = require("./player")
var fs = require("fs")
var Player_ = new player.Player()

console.log(Player_)
UI.LoadControlButtons(Player_)

if(fs.existsSync(__dirname + '/config.json')){
    UI.songsLoader()
    var jobj = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf-8'))
    var pathLib = jobj["libPath"]
    core.Init(pathLib).then(
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
        UI.showDragAndDrop()
        document.addEventListener('drop', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var pathLib = ""
            for (let f of e.dataTransfer.files) {
              console.log('File(s) you dragged here: ', f.path)
              pathLib = f.path
            }
            UI.songsLoader()
            console.log(pathLib)
            core.Init(pathLib).then(
                function(SongsDB){
                    // setTimeout(()=>{
                    var ele = document.getElementById("drag-file")
                    var l = document.getElementById("songs-loader")
                    var so = document.getElementById("songs")
                    so.style.display = 'block'
                    so.style.backgroundImage = 'linear-gradient(to top, #86377b 20%, #27273c 80%);'
                    l.style.display = 'none'
                    document.body.removeChild(ele)
                    Player_.Init(SongsDB)
                    UI.ListDisplaySongs(SongsDB, Player_)
                    M.toast({html: 'Songs Added', classes: 'rounded'})
                    // }, 1)
                }
            )
            var config = {
                "libPath":pathLib
            }
            var  jsCONTENT = JSON.stringify(config)
            fs.writeFile("config.json", jsCONTENT, "utf-8", function(err){
                if(err){
                    console.log(err)
                }
                else{
                    console.log("saved")
                }
            })
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
// window.addEventListener("keydown", function(e){
//     e.preventDefault()
//     console.log(e.keyCode)
//     var plst = Player_.GetPlayList()
//     if(e.keyCode==32){
//         console.log(plst.length)
//         if(plst.length>0){
//             if(Player_.IsPaused() == true){
//                 Player_.Resume()
//                 console.log(e.keyCode, "resuming")
//             }
//             else if(Player_.IsPlaying() == false){
//                 Player_.Play()
//                 console.log(e.keyCode, "playing")
//             }
//             else if(Player_.IsPlaying() == true && Player_.IsPaused() == false){
//                 Player_.Pause()
//                 this.console.log(e.keyCode, "pausing")
//             }
//         }
//     }
// })
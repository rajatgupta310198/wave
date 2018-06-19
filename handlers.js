const UI = require('./ui').UI
const core = require('./core').core


var lib = core.Init()

if(lib == 0){

}
else{
    console.log(lib.GetSongsDB())
    UI.ListDisplayAlbum(lib.GetSongsDB())
    UI.ListDisplaySongs(lib.GetSongsDB())
}


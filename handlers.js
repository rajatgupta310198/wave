const UI = require('./ui').UI
const core = require('./core').core
var player = require("./player")
var Player_ = new player.Player()
Player_.Init()
console.log(Player_)
UI.LoadControlButtons(Player_)
var lib = core.Init()


if(lib == 0){

}
else{
    // console.log(lib.GetSongsDB())
    UI.ListDisplayAlbum(lib.GetSongsDB(), Player_)
    UI.ListDisplaySongs(lib.GetSongsDB(), Player_)
}


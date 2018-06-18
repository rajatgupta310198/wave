const UI = require('./ui').UI
const core = require('./core').core


UI.LoadControlButtons()
var lib = core.Init()
UI.ListDisplaySongs(lib.GetListOfMp3())

const musicEngine = require('./musicEngine').musicEngine
const fs = require("fs")

var Core = function(){
    this.lib = new musicEngine.MusicData()
    this.firstTime = false
}
Core.prototype.add = function(libPath){

       return new Promise((res, rej) =>{
            res(this.lib.AddLibrary(libPath).then(
                function(SongsDB){
                    return SongsDB
                }
            ))
        })

}

module.exports = {
    'Core':Core,
}
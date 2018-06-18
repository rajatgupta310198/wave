const musicEngine = require('./musicEngine').musicEngine
const fs = require("fs")

function Init(){
    if(fs.existsSync(__dirname + 'db.json')){
       // read from file
       console.log("DB Exist")
       
    }
    else{
       var lib = new musicEngine.MusicData()
       lib.AddLibrary()
       return lib
    }
}

module.exports.core = {
    'Init':Init
}
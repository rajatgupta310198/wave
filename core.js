const musicEngine = require('./musicEngine').musicEngine
const fs = require("fs")

function Init(){
    // console.log(__dirname)
    if(fs.existsSync(__dirname + '/jso.json')){
       // read from file
       console.log("DB Exist")
       var stream = fs.readFileSync(__dirname + '/jso.json', "utf-8")
       var songsDB = JSON.parse(stream)
    //    console.log(songsDB)
       var lib = new musicEngine.MusicData()
       lib.SetDB(songsDB)
       return lib
    }
    else{

       var lib = new musicEngine.MusicData()
       lib.AddLibrary()
        
       var  jsCONTENT = JSON.stringify(lib.SongsDB)
       fs.writeFile("jso.json", jsCONTENT, 'utf-8', function(err){
           if(err){
               console.log(err)
           }
           else{
               console.log('Saved')
           }
       })
       lib.SetDB(lib.SongsDB)
       return lib
    }
}

module.exports.core = {
    'Init':Init
}
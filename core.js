const musicEngine = require('./musicEngine').musicEngine
const fs = require("fs")

function Init(libPath){
    // console.log(__dirname)
       var lib = new musicEngine.MusicData()
       
        
    //    var  jsCONTENT = JSON.stringify(lib.SongsDB)
    //    fs.writeFile("jso.json", jsCONTENT, 'utf-8', function(err){
    //        if(err){
    //            console.log(err)
    //        }
    //        else{
    //            console.log('Saved')
    //        }
    //    })
    //    lib.SetDB(lib.SongsDB)
       return new Promise((res, rej) =>{
           res(lib.AddLibrary(libPath).then(
               function(SongsDB){
                    return SongsDB
               }
           ))
        })

}

module.exports.core = {
    'Init':Init
}
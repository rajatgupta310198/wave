const id3 = require('node-id3')
const fs = require("fs")
const mm = require("musicmetadata")

function MusicData (){
	this.listOfMp3s = [],
	this.SongsDB = {
		"file":[],
		"tags":[],
		"path":[],
		"album":[],
		"artist":[]
	}
	
}
MusicData.prototype.AddLibrary = function(){
	console.log("loading....")
	var listOfMp3s = []
	
	listOfMp3s = walkSync('/Users/bapigupta/Music/iTunes', listOfMp3s)
	// console.log(listOfMp3s)
	this.listOfMp3s = listOfMp3s
	// var buffer = fs.readFileSync(this.listOfMp3s[0]['path'])
	// var tags = id3.read(buffer)
	// console.log(tags)
	SongsDB = {
		"file":[],
		"tags":[],
		"path":[],
		"album":[],
		"artist":[]
	}
	// for(var i = 0; i<this.listOfMp3s.length ; i++){
	// 	// console.log(this.listOfMp3s[i]['path'])
	// 	// var buffer = fs.readFileSync(this.listOfMp3s[i]['path'])
	// 	// var tags = id3.read(buffer)
	// 	SongsDB["file"].push(this.listOfMp3s[i]["file"])
	// 	 mm(fs.createReadStream(this.listOfMp3s[i]['path']), function(err, metadata){
			
	// 		if(err){
	// 			this.SongsDB["tags"].push(undefined)
	// 		}
	// 		else{
	// 			// console.log(metadata)
	// 			this.SongsDB["tags"].push(metadata)
				
	// 		}
	// 	})
		
	// 	// SongsDB["tags"].push(tags)
	// 	SongsDB["path"].push(this.listOfMp3s[i]['path'])
		
	// }
	var tags_ = []
	listOfMp3s.forEach(item =>{
		
		mm(fs.createReadStream(item["path"]), (err, metadata) =>{
			tags_.push(metadata)
			SongsDB["file"].push(item['file'])
			SongsDB["path"].push(item["path"])
			// console.log(metadata)
		})
	})
	// console.log(this.SongsDB)
	setTimeout(()=>{
		SongsDB['tags'] = tags_
		
		
		for(var i=0;i<SongsDB['file'].length; i++){
			if (SongsDB['tags'][i]['album']!=""){
				SongsDB['album'].push(SongsDB['tags'][i]['album'])
				
			}
			else{
				SongsDB['album'].push("Unknown")
			}
		}
		this.SongsDB = SongsDB	
		console.log(this.SongsDB)
	}, 3200);
	
}


MusicData.prototype.GetSongsDB = function(){
	return this.SongsDB
}
MusicData.prototype.GetListOfMp3 = function(){
	return this.listOfMp3s
}
MusicData.prototype.GetTags = function(){
	// console.log(JSON.stringify(this.SongsDB['tags'], null, 2))
	return  JSON.stringify(this.SongsDB['tags'], null, 2)
}

function audioFile(file){

    return file.split('.').pop() == 'mp3' || file.split('.').pop() == 'wav' || file.split('.').pop() == 'm4a';

}
var walkSync = function(dir, filelist) {
	var fs = fs || require('fs'),
	files = fs.readdirSync(dir);
	filelist = filelist || [];
	// db = db || {}
	files.forEach(function(file) {
	  if (fs.statSync(dir + '/' + file).isDirectory() && file !='iTunes') {
			filelist = walkSync(dir + '/' + file, filelist);
	  }
	  else {
		  if(audioFile(file)){
				filelist.push({'path':dir + '/' + file, 'file':file})
		  }
	  }
	});
	return filelist;
  };



module.exports.musicEngine = {

		'MusicData':MusicData
		//'albums':dbAlbums
  }

const id3 = require('node-id3')
const fs = require("fs")


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
	
	listOfMp3s = walkSync('/Users/bapigupta/Music', listOfMp3s)
	// console.log(listOfMp3s)
	this.listOfMp3s = listOfMp3s
	// var buffer = fs.readFileSync(this.listOfMp3s[0]['path'])
	// var tags = id3.read(buffer)
	// console.log(tags)
	for(var i = 0; i<this.listOfMp3s.length ; i++){
		// console.log(this.listOfMp3s[i]['path'])
		var buffer = fs.readFileSync(this.listOfMp3s[0]['path'])
		var tags = id3.read(buffer)
		this.SongsDB["file"].append(this.listOfMp3s[i]["file"])
		this.SongsDB["tags"].append(tags)
		this.SongsDB["path"].append(this.listOfMp3s[0]['path'])
		if(tags["album"] != undefined){
			this.SongsDB["album"].append(tags["album"])
		}
		else{
			this.SongsDB["album"].append("Unknown")
		}
		if(tags["artist"] != undefined){
			this.SongsDB["artis"].append(tags["artist"])
		}
		else{
			this.SongsDB["artist"].append("Unknown")
		}
		// console.log(tags)
	}
}
MusicData.prototype.SongsDB = function(){
	return this.SongsDB
}
MusicData.prototype.GetListOfMp3 = function(){
	return this.listOfMp3s
}

function audioFile(file){

    return file.split('.').pop() == 'mp3' || file.split('.').pop() == 'wav';

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

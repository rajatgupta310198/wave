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

function m(item){
	return new Promise((res, rej) =>{
		mm(fs.createReadStream(item['path']), (err, metadata) =>{
			// console.log(item, metadata)
			if(err){
				rej(metadata)
			}
			else{
				res(metadata)
			}
			
		})
	})
}

MusicData.prototype.AddLibrary = function(libPath){
	
	return new Promise((resolve, reject) =>{
		console.log("loading....")
		var listOfMp3s = []
		
		listOfMp3s = walkSync(libPath, listOfMp3s)
		// console.log(listOfMp3s)
		if(this.listOfMp3s == 0){
			this.listOfMp3s = listOfMp3s
			
			SongsDB = {
				"file":[],
				"tags":[],
				"path":[],
				"album":[],
				"artist":[]
			}
			
			var tags_ = []
			
			listOfMp3s.forEach(item =>{
				
				m(item).then(function(tags){
					tags_.push(tags)
					SongsDB["file"].push(item['file'])
					SongsDB["path"].push(item["path"])
				}, function(tags){
					tags_.push(tags)
					SongsDB["file"].push(item['file'])
					SongsDB["path"].push(item["path"])
				})
				
				
			})
			SongsDB['tags'] = tags_
				
			console.log(SongsDB['tags'])
			for(var i=0;i<SongsDB['file'].length; i++){
				if (SongsDB['tags'][i]['album']!=""){
					SongsDB['album'].push(SongsDB['tags'][i]['album'])
					
				}
				else{
					SongsDB['album'].push("Unknown")
				}
			}
			this.SongsDB = SongsDB
			setTimeout(()=>{
				resolve(this.SongsDB)
			}, 3200)

		}
		else{
			var new_index = this.listOfMp3s.length
			this.listOfMp3s += listOfMp3s
			var tags_ = []
			listOfMp3s.forEach(item =>{
				m(item).then(function(tags){

					tags_.push(tags)
					this.SongsDB["file"].push(item['file'])
					this.SongsDB["path"].push(item["path"])

				}, function(){

					tags_.push(tags_)
					this.SongsDB["file"].push(item['file'])
					this.SongsDB["path"].push(item["path"])

				})
			})

			this.SongsDB["tags"] += tags_
			for(var i=new_index;i<this.SongsDB['file'].length; i++){
				if (this.SongsDB['tags'][i]['album']!=""){
					this.SongsDB['album'].push(this.SongsDB['tags'][i]['album'])
				}
				else{
					SongsDB['album'].push("Unknown")
				}
			}
			setTimeout(()=>{
				resolve(this.SongsDB)
			}, 3200)

		}

		// promise end
	})
	
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

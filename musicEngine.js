const id3 = require('node-id3')
const fs = require("fs")


let listOfMp3s = [];
let dbAlbums = []

function audioFile(file){

    return file.split('.').pop() == 'mp3' || file.split('.').pop() == 'wav';

}
var walkSync = function(dir, filelist) {
	var fs = fs || require('fs'),
	files = fs.readdirSync(dir);
	filelist = filelist || [];
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


function addAlbumFromBuffer(buffer){
	console.log(buffer)
	let tags = id3.read(buffer)
	dbAlbums.push(tags['album'])
}

function readMp3ToBuffer (songs){
	for(i = 0; i< songs.length; i++){
		console.log('inside loop\n')
		let buffer = fs.readFileSync(songs[i]['path'])
		console.log(buffer)
		let tags = id3.read(buffer)
		console.log(tags)
		//addAlbumFromBuffer(buffer)
	}
}

listOfMp3s = walkSync('/Users/bapigupta/Music', listOfMp3s);

//readMp3ToBuffer(listOfMp3s)
console.log(listOfMp3s.length, dbAlbums.length)

module.exports.musicEngine = {
		'listOfMp3s':listOfMp3s,
		//'albums':dbAlbums
  }

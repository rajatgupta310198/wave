let listOfMp3s = [];


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
            filelist.push({'path':dir + '/' + file, 'file':file});
		  }
	  }
	});
	return filelist;
  };

listOfMp3s = walkSync('/Users/bapigupta/Music', listOfMp3s);



module.exports.musicEngine = {
    'listOfMp3s':listOfMp3s
  }

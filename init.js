var chokidar = require('chokidar');
var fs = require('fs');	
var SerialPort = require("serialport").SerialPort;
var monitDir = "c:\\nfce\\new";
var watcher = chokidar.watch(monitDir, {ignored: /[\/\\]\./, persistent: true});

console.log("Monitorando o diretorio ["+monitDir+"]");

watcher
.on('add', function(path) {processAdd(path);})
.on('error', function(error) {console.error('Error happened', error);});

var processAdd = function(path){

	if(path.indexOf('.bin')>-1){	
		
		var file = fs.readFileSync(path);		
		fs.unlinkSync(path);
		
		var port = new SerialPort("COM4",{});
		port.on('open', function(err) {
			if(err) console.log(err);			
			port.write(file, function(err, results) {
				if(err)  console.log('err ' + err);
				console.log('Done..');
				port.close();
				
			});
		});		
	
	}
}
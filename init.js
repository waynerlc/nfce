var chokidar = require('chokidar');
var monitDir = "c:\\nfce\\new";
var watcher = chokidar.watch(monitDir, {ignored: /[\/\\]\./, persistent: true});

console.log("Monitorando o diretorio ["+monitDir+"]");

watcher
.on('add', function(path) {processAdd(path);})
.on('error', function(error) {console.error('Error happened', error);});

var processAdd = function(path){

	if(path.indexOf('.bin')>-1){
		// Read the file and print its contents.
		var fs = require('fs');	
		var file = fs.readFileSync(path);		

		var SerialPort = require("serialport").SerialPort;
		var port = new SerialPort("COM4",{});
		port.on('open', function(err) {
			if(err) console.log(err);
			//if(conteudo) console.log("conteudo = "+conteudo);
			port.write(file, function(err, results) {
				if(err)  console.log('err ' + err);
				console.log('Done..');
				port.close();
				fs.unlinkSync(path);
			});
		});
		

		/*
		fs.open(path, 'r', function(status, fd) {
		    if (status) {
		        console.log(status.message);
		        return;
		    }

		    console.log(fd.size);

		    var buffer = new Buffer(fd.length);
		    fs.read(fd, buffer, 0, buffer.length, null, function(err, num) {
		        
		        var SerialPort = require("serialport").SerialPort;
				var port = new SerialPort("COM4",{});
				port.on('open', function(err) {
					if(err) console.log(err);
					//if(conteudo) console.log("conteudo = "+conteudo);
					port.write(buffer, function(err, results) {
						if(err)  console.log('err ' + err);
						console.log('Done..');
						port.close();
						fs.unlinkSync(path);
					});
				});
		        //console.log(buffer.toString('utf-8', 0, num));
		    });
		});
		*/		
		
		/*
		fs.readFile(path, function(err, conteudo) {
			if (err) throw err;
			
			//console.log('Novo arquivo: ' + path +"\n");			

			console.log("Imprimindo..."+conteudo.toString());
			var SerialPort = require("serialport").SerialPort;
			var port = new SerialPort("COM4",{});

			port.on('open', function(err) {
				if(err) console.log(err);
				//if(conteudo) console.log("conteudo = "+conteudo);
				port.write(conteudo.toString()+"\r\n", function(err, results) {
					if(err)  console.log('err ' + err);
					console.log('Done..');
					port.close();
					fs.unlinkSync(path);
				});
			});

		});
		*/

	}
}
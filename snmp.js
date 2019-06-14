let util = require('util');
let snmp = require ("snmp-native");
let colors = require ("colors");
let hexToMac = require('./hexToMac');


/*************************
 *** INFORMACION SWITC ***
 *************************/
var host = '10.111.1.11';
var community = 'public';
var oids = [1, 3, 6, 1, 2, 1, 1, 1, 0];
//var oids = ["1.3.6.1.2.1.1.4.0","1.3.6.1.2.1.1.5.0","1.3.6.1.2.1.2.2.1.6"];//, "1.3.6.1.2.1.1.6.0"];
//var oids = ["1.3.6.1.2.1.17.4.3.1.2", "1.3.6.1.2.1.17.4.3.1.1"];
//var oids = ["1.3.6.1.2.1.17.4.3.1.2"];//, "1.3.6.1.2.1.17.4.3.1.1"];

//var oidStr = '.1.3.6.1.2.1.31.1.1.1.1';
//var oidStr = '.1.3.6.1.2.1.1.5.0';
//var oidStr'.1.3.6.1.2.1.17.4.3.1.2';


// Sesion con el switch para la conexion
let sesionSNMP = new snmp.Session({ host: host, community: community });
console.log(colors.yellow(sesionSNMP));



var oidStrPuertos = '.1.3.6.1.2.1.17.4.3.1.2';	// OID para obtener los Puertos 
oidPuertos = oidStrPuertos.split('.').filter(function (s) {return s.length > 0; }).map(function (s) {return parseInt(s, 10); });
///////
sesionSNMP.getSubtree({ oid: oidPuertos }, function (err, varbinds) {
	if (err) {
		console.log(colors.red(err));
	} else {
	console.log(colors.grey(varbinds));
	// This is the list of varbinds.
	varbinds.forEach(function (vb) {
			//console.log(colors.grey(vb.valueRaw));
			//let buffer = vb.valueRaw;
			//let mac = hexToMac.hexToMac(buffer.toString('hex'));
			//let puerto = "¿?";
			console.log(colors.green("Boca Switch " + vb.oid[vb.oid.length - 1]  + " puerto " + vb.value));
		});
	}

	//sesionSNMP.close();
});


var oidStrMac = '.1.3.6.1.2.1.17.4.3.1.1';	// OID para obtener las MAC 
oidMac = oidStrMac.split('.').filter(function (s) {return s.length > 0; }).map(function (s) {return parseInt(s, 10); });
///////
sesionSNMP.getSubtree({ oid: oidMac }, function (err, varbinds) {
	if (err) {
		console.log(colors.red(err));
	} else {
	//console.log(colors.grey(varbinds));
	// This is the list of varbinds.
	varbinds.forEach(function (vb) {
			//console.log(colors.grey(vb.valueRaw));
			let buffer = vb.valueRaw;
			let mac = hexToMac.hexToMac(buffer.toString('hex'));
			console.log(colors.blue("Boca Switch " + vb.oid[vb.oid.length - 1]  + " es " + mac));
		});
	}

	sesionSNMP.close();
});


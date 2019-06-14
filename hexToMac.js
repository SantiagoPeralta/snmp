
exports.hexToMac =  function(hex) {
	let cont = 0;
	let mac = "";
	
	for(let i = 0; i < hex.length; i++) {
		cont++		
		mac += hex[i]
		if (cont == 2 && (i < hex.length - 1) ){
			mac += ":";
			cont = 0;
		}
			
	}
	
	return mac;
}



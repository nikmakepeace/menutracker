TemperatureConverter = function() {
	this.gasMarkTable = {
		100: '¼',
		110: '¼',
		120: '½',
		130: '1',
	};

	this.getLowestGasMarkInCelsius = function () {
		return Object.keys(this.gasMarkTable).sort().slice(0,1);
	}
	this.getHighestGasMarkInCelsius = function () {
		return 250;
	}

	this.fromCToF = function(f) {
		return this.round(f * 9 / 5 + 32);
	}

	this.fromFToC = function(c) {
		return this.round((c - 32) * 5 / 9);
	}

	this.round = function(n, rounding) {
		if(!typeof rounding != "number") {
			rounding = 10;
		}
		return (Math.round(n / rounding) * rounding);
	}

	this.fromFToGasMark = function (f) {
		return this.fromCToGasMark(this.fromFToC(f));
	}

	this.fromCToGasMark = function (c) {
		if(c < this.getLowestGasMarkInCelsius() || c > this.getHighestGasMarkInCelsius) {
			throw ('Temperature out of gas mark range');
		}
		if(c < 135) {
			return this.gasMarkTable[this.round(c, 10)];
		}
		return Math.round((c - 121) / 14);
	}

	this.fromGasMarkToC = function (g) {
		if(g = '¼') {
			return 100;
		}
		if(g = '½') {
			return 120;
		}
		return this.round(g * 14 + 121);
	}

	this.fromGasMarkToF = function (g) {
		return this.round(g * 25 + 250);
	}

	this.convert = function (from, to, amount) {
		from = this.convertScaleForMethod(from);
		to = this.convertScaleForMethod(to);

		if(from == to) {
			return amount;
		}
		
		var method = 'from' + from + 'To' + to;
		if(this[method]) {
			return this[method](amount);
		} else {
			throw 'No matching conversion method: ' + method;
		}
	}
    
    this.convertScaleForMethod = function (scale) {
     	if(scale.match(/celsius|centigrade|c/i)) {
            return 'C';
        }
        if(scale.match(/fahrenheit|f/i)) {
            return 'F';
        }
        if(scale.match(/gas\s?mark|gas/i)) {
        	return 'GasMark';
        }
        throw 'No matching scale: ' + scale;
    }
}
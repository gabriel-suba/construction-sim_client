const generate = {
	randomNumber: (min = 0, max = 100) => {
		let difference = max - min;
		let rand = Math.random();
		rand = Math.floor(rand * difference);
		rand = rand + min;
	
		return rand;
	},
	rawData: (multiplier) => {
		var input = [];
		var output = [];

		for (let i = 0; i <= 20; i++) {
			let x = i * 100;
			let y = x * multiplier;
			
			input.push(x);
			output.push(y)
		}
	
		return { x: input, y: output };
	},
	quantity: (multiplier) => {
		var input = [];
		var output = [];

		for (let i = 1; i <= 20; i++) {
			var x = generate.randomNumber(200, 2000);
			var y = x * multiplier;
			
			input.push(x);
			output.push(parseFloat(y.toFixed(2)));
		}
	
		return { x: input, y: output };
	},
	cost: (rate) => {
		var input = [];
		var output = [];

		for (let i = 1; i <= 20; i++) {
			var area = generate.randomNumber(200, 2000);
			var cost = (area / 10.764) * rate;

			input.push(area);
			output.push(parseFloat(cost.toFixed(2)));
		}

		return { x: input, y: output };
	}
}

export default generate;
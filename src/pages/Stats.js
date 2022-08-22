import Plot from 'react-plotly.js';
import Chart from '../components/Chart';
import generate from '../generate';
import net from '../net';

const Stats = () => {
	// TEST ACCURACY
	// 3 memory -> raw data, test data, output data

	const scaleUp = (input, min, max) => parseFloat(input) * (max - min) + min;
  
	const scaleDown = (input, min, max) => (parseFloat(input) - min) / (max - min);

	const testAccuracy = (data, net, min = 200, max = 2000) => {
		const output = [];
		console.log(`min: ${min}, max: ${max}`);
		for (let i = 0; i < data.length; i++)  {
			const input = scaleDown(data[i], 200, 2000);
			const prediction = scaleUp(net.run([input]), min, max);
			output.push(prediction);
		}

		return output;
	}

	// below are the test data
	const cement = generate.quantity(0.4);
	const sand = generate.quantity(0.816);
	const gravel = generate.quantity(0.608);
	const steel = generate.quantity(4);
	const bricks = generate.quantity(8);
	const paint = generate.quantity(0.18);
	const flooring = generate.quantity(1.3);

	const roughFinish = generate.cost(23000);
	const standardFinish = generate.cost(30000);
	const highendFinish = generate.cost(40000);

	const cementPrediction = testAccuracy(cement.x, net.cement);
	const sandPrediction = testAccuracy(sand.x, net.sand);
	const gravelPrediction = testAccuracy(gravel.x, net.gravel);
	const steelPrediction = testAccuracy(steel.x, net.steel);
	const bricksPrediction = testAccuracy(bricks.x, net.bricks);
	const paintPrediction = testAccuracy(paint.x, net.paint);
	const flooringPrediction = testAccuracy(flooring.x, net.flooring);

	const roughFinishPrediction = testAccuracy(roughFinish.x, net.roughFinish, 427350.42, 4273504.27);
	const standardFinishPrediction = testAccuracy(standardFinish.x, net.standardFinish, 557413.60, 5574136.00);
	const highendFinishPrediction = testAccuracy(highendFinish.x, net.highendFinish, 743218.13, 7432181.34);

	return (
		<>
			<Chart plotTitle='Cement Quantity' testData={cement} output={cementPrediction} type={'quantity'} />
			<Chart plotTitle='Sand Quantity' testData={sand} output={sandPrediction} type={'quantity'} />
			<Chart plotTitle='Gravel Quantity' testData={gravel} output={gravelPrediction} type={'quantity'} />
			<Chart plotTitle='Steel Quantity' testData={steel} output={steelPrediction} type={'quantity'} />
			<Chart plotTitle='Bricks Quantity' testData={bricks} output={bricksPrediction} type={'quantity'} />
			<Chart plotTitle='Paint Quantity' testData={paint} output={paintPrediction} type={'quantity'} />
			<Chart plotTitle='Flooring Quantity' testData={flooring} output={flooringPrediction} type={'quantity'} />

			<Chart plotTitle='Rough Finish' testData={roughFinish} output={roughFinishPrediction} type={'cost'} />
			<Chart plotTitle='Standard Finish' testData={standardFinish} output={standardFinishPrediction} type={'cost'} />
			<Chart plotTitle='Highend Finish' testData={highendFinish} output={highendFinishPrediction} type={'cost'} />
		</>
	);
}

export default Stats;
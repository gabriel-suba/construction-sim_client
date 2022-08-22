import { useState } from 'react';
import net from '../net';

const Home = () => {
	const [input, setInput] = useState({ area: 1000, type: 1 }); // type = type of finish
	const [outputs, setOutputs] = useState({
	  cement: 0,
	  sand: 0,
	  gravel: 0,
	  steel: 0,
	  paint: 0,
	  bricks: 0,
	  flooring: 0,
	  totalCost: 0,
	});
  
	const scaleUp = (input, min, max) => parseFloat(input) * (max - min) + min;
  
	const scaleDown = (input, min, max) => (parseFloat(input) - min) / (max - min);
  
	const handleChange = (e) => {
	  const { target: { name, value } } = e;
	  
	  if (name === 'area') setInput(prev => ({ ...prev, [name]: parseFloat(value) }));
	  if (name === 'cost') setInput(prev => ({ ...prev, [name]: parseFloat(value) }));
	  if (name === 'type') setInput(prev => ({ ...prev, [name]: parseInt(value) }));
	}
  
	const handleSubmit = (e) => {
	  e.preventDefault();
  
	  const minArea = 200;
	  const maxArea = 2000;
	  const minRough = 427350.42;
	  const maxRough = 4273504.27;
	  const minStandard = 557413.60;
	  const maxStandard = 5574136.00;
	  const minHighend = 743218.13;
	  const maxHighend = 7432181.34;
	  let totalCost = 0;
  
	  const scaledDownArea = scaleDown(input.area, minArea, maxArea);
  
	  switch(input.type) {
		case 1: 
		  totalCost = scaleUp(net.roughFinish.run([scaledDownArea]), minRough, maxRough);
		  break;
		case 2:
		  totalCost = scaleUp(net.standardFinish.run([scaledDownArea]), minStandard, maxStandard);
		  break;
		case 3:
		  totalCost = scaleUp(net.highendFinish.run([scaledDownArea]), minHighend, maxHighend);
		  break;
		default:
		  totalCost = scaleUp(net.roughFinish.run([scaledDownArea]), minRough, maxRough);
		  break;
	  }
  
	  setOutputs({
		cement:         scaleUp(net.cement.run([scaledDownArea]), minArea, maxArea).toFixed(2),
		sand:           scaleUp(net.sand.run([scaledDownArea]), minArea, maxArea).toFixed(2),
		gravel:         scaleUp(net.gravel.run([scaledDownArea]), minArea, maxArea).toFixed(2),
		steel:          scaleUp(net.steel.run([scaledDownArea]), minArea, maxArea).toFixed(2),
		paint:          scaleUp(net.paint.run([scaledDownArea]), minArea, maxArea).toFixed(2),
		bricks:         scaleUp(net.bricks.run([scaledDownArea]), minArea, maxArea).toFixed(2),
		flooring:       scaleUp(net.flooring.run([scaledDownArea]), minArea, maxArea).toFixed(2),
		totalCost:      totalCost,
	  });
	}

  const handleReset = (e) => {
    setInput({ area: 0, type: 1 });
    setOutputs({
      cement: 0,
      sand: 0,
      gravel: 0,
      steel: 0,
      paint: 0,
      bricks: 0,
      flooring: 0,
      totalCost: 0,
    });
  }

	return (
		<>
		<section className="container">
          <div className="form-content">
            <h2 className="section-heading">Construction Cost</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-grp">
                <div className="input-item">
                  <label htmlFor="builtup-area">Builtup Area</label>
                  <div>
                    <input name="area" id="builtup-area" type="text" onChange={handleChange} value={input.area || ''} />
                    <span>ft&#178;</span>
                  </div>
                </div>
                <div className="input-item">
                  <label htmlFor="cost">Type of Finish</label>
                  <select name="type" id="type" onChange={handleChange} value={input.type}>
                    <option value="1">Rough Finish (&#8369;23, 000/sqm)</option>
                    <option value="2">Standard Finish (&#8369;30, 000/sqm)</option>
                    <option value="3">High-end Finish (&#8369;40, 000/sqm)</option>
                  </select>
                </div>
              </div>
              <div className="btn-grp">
                <button onClick={handleReset} className="reset-btn" type="button">Reset</button>
                <button className="submit-btn" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </section>
        <section className="container">
          <div className="quantity-content">
            <h2>Quantity of Materials needed for a project</h2>
            <table className="horizontal-line">
              <tbody>
                <tr>
                  <th>Material</th>
                  <th style={{ 'width': '50%', }}>Quantity</th>
                </tr>
                <tr>
                  <td>Cement</td>
                  <td>{ parseFloat(outputs.cement).toLocaleString('us-en') } bags</td>
                </tr>
                <tr>
                  <td>Sand</td>
                  <td>{ parseFloat(outputs.sand).toLocaleString('us-en') } ton</td>
                </tr>
                <tr>
                  <td>Gravel</td>
                  <td>{ parseFloat(outputs.gravel).toLocaleString('us-en') } ton</td>
                </tr>
                <tr>
                  <td>Steel</td>
                  <td>{ parseFloat(outputs.steel / 1000).toLocaleString('us-en') } ton</td>
                </tr>
                <tr>
                  <td>Paint</td>
                  <td>{ parseFloat(outputs.paint).toLocaleString('us-en') } lt</td>
                </tr>
                <tr>
                  <td>Bricks</td>
                  <td>{ parseFloat(outputs.bricks).toLocaleString('us-en') } pcs</td>
                </tr>
                <tr>
                  <td>Flooring</td>
                  <td>{ parseFloat(outputs.flooring).toLocaleString('us-en') } ft&#178;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="container">
          <div className="cost-content">
            <h2>Estimated Cost for a Project</h2>
            <table>
              <tbody>
                <tr>
                  <th>Material</th>
                  <th style={{ 'width': '50%' }}>Cost</th>
                </tr>
                <tr>
                  <td>Cement (16.4%)</td>
                  <td>&#8369;{ parseFloat((outputs.totalCost * (16.4 / 100)).toFixed(3)).toLocaleString('en-us') }</td>
                </tr>
                <tr>
                  <td>Sand (12.3%)</td>
                  <td>&#8369;{ parseFloat((outputs.totalCost * (12.3 / 100)).toFixed(3)).toLocaleString('en-us') }</td>
                </tr>
                <tr>
                  <td>Gravel (7.4%)</td>
                  <td>&#8369;{ parseFloat((outputs.totalCost * (7.4 / 100)).toFixed(3)).toLocaleString('en-us') }</td>
                </tr>
                <tr>
                  <td>Steel (24.6%)</td>
                  <td>&#8369;{ parseFloat((outputs.totalCost * (24.6 / 100)).toFixed(3)).toLocaleString('en-us') }</td>
                </tr>
                <tr>
                  <td>Finishers (16.5%)</td>
                  <td>&#8369;{ parseFloat((outputs.totalCost * (16.5 / 100)).toFixed(3)).toLocaleString('en-us') }</td>
                </tr>
                <tr>
                  <td>Fittings (22.8 %)</td>
                  <td>&#8369;{ parseFloat((outputs.totalCost * (22.8 / 100)).toFixed(3)).toLocaleString('en-us') }</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: '600' }}>Total</td>
                  <td style={{ fontWeight: '600' }}>&#8369;{ parseFloat(outputs.totalCost.toFixed(3)).toLocaleString('en-us') }</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
		</>
	);
}
 
export default Home;
import Plot from 'react-plotly.js';

const Chart = ({ plotTitle, testData, output, type }) => {
	const yAxisTitle = () => type === 'quantity' ? 'Quantity of Materials.' : 'Approximate Cost';

	return (
		<section className="container">
			<Plot 
				data={[
					{
						x: testData.x,
						y: output,
						type: 'scatter',
						mode: 'markers',
						marker: {
							size: 12,
							color: '#47db19',
						},
						name: 'Predicted Output'
					},
					{
						x: testData.x,
						y: testData.y,
						type: 'scatter',
						mode: 'markers',
						marker: {
							size: 9,
							color: '#0074e2',
						},
						name: 'Actual Output',
					}
				]}
				layout= {{
					width: '50%', 
					height: 420, 
					title: plotTitle, 
					plot_bgcolor: '#fff', 
					paper_bgcolor: '#fff',
					xaxis: { title: { text: 'Area (sqft.)' } },
					yaxis: { title: { text: yAxisTitle() } }
				}}
				
			/>
		</section>
	);
}
 
export default Chart;
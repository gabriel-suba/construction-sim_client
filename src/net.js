import * as brain from 'brain.js';
import cementData from './data/pretrained_cement.json';
import sandData from './data/pretrained_sand.json';
import gravelData from './data/pretrained_gravel.json';
import steelData from './data/pretrained_steel.json';
import paintData from './data/pretrained_paint.json';
import bricksData from './data/pretrained_bricks.json';
import flooringData from './data/pretrained_flooring.json';

import roughFinishData from './data/cost_rough_finish.json';
import standardFinishData from './data/cost_standard_finish.json';
import highendFinishData from './data/cost_highend_finish.json';

const net = {
	cement:         new brain.recurrent.LSTMTimeStep().fromJSON(cementData),
	sand:           new brain.recurrent.LSTMTimeStep().fromJSON(sandData),
	gravel:         new brain.recurrent.LSTMTimeStep().fromJSON(gravelData),
	steel:          new brain.recurrent.LSTMTimeStep().fromJSON(steelData),
	paint:          new brain.recurrent.LSTMTimeStep().fromJSON(paintData),
	bricks:         new brain.recurrent.LSTMTimeStep().fromJSON(bricksData),
	flooring:       new brain.recurrent.LSTMTimeStep().fromJSON(flooringData),
	
	roughFinish:    new brain.recurrent.LSTMTimeStep().fromJSON(roughFinishData),
	standardFinish: new brain.recurrent.LSTMTimeStep().fromJSON(standardFinishData),
	highendFinish:  new brain.recurrent.LSTMTimeStep().fromJSON(highendFinishData),
}

export default net;
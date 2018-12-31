const AdditionProblemGenerator = require('./addition-problem-generator');

// Instantiate
const pg = new AdditionProblemGenerator(1, 10, 'easy');
// Start speaking
pg.play();
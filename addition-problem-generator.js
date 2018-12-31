/**
 * AdditionProblemGenerator
 */
module.exports = class AdditionProblemGenerator{
    /**
     * Constructor
     * @param {number} digits - Number of digits of the addends
     * @param {number} rows - Number of addends
     * @param {string} mode - Talking speed of the speaker (easy, medium, hard);
     */
    constructor(digits, rows, mode) {
        this.digits = digits; // Number of digits of addends
        this.rows = rows; // Number of addends
        this.mode = mode; // easy, medium, hard
        this.say = require('say'); // Text-to-speech module
    }

    /**
     * Start the game
     */
    play() {
        const readline = require('readline'); // Module for reading command line inputs

        const rl = readline.createInterface({ 
            input: process.stdin,
            output: process.stdout
        });
        
        // Problem
        this.givenNumbers = this.generateGivenNumbers(this.digits, this.rows);
        let sum = this.sumOfArray(this.givenNumbers);
        // Math expression
        let expression = this.writeExpression(this.givenNumbers);
        // Start talking
        this.speak(expression, this.mode);
        // Wait for answer in command line
        rl.question('Answer: ', (answer) => {
            // Evaluate if the inputted answer matches the correct answer
            (parseInt(answer) === sum ? this.say.speak(`${answer} is Correct`) : this.say.speak(`Incorrect. The answer is ${sum}`));
            console.log(`Correct answer: ${sum}`);

            rl.close();
        });

    }

    /**
     * Generate an array of given numbers
     * @param {number} digits - The length of the number to be generated
     * @param {number} rows - The number of/how many given numbers will be generated
     */
    generateGivenNumbers(digits, rows) {
        // The given numbers
        let rowValues = [];
        // Create {@param rows} rows of {@param digits}-digit numbers
        for (let i = 1; i <= rows; i++) {
            rowValues.push(this.generateNDigitNumber(digits));
        }

       return rowValues;
    }

    /**
     * Generate a random number
     * @param {number} n - Number of digits of the generated number
     */
    generateNDigitNumber(n) {
        let generatedNumber = '';
        // {@param n} must be positive
        if (n <= 0)
            return 0;
        
        for (let i = 1; i <= n; i++) {
            generatedNumber += Math.floor(Math.random() * 9) + 1;
        }

        return parseInt(generatedNumber);
    }

    /**
     * Creates the math expression string
     * @param {array} numArray - The values to be included in the expression
     */
    writeExpression(numArray) {
        let expression = '';
        // Compose the script of the speaker (i.e., the expression to be solved)
        numArray.forEach(num => expression += `${num} , `);
        expression += ' = ';

        return expression;
    }

    /**
     * Tells the problem using text-to-speech (TTS) module
     * @param {string} expression - Mathematical expression string to be read by speaker
     * @param {string} mode - Specifies the speed of the speaking of the problem
     */
    speak(expression, mode) {
        switch (mode) {
            // 0.5 sec speed
            case 'easy':
                this.say.speak(expression, 'Alex', 0.5);
                console.log(expression);
                break;
            // 1 sec speed
            case 'medium':
                this.say.speak(expression, 'Alex', 1);
                console.log(expression);
                break;
            // 1.5 sec speed
            case 'hard':
                this.say.speak(expression, 'Alex', 1.5);
                console.log(expression);
                break;
            // Same with medium
            default:
                this.say.speak(expression, 'Alex', 1);
                console.log(expression);
                break;
        }
    }

    /**
     * Calculates the sum of the elements of an array
     * @param {array} numberArray - The array in which elements will be totaled
     */
    sumOfArray(numberArray) {
        let sum = 0;

        numberArray.forEach(num => sum += num);

        return sum;
    }
}

import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

const PREAMBLE = 25;

const solution = async () => {
    const input = await fileReader('day09/input', 'utf-8');

    const nums = input.trim()
        .split('\n')
        .map((num) => parseInt(num))

    for (let i = PREAMBLE; i <= nums.length; i++) {
        let hasPair = false;

        const availableNumbers = nums.slice(i - PREAMBLE, i)

        availableNumbers.some(firstNumber => {
            availableNumbers.some(secondNumber => {
                if (firstNumber === secondNumber) {
                    return true;
                }

                if (firstNumber + secondNumber === nums[i]) {
                    console.log('Pair for', nums[i], 'found!', firstNumber, secondNumber)
                    hasPair = true
                    return true;
                }
            })

            if (hasPair) {
                return true;
            }
        })

        if (!hasPair) {
            console.log('===')
            return nums[i]
        }
    }

    return null
}

solution().then((result) => console.log(result));
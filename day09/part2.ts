import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

const PREAMBLE = 25;

const solution = async () => {
    const input = await fileReader('day09/input', 'utf-8');

    const nums = input.trim()
        .split('\n')
        .map((num) => parseInt(num))

    let result = null;
    const numsLength = nums.length;

    for (let i = PREAMBLE; i <= numsLength; i++) {
        let hasPair = false;

        const availableNumbers = nums.slice(i - PREAMBLE, i)

        availableNumbers.some(firstNumber => {
            availableNumbers.some(secondNumber => {
                if (firstNumber === secondNumber) {
                    return true;
                }

                if (firstNumber + secondNumber === nums[i]) {
                    console.log('Pair for', nums[i], 'found!', firstNumber, 'and', secondNumber)
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
            result = nums[i]
            break;
        }
    }

    let startsWith = 0;
    let endsWith = 0;
    let breakOuter = false;

    for (let i = 0; i < numsLength; i++) {
        let sum = nums[i];

        for (let j = i + 1; j <= numsLength; j++) {
            if (sum === result) {
                startsWith = i;
                endsWith = j - 1;
                breakOuter = true;
                break;
            }

            if (sum > result || j == numsLength) {
                break;
            }

            sum = sum + nums[j];
        }

        if (breakOuter) {
            break;
        }
    }

    const contiguousSet = nums.slice(startsWith, endsWith)

    return Math.max(...contiguousSet) + Math.min(...contiguousSet)
}

solution().then((result) => console.log(result));
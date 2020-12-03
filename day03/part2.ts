import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

const solution = async (instructions: number[][]) => {
    const input = await fileReader('day03/input', 'utf-8');

    const preparedInput = input.split('\n')
        .map((value) => value.split(''))

    const height = preparedInput.length - 1
    const width = preparedInput[0].length

    const results = [];
    instructions.forEach((instruction) => {
        let numberOfTrees = 0;
        let y = 0;
        let x = 0;

        while (true) {
            y = y + instruction[1]

            if (y > height) {
                break;
            }

            x = x + instruction[0]

            const selectedBox = preparedInput[y][x % width]

            if (selectedBox === '#') {
                numberOfTrees++
            }
        }

        results.push(numberOfTrees);
    })

    return results.reduce((prev, curr) => prev * curr, 1)
}

solution([[1,1],[3,1],[5,1],[7,1],[1,2]]).then((result) => console.log(result));
import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

const solution = async () => {
    const input = await fileReader('day03/input', 'utf-8');

    const preparedInput = input.trim()
        .split('\n')
        .map((value) => value.split(''))

    const height = preparedInput.length - 1
    const width = preparedInput[0].length

    let numberOfTrees = 0;
    let y = 0;
    let x = 0;
    while (true) {
        y = y + 1

        if (y > height) {
            break;
        }

        x = x + 3

        const selectedBox = preparedInput[y][x % width]

        if (selectedBox === '#') {
            numberOfTrees++
        }
    }

    return numberOfTrees
}

solution().then((result) => console.log(result));
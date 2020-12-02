import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

const solution = async () => {
    const input = await fileReader('day01/input', 'utf-8');

    const preparedInput = input.split('\n')
        .map((value) => Number(value))

    let first = 0, second = 0;

    preparedInput.forEach((a, indexA) => {
        preparedInput.forEach((b, indexB) => {
            if (indexA === indexB) {
                return
            }

            if (a + b === 2020) {
                first = a;
                second = b;
            }
        })
    })

    return first * second
}

solution().then((result) => console.log(result));
import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

const solution = async () => {
    const input = await fileReader('day01/input', 'utf-8');

    const preparedInput = input.split('\n')
        .map((value) => Number(value))

    let first = 0, second = 0, third = 0;

    preparedInput.forEach((a, indexA) => {
        preparedInput.forEach((b, indexB) => {
            preparedInput.forEach((c, indexC) => {
                if (indexA === indexB || indexB === indexC || indexA === indexC) {
                    return
                }

                if (a + b + c === 2020) {
                    first = a;
                    second = b;
                    third = c;
                }
            })
        })
    })

    return first * second * third
}

solution().then((result) => console.log(result));
import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

const solution = async () => {
    const input = await fileReader('day06/input', 'utf-8');

    return input
        .trim()
        .split('\n\n')
        .map((group) => group
            .split('\n')
            .map(a => a.split(''))
            .reduce((a, b) => a.filter(c => b.includes(c)))
        ).reduce((prev, curr) => prev + curr.length, 0);
}

solution().then((result) => console.log(result));
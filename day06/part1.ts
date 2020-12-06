import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

const solution = async () => {
    const input = await fileReader('day06/input', 'utf-8');

    return input
        .trim()
        .split('\n\n')
        .map((group) => group.replace(/\n/g, '').split(''))
        .map((group) => (new Set(group)).size)
        .reduce((prev, curr) => prev + curr, 0);
}

solution().then((result) => console.log(result));
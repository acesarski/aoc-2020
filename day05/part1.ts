import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

const solution = async () => {
    const input = await fileReader('day05/input', 'utf-8');

    const seats = input
        .trim()
        .split('\n')
        .map((value) => value.split(''))
        .map((instructions) => {
            let rowRangeStart = 0
            let rowRangeEnd = 127
            let columnRangeStart = 0
            let columnRangeEnd = 7

            instructions.forEach((instruction) => {
                switch (instruction) {
                    case 'F':
                        rowRangeEnd = Math.floor((rowRangeEnd - (rowRangeEnd - rowRangeStart) / 2))
                        break;
                    case 'B':
                        rowRangeStart = Math.floor((rowRangeEnd - (rowRangeEnd - rowRangeStart) / 2)) + 1
                        break;
                    case 'L':
                        columnRangeEnd = Math.floor((columnRangeEnd - (columnRangeEnd - columnRangeStart) / 2))
                        break;
                    case 'R':
                        columnRangeStart = Math.floor((columnRangeEnd - (columnRangeEnd - columnRangeStart) / 2)) + 1
                        break;
                }
            })

            console.log('row:', rowRangeStart, ' column:', columnRangeStart, ' id:', rowRangeStart * 8 + columnRangeStart)

            return rowRangeStart * 8 + columnRangeStart
        })

    return Math.max.apply(null, seats);
}

solution().then((result) => console.log(result));
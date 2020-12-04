import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

const requiredFields = ['byr', 'ecl', 'pid', 'eyr', 'iyr', 'hcl', 'hgt']

const solution = async () => {
    const input = await fileReader('day04/input', 'utf-8');

    const preparedInput = input.trim()
        .split('\n\n')
        .map((document) => document.split(/[\n\r\s]+/))
        .map((document) => document.map((value) => value.split(':')))
        .map((document) => document.reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {}))


    return preparedInput.reduce((prev: number, document: object) => {
        const documentFields = Object.keys(document);

        let isValid = true;
        requiredFields.forEach((field) => {
            if (!documentFields.includes(field)) {
                isValid = false
            }
        })

        return isValid ? prev + 1 : prev
    }, 0)
}

solution().then((result) => console.log(result));
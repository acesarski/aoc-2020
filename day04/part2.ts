import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

const requiredFields = ['byr', 'ecl', 'pid', 'eyr', 'iyr', 'hcl', 'hgt']

interface Validator {
    isValid: (value) => boolean
}

class BirthYearValidator implements Validator{
    public isValid(value): boolean {
        if (value.length !== 4) {
            return false
        }

        const parsedValue = parseInt(value)
        if (isNaN(parsedValue)) {
            return false
        }

        return !(parsedValue < 1920 || parsedValue > 2002);
    }
}

class IssueYearValidator implements Validator{
    public isValid(value): boolean {
        if (value.length !== 4) {
            return false
        }

        const parsedValue = parseInt(value)
        if (isNaN(parsedValue)) {
            return false
        }

        return !(parsedValue < 2010 || parsedValue > 2020);
    }
}

class ExpirationYearValidator implements Validator{
    public isValid(value): boolean {
        if (value.length !== 4) {
            return false
        }

        const parsedValue = parseInt(value)
        if (isNaN(parsedValue)) {
            return false
        }

        return !(parsedValue < 2020 || parsedValue > 2030);
    }
}

class PassportIdValidator implements Validator{
    public isValid(value): boolean {
        if (value.length !== 9) {
            return false
        }

        const parsedValue = parseInt(value)
        return !isNaN(parsedValue);
    }
}

class EyeColorValidator implements Validator{
    public isValid(value): boolean {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
    }
}

class HairColorValidator implements Validator{
    public isValid(value): boolean {
        return /^#[0-9A-F]{6}$/i.test(value);
    }
}

class HeightValidator implements Validator{
    public isValid(value): boolean {
        if (value.endsWith('in')) {
            return this.validateImperial(value.replace('in', ''))
        }

        if (value.endsWith('cm')) {
            return this.validateMetric(value.replace('cm', ''))
        }

        return false
    }

    private validateImperial(value) {
        const parsedValue = parseInt(value)
        if (isNaN(parsedValue)) {
            return false
        }

        return !(parsedValue < 59 || parsedValue > 76);
    }

    private validateMetric(value) {
        const parsedValue = parseInt(value)
        if (isNaN(parsedValue)) {
            return false
        }

        return !(parsedValue < 150 || parsedValue > 193);
    }
}

const solution = async () => {
    const input = await fileReader('day04/input', 'utf-8');

    const documents = input.trim()
        .split('\n\n')
        .map((document) => document.split(/[\n\r\s]+/))
        .map((document) => document.map((value) => value.split(':')))
        .map((document) => document.reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {}))
        .filter((document) => {
            const documentFields = Object.keys(document);

            let isValid = true;
            requiredFields.forEach((field) => {
                if (!documentFields.includes(field)) {
                    isValid = false
                }
            })

            return isValid
        }).filter((document) => {
            const birthYearValidator = new BirthYearValidator()
            if (!birthYearValidator.isValid(document['byr'])) {
                return false
            }

            const issueYearValidator = new IssueYearValidator()
            if (!issueYearValidator.isValid(document['iyr'])) {
                return false
            }

            const expirationYearValidator = new ExpirationYearValidator()
            if (!expirationYearValidator.isValid(document['eyr'])) {
                return false
            }

            const heightValidator = new HeightValidator()
            if (!heightValidator.isValid(document['hgt'])) {
                return false
            }

            const hairColorValidator = new HairColorValidator()
            if (!hairColorValidator.isValid(document['hcl'])) {
                return false
            }

            const eyeColorValidator = new EyeColorValidator()
            if (!eyeColorValidator.isValid(document['ecl'])) {
                return false
            }

            const passportIdValidator = new PassportIdValidator()
            if (!passportIdValidator.isValid(document['pid'])) {
                return false
            }

            return true
        })

    return documents.length
}

solution().then((result) => console.log(result));
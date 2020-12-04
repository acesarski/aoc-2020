import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

interface Validator {
    canValidate: (document) => boolean
    validate: (document) => boolean
}

class BirthYearValidator implements Validator{
    public canValidate(document): boolean {
        return document.hasOwnProperty('byr');
    }

    public validate(document): boolean {
        if (!this.canValidate(document)) {
            return false
        }

        if (document['byr'].length !== 4) {
            return false
        }

        const parsedValue = parseInt(document['byr'])
        if (isNaN(parsedValue)) {
            return false
        }

        return !(parsedValue < 1920 || parsedValue > 2002);
    }
}

class IssueYearValidator implements Validator{
    public canValidate(document): boolean {
        return document.hasOwnProperty('iyr');
    }

    public validate(document): boolean {
        if (!this.canValidate(document)) {
            return false
        }

        if (document['iyr'].length !== 4) {
            return false
        }

        const parsedValue = parseInt(document['iyr'])
        if (isNaN(parsedValue)) {
            return false
        }

        return !(parsedValue < 2010 || parsedValue > 2020);
    }
}

class ExpirationYearValidator implements Validator{
    public canValidate(document): boolean {
        return document.hasOwnProperty('eyr');
    }

    public validate(document): boolean {
        if (!this.canValidate(document)) {
            return false
        }

        if (document['eyr'].length !== 4) {
            return false
        }

        const parsedValue = parseInt(document['eyr'])
        if (isNaN(parsedValue)) {
            return false
        }

        return !(parsedValue < 2020 || parsedValue > 2030);
    }
}

class PassportIdValidator implements Validator{
    public canValidate(document): boolean {
        return document.hasOwnProperty('pid');
    }

    public validate(document): boolean {
        if (!this.canValidate(document)) {
            return false
        }

        if (document['pid'].length !== 9) {
            return false
        }

        const parsedValue = parseInt(document['pid'])
        return !isNaN(parsedValue);
    }
}

class EyeColorValidator implements Validator{
    public canValidate(document): boolean {
        return document.hasOwnProperty('ecl');
    }

    public validate(document): boolean {
        if (!this.canValidate(document)) {
            return false
        }

        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(document['ecl']);
    }
}

class HairColorValidator implements Validator{
    public canValidate(document): boolean {
        return document.hasOwnProperty('hcl');
    }

    public validate(document): boolean {
        if (!this.canValidate(document)) {
            return false
        }

        return /^#[0-9A-F]{6}$/i.test(document['hcl']);
    }
}

class HeightValidator implements Validator{
    public canValidate(document): boolean {
        return document.hasOwnProperty('hgt');
    }

    public validate(document): boolean {
        if (!this.canValidate(document)) {
            return false
        }

        if (document['hgt'].endsWith('in')) {
            return this.validateImperial(document['hgt'].replace('in', ''))
        }

        if (document['hgt'].endsWith('cm')) {
            return this.validateMetric(document['hgt'].replace('cm', ''))
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

class ChainDocumentValidator implements Validator {
    public constructor(
       private validators: Validator[]
    ) {}

    public canValidate(document) {
        return this.validators
            .every((validator) => validator.canValidate(document))
    }

    public validate(document) {
        if (!this.canValidate(document)) {
            return false;
        }

        return this.validators
            .every((validator) => validator.validate(document))
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
            const chainDocumentValidator = new ChainDocumentValidator([
                new BirthYearValidator(),
                new IssueYearValidator(),
                new ExpirationYearValidator(),
                new HeightValidator(),
                new HairColorValidator(),
                new EyeColorValidator(),
                new PassportIdValidator(),
            ])

            return chainDocumentValidator.validate(document)
        })

    return documents.length
}

solution().then((result) => console.log(result));
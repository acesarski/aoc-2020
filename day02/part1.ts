import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

class PasswordPolicy {
    private readonly min: number;
    private readonly max: number;
    private readonly character: string;


    constructor(min: number, max: number, character: string) {
        this.min = min;
        this.max = max;
        this.character = character;
    }


    public getMin(): number {
        return this.min;
    }

    public getMax(): number {
        return this.max;
    }

    public getCharacter(): string {
        return this.character;
    }

    public check(password: string): boolean {
        const re = new RegExp(this.getCharacter(), 'g')
        const occurrences = (password.match(re) || []).length

        return occurrences >= this.getMin() && occurrences <= this.getMax();
    }
}

const solution = async () => {
    const input = await fileReader('day02/input', 'utf-8');

    return input.split('\n')
        .map((value) => value.split(' '))
        .map(([minMax, unparsedLetter, password]) => {
            const [min, max] = minMax.split('-');
            const character = unparsedLetter.replace(':', '');

            return [new PasswordPolicy(Number(min), Number(max), character), password]
        })
        .map(([passwordPolicy, password]: [PasswordPolicy, string]) => passwordPolicy.check(password))
        .reduce((prev, curr) => curr ? prev + 1 : prev, 0)
}

solution().then((result) => console.log(result));
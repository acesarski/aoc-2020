import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

class PasswordPolicy {
    private readonly firstPosition: number;
    private readonly secondPosition: number;
    private readonly character: string;


    constructor(firstPosition: number, secondPosition: number, character: string) {
        this.firstPosition = firstPosition;
        this.secondPosition = secondPosition;
        this.character = character;
    }


    public getFirstPosition(): number {
        return this.firstPosition;
    }

    public getSecondPosition(): number {
        return this.secondPosition;
    }

    public getCharacter(): string {
        return this.character;
    }

    public check(password: string): boolean {
        const passwordArray = password.split('');

        const checkPosition = (position) => passwordArray[position - 1] === this.getCharacter()

        if (checkPosition(this.getFirstPosition()) && checkPosition(this.getSecondPosition())) {
            return false
        }

        return checkPosition(this.getFirstPosition()) || checkPosition(this.getSecondPosition())
    }
}

const solution = async () => {
    const input = await fileReader('day02/input', 'utf-8');

    return input.split('\n')
        .map((value) => value.split(' '))
        .map(([firstSecondPosition, unparsedLetter, password]) => {
            const [first, second] = firstSecondPosition.split('-');
            const character = unparsedLetter.replace(':', '');

            return [new PasswordPolicy(Number(first), Number(second), character), password]
        })
        .map(([passwordPolicy, password]: [PasswordPolicy, string]) => passwordPolicy.check(password))
        .reduce((prev, curr) => curr ? prev + 1 : prev, 0)
}

solution().then((result) => console.log(result));
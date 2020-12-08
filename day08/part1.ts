import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

enum CommandTypes {
    'ACC' = 'acc',
    'jmp' = 'jmp',
    'nop' = 'nop',
}

type Instruction = {
    command: CommandTypes;
    visited: number;
    parameter: number;
}


const interpreter = (instructions: Instruction[]) => {
    let iterator = 0;
    let accumulator = 0;

    do {
        instructions[iterator].visited += 1;

        switch (instructions[iterator].command) {
            case CommandTypes.ACC:
                accumulator += instructions[iterator].parameter
                iterator++;
                break;

            case CommandTypes.jmp:
                iterator += instructions[iterator].parameter
                break

            case CommandTypes.nop:
                iterator++;
                break;
        }
    } while (instructions[iterator].visited < 1);

    return accumulator
}

const solution = async () => {
    const input = await fileReader('day08/input', 'utf-8');

    const instructions = input.trim()
        .split('\n')
        .map((inst) => inst.split(' '))
        .map((inst): Instruction => ({ command: inst[0] as CommandTypes, parameter: parseInt(inst[1]), visited: 0 }))

    return interpreter(instructions)
}

solution().then((result) => console.log(result));
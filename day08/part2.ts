import * as fs from 'fs';
import * as util from 'util';

const fileReader = util.promisify(fs.readFile);

enum CommandTypes {
    'ACC' = 'acc',
    'JMP' = 'jmp',
    'NOP' = 'nop',
}

type Instruction = {
    command: CommandTypes;
    visited: number;
    parameter: number;
}

const interpreter = (instructions: Instruction[]) => {
    const instructionsNumber = instructions.length - 1
    let iterator = 0;
    let accumulator = 0;
    let terminatedByEnd = false;

    if (instructions.length === 0) {
        return { accumulator, terminatedByEnd }
    }

    const cleanInstructions = instructions.map((inst) => ({ ...inst, visited: 0 }))

    do {
        if (instructionsNumber <= iterator) {
            terminatedByEnd = true;
            break;
        }

        cleanInstructions[iterator].visited += 1;

        switch (cleanInstructions[iterator].command) {
            case CommandTypes.ACC:
                accumulator += cleanInstructions[iterator].parameter
                iterator++;
                break;

            case CommandTypes.JMP:
                iterator += cleanInstructions[iterator].parameter
                break

            case CommandTypes.NOP:
                iterator++;
                break;
        }
    } while (cleanInstructions[iterator].visited < 1);

    return { accumulator, terminatedByEnd }
}

const solution = async () => {
    const input = await fileReader('day08/input', 'utf-8');

    const instructions = input.trim()
        .split('\n')
        .map((inst) => inst.split(' '))
        .map((inst): Instruction => ({ command: inst[0] as CommandTypes, parameter: parseInt(inst[1]), visited: 0 }))

    const instructionsCopy = Object.assign(instructions)

    return instructions
        .map(() => instructionsCopy)
        .map((variation, index) => {
            switch (variation[index].command) {
                case CommandTypes.ACC:
                    return []

                case CommandTypes.NOP:
                case CommandTypes.JMP:
                    return variation.map((inst, i) => i === index
                        ? { ...inst, command: (inst.command === CommandTypes.JMP ? CommandTypes.NOP : CommandTypes.JMP ) }
                        : inst)
            }
        })
        .map(interpreter)
        .find((vari) => vari.terminatedByEnd).accumulator

}

solution().then((result) => console.log(result));
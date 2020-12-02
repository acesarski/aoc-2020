class Hello {
    private readonly _recipient;

    constructor(recipient) {
        this._recipient = recipient;
    }

    getMessage() {
        return `Hello ${this._recipient}`;
    }
}

const hello = new Hello('World');
console.log(hello.getMessage())
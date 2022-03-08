export default class Identifier {

    private _isbn_print: string;

    private _isbn_epub: string;

    construction() {

    }

    public get isbn_print(): string {
        return this._isbn_print;
    }
    public set isbn_print(value: string) {
        this._isbn_print = value;
    }
    public get isbn_epub(): string {
        return this._isbn_epub;
    }
    public set isbn_epub(value: string) {
        this._isbn_epub = value;
    }


}
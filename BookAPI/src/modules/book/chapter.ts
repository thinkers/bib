export default class Chapter {

    private _id: string;
    private _role: string;
    private _content: string;
    private _characters: String[];


    construction() {

    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get role(): string {
        return this._role;
    }
    public set role(value: string) {
        this._role = value;
    }
    public get content(): string {
        return this._content;
    }
    public set content(value: string) {
        this._content = value;
    }
    public get characters(): String[] {
        return this._characters;
    }
    public set characters(value: String[]) {
        this._characters = value;
    }



}


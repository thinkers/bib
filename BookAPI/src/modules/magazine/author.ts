export default class Author {


    private _role: string;

    private _firstname: string;

    private _lastname: string;

    private _extraRole: string;



    construction() {
    }

    public get role(): string {
        return this._role;
    }
    public set role(value: string) {
        this._role = value;
    }
    public get firstname(): string {
        return this._firstname;
    }
    public set firstname(value: string) {
        this._firstname = value;
    }
    public get lastname(): string {
        return this._lastname;
    }
    public set lastname(value: string) {
        this._lastname = value;
    }
    public get extraRole(): string {
        return this._extraRole;
    }
    public set extraRole(value: string) {
        this._extraRole = value;
    }


}


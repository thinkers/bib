export default class ContactData {

    private _email: string;
    private _url: string;
    private _address: string;
    private _phone: string;

    construction() {

    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get url(): string {
        return this._url;
    }
    public set url(value: string) {
        this._url = value;
    }
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }
    public get phone(): string {
        return this._phone;
    }
    public set phone(value: string) {
        this._phone = value;
    }
}


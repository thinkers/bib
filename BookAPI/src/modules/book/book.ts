import Chapter from './chapter';
import ContactData from './contactData';
import Identifier from './identifier';
import Translations from './translations';

export default class Book {

    private _id: string;
    private _name: string;
    private _title: string;
    private _subtitle: string;
    private _abstract: string;
    private _author: string[];
    private _publisher: string;
    private _language: string;
    private _contactData: ContactData;
    private _edition: string;
    private _publicationDate: string;
    private _copyright: string;
    private _identifier: Identifier;
    private _translations: Translations;
    private _content: Chapter[];


    construction() {
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get subtitle(): string {
        return this._subtitle;
    }
    public set subtitle(value: string) {
        this._subtitle = value;
    }
    public get abstract(): string {
        return this._abstract;
    }
    public set abstract(value: string) {
        this._abstract = value;
    }
    public get author(): string[] {
        return this._author;
    }
    public set author(value: string[]) {
        this._author = value;
    }
    public get publisher(): string {
        return this._publisher;
    }
    public set publisher(value: string) {
        this._publisher = value;
    }
    public get language(): string {
        return this._language;
    }
    public set language(value: string) {
        this._language = value;
    }
    public get contactData(): ContactData {
        return this._contactData;
    }
    public set contactData(value: ContactData) {
        this._contactData = value;
    }
    public get edition(): string {
        return this._edition;
    }
    public set edition(value: string) {
        this._edition = value;
    }
    public get publicationDate(): string {
        return this._publicationDate;
    }
    public set publicationDate(value: string) {
        this._publicationDate = value;
    }
    public get copyright(): string {
        return this._copyright;
    }
    public set copyright(value: string) {
        this._copyright = value;
    }
    public get identifier(): Identifier {
        return this._identifier;
    }
    public set identifier(value: Identifier) {
        this._identifier = value;
    }
    public get translations(): Translations {
        return this._translations;
    }
    public set translations(value: Translations) {
        this._translations = value;
    }
    public get content(): Chapter[] {
        return this._content;
    }
    public set content(value: Chapter[]) {
        this._content = value;
    }

}
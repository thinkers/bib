import Author from "./author";

export default class Magazine {

    private _id: string;
    private _title: string;
    private _type: string;
    private _subtitle: string;
    private _authors: Author[];
    private _numberOfPages: string;
    private _summary: string;
    private _content: string;

    private _annotationAuthor: Author;
    private _annotation: string;
    private _decision: string;

    private _relations: string;
    private _relationsTheories: string;
    private _relationsNomologies: string;
    private _relationsScientific: string;
    private _relationsNomothesies: string;

    private _categories: Array<string>;
    private _issue: Array<string>;
    private _thematics: Array<string>;
    private _product: Array<string>;


    construction() {
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }
    public get subtitle(): string {
        return this._subtitle;
    }
    public set subtitle(value: string) {
        this._subtitle = value;
    }
    public get authors(): Author[] {
        return this._authors;
    }
    public set authors(value: Author[]) {
        this._authors = value;
    }
    public get numberOfPages(): string {
        return this._numberOfPages;
    }
    public set numberOfPages(value: string) {
        this._numberOfPages = value;
    }
    public get summary(): string {
        return this._summary;
    }
    public set summary(value: string) {
        this._summary = value;
    }
    public get content(): string {
        return this._content;
    }
    public set content(value: string) {
        this._content = value;
    }
    public get issue(): Array<string> {
        return this._issue;
    }
    public set issue(value: Array<string>) {
        this._issue = value;
    }
    public get annotationAuthor(): Author {
        return this._annotationAuthor;
    }
    public set annotationAuthor(value: Author) {
        this._annotationAuthor = value;
    }
    public get annotation(): string {
        return this._annotation;
    }
    public set annotation(value: string) {
        this._annotation = value;
    }
    public get decision(): string {
        return this._decision;
    }
    public set decision(value: string) {
        this._decision = value;
    }
    public get relations(): string {
        return this._relations;
    }
    public set relations(value: string) {
        this._relations = value;
    }
    public get relationsTheories(): string {
        return this._relationsTheories;
    }
    public set relationsTheories(value: string) {
        this._relationsTheories = value;
    }
    public get relationsNomologies(): string {
        return this._relationsNomologies;
    }
    public set relationsNomologies(value: string) {
        this._relationsNomologies = value;
    }
    public get relationsScientific(): string {
        return this._relationsScientific;
    }
    public set relationsScientific(value: string) {
        this._relationsScientific = value;
    }
    public get relationsNomothesies(): string {
        return this._relationsNomothesies;
    }
    public set relationsNomothesies(value: string) {
        this._relationsNomothesies = value;
    }
    public get categories(): Array<string> {
        return this._categories;
    }
    public set categories(value: Array<string>) {
        this._categories = value;
    }
    public get thematics(): Array<string> {
        return this._thematics;
    }
    public set thematics(value: Array<string>) {
        this._thematics = value;
    }
    public get product(): Array<string> {
        return this._product;
    }
    public set product(value: Array<string>) {
        this._product = value;
    }
}
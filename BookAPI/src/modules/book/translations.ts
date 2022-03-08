export default class Translations {

    private _featChapterReview: string;
    private _featChapterQuestion: string;
    private _featChapterAssess: string;

    construction() {

    }
    public get featChapterReview(): string {
        return this._featChapterReview;
    }
    public set featChapterReview(value: string) {
        this._featChapterReview = value;
    }
    public get featChapterQuestion(): string {
        return this._featChapterQuestion;
    }
    public set featChapterQuestion(value: string) {
        this._featChapterQuestion = value;
    }
    public get featChapterAssess(): string {
        return this._featChapterAssess;
    }
    public set featChapterAssess(value: string) {
        this._featChapterAssess = value;
    }
}
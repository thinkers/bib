import { Request, Response } from 'express';

import { insufficientParameters, successResponse, failureResponse } from '../modules/common/service';
import BookService from '../modules/book/book_service';
import Book from '../modules/book/book';
import env from '../environment';
import { BookUtils } from '../utils/bookUtils';
import { isFunction } from 'util';

export class BookController {

    private start: number = 0;
    private elapsed: number = 0;

    private book_service: BookService = new BookService();

    private books: Book[];
    private book: Book = new Book();

    public get_books(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        this.book_service.filterBooks("", async (response: any) => {

            if (!response) {
                failureResponse("Failure: No Book found", null, res);

            } else if (response.error) {
                failureResponse("Failure: " + response.error, null, res);

            } else if (response['rest:database']) {
                this.books = new Array<Book>();

                let promises = new Array();
                for (let tmpData of response['rest:database']['rest:resource']) {

                    let that = this;
                    let param = {
                        "id": tmpData['#text']
                    };

                    promises.push(this.book_service.filterBook(param, (response: any) => {


                        let tmpBook = new Book();
                        if (!response) {
                            failureResponse("Failure: No Book found", null, res);

                        } else if (response.error) {
                            failureResponse("Failure: " + response.error, null, res);

                        } else {


                            if (response.TEI) {
                                tmpBook = BookUtils.mapSingleTEI(response);
                            } else {
                                tmpBook = BookUtils.mapSingleBook(response);
                            }
                            tmpBook.name = tmpData['#text'];
                            that.books.push(tmpBook);
                        }
                    }));
                }
                await Promise.all(promises);


                if (req.query) {
                    if (req.query.search) {
                        this.books = BookUtils.searchBook(this.books, req.query.search.toString());
                    }
                    if (req.query.exclude) {
                        if (!Array.isArray(req.query.exclude)) {
                            req.query.exclude = [req.query.exclude.toString()];
                        } else {
                            // TODO

                        }
                        BookUtils.excludeContentFromBooks(this.books, req.query.exclude);
                    }
                }

                if (env.getDebug()) {
                    this.elapsed = new Date().getTime() - this.start;
                    console.debug("get_magazine took " + this.elapsed + "ms");
                }
                successResponse('Books: ', this.books, res);

            }
        });
    }

    public get_book(req: Request, res: Response) {
        if (env.getDebug()) {
            this.start = new Date().getTime();
        }

        if (req.params.id) {

            let params = { 'id': '', 'exclude': {} };
            params.id = req.params.id;

            this.book_service.filterBook(params, (response: any) => {
                if (!response) {
                    failureResponse("Failure: No Book found", null, res);
                } else if (response.error) {
                    failureResponse("Failure: " + response.error, null, res);
                } else {

                    this.book = new Book();

                    if (response.TEI) {
                        if (req.query.character) {
                            this.book = BookUtils.mapSingleTEIbyCharacter(response, req.query.character);
                        } else if (req.query.charactersOf) {
                            this.book = BookUtils.mapSingleTEI_Of(response, req.query.charactersOf, "persRef");
                        } else if (req.query.placesOf) {
                            this.book = BookUtils.mapSingleTEI_Of(response, req.query.placesOf, "placeRef");
                        } else if (req.query.objectsOf) {
                            this.book = BookUtils.mapSingleTEI_Of(response, req.query.objectsOf, "obRef");
                        } else {
                            this.book = BookUtils.mapSingleTEI(response);
                        }
                    } else {
                        this.book = BookUtils.mapSingleBook(response);
                    }


                    if (req.query.exclude) {
                        if (!Array.isArray(req.query.exclude)) {
                            req.query.exclude = [req.query.exclude.toString()];
                        } else {
                            //  TODO

                        }
                        BookUtils.excludeContent(this.book, req.query.exclude);
                    }

                    if (env.getDebug()) {
                        this.elapsed = new Date().getTime() - this.start;
                        console.debug("get_magazine took " + this.elapsed + "ms");
                    }

                    successResponse('Book: ', this.book, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

} 
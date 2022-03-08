import { Application, Request, Response } from 'express';
import { BookController } from '../controllers/bookController';

export class BooksRoutes {

    private book_controller: BookController = new BookController();

    public route(app: Application) {

        app.get('/api/books', (req: Request, res: Response) => {
            this.book_controller.get_books(req, res);
        });
        app.get('/api/book/:id', (req: Request, res: Response) => {
            this.book_controller.get_book(req, res);
        });
    }
}
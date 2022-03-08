import express from 'express';
import { BooksRoutes } from "../routes/books_routes";
import { MagazinesRoutes } from "../routes/magazines_routes";
import { CommonRoutes } from "../routes/common_routes";

class App {

    public app: express.Application;

    private book_routes: BooksRoutes = new BooksRoutes();
    private magazine_routes: MagazinesRoutes = new MagazinesRoutes();
    private common_routes: CommonRoutes = new CommonRoutes();

    constructor() {
        this.app = express();
        this.config();

        this.book_routes.route(this.app);
        this.magazine_routes.route(this.app);
        this.common_routes.route(this.app);
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true
        }));
    }
}
export default new App().app;
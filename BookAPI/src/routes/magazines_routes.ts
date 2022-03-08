import { Application, Request, Response } from 'express';
import { MagazineController } from '../controllers/magazineController';


export class MagazinesRoutes {

    private magazine_controller: MagazineController = new MagazineController();

    public route(app: Application) {

        app.get('/api/magazines', (req: Request, res: Response) => {
            this.magazine_controller.get_magazines(req, res);
        });
        app.get('/api/magazine/:id', (req: Request, res: Response) => {
            this.magazine_controller.get_magazine(req, res);
        });
        app.get('/api/nomologia/:id', (req: Request, res: Response) => {
            this.magazine_controller.get_magazine_nomologia(req, res);
        });
        app.get('/api/nomothesia/:id', (req: Request, res: Response) => {
            this.magazine_controller.get_magazine_nomothesia(req, res);
        });
        app.get('/api/scientific/:id', (req: Request, res: Response) => {
            this.magazine_controller.get_magazine_scientific(req, res);
        });
        app.get('/api/theory/:id', (req: Request, res: Response) => {
            this.magazine_controller.get_magazine_theory(req, res);
        });

    }
}
import { Application, json, urlencoded, Response, Request, NextFunction} from 'express'
import http from 'http'
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import HTTP_STATUS from 'http-status-codes';

const SERVER_PORT = 5080;
export class ChattyServer {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routeMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }

    private securityMiddleware(app: Application) {
        cookieSession({
            name: 'session',
            keys: ['test1', 'test2'],
            maxAge: 24 * 7 * 3600000,
            secure: false,
        })
        
        app.use(hpp());
        app.use(helmet());
        app.use(
          cors({
            origin: '*',
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
          })
        );
    
    }
    private standardMiddleware(app: Application) {
        app.use(compression());
        app.use(json({ limit: '50mb' }));
        app.use(urlencoded({ extended: true, limit: '50mb' }));
    }
    private routeMiddleware(app: Application) {}
    private globalErrorHandler(app: Application) {}
    private startServer(app: Application): void {
        try {
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer);
          } catch (error) {
            console.error(error);
          }
    }
    private startHttpServer(httpServer: http.Server) {
        httpServer.listen(SERVER_PORT, () => {
          console.info(`Server running on port ${SERVER_PORT}`);
        });
    }
    private createSocketIO(httpServer: http.Server) {}


}
import express, { Application, Response, urlencoded, json, Request } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload'
import * as Cloudinary from 'cloudinary'
import helmet from 'helmet'
import hpp from 'hpp'
import mongoSanitize from 'express-mongo-sanitize'
import session from 'express-session'
import cookieParser from 'cookie-parser';
//import passport from 'passport'

//import PassportOAuth from "./api/controllers/auth/passport";
import { ErrorHandler, InvalidUrl } from './middlewares/route-exception';
import { router } from './routes';
dotenv.config()

const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env

const app: Application = express();

const cloudinary = Cloudinary.v2

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ limit: '10mb', extended: false, parameterLimit: 10000 }));
app.use(json({ limit: '10mb' }));
app.use(cors(
    {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204
    }
))
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
)

app.use(cookieParser());
app.use(
    session({
        secret: 'SESSION_SECRET',
        resave: false, // Set to false to avoid session re-saving on every request
        saveUninitialized: true, // Set to true to save sessions that are new but not modified
        cookie: {
            secure: true, // Set to true if using HTTPS, false for development (HTTP)
            maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds (e.g., 1 day)
        },
    })
);

//app.use(passport.initialize());
//app.use(passport.session())

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
})

//PassportOAuth()
app.use('/api/v1', router);

const healthCheck = (_req: Request, res: Response) => {
    try {
        return res.status(200).json({
            isHealthy: true,
            greeting: 'Hi there, I am YDM-API',
            health: 'It seems I am healthy ✨',
            message: 'You are welcome 😁',
        });
    } catch (error) {
        if (error) return res.status(503).json({
            isHealthy: false,
            message: 'I\'m offline 😥, ',
        });
    }
}

// Home route response and health status check
app.get('/', healthCheck);
app.get('/health', healthCheck);
app.get('/api/v1/health', healthCheck);

// Catch 404 and non-existing endpoint urls
app.use(InvalidUrl)

// handle route errors
app.use(ErrorHandler);

export default app;
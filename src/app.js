import express from 'express';
import cors from 'cors';

import routerLogin from './routes/login-routes.js';

const app = express();

app.use(cors({
    origin: [
        // 'http://localhost:3000'
        'https://frontend-de-la-app-react.onrender.com'
    ],
    credentials: true
}));

app.use(express.json());

app.use('/api', routerLogin);

async function main() {
    const puerto = process.env.PORT || 5000;

    try {
        app.listen(puerto, () =>{
            console.log(`El puerto esta escuchando en : ${puerto}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

main();
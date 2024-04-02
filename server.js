import express from 'express';
import router from './routes/routes.js';
const app = express();
const PORT = process.env.PORT || 3033;

//middleware para llamar routes
app.use('/', router)


app.listen(PORT, () => console.log(`serv running on http://localhost:${PORT}`));
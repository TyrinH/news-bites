import * as dotenv from 'dotenv';
dotenv.config({path:'.env'});
import express from 'express';
import fetchArticles from './fetchArticles.js';

// console.log(process.env)

const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    console.log()
    res.send( process.env.OPEN_AI_API_KEY);
})

app.get('/test', async (req, res) => {
console.log('test')
    await fetchArticles()
    res.send('test')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
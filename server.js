// reference video: https://www.youtube.com/watch?v=xYD090y5A8o

const { syncAndSeed, models: { User, Car, Sale }, connector } = require('./db');
const express = require('express');
const path = require('path');

const app = express();

app.use('/dist', express.static(path.join(__dirname,'dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname,'index.html')));

app.use('/api', require('./api'));

// app.use('/', async(req, res) => {
//     res.redirect('/api/users');
// })

const init = async() => {
    try {
        await syncAndSeed();
       

    }
    catch(e){
        console.log(e)
    }
};

init();   

const port = process.env.Port || 3000;
app.listen(port, () => console.log(`listening on ${port}`));
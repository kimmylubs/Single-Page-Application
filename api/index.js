const router = require('express').Router();
const { syncAndSeed, models: { User, Car, Sale }, connector } = require('../db');

router.get('/users', async(req, res, next) => {
    try {
        res.send(await User.findAll());
    }
    catch(e){
        console.log(e)
    }
});

router.get('/cars', async (req, res, next) => {
    try {
    res.send(await Car.findAll());
    }
    catch(e){
        next(e);
    }
});

router.get('/users/:id/sales', async(req, res, next) => {
    try{
        req.send(await Sale.findAll({
            where: {
                userId: req.params.id
            },
            include: [
                Car
            ]
        }));
    }
    catch(e){
        next(e);
    }
})

module.exports = router;
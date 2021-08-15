const express = require('express');
const router = express.Router();

router.get('/orders', (req, res)=> {
    //Code here
    res.send('no hay ordenes');
});

router.get('/order/:id', (req, res)=> {
    //Code here
});

router.post('/order', (req, res)=> {
    //Code here
});

router.put('/order/:id', (req, res)=> {
    //Code here
});

router.delete('/order/:id', (req, res)=> {
    //Code here
});

module.exports = router;
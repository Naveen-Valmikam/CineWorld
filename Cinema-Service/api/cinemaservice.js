require('./../config/config');

const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');

var {ObjectID} = require('mongodb');

var {mongoose} = require('./../db/mongoose');
const {Cinema} = require('./../models/cinema');


var app = express();
app.use(bodyParser.json());

const port = process.env.PORT ||4000;

app.get('/api/cinemas',(req,res)=>{
    Cinema.find()
    .then((cinemas)=>{
        res.send({cinemas});
    },(err)=>{
    res.status(400).send(err);
  });
});

app.get('/api/cinemasByPostalCode/:postalCode',(req,res)=>{

    var postalCode = req.params.postalCode;    

    if(!validator.isNumeric(postalCode)){
        return res.status(404).send(('Postal code should be numeric only'));
    }

    Cinema.find({
        postalCode
    }).then((cinemas)=>{
        if(!cinemas){
            return res.status(404).send();
        }
        res.send({cinemas});
    }).catch((e)=>{
        return res.status(400).send();
    });
});


app.get('/api/cinemasByState/:state',(req,res)=>{

    var state = req.params.state;

    if(!validator.isAlpha(state)){
        return res.status(404).send(('State should be string only'));
    }

    Cinema.find({
        state
    }).then((cinemas)=>{
        if(!cinemas){
            return res.status(404).send();
        }
        res.send({cinemas});
    }).catch((e)=>{
        return res.status(400).send();        
    });
});

app.listen(port,()=>{
    console.log('Started server on port 4000');
});

module.exports={app};
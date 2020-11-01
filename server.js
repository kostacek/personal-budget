// Budget API
const express = require('express');
const cors = require('cors');
const app = express();
const mongoDBClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const port = 3000;
const mongoose = require("mongoose");
const budgetModel = require("./public/models/budget_schema");
const { createIndexes } = require('./public/models/budget_schema');
const url = 'mongodb://localhost:27017/personal_budget';

app.use(cors());
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.get('/personal_budget/myBudget',(req, res)=>{
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() =>{
            console.log("Connection to the database")
            budgetModel.find({})
            .then((data)=> {
                res.json(data);
                mongoose.connection.close()
            })
          .catch((connectionError) => {
            console.log(connectionError)
            })
        })
        .catch((connectionError) => {
            console.log(connectionError)
        
        })
    });

app.post('/personal_budget/myBudget',(req, res) => {
    console.log(req.body);
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() =>{
            console.log("Preparing go POST..")
            let addBudget = new {
                title: req.body.title,
                budget: req.body.budget,
                hex: req.body.hex
            };
             
            budgetModel.insertMany(addBudget) 
                 .then((data) => {
                     res.json(data);
                     mongoose.connection.close();
                     console.log("Connection closed");
                    }) 
                    .catch((connectionError) => {
                        console.log(connectionError)
                    }) 
                 }) 
                 .catch((connectionError) => {
                     console.log(connectionError)
                 }) 
});


app.listen(port, () => {
    console.log(`API Example app listening at http://localhost:${port}`);
});
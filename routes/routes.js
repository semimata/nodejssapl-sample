const express = require("express");
const Joi = require("joi");

const cources = [
    {id:1, name: "cource1"},
    {id:2, name: "cource2"},
    {id:3, name: "cource3"}
];

const router = express.Router();

router.get("/cources",(req,res) =>{
    res.send(cources);
});

router.post("/cources", (req,res) =>{
    
    const shcema = {
        name: Joi.string().min(3).required()

    };

    let result = Joi.validate(req.body, shcema);
    if(result.error){
        res.send(result.error.details[0].message);
    }

    let cource ={
        id: cources.length + 1,
        name: req.body.name
    };
    cources.push(cource);
    res.send(cources);
});


router.get("/cources/:id", (req,res) =>{
    let cource = cources.find(e => e.id === parseInt(req.params.id));
    if(!cource){
        res.send("該当のコースがありません");
    }
    res.send(cource);

})

router.get("/posts/:year/:month", (req,res) => {
    res.send(req.query);
});

router.put("/cources/:id", (req,res) => {
    let cource = cources.find(e => e.id === parseInt(req.params.id));
    if(!cource){
        res.send("該当のコースがありません");
    }

    let {error} = validate(req.body)
    
    if(error){
        res.send(error.details[0].message);
    }

    cources.forEach(e => {
        if(e.id === parseInt(req.params.id))
        e.name = req.body.name;
    })
    res.send(cources);

})

router.delete("/cources/:id", (req,res) =>{
    let cource = cources.find(e => e.id === parseInt(req.params.id));
    if(!cource){
        res.send("該当のコースがありません");
    }

    let index = cources.indexOf(cource);
    cources.splice(index,1);

    res.send(cources);

});

function validate(cource){

    const shcema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(cource.body, shcema);
}

module.exports = router;
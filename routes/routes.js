const express = require("express");
const Joi = require("joi");

const sampleData = [
    {id:1, name: "sample data1"},
    {id:2, name: "sample data2"},
    {id:3, name: "sample data3"}
];

const router = express.Router();

router.get("/getData",(req,res) =>{
    res.send(sampleData);
});

router.post("/postData", (req,res) =>{
    
    const shcema = {
        name: Joi.string().min(3).required()
    };

    let result = Joi.validate(req.body, shcema);
    if(result.error){
        res.send(result.error.details[0].message);
    }

    let postdata ={
        id: sampleData.length + 1,
        name: req.body.name
    };
    sampleData.push(postdata);
    res.send(postdata);
});

router.get("/getData/:id", (req,res) =>{
    let adddata = sampleData.find(e => e.id === parseInt(req.params.id));
    if(!adddata){
        res.send("該当のデータはありません");
    }
    res.send(adddata);
})

router.put("/putData/:id", (req,res) => {
    let putdata = sampleData.find(e => e.id === parseInt(req.params.id));
    if(!putdata){
        res.send("該当のデータはありません");
    }

    let {error} = validate(req.body)
    
    if(error){
        res.send(error.details[0].message);
    }

    sampleData.forEach(e => {
        if(e.id === parseInt(req.params.id))
        e.name = req.body.name;
    })
    res.send(sampleData);

})

router.delete("/deleteData/:id", (req,res) =>{
    let deldata = sampleData.find(e => e.id === parseInt(req.params.id));
    if(!deldata){
        res.send("該当のデータはありません");
    }

    let index = sampleData.indexOf(deldata);
    sampleData.splice(index,1);

    res.send(sampleData);

});

function validate(cource){

    const shcema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(cource.body, shcema);
}

module.exports = router;
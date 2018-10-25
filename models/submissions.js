let mongoose = require('mongoose');
let wwtdbschema =  new mongoose.Schema({
        name: { type:String, required: true},
        age: { type: Number, min: 1, max: 65, required: true },
        gender: { type:String, required: true},
        startWeight: { type:Number, required: true },
        goalWeight:{ type:Number, required: true },
        currentWeight:{ type:Number, required: true},
        Height:{ type:Number},
        location:{ type:String, required: true },
        date: { type: Date, default: Date.now, },

    }, {collection: 'wwtdb'});
module.exports= mongoose.model('sub', wwtdbschema);

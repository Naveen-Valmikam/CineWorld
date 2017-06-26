var mongoose = require('mongoose');

// Cinemas will have following property 
// city,
// name,
// code,
// address

var Cinema = mongoose.model('Cinema',{
    city:{
        type: String,
        required: true,
        minLength :1        
    },
    name:{
        type:String, 
        required: true,
        minLength:1
    },
    code:{
        type: String,
        required: true,
        minLength: 6
    },
    address:{
        type:String,
        required: true,
        minLength: 10
    },
    postalCode:{
        type:Number,
        required: true
    },
    state:{
        type: String, 
        required: true, 
        minLength:3,
        maxLength: 20
    }    
});

module.exports={Cinema};
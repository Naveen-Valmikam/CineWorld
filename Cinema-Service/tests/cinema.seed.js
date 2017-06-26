const {ObjectID} = require('mongodb');

const {Cinema} = require('./../models/cinema');

const cinemaOneId = new ObjectID();
const cinemaTwoId = new ObjectID();


const Cinemas = [{
    _id: cinemaOneId,
    city:'Doncaster',
    code:'DONVIC',
    name:'Doncaster Cineworld',
    address:'612, Doncaster Road',
    state:'VIC',
    postalCode: 3108

},
{
    _id: cinemaTwoId,
    city:'Knox',
    code:'KNOXVIC',
    name:'Knox Cineworld',
    address:'898, Knox Road',
    state:'VIC',
    postalCode: 3057
}];

const populateCinemas= (done)=>{
  Cinema.remove({}).then(()=>{
    return Cinema.insertMany(Cinemas);
  }).then(()=>done());
};

module.exports ={Cinemas,populateCinemas};
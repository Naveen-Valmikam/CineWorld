const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../api/cinemaservice');
const {Cinema} = require('./../models/cinema');
const {Cinemas, populateCinemas} = require('./cinema.seed');

beforeEach(populateCinemas);

describe('GET /api/cinemas',()=>{
    it('should get list of all cinemas',(done)=>{
        request(app)
        .get('/api/cinemas')
        .expect(200)
        .expect((res)=>{
            expect(res.body.cinemas.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /api/cinemasByPostalCode/postalCode',()=>{
    it('should get cinemas by postal code',(done)=>{
        request(app)
        .get(`/api/cinemasByPostalCode/${Cinemas[0].postalCode}`)       
        .expect(200)
        .expect((res)=>{
            expect(res.body.cinemas[0].code).toBe(Cinemas[0].code);
        })
        .end(done);
    });

    it('should return 404 if invalid postal code is passed',(done)=>{
        request(app)
        .get('/api/cinemasByPostalCode/ABC123')
        .expect(404)
        .end(done);
    });
});

describe('GET /api/cinemasByState/state',()=>{
    it('should get cinemas by state',(done)=>{
        request(app)
        .get(`/api/cinemasByState/${Cinemas[0].state}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.cinemas[0].state).toBe(Cinemas[0].state);
        })
        .end(done);
    });

    it('should return 404 if invalid state is passed',(done)=>{
        request(app)
        .get('/api/cinemasByState/123')
        .expect(404)
        .end(done);
    });
});


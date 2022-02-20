const app = require("../app");

const request = require("supertest");
const pool = require("../models/dbConfig");
const fs = require('fs');



const {deleteUser}  = require('../models/AuthModel');
require('dotenv').config();

const invalideMailUser = {email:"invalidetest"};
const invalideUser = {email:"invalidetest@test.fr"};
const defaultUser = JSON.parse(process.env.TEST_DEFAULT_USER);

beforeAll(async () => {
    await deleteUser(defaultUser.email);
    
})
  
afterAll(done => {
    pool.end();
    done()
})



describe('POST /api/inscription', () =>{
    it('Retourne un JSON contenant un token et un code HTTP 201', async () =>{
        
        await request(app).post('/api/instription')
            .send(defaultUser)
            .expect(201)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.hasOwnProperty('token')).toEqual(true)
                const body = JSON.stringify(res.body);
                fs.writeFile('__tests__/test_variable.json', body, (err) => {
                    if (err) {
                        throw err;
                    }
                });
               
            });
    })

    it("Retourne un JSON contenant un message d'erreur car l'utilisateur existe déja et un code HTTP 401", async () =>{
        
        await request(app).post('/api/instription')
            .send(defaultUser)
            .expect(401)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("L'utilisateur existe déjà")
            });
    })

    it("Retourne un JSON contenant un message d'erreur car le format de l'email est invalide et un code HTTP 401", async () =>{
        
        await request(app).post('/api/instription')
            .send(invalideMailUser)
            .expect(400)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("Format de l'email invalide")
            });
    })

    it("Retourne un JSON contenant un message d'erreur et un code HTTP 401", async () =>{
        
        await request(app).post('/api/instription')
            .send({})
            .expect(401)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("Email manquant")
            });
    })
});


describe('POST /api/connexion', () =>{
    it("Retourne un JSON contenant un token et un code HTTP 200 ", async ()=>{
        await request(app).post('/api/connexion')
            .send(defaultUser)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.hasOwnProperty('token')).toEqual(true)
            });
    })

    it("Retourne un JSON contenant un message d'erreur car l'utilisateur n'existe pas et un code HTTP 401 ", async ()=>{
        await request(app).post('/api/connexion')
            .send(invalideUser)
            .expect(401)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("Identifient non valide")
            });
    })
    
    it("Retourne un JSON contenant un message d'erreur car il n'y a pas d'email et un code HTTP 401", async () =>{
        
        await request(app).post('/api/connexion')
            .send({})
            .expect(401)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("Email manquant")
            });
    })

    it("Retourne un JSON contenant un message d'erreur car le format de l'email est invalide et un code HTTP 401", async () =>{
        
        await request(app).post('/api/connexion')
            .send(invalideMailUser)
            .expect(400)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("Format de l'email invalide")
            });
    })
    
    
})
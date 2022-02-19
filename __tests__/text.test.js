const app = require("../app");

const request = require("supertest");
const pool = require("../models/dbConfig");
const fs = require('fs');
require('dotenv').config();


var token = null;

  

afterAll(done => {
    pool.end();
    done();
  })

describe('POST /api/justify', () =>{

    
    token = JSON.parse(fs.readFileSync('__tests__/test_variable.json'));
    

    it('Retourne un le texte justifié et un code HTTP 200', async () =>{
        
        await request(app).post('/api/justify')
            .set('Authorization', 'Bearer ' + token.token )
            .set('Content-type', 'text/plain')
            .send(process.env.TEST_TEXTE)
            .expect(200)
    })

    it('Retourne une erreur car il n y a pas de texte a justifier et un code HTTP 401', async () =>{
        
        await request(app).post('/api/justify')
            .set('Authorization', 'Bearer ' + token.token )
            .set('Content-type', 'text/plain')
            .expect(401)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("Texte à justifier manquant")
            });
    })

    it('Retourne une erreur car il n y a pas de token et un code HTTP 401', async () =>{
        
        await request(app).post('/api/justify')
            .set('Content-type', 'text/plain')
            .send(process.env.TEST_TEXTE)
            .expect(401)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("Autorisation refusée")
            });
    })

    it('Retourne une erreur car le token est invalide et un code HTTP 401', async () =>{
        
        await request(app).post('/api/justify')
            .set('Authorization', 'Bearer ' + process.env.TEST_INVALIDE_TOKEN )
            .set('Content-type', 'text/plain')
            .send(process.env.TEST_TEXTE)
            .expect(401)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("Token invalide")
            });
    })

    

    it('Retourne une erreur car l utilisateur n a pas assez de credit journalier et un code HTTP 402', async () =>{
        await setRateToMax();
        await request(app).post('/api/justify')
            .set('Authorization', 'Bearer ' +  token.token  )
            .set('Content-type', 'text/plain')
            .send(process.env.TEST_TEXTE)
            .expect(402)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("Crédit journalier épuisé")
            });
    })

  })

async function setRateToMax(){
    await pool.query('UPDATE justified_text SET length= $1 WHERE user_id = $2', [ process.env.DAILY_RATE_LIMIT ,JSON.parse(process.env.TEST_DEFAULT_USER).email]);
}
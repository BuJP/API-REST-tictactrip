const app = require("../app");

const request = require("supertest");
const pool = require("../models/dbConfig");
const fs = require('fs');
require('dotenv').config();

const texte = 'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. \nCette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.';
var token = null;
var invalideToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQGdtYWlsLmNvbSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImlhdCI6MTY0NTIwMjA4NCwiZXhwIjoxNjQ1MjA1Njg0fQ.2vp8YaAqaiu1sPgcWfNcAcjaDbIHyvGT3XulyX5iIO8';
  

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
            .send(texte)
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
            .expect(401)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("Autorisation refusée")
            });
    })

    it('Retourne une erreur car le token est expiré et un code HTTP 401', async () =>{
        
        await request(app).post('/api/justify')
            .set('Authorization', 'Bearer ' + invalideToken )
            .set('Content-type', 'text/plain')
            .expect(401)
            .expect('Content-Type', /json/)
            .then((res) =>{
                expect(res.body.msg).toEqual("Token invalide")
            });
    })
  })

async function loginUser(){
    
  }
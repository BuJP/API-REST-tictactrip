# API REST TICTACTRIP
L'API est hébergé sur heroku à l'url suivante : [api-rest-tictactrip.herokuapp.com](https://api-rest-tictactrip.herokuapp.com)
## Endpoints libre d'accès

* [inscription](auth/inscription.md) : `POST /api/instription`

* [connexion](auth/connexion.md) : `POST /api/connexion`

## Endpoints qui requiert une authentification

Endpoints protégé qui requière un token JWT valide dans le header de la requête. Le token peut être obtenue lors de l'inscription et de la connexion.

### Relatif à l'utilisateur connecté
Ces endpoints manipule ou affiche des informations relatives à l'utilisateur dont le token est fourni dans la requête :

* [Justifier un texte](justify/post.md) : `POST /api/justify`

* [Retourne les textes justifiés d'un utilisateur](justify/post.md) : `GET /api/justify`
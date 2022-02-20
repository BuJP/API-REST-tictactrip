# Connexion
Permet de récupérer un token JWT pour un utilisateur déjà inscrit.

**URL** : [`/api/connexion`](https://api-rest-tictactrip.herokuapp.com/api/connexion)

**Method** : `POST`

**Authentification requit** : `NON`

**Contrainte sur le body**
``` json
{
    "email" : "[E-mail valide]"
}
```
**Exemple de body**
``` json
{
    "email" : "tictactrip@gmail.com"
}
```

## Réponse de réussite
**Code HTTP** : `200 OK`

**Exemple de réponse**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QzQGdtYWlsLmNvbSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICIsImlhdCI6MTY0NTIwMjA4NCwiZXhwIjoxNjQ1MjA1Njg0fQ.2vp8YaAqaiu1sPgcWfNcAcjaDbIHyvGT3XulyX5iIO8"
}
```

## Réponse d'erreur

**Condition** : Si l'utilisateur n'est pas inscrit

**Code HTTP** : `401 Unauthorized`

**Réponse**

```json
{
    "msg": "Identifient non valide"
}
```

**Condition** : Si l'email n'est pas précisé dans le body

**Code HTTP** : `401 Unauthorized`

**Réponse**

```json
{
    "msg": "Email manquant"
}
```

**Condition** : Si l'email n'est pas sous un format valide

**Code HTTP** : `400 Bad Request`

**Réponse**

```json
{
    "msg": "Format de l'email invalide"
}
```
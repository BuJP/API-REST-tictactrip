# API-REST-tictactrip

### Objectif
L'objectif de ce projet est d'implémenter et déployer une API REST qui justifie un texte passé en paramètre.

### Contraintes
- La longueur des lignes du texte justifié doit être de 80 caractères.
- L’endpoint doit être de la forme /api/justify et doit retourner un texte justifié suite à une requête POST avec un body de ContentType text/plain.
- L’api doit utiliser un mécanisme d’authentification via token unique. En utilisant par exemple une endpoint api/token qui retourne  un token d’une requête POST avec un json body {"email": "foo@bar.com"}.
- Il doit y avoir un rate limit par token pour l’endpoint /api/justify, fixé à 80 000 mots par jour, si il y en a plus dans la journée il faut alors renvoyer une erreur 402 Payment Required.
- Le code doit être déployé sur un url ou une ip public.
- Le code doit être rendu sur github.
- Langage : Nodejs.
- PAS d’usage de bibliothèque externe pour la justification.

### Modélisation de la base de donnée(PostgreSQL)

![modelisation_de_la_bdd](https://user-images.githubusercontent.com/86422799/154759725-be2a1959-a899-4b98-b1dc-a7af8cb37bef.JPG)


 [Voir la documention de l'API](documentation/README.md) 
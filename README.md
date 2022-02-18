# API-REST-tictactrip

### Objectif
L'objectif de ce projet est d'implémenter et déployer une API REST qui justifie un texte passé en paramètre.

### Contraintes
1. La longueur des lignes du texte justifié doit être de 80 caractères.
2. L’endpoint doit être de la forme /api/justify et doit retourner un texte justifié suite à une requête POST avec un body de ContentType text/plain.
3. L’api doit utiliser un mécanisme d’authentification via token unique. En utilisant par exemple une endpoint api/token qui retourne 4. un token d’une requête POST avec un json body {"email": "foo@bar.com"}.
5. Il doit y avoir un rate limit par token pour l’endpoint /api/justify, fixé à 80 000 mots par jour, si il y en a plus dans la journée il faut alors renvoyer une erreur 402 Payment Required.
6. Le code doit être déployé sur un url ou une ip public.
7. Le code doit être rendu sur github.
8. Langage : Nodejs.
9. PAS d’usage de bibliothèque externe pour la justification.

### Modélisation de la base de donnée

![modelisation_de_la_bdd](https://user-images.githubusercontent.com/86422799/154757251-3795b7bc-33c4-4b4c-a611-ae22d8810bf0.JPG)



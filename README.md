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

### Démonstration

```diff
- input :
```
```txt
Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. 

Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. 
 Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.
```

```diff
+ output :
```
```txt
Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,
mes   yeux   se   fermaient   si vite que je n’avais pas le temps de me dire: «Je
m’endors.»   Et, une demi-heure après, la pensée qu’il était temps de chercher le
sommeil   m’éveillait;   je voulais poser le volume que je croyais avoir dans les
mains   et   souffler   ma lumière; je n’avais pas cessé en dormant de faire des
réflexions   sur   ce que je venais de lire, mais ces réflexions avaient pris un
tour   un   peu particulier; il me semblait que j’étais moi-même ce dont parlait
l’ouvrage:   une   église,   un   quatuor,   la   rivalité de François Ier et de
Charles-Quint.
Cette   croyance   survivait   pendant   quelques secondes à mon réveil; elle ne
choquait   pas   ma   raison, mais pesait comme des écailles sur mes yeux et les
empêchait de se rendre compte que le bougeoir n’était plus allumé.
   Puis elle commençait à me devenir inintelligible, comme après la métempsycose
les   pensées d’une existence antérieure; le sujet du livre se détachait de moi,
j’étais   libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais
bien   étonné de trouver autour de moi une obscurité, douce et reposante pour mes
yeux,   mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme
une   chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me
demandais   quelle   heure il pouvait être; j’entendais le sifflement des trains
qui,   plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant
les   distances, me décrivait l’étendue de la campagne déserte où le voyageur se
hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans
son   souvenir   par   l’excitation qu’il doit à des lieux nouveaux, à des actes
inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le
suivent encore dans le silence de la nuit, à la douceur prochaine du retour.
```

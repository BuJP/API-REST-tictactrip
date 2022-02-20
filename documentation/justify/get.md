# Connexion
Permet à un utilisateur de récupérer l'ensemble des textes qu'il a justifié

**URL** : [`/api/justify`](https://api-rest-tictactrip.herokuapp.com/api/justify)

**Method** : `GET`

**Authentification requit** : `OUI`




## Réponse de réussite
**Code HTTP** : `200 OK`

**Exemple de réponse**

```json
{
    "user": "user@user.fr",
    "dailyRateUsed": "1888",
    "texts": [
        {
            "id": 174,
            "text": "Texte 3",
            "created_at": "2022-02-20T22:59:03.589Z",
            "length": 7
        },
        {
            "id": 173,
            "text": "Texte 2",
            "created_at": "2022-02-20T22:58:58.592Z",
            "length": 7
        },
        {
            "id": 172,
            "text": "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,\nmes   yeux   se   fermaient   si vite que je n’avais pas le temps de me dire: «Je\nm’endors.»   Et, une demi-heure après, la pensée qu’il était temps de chercher le\nsommeil   m’éveillait;   je voulais poser le volume que je croyais avoir dans les\nmains   et   souffler   ma lumière; je n’avais pas cessé en dormant de faire des\nréflexions   sur   ce que je venais de lire, mais ces réflexions avaient pris un\ntour   un   peu particulier; il me semblait que j’étais moi-même ce dont parlait\nl’ouvrage:   une   église,   un   quatuor,   la   rivalité de François Ier et de\nCharles-Quint.\nCette   croyance   survivait   pendant   quelques secondes à mon réveil; elle ne\nchoquait   pas   ma   raison, mais pesait comme des écailles sur mes yeux et les\nempêchait de se rendre compte que le bougeoir n’était plus allumé.\n   Puis elle commençait à me devenir inintelligible, comme après la métempsycose\nles   pensées d’une existence antérieure; le sujet du livre se détachait de moi,\nj’étais   libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais\nbien   étonné de trouver autour de moi une obscurité, douce et reposante pour mes\nyeux,   mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme\nune   chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me\ndemandais   quelle   heure il pouvait être; j’entendais le sifflement des trains\nqui,   plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant\nles   distances, me décrivait l’étendue de la campagne déserte où le voyageur se\nhâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans\nson   souvenir   par   l’excitation qu’il doit à des lieux nouveaux, à des actes\ninaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le\nsuivent encore dans le silence de la nuit, à la douceur prochaine du retour.",
            "created_at": "2022-02-20T22:58:37.592Z",
            "length": 1874
        }
    ]
}
```

## Réponse d'erreur

**Condition** : Si il n'y a aucun texte a justifier

**Code HTTP** : `400 Bad Request`

**Réponse**


**Condition** : Si le token n'est pas ajouté

**Code HTTP** : `401 Unauthorized`

**Réponse**

```json
{
    "msg": "Autorisation refusée"
}
```

**Condition** : Si le token n'est plus / pas valide

**Code HTTP** : `401 Unauthorized`

**Réponse**

```json
{
    "msg": "Token invalide"
}
```
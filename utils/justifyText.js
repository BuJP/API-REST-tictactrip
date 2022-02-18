
function formatLignes(mots, nbCaracteres){
    var lignes = [];
    
    while(mots.length !== 0){
        // 2. Récuperer la ligne formaté
        lignes.push(formatLigne(mots, nbCaracteres));        
    }
    return lignes.join('\n');
}

function formatLigne(mots, nbCaracteres){
    var ligne = [];
    while(mots.length !== 0){
        // 3. Récuperer le premier mot present dans le tableau mot
        var mot = mots.shift();

        // 4. Tester si il n'y a pas de retour à la ligne
        if(mot.includes('\n')){
            mots.unshift(mot.trim());
            break;
        }
        var motLength = mot.length;

        // 5. Tester si le mot est plus grand que le nombre de caractere max
        if( motLength > nbCaracteres){
            const diff = motLength - nbCaracteres;
            mots.unshift(mot.substr(motLength-diff));
            mot = mot.substr(0, 79);
        }
        // 6. ajouter le mot a la ligne
        ligne.push(mot);
        var ligneLength = ligne.join(' ').length;
        // 7. Tester si la taille de la ligne est plus grand que le nombre de caractere max
        if( ligneLength > nbCaracteres){
            // Retirer le mot de ligne 
            mots.unshift(ligne.pop());

            // Ajouter des espaces pour remplire la ligne
            verifLigneLength(ligne, nbCaracteres);
            break;
        }
    }
    // 8. retourner la ligne
    return ligne.join(' ');
}

function verifLigneLength(ligne, nbCaracteres){
	var max = ligne.length;
    var i = 1;
    var spaceCount = 0;
    while(ligne.join(' ').length < nbCaracteres){
        
      	if(i===max){
        	spaceCount+=1; 
        	i = 1;
        } 
        ligne.splice(i, 0, '\xa0');
        i+=2+spaceCount;  
    }
}

module.exports =  {

    justify:function(texte, nbCaracteres){
        var mots = texte.split(' ');
        // 1. Récupérer les lignes justifié
        return formatLignes(mots, nbCaracteres );
    }
}
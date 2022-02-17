
function formatLignes(mots, nbCaracteres){
    var lignes = [];
    while(mots.length !== 0){
        lignes.push(formatLigne(mots, nbCaracteres));        
    }
    return lignes.join('\n');
}

function formatLigne(mots, nbCaracteres){
    var ligne = [];
    while(mots.length !== 0){
        var mot = mots.shift();
        if(mot.includes('\n')){
            mots.unshift(mot.trim());
            break;
        }
        ligne.push(mot);
        if(ligne.join(' ').length > nbCaracteres){
            mots.unshift(ligne.pop());
            verifLigneLength(ligne, nbCaracteres);
            break;
        }
    }
    
    return ligne.join(' ');
}

function verifLigneLength(ligne, nbCaracteres){
	var max = ligne.length;
    var i = 1;
    var spaceCount = 0
 
    while(ligne.join(' ').length < nbCaracteres){
        
      	if(i===max){
        	spaceCount+=1; 
        	i = 1;
          
        } 
        
        ligne.splice(i, 0, ' ');

        i+=2+spaceCount;
        
      }


}

module.exports =  {

    justify:function(texte, nbCaracteres){
        var mots = texte.split(' ');
        return formatLignes(mots, nbCaracteres );
    }
}
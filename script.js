// Etape 1
const validColors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'black', 'white']
let secretCode = [];
for (let i = 0; i < 4; i++) { 
    secretCode.push(validColors[Math.floor(Math.random() * validColors.length)]); 
}
console.log(secretCode)

// Vérifier que c'est bien 4 proposition saisie qui viennent de valid colors
const isValid = (guess) => {
    if (guess.length !== 4){
        return false
    }
    for(let color of guess){
        if (!validColors.includes(color)){
            return false
        }
    }
    return true;
};

// Condition de victoire
const checkGuess = (userGuess, secretCode) => {
    let wellCombination = 0;
    let misplaced = 0;
    const checkedIndices = [];

    // Vérifier wellCombination
    for(let i = 0; i < userGuess.length; i++){
        if(userGuess[i] === secretCode[i]){
            wellCombination++;
            checkedIndices.push(i)
        }
    }

    // Vérifier misplaced
    for (let i = 0; i < userGuess.length; i++) { 
        if (userGuess[i] !== secretCode[i] && !checkedIndices.includes(i)) { 
            for (let j = 0; j < secretCode.length; j++) { 
                if (userGuess[i] === secretCode[j] && !checkedIndices.includes(j)) { 
                    misplaced++; 
                    checkedIndices.push(j); 
                    break;            
                } 
            } 
        }
    }
    return {wellCombination, misplaced}
}

const playGame = () => {
    let attemps = 0;
    const maxAttemps = 12;

    while(attemps < maxAttemps){
        // Le joueur fais sa proposition
        let guess = prompt('Entrez votre combinaison, veuillez à séparer les propositon avec une virgule').split(',');
        guess = guess.map(color => color.trim().toLocaleLowerCase());

        // condition si la propositon est invalide
        if(!isValid(guess)){
            console.log('Combinaison invalide, veuillez réessayez.')
            continue;
        }

        // Ajoute une tentative à attemps
        attemps++;

        // Information apres un essai
        const result = checkGuess(guess, secretCode);
        console.log(`Tentatives ${attemps}: Bien placées: ${result.wellCombination}, Mal placées : ${result.misplaced}.`);

        // Conditionde victoire
        if(result.wellCombination === secretCode.length){
            console.log(`Bravo, vous avez deviner la bonne combinaison`);
            return;
        } else if (result.wellCombination !== secretCode.length && attemps < maxAttemps){
            console.log(`Il vous reste ${maxAttemps - attemps} de tentatives, essayez encore.`)
        } else {
            console.log(`Vous avez épuisez toute les tentatives, la bonne reponse était : ${secretCode}` )
        }

    }
}

playGame()





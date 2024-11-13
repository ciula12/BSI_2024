//SZYFR
function shuffleAlphabet() {
    let alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUVWXYZŹŻ";
    let arr = alphabet.split('');

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

let KEY = shuffleAlphabet();
console.log(KEY);

//TABLICASZYFRU

let TABLICASZYFRU = Array.from({ length: 5 }, () => Array(7).fill(0));

let counter = 0;
for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 7; y++) {
        TABLICASZYFRU[x][y] = KEY[counter];   
        counter++; 
    }
}

console.log(TABLICASZYFRU);

//SZUKANIE LITERY W TABLICY SZYFRU
function letter_position(letter) {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 7; y++) {
            if (TABLICASZYFRU[x][y] === letter) { 
                return ((x+1)*10+y+1);
            }
        }
    }
    return "";
}


// SZYFROWANIE
function encrypt(text) {
    const content = text.toUpperCase();
    let encrypted = '';

    console.log(content);

    for (let char of content) {
        encrypted += letter_position(char);
    }

    console.log("Przed modyfikacją: " + encrypted);

    let final = ''; 
    const offsets = [3, 21, 42];

    for (let i = 0; i < encrypted.length; i += 2) {
        let pair = encrypted.substring(i, i + 2);
        let offsetIndex = (i / 2) % offsets.length;
        let modifiedPair = parseInt(pair) + offsets[offsetIndex];
        final += modifiedPair.toString(); 
    }

    console.log("Po modyfikacji: " + final);

    return final;

}

// Przycisk szyfrowanie
document.querySelector('.btn-szyfrowanie').addEventListener('click', function() {
    const originalText = document.querySelector('textarea').value;
    document.querySelector('.szyfrowanie').innerText = encrypt(originalText);
    document.querySelector('textarea').value = '';
});

//DESZYFROWANIE
function decrypt(value) {
    let result = '';
    const offsets = [3, 21, 42];

    for (let i = 0; i < value.length; i += 2) {
        let pair = value.substring(i, i+2);
        let offsetIndex = (i / 2) % offsets.length; 
        let originalPair = parseInt(pair) - offsets[offsetIndex];
        result += originalPair.toString();
    }

    let finaldecrypted = '';
    for (let x = 0; x < result.length; x += 2) {
        let dziesiatki = parseInt(result[x]);
        let jednostki = parseInt(result[x + 1]);
        
        if (!isNaN(dziesiatki) && !isNaN(jednostki)) {
            let znak = TABLICASZYFRU[dziesiatki - 1][jednostki - 1];
            finaldecrypted += znak;
        }
    }

    return finaldecrypted; 

}

// Przycisk deszyfrowania
document.querySelector('.btn-deszyfrowanie').addEventListener('click', function() {
    const numbers = document.querySelectorAll('textarea')[1].value;
    document.querySelector('.deszyfrowanie').innerText = decrypt(numbers);
    document.querySelectorAll('textarea')[1].value = '';
});




//TABELASZYFRU
function generacjatabeli(array2D) {
    const table = document.getElementById('tabelaszyfru');
    const tbody = table.querySelector('tbody');

    array2D.forEach(rowData => {
        let row = document.createElement('tr');

        rowData.forEach(cellData => {
            let cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });

        tbody.appendChild(row);
    });
}

generacjatabeli(TABLICASZYFRU);


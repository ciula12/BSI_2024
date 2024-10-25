// Tworzenie Szyfru
function createPlayfairMatrix(keyword) {
    const alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŹŻ";
    const klucz = new Set();
    const matrix = [];

    for (const char of keyword.toUpperCase()) {
        if (alphabet.includes(char) && !klucz.has(char)) {
            matrix.push(char);
            klucz.add(char);
        }
    }

    for (const char of alphabet) {
        if (!klucz.has(char)) {
            matrix.push(char);
        }
    }

    const matrix2D = [];
    while (matrix.length) {
        matrix2D.push(matrix.splice(0, 7));
    }

    return matrix2D;
}

// Przycisk szyfrowanie
document.querySelector('.btn-szyfrowanie').addEventListener('click', function() {
    const originalText = document.querySelector('textarea').value;
    const playfairMatrix = createPlayfairMatrix(document.querySelector('#encryption-key').value);
    const encryptedText = encryptPlayfair(originalText, playfairMatrix);
    document.querySelector('.szyfrowanie').innerText = encryptedText;
    document.querySelector('textarea').value = '';
    console.log(playfairMatrix);
});

// Przycisk deszyfrowania
document.querySelector('.btn-deszyfrowanie').addEventListener('click', function() {

    const encryptedText = document.querySelectorAll('textarea')[1].value;
    const playfairMatrix = createPlayfairMatrix(document.querySelector('#decryption-key').value);
    const decryptedText = decryptPlayfair(encryptedText, playfairMatrix);
    document.querySelector('.deszyfrowanie').innerText = decryptedText;
    document.querySelectorAll('textarea')[1].value = '';
});

// usunięcie spacji i tworzenie par
function prepareText(text) {
    text = text.toUpperCase().replace(/[^A-ZĄĆĘŁŃÓŚŹŻ]/g, '');

    let pairedText = '';
    for (let i = 0; i < text.length; i += 2) {
        let first = text[i];
        let second = text[i + 1] || 'X';

        if (first === second) {
            second = 'X';
            i--;
        }
        pairedText += first + second;
    }
    return pairedText;
}

// Szyfrowanie
function encryptPlayfair(text, matrix) {
    const pairedText = prepareText(text);
    let encryptedText = '';

    for (let i = 0; i < pairedText.length; i += 2) {
        const [row1, col1] = findLetterPosition(matrix, pairedText[i]);
        const [row2, col2] = findLetterPosition(matrix, pairedText[i + 1]);

        if (row1 === row2) { 
            encryptedText += matrix[row1][(col1 + 1) % matrix[0].length] + matrix[row2][(col2 + 1) % matrix[0].length];
        } 
        
        else if (col1 === col2) { 
            encryptedText += matrix[(row1 + 1) % matrix.length][col1] + matrix[(row2 + 1) % matrix.length][col2];
        } 
        
        else { 
            encryptedText += matrix[row1][col2] + matrix[row2][col1];
        }
    }
    console.log("szyfrowania:", encryptedText);
    return encryptedText;
}

// Deszyfrowanie
function decryptPlayfair(text, matrix) {
    let decryptedText = '';

    for (let i = 0; i < text.length; i += 2) {
        const [row1, col1] = findLetterPosition(matrix, text[i]);
        const [row2, col2] = findLetterPosition(matrix, text[i + 1]);

        if (row1 === row2) { 
            decryptedText += matrix[row1][(col1 + matrix[0].length - 1) % matrix[0].length] + matrix[row2][(col2 + matrix[0].length - 1) % matrix[0].length];
        } 
        
        else if (col1 === col2) {
            decryptedText += matrix[(row1 + matrix.length - 1) % matrix.length][col1] + matrix[(row2 + matrix.length - 1) % matrix.length][col2];
        } 
        
        else { 
            decryptedText += matrix[row1][col2] + matrix[row2][col1];
        }
    }
    console.log("deszyfrowanie:", decryptedText);
    return decryptedText;
}

function findLetterPosition(matrix, letter) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            if (matrix[row][col] === letter) {
                return [row, col];
            }
        }
    }
    return null;
}

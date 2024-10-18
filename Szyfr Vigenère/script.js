//TABELA SZYFRU

let alfabet = "aąbcćdeęfghijklłmnńoóprsśtuvwxyzźż";
let tabelaszyfru = [];
let rows = 34;
let col = 34;

for (let i = 0; i < alfabet.length; i++) {
    const row = [];
    for (let j = 0; j < alfabet.length; j++) {
        const letter = alfabet[(i + j) % alfabet.length];
        row.push(letter);
    }
    tabelaszyfru.push(row);
}
for (let i = 0; i < rows; i++) {
    console.log(tabelaszyfru[i].join(' '));
}



// SZYFROWANIE
function encrypt(text, key) {
    let encryptedText = '';
    key = key.toLowerCase();
    text = text.replace(/\s+/g, '');

    for (let i = 0; i < text.length; i++) {
        let textChar = text[i].toLowerCase(); 
        let keyChar = key[i % key.length].toLowerCase();
        
        let textIndex = alfabet.indexOf(textChar);
        let keyIndex = alfabet.indexOf(keyChar); 
        
        if (textIndex === -1 || keyIndex === -1) {
            encryptedText += textChar;
        } else {
            encryptedText += tabelaszyfru[textIndex][keyIndex]; 
        }
    }
    return encryptedText;
}

//Przycisk szyfrowania

document.querySelector('.btn-szyfrowanie').addEventListener('click', function() {
    const originalText = document.querySelector('textarea').value;
    const key = document.getElementById('encryption-key').value;
    document.querySelector('.szyfrowanie').innerText = encrypt(originalText, key); 
    document.querySelector('textarea').value = '';

    document.getElementById('encryption-key').value = '';
});




// DESZYFROWANIE
function decrypt(text, key) {
    let decryptedText = '';
    key = key.toLowerCase();

    for (let i = 0; i < text.length; i++) {
        let textChar = text[i].toLowerCase();
        let keyChar = key[i % key.length].toLowerCase();
    
        let keyIndex = alfabet.indexOf(keyChar); 
        
        if (alfabet.indexOf(textChar) === -1 || keyIndex === -1) {
            decryptedText += textChar;
        } else {
            let textIndex = tabelaszyfru[keyIndex].indexOf(textChar);
            decryptedText += alfabet[textIndex];
        }
    }
    return decryptedText;
}

// Przycisk deszyfrowania
document.querySelector('.btn-deszyfrowanie').addEventListener('click', function() {
    const encryptedText = document.querySelectorAll('textarea')[1].value;
    const key = document.getElementById('decryption-key').value; 
    document.querySelector('.deszyfrowanie').innerText = decrypt(encryptedText, key); 
    document.querySelectorAll('textarea')[1].value = '';
    document.getElementById('decryption-key').value = ''; 
});


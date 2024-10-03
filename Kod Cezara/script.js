// SZYFROWANIE
function encrypt(text, key) {
    const alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUVWXYZŹŻ";
    const content = text.toUpperCase();
    let encrypted = '';

    for (let char of content) {
        const charIndex = alphabet.indexOf(char);


        if (charIndex == -1) {
            if (char !== ' ') {
                encrypted += '';
            }
        } else {
            let newIndex = (charIndex + key+1) % alphabet.length; 
            encrypted += alphabet[newIndex]; 
        }
    }

    return encrypted;
}

// Przycisk szyfrowanie
document.querySelector('.btn-szyfrowanie').addEventListener('click', function() {
    const originalText = document.querySelector('textarea').value;
    const key = document.getElementById('key').selectedIndex
    document.querySelector('.output').innerText = encrypt(originalText, key);
    document.querySelector('textarea').value = '';
});


// DESZYFROWANIE

function decrypt(text, key) {
    const alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUVWXYZŹŻ";
    const upperText = text.toUpperCase();
    let decrypted = '';

    for (let char of upperText) {
        const charIndex = alphabet.indexOf(char);
        let newIndex = (charIndex - key-1 + alphabet.length) % alphabet.length; 
        decrypted += alphabet[newIndex];
    }

    return decrypted;
}

// Przycisk deszyfrowanie
document.querySelector('.btn-deszyfrowanie').addEventListener('click', function() {
    const encryptedText = document.querySelectorAll('.block textarea')[1].value;
    const key = document.getElementById('key2').selectedIndex;
    document.querySelector('.output.deszyfrowanie').innerText = decrypt(encryptedText, key);
    document.querySelectorAll('.block textarea')[1].value = '';

});

// Generowanie kluczy RSA
const keys = generateKeys();

// losowa generacja liczby pierwszej

function generateRandomPrime(min, max) {
    let prime;
    do {
        prime = BigInt(Math.floor(Math.random() * (max - min + 1)) + min);
    } while (!isPrime(prime));
    return prime;
}
function isPrime(num) {
    if (num <= 1n) return false;
    if (num === 2n || num === 3n) return true;
    if (num % 2n === 0n || num % 3n === 0n) return false;
    for (let i = 5n; i * i <= num; i += 6n) {
        if (num % i === 0n || num % (i + 2n) === 0n) {
            return false;
        }
    }
    return true;
}


// Funkcja do generowania kluczy RSA z automatycznym doborem e
function generateKeys() {

    const p = generateRandomPrime(1000, 10000);
    const q = generateRandomPrime(1000, 10000);
    console.log("p: ", p);
    console.log("q: ", q);

    const n = p * q;
    console.log("pq: ", p*q);
    const phi = (p - 1n) * (q - 1n);

    let e = 65537n;

    const d = modInverse(e, phi);

    console.log("Klucz publiczny:", e, ",", n);
    console.log("Klucz prywatny:", d ,",", n); 

    return {
        publicKey: { e, n },
        privateKey: { d, n }
    };
}


// obliczenie d
function modInverse(e, phi) {
    let t, q;
    let x0 = 0n, x1 = 1n;

    if (phi === 1n) return 0n;

    while (e > 1n) {
        q = e / phi;
        t = phi;
        phi = e % phi;
        e = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    if (x1 < 0n) x1 += phi;
    return x1;
}

//SZYFROWANIE

function encryptMessage(message, publicKey) {
    let encryptedMessage = '';
    const nLength = publicKey.n.toString().length;

    for (let i = 0; i < message.length; i++) {
        const encryptedChar = toASCII(message[i], publicKey);
        let encryptedCharStr = encryptedChar.toString();

        while (encryptedCharStr.length < nLength) {
            encryptedCharStr = '0' + encryptedCharStr;
        }

        encryptedMessage += encryptedCharStr;
    }
    return encryptedMessage;
}

function toASCII(character, publicKey) {
    const { e, n } = publicKey;
    const charCode = BigInt(character.charCodeAt(0));
    return modPow(charCode, e, n);
}

// Funkcja do potęgowania modularnego
function modPow(base, exponent, modulus) {
    let result = 1n;
    base = base % modulus;
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1n; 
        base = (base * base) % modulus;
    }
    return result;
}

//DESZYFROWANIE

function decryptMessage(encryptedMessage, privateKey) {
    const nLength = privateKey.n.toString().length;
    let decryptedMessage = '';
    
    for (let i = 0; i < encryptedMessage.length; i += nLength) {
        const encryptedCharStr = encryptedMessage.slice(i, i + nLength);
        const encryptedChar = BigInt(encryptedCharStr);
        decryptedMessage += decryptChar(encryptedChar, privateKey);
    }
    
    return decryptedMessage;
}

function decryptChar(cryptedtext, privateKey) {
    const { d, n } = privateKey;
    const decryptedCode = modPow(cryptedtext, d, n);
    return String.fromCharCode(Number(decryptedCode));
}


function onlyDigits(str) {
    if (!/^\d+$/.test(str)) {
      alert("Zaszyfrowana wiadomość zawiera inne znaki niż cyfry.");
      return false;
    }
    return true;
  }



// SZYFROWANIE

//Przycisk szyfrowania

document.querySelector('.btn-szyfrowanie').addEventListener('click', function() {
    const originalText = document.querySelector('textarea').value;
    const output_encrypted = encryptMessage(originalText, keys.publicKey);
    document.querySelector('.szyfrowanie').innerText = output_encrypted;
    document.querySelector('.public_key_output').innerText = "e: " + keys.publicKey.e + ", n: "+ keys.publicKey.n;
    console.log(decryptMessage(output_encrypted,keys.privateKey));
    
});

//DESZYFROWANIE

// Przycisk deszyfrowania
document.querySelector('.btn-deszyfrowanie').addEventListener('click', function() {
    const cryptedText = document.querySelectorAll('textarea')[1].value;
    if(onlyDigits (cryptedText)){
        document.querySelector('.deszyfrowanie').innerText = decryptMessage(cryptedText,keys.privateKey);
    }
     
});


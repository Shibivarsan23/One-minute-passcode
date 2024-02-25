let user = document.getElementById('user');
let pass = document.getElementById('pass');
let temp_pass = '';
let size = 0;
let outputString = '';
const audio = new Audio('./siren-alert-96052.mp3');
// console.log(temp_pass);

function check() {
    if (size === 12 && temp_pass === pass.value) {
        alert('login succeeded');
    } else if (size === 4 && outputString === pass.value) { //ABCD
        alert('login succeeded');
    } else {
        audio.play();
        alert('Invalid passcode!');
    }
}

function process(len) {
    if (len == 12) {
        temp_pass = generatePass(len, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_');
        size = 12;
    } else if (len == 4) {
        temp_pass = generatePass(len, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        size = 4;
        let inputString = temp_pass;

        for (let i = 0; i < inputString.length; i++) {
            let charCode = inputString.charCodeAt(i);
            let newCharCode = charCode + 4; // Add 4 to the character code

            // Wrap around if newCharCode exceeds 'Z' (90)
            if (newCharCode > 90) {
                newCharCode -= 26;
            }

            let newChar = String.fromCharCode(newCharCode);
            outputString += newChar;
        }
    }
    // console.log(temp_pass);
    fetch('http://localhost:3000/call-node-function', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pass: temp_pass
            })
        }).then(res => res.json()).then(data => console.log(data))
        .catch(err => console.error(err));
}

function generatePass(len, charset) {
    let password = '';

    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}

function reset() {
    document.getElementById('user').value = "";
    document.getElementById('pass').value = "";
}
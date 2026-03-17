const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+[]{}";
const sliderRange = document.getElementById("password-length");
const currentLength = document.getElementById("slider-value");
const passwordLabel = document.getElementById("password-label");
const alert = document.getElementById("error-alert");
const strengthBar = document.getElementById("progress-bar");
const copyButton = document.getElementById("copy-button");
const commonWords = [
  "password",
  "admin",
  "123456",
  "qwerty",
  "letmein",
  "welcome",
];

sliderRange.oninput = function () {
  currentLength.innerHTML = this.value;
};

function genaratePassword(length, options) {
  let passwordStr = "";
  if (
    options.uppercase == false &&
    options.lowercase == false &&
    options.numbers == false &&
    options.symbols == false
  ) {
    alert.textContent = "Select at least one checkbox option.";
  } else {
    alert.textContent = "";
    let pool = "";

    if (options.uppercase) pool += UPPERCASE;
    if (options.lowercase) pool += LOWERCASE;
    if (options.numbers) pool += NUMBERS;
    if (options.symbols) pool += SYMBOLS;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      passwordStr += pool[randomIndex];
    }
  }
  return passwordStr;
}

function calculateStrength(password, options) {
  let countStrength = 0;
  if (password == "") {
    countStrength = 0;
    return countStrength;
  }
  //password length
  if (password.length < 6) countStrength += 3;
  if (password.length >= 6 && password.length < 9) countStrength += 5;
  if (password.length >= 9 && password.length < 12) countStrength += 10;
  if (password.length >= 12 && password.length < 17) countStrength += 17;
  if (password.length >= 17) countStrength += 25;

  //password char type
  console.log(countStrength);
  let countTypes = 0;
  if (options.uppercase) countTypes++;
  if (options.lowercase) countTypes++;
  if (options.symbols) countTypes++;
  if (options.numbers) countTypes++;

  if (countTypes === 4) countStrength += 25;
  if (countTypes === 3) countStrength += 15;
  if (countTypes === 2) countStrength += 10;
  if (countTypes === 1) countStrength += 5;

  //repeated char
  console.log(countStrength);
  let countRepeat = 1;
  let bigger = 1;
  for (let i = 1; i < password.length; i++) {
    if (password[i] == password[i - 1]) countRepeat++;
    else {
      if (countRepeat > bigger) bigger = countRepeat;
      countRepeat = 1;
    }
  }
  if (bigger == 1) countStrength += 25;
  if (bigger == 2) countStrength += 15;
  if (bigger == 3) countStrength += 5;
  if (bigger > 3) {
    countStrength += 0;
    alert.textContent = "lots of repeated characters";
  }

  //common words
  console.log(countStrength);
  let countCWord = 0;
  const lower = password.toLowerCase();
  for (let word of commonWords) {
    if (lower.includes(word)) {
      countCWord++;
      break;
    }
  }
  if (countCWord == 0) countStrength += 25;

  //validate
  console.log(countStrength);
  if (countStrength > 100) countStrength = 100;
  return countStrength;
}

document
  .getElementById("genarate-button")
  .addEventListener("click", function () {
    const options = {
      uppercase: document.getElementById("checkbox-1").checked,
      lowercase: document.getElementById("checkbox-2").checked,
      numbers: document.getElementById("checkbox-3").checked,
      symbols: document.getElementById("checkbox-4").checked,
    };

    let password = genaratePassword(currentLength.innerHTML, options);
    passwordLabel.value = password;
    let strength = calculateStrength(password, options);
    strengthBar.style.width = strength + "%";
    if (strength > 80) 
      strengthBar.style.backgroundColor = "green";
    else if (strength <= 80 && strength >= 40)
      strengthBar.style.backgroundColor = "yellow";
    else 
      strengthBar.style.backgroundColor = "red";
  });

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(passwordLabel.value);
    copyButton.innerText = "Copied";
    
    setTimeout(() => {
      copyButton.innerText = "Copy";
    }, 1500);
    
  } catch (err) {
    console.error(err);
  }
});
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

function generatePassword(length, options) {
  let passwordStr = "";
  if (
    options.uppercase == false &&
    options.lowercase == false &&
    options.numbers == false &&
    options.symbols == false
  ) {
    alert.innerHTML = '<span class="asterisk">*</span>Select at least one checkbox option.';
    passwordLabel.style.border = '1px solid var(--error-color)';
  } else {
    alert.textContent = "";
    passwordLabel.style.border = '1px solid var(--card-stroke)';
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
  if(!password) return 0;
  let countStrength = 0;

  const length = password.length;
  countStrength += Math.min(40, length * 4);

  let countTypes = 0;
  if (options.uppercase) countTypes++;
  if (options.lowercase) countTypes++;
  if (options.symbols) countTypes++;
  if (options.numbers) countTypes++;
  countStrength += countTypes * 5;
  
  //penalities
  if (length < 6) countStrength -= 40;
  else if (length < 8) countStrength -= 20;

  if (/^\d+$/.test(password)) countStrength -= 25;
  if (/123|234|345|abc|bcd|cde/i.test(password)) countStrength -= 20;
  if (/(.)\1{2,}/.test(password)) countStrength -= 20;
  if (/^(.{1,3})\1+$/.test(password)) countStrength -= 15;

  const lower = password.toLowerCase();
  for (let word of commonWords) {
    if (lower.includes(word)) {
      countStrength -= 30;
      break;
    }
  }

  countStrength = Math.max(10, Math.min(100, countStrength));
  const MAX_STRENGTH_OBSERVED = 60;
  countStrength = (countStrength / MAX_STRENGTH_OBSERVED) * 100;
  return countStrength;
}

function updateUI(strength){
      strengthBar.style.width = strength + "%";
    if (strength > 80) 
      strengthBar.style.backgroundColor = "green";
    else if (strength <= 80 && strength >= 40)
      strengthBar.style.backgroundColor = "yellow";
    else 
      strengthBar.style.backgroundColor = "red";
}

document
  .getElementById("generate-button")
  .addEventListener("click", function () {
    const options = {
      uppercase: document.getElementById("checkbox-1").checked,
      lowercase: document.getElementById("checkbox-2").checked,
      numbers: document.getElementById("checkbox-3").checked,
      symbols: document.getElementById("checkbox-4").checked,
    };

    let password = generatePassword(currentLength.innerHTML, options);
    passwordLabel.value = password;
    let strength = calculateStrength(password, options);
    updateUI(strength);
  });

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(passwordLabel.value);
    copyButton.innerText = "copied";
    
    setTimeout(() => {
      copyButton.innerText = "copy";
    }, 1500);
    
  } catch (err) {
    console.error(err);
  }
});

const radios = document.querySelectorAll('input[name="theme"]');

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    const theme = radio.value;
    document.documentElement.setAttribute('data-theme', theme);

    localStorage.setItem('theme', theme);
  });
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  radios.forEach(radio => {
    if(radio.value==savedTheme){
      radio.checked = true;
    }
  })
}

passwordLabel.addEventListener("input", () => {
  console.log("input");
  const currentPassword = passwordLabel.value;
  const options = {
      uppercase: document.getElementById("checkbox-1").checked,
      lowercase: document.getElementById("checkbox-2").checked,
      numbers: document.getElementById("checkbox-3").checked,
      symbols: document.getElementById("checkbox-4").checked,
    };
 let strength = calculateStrength(currentPassword,options);
 updateUI(strength);
});
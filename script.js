document.addEventListener("DOMContentLoaded", function () {
  const passwordDisplay = document.getElementById("password");
  const lengthSlider = document.getElementById("length");
  const lengthValue = document.getElementById("length-value");
  const uppercaseCheckbox = document.getElementById("uppercase");
  const lowercaseCheckbox = document.getElementById("lowercase");
  const numbersCheckbox = document.getElementById("numbers");
  const symbolsCheckbox = document.getElementById("symbols");
  const generateButton = document.getElementById("generate");
  const strengthCircle = document.querySelector(".strength-circle");
  const copyButton = document.getElementById("copy-btn");

  lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
  });

  function generatePassword(length, uppercase, lowercase, numbers, symbols) {
    let charset = "";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  function checkPasswordStrength(password) {
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+~`|}{[\]\:;?><,./-]/.test(password);

    let strength = 0;
    if (length >= 8) strength++;
    if (hasUppercase) strength++;
    if (hasLowercase) strength++;
    if (hasNumbers) strength++;
    if (hasSymbols) strength++;

    if (strength <= 2) return "weak";
    if (strength <= 4) return "medium";
    return "strong";
  }

  generateButton.addEventListener("click", () => {
    const length = parseInt(lengthSlider.value);
    const uppercase = uppercaseCheckbox.checked;
    const lowercase = lowercaseCheckbox.checked;
    const numbers = numbersCheckbox.checked;
    const symbols = symbolsCheckbox.checked;

    passwordDisplay.textContent = "";

    const password = generatePassword(
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    );
    passwordDisplay.textContent = password;

    const strength = checkPasswordStrength(password);
    if (strength === "weak") strengthCircle.style.backgroundColor = "red";
    else if (strength === "medium")
      strengthCircle.style.backgroundColor = "orange";
    else strengthCircle.style.backgroundColor = "green";
  });

  copyButton.addEventListener("click", () => {
    const password = passwordDisplay.textContent;
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    });
  });
});

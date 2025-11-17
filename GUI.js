//Get Elements

const inputSlider = document.getElementById("inputSlider");
const sliderValue = document.getElementById("sliderValue");
const passBox = document.getElementById("passBox");
const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("Uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtnEl = document.getElementById("getBtn");
const copyIcon = document.getElementById("copyIcon");
const togglePassword = document.getElementById("togglePassword");
const darkModeToggle = document.getElementById("darkModeToggle");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const entropyValue = document.getElementById("entropyValue");
const passwordCategories = document.getElementById("passwordCategories");
const passwordHistory = document.getElementById("passwordHistory");
const charCounter = document.getElementById("charCounter");
const avoidSimilarEl = document.getElementById("avoidSimilar");
const avoidWordsEl = document.getElementById("avoidWords");
const autoCopyEl = document.getElementById("autoCopy");
const modeBtns = document.querySelectorAll(".mode-btn");
const randomPasswordOptions = document.getElementById("randomPasswordOptions");
const memorablePasswordOptions = document.getElementById("memorablePasswordOptions");
const wordCountEl = document.getElementById("wordCount");
const separatorEl = document.getElementById("separator");
const capitalizeWordsEl = document.getElementById("capitalizeWords");
const addNumberEl = document.getElementById("addNumber");
const clearHistoryBtn = document.getElementById("clearHistory");
const exportPasswordsBtn = document.getElementById("exportPasswords");
const strengthRequirementsEl = document.getElementById("strengthRequirements");
const timeToCrackEl = document.getElementById("timeToCrack");

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!£$%^&*()_+[]<>?/;:-=,.{}`~@#";
const similarCharacters = "O0Il1";

// Word list of common words to avoid that can be modified or expanded
const commonWords = [
    "correct", "horse", "battery", "staple", "apple", "banana", "orange", "purple",
    "green", "blue", "red", "yellow", "mountain", "river", "ocean", "forest",
    "happy", "sunny", "cloudy", "rainy", "strong", "fast", "slow", "quiet",
    "loud", "soft", "hard", "light", "dark", "warm", "cold", "sweet",
    "sour", "bitter", "fresh", "stale", "new", "old", "young", "ancient",
    "dragon", "phoenix", "tiger", "eagle", "falcon", "wolf", "bear", "lion",
    "thunder", "lightning", "storm", "wind", "fire", "water", "earth", "sky",
    "silver", "golden", "crystal", "diamond", "ruby", "emerald", "sapphire", "pearl"
];

let passwordHistoryList = [];
const MAX_HISTORY = 10;

// The Focus Security: Use crypto.getRandomValues for cryptographically secure random numbers
const getSecureRandomInt = (max) => {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0] % max;
};

// Security: Secure random character selection
const getSecureRandomChar = (characters) => {
    return characters.charAt(getSecureRandomInt(characters.length));
};

// Initialize dark mode
const initializeDarkMode = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    darkModeToggle.checked = isDarkMode;
};

initializeDarkMode();

// Dark mode toggle
darkModeToggle.addEventListener('change', () => {
    const isDarkMode = darkModeToggle.checked;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', isDarkMode);
});

// Mode switching
modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        randomPasswordOptions.style.display = mode === 'random' ? 'block' : 'none';
        memorablePasswordOptions.style.display = mode === 'memorable' ? 'block' : 'none';
    });
});

// Slider value and character counter
const updateCounters = () => {
    sliderValue.textContent = inputSlider.value;
    charCounter.textContent = `${passBox.value.length} characters`;
};

inputSlider.addEventListener("input", updateCounters);

// Toggle password visibility
togglePassword.addEventListener("click", () => {
    const type = passBox.getAttribute("type") === "password" ? "text" : "password";
    passBox.setAttribute("type", type);
    togglePassword.innerHTML = type === "password" ? 
        '<i class="fas fa-eye"></i>' : 
        '<i class="fas fa-eye-slash"></i>';
});

// Calculate time to crack based on entropy
const calculateTimeToCrack = (entropy) => {
    
    // Assuming 1 billion guesses per second
    const guessesPerSecond = 1e9;
    const totalCombinations = Math.pow(2, entropy);
    const secondsToCrack = totalCombinations / (2 * guessesPerSecond);
    
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const year = day * 365;
    const century = year * 100;
    
    if (secondsToCrack < minute) {
        return `${Math.round(secondsToCrack)} seconds`;
    } else if (secondsToCrack < hour) {
        return `${Math.round(secondsToCrack / minute)} minutes`;
    } else if (secondsToCrack < day) {
        return `${Math.round(secondsToCrack / hour)} hours`;
    } else if (secondsToCrack < year) {
        return `${Math.round(secondsToCrack / day)} days`;
    } else if (secondsToCrack < century) {
        return `${Math.round(secondsToCrack / year)} years`;
    } else {
        return `${Math.round(secondsToCrack / century)} centuries`;
    }
};

// Complex password strength calculation
const calculatePasswordStrength = (password) => {
    if (!password || password.length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = 'Password Strength: None';
        entropyValue.textContent = 'Entropy: 0 bits';
        timeToCrackEl.textContent = 'Time to crack: N/A';
        return;
    }

    const result = zxcvbn(password);
    const score = result.score;
    const entropy = result.guesses_log10 * Math.LOG2E;

    let strengthClass, strengthMessage;
    if (score <= 1) {
        strengthClass = 'weak';
        strengthMessage = 'Weak';
        strengthBar.style.backgroundColor = 'var(--error-color)';
        strengthBar.style.width = '25%';
    } else if (score <= 2) {
        strengthClass = 'medium';
        strengthMessage = 'Medium';
        strengthBar.style.backgroundColor = 'var(--warning-color)';
        strengthBar.style.width = '50%';
    } else if (score <= 3) {
        strengthClass = 'strong';
        strengthMessage = 'Strong';
        strengthBar.style.backgroundColor = 'var(--success-color)';
        strengthBar.style.width = '75%';
    } else {
        strengthClass = 'very-strong';
        strengthMessage = 'Very Strong';
        strengthBar.style.backgroundColor = 'var(--success-color)';
        strengthBar.style.width = '100%';
    }

    strengthText.textContent = `Password Strength: ${strengthMessage}`;
    entropyValue.textContent = `Entropy: ${Math.round(entropy)} bits`;
    timeToCrackEl.textContent = `Time to crack: ${calculateTimeToCrack(entropy)}`;
    
    // Display warnings and suggestions
    displayStrengthRequirements(result);
    
    return { strengthClass, score, entropy };
};

// Display strength requirements and warnings
const displayStrengthRequirements = (result) => {
    strengthRequirementsEl.innerHTML = '';
    
    if (result.feedback.warning) {
        const warningEl = document.createElement('div');
        warningEl.className = 'requirement warning';
        warningEl.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${result.feedback.warning}`;
        strengthRequirementsEl.appendChild(warningEl);
    }
    
    result.feedback.suggestions.forEach(suggestion => {
        const suggestionEl = document.createElement('div');
        suggestionEl.className = 'requirement suggestion';
        suggestionEl.innerHTML = `<i class="fas fa-lightbulb"></i> ${suggestion}`;
        strengthRequirementsEl.appendChild(suggestionEl);
    });
};

// Password categories display
const updatePasswordCategories = (password) => {
    const categories = {
        uppercase: (password.match(/[A-Z]/g) || []).length,
        lowercase: (password.match(/[a-z]/g) || []).length,
        numbers: (password.match(/[0-9]/g) || []).length,
        symbols: (password.match(/[^A-Za-z0-9]/g) || []).length
    };

    Object.entries(categories).forEach(([category, count]) => {
        const element = passwordCategories.querySelector(`.${category}`);
        if (element) {
            element.textContent = `${count} ${category}`;
        }
    });
};

// Focus: random password generation with better distribution
const generateRandomPassword = () => {
    const length = parseInt(inputSlider.value);
    let characters = "";
    let password = "";
    let requiredChars = [];

    // Build character set and ensure at least one of each selected type
    if (lowercaseEl.checked) {
        characters += lowercaseLetters;
        requiredChars.push(getSecureRandomChar(lowercaseLetters));
    }
    if (uppercaseEl.checked) {
        characters += uppercaseLetters;
        requiredChars.push(getSecureRandomChar(uppercaseLetters));
    }
    if (numbersEl.checked) {
        characters += numbers;
        requiredChars.push(getSecureRandomChar(numbers));
    }
    if (symbolsEl.checked) {
        characters += symbols;
        requiredChars.push(getSecureRandomChar(symbols));
    }

    if (avoidSimilarEl.checked) {
        characters = characters.split('').filter(char => !similarCharacters.includes(char)).join('');
    }

    if (characters === "") {
        showNotification("Please select at least one character type!", "error");
        return null;
    }

    // Ensure password has at least one of each selected character type
    while (password.length < length - requiredChars.length) {
        password += getSecureRandomChar(characters);
    }

    // Add required characters
    password += requiredChars.join('');

    // Shuffle the password using Fisher-Yates algorithm with secure random
    password = shuffleString(password);

    if (avoidWordsEl.checked) {
        const containsCommonWord = commonWords.some(word => 
            password.toLowerCase().includes(word.toLowerCase())
        );
        if (containsCommonWord) {
            return generateRandomPassword();
        }
    }

    return password;
};

// Security: Secure shuffle using crypto.getRandomValues
const shuffleString = (str) => {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = getSecureRandomInt(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
};

// Enhanced memorable password generation
const generateMemorablePassword = () => {
    const wordCount = parseInt(wordCountEl.value);
    const separator = separatorEl.value;
    const capitalize = capitalizeWordsEl.checked;
    const addNumber = addNumberEl.checked;

    let words = [];
    const usedWords = new Set();
    
    // Ensure unique words
    while (words.length < wordCount) {
        const word = commonWords[getSecureRandomInt(commonWords.length)];
        if (!usedWords.has(word)) {
            usedWords.add(word);
            let finalWord = word;
            if (capitalize) {
                finalWord = word.charAt(0).toUpperCase() + word.slice(1);
            }
            words.push(finalWord);
        }
    }

    let password = words.join(separator);
    if (addNumber) {
        const randomNum = getSecureRandomInt(9000) + 1000;
        password += separator + randomNum;
    }

    return password;
};

// Tried to improve notification system
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Add password to history with encryption flag
const addToHistory = (password) => {
    if (password && !passwordHistoryList.includes(password)) {
        passwordHistoryList.unshift(password);
        if (passwordHistoryList.length > MAX_HISTORY) {
            passwordHistoryList.pop();
        }
        // Security: Store with timestamp
        const historyWithMetadata = passwordHistoryList.map(pass => ({
            password: pass,
            timestamp: Date.now()
        }));
        localStorage.setItem('passwordHistory', JSON.stringify(historyWithMetadata));
        updateHistoryDisplay();
    }
};

// Load password history from localStorage
const loadPasswordHistory = () => {
    const savedHistory = localStorage.getItem('passwordHistory');
    if (savedHistory) {
        try {
            const parsed = JSON.parse(savedHistory);
            // Handle both old and new format
            if (Array.isArray(parsed) && parsed.length > 0) {
                if (typeof parsed[0] === 'string') {
                    passwordHistoryList = parsed;
                } else {
                    passwordHistoryList = parsed.map(item => item.password);
                }
            }
            updateHistoryDisplay();
        } catch (e) {
            console.error('Failed to load password history:', e);
            passwordHistoryList = [];
        }
    }
};

// history display with delete buttons
const updateHistoryDisplay = () => {
    passwordHistory.innerHTML = '';
    passwordHistoryList.forEach((pass, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const passText = document.createElement('span');
        passText.textContent = pass;
        passText.className = 'history-password';
        passText.addEventListener('click', () => {
            passBox.value = pass;
            calculatePasswordStrength(pass);
            updatePasswordCategories(pass);
            updateCounters();
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-history-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteHistoryItem(index);
        });
        
        historyItem.appendChild(passText);
        historyItem.appendChild(deleteBtn);
        passwordHistory.appendChild(historyItem);
    });
};

// Delete single history item
const deleteHistoryItem = (index) => {
    passwordHistoryList.splice(index, 1);
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistoryList));
    updateHistoryDisplay();
    showNotification('Password removed from history', 'success');
};

// Clear all history
const clearHistory = () => {
    if (passwordHistoryList.length === 0) {
        showNotification('History is already empty', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to clear all password history?')) {
        passwordHistoryList = [];
        localStorage.removeItem('passwordHistory');
        updateHistoryDisplay();
        showNotification('Password history cleared', 'success');
    }
};

// Export passwords to encrypted file
const exportPasswords = () => {
    if (passwordHistoryList.length === 0) {
        showNotification('No passwords to export', 'warning');
        return;
    }
    
    const exportData = {
        exportDate: new Date().toISOString(),
        passwords: passwordHistoryList
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `password-export-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Passwords exported successfully', 'success');
};

// Enhanced copy with security
const copyPassword = async () => {
    if (!passBox.value || passBox.value.length === 0) {
        showNotification("Please generate a password first!", "warning");
        return;
    }
    
    try {
        await navigator.clipboard.writeText(passBox.value);
        const tooltip = copyIcon.querySelector('.tooltip');
        tooltip.style.opacity = '1';
        tooltip.textContent = 'Copied!';
        
        // Security: Clear clipboard after 60 seconds
        setTimeout(() => {
            navigator.clipboard.writeText('');
        }, 60000);
        
        setTimeout(() => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                tooltip.textContent = 'Copy';
            }, 300);
        }, 1000);
        
        showNotification('Password copied to clipboard (will clear in 60s)', 'success');
    } catch (error) {
        console.error("Failed to copy text: ", error);
        showNotification("Failed to copy password", "error");
    }
};

// Generate button click handler
generateBtnEl.addEventListener("click", () => {
    const activeMode = document.querySelector('.mode-btn.active').dataset.mode;
    const password = activeMode === 'random' ? generateRandomPassword() : generateMemorablePassword();
    
    if (password) {
        passBox.value = password;
        passBox.classList.add('generated');
        setTimeout(() => passBox.classList.remove('generated'), 300);
        
        calculatePasswordStrength(password);
        updatePasswordCategories(password);
        updateCounters();
        addToHistory(password);

        if (autoCopyEl.checked) {
            copyPassword();
        }
    }
});

// Real-time password analysis when typing
passBox.addEventListener('input', () => {
    if (passBox.value.length > 0) {
        calculatePasswordStrength(passBox.value);
        updatePasswordCategories(passBox.value);
        updateCounters();
    }
});

// Copy password
copyIcon.addEventListener("click", copyPassword);

// Clear history button
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", clearHistory);
}

// Export passwords button
if (exportPasswordsBtn) {
    exportPasswordsBtn.addEventListener("click", exportPasswords);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + G to generate password
    if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        generateBtnEl.click();
    }
    // Ctrl/Cmd + C to copy (when password box is focused)
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement === passBox) {
        copyPassword();
    }
});

// Security: Warn before closing if password is in clipboard
window.addEventListener('beforeunload', (e) => {
    if (passBox.value.length > 0) {
        // Clear any sensitive data
        passBox.value = '';
    }
});

// Initialize
loadPasswordHistory();
updateCounters();

// Security: Auto-generate on first load
if (!passBox.value) {
    generateBtnEl.click();
}
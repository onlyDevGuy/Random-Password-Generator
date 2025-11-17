# Secure Password Generator - ReadMe

## Overview

Secure Password Generator is a modern, feature-rich web application designed to create strong and secure passwords. Built with a focus on security and user experience, this tool helps users generate both random passwords and memorable passphrases while providing real-time security analysis.

## Features

### 🔒 Security Features
- **Cryptographically Secure Generation**: Uses `crypto.getRandomValues` for true randomness
- **Real-time Strength Analysis**: Integrated with zxcvbn library for accurate password strength assessment
- **Entropy Calculation**: Displays password complexity in bits
- **Time-to-Crack Estimation**: Shows estimated time required to brute-force the password
- **Auto-clear Clipboard**: Automatically clears copied passwords after 60 seconds
- **Content Security Policy**: Enhanced security headers

### 🎯 Password Generation Modes
- **Random Password Generator**:
  - Customizable length (8-64 characters)
  - Include/exclude character types (lowercase, uppercase, numbers, symbols)
  - Avoid similar characters (O0, Il1)
  - Dictionary word avoidance
  - Auto-copy option

- **Memorable Passphrase Generator**:
  - 3-7 word combinations
  - Custom separators (hyphen, dot, underscore, space, none)
  - Word capitalization options
  - Number addition
  - Uses curated word list for better memorability

### 📊 Security Analysis
- **Visual Strength Indicator**: Color-coded strength bar
- **Detailed Metrics**: 
  - Password strength rating (Weak to Very Strong)
  - Entropy calculation
  - Time-to-crack estimation
  - Character type breakdown
- **Real-time Feedback**: Suggestions and warnings based on password analysis

### 🎨 User Experience
- **Dark/Light Mode**: Toggle between themes with persistent settings
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Password History**: Stores up to 10 recently generated passwords
- **One-click Copy**: Easy copying with visual feedback
- **Keyboard Shortcuts**:
  - Ctrl/Cmd + G: Generate new password
  - Ctrl/Cmd + C: Copy password (when focused)

### 📁 Additional Features
- **Password Export**: Export history to JSON file
- **History Management**: View, reuse, and delete saved passwords
- **Security Tips**: Built-in security best practices
- **Accessibility**: Screen reader friendly with proper ARIA labels

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Security**: zxcvbn password strength library
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Material Icons)
- **Storage**: LocalStorage for settings and history

## Security Considerations

### ✅ Implemented Security Measures
- Cryptographically secure random number generation
- No external password transmission
- Client-side only processing
- Secure clipboard management
- Content Security Policy headers
- XSS protection through proper sanitization

### ⚠️ Important Notes
- Passwords are generated and stored locally in your browser
- No data is sent to external servers
- Password history is stored in browser localStorage
- Exported files contain plain text passwords - handle with care

## Installation & Usage

### Quick Start
1. Download all project files:
   - `index.html`
   - `style.css` 
   - `GUI.js`

2. Open `index.html` in a modern web browser

### No Installation Required
This is a client-side application that runs entirely in your browser. No server setup or dependencies required beyond the included files.

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

*Note: Requires support for ES6 features and Crypto API*

## File Structure

```
password-generator/
│
├── index.html          # Main application file
├── style.css           # Styles and themes
├── GUI.js             # Application logic and functionality
└── README.md          # This file
```

## Usage Instructions

### Generating Random Passwords
1. Select "Random Password" mode
2. Adjust length using the slider (8-64 characters)
3. Choose character types to include
4. Enable additional security options as needed
5. Click "Generate Password"

### Creating Memorable Passphrases
1. Select "Memorable Passphrase" mode  
2. Choose number of words (3-7)
3. Select word separator
4. Enable capitalization and number options
5. Click "Generate Password"

### Managing Password History
- Click any history item to reuse that password
- Use trash icon to remove individual passwords
- "Clear All" removes entire history
- "Export" saves history as JSON file

## Privacy & Data Handling

- All password generation happens locally in your browser
- Password history is stored only in your browser's localStorage
- No analytics or tracking scripts
- No external API calls
- You maintain full control over your data

## Contributing

This is a standalone project. For security reasons, please exercise caution when modifying the cryptographic functions.

## License

This project is provided for educational and personal use. Please ensure compliance with local laws and regulations regarding password security tools.

## Security Recommendations

1. **Use Unique Passwords**: Generate different passwords for each service
2. **Enable 2FA**: Use two-factor authentication where available  
3. **Regular Updates**: Change important passwords periodically
4. **Password Manager**: Consider using a dedicated password manager for storage
5. **Secure Storage**: Keep exported password files encrypted and secure

## Support

For issues or questions:
1. Ensure you're using a supported browser
2. Check that JavaScript is enabled
3. Verify all project files are in the same directory
4. Clear browser cache if experiencing display issues

---

*Remember: While this tool generates secure passwords, overall account security depends on multiple factors including password storage, transmission security, and user practices.*

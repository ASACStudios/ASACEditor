# ASAC Editor

A lightweight, modern, browser‑based text editor for `.txt` files.  
No installation, no backend, no data collection — everything runs locally in your browser.

---

## 🌐 Live Demo

Use the editor instantly here:

👉 https://asacstudios.github.io/ASACEditor/

---

## ✨ Features

- Upload `.txt` files via file picker or drag & drop  
- Edit text directly in the browser  
- Save changes as a downloadable `.txt` file  
- Copy text to clipboard  
- Clear the editor with one click  
- Keyboard shortcut: Ctrl/Cmd + S to save  
- Character counter with live updates  
- Toast notifications for actions (loaded, saved, copied, etc.)  
- Responsive, modern UI with smooth interactions  

---

## 🚀 Getting Started

Clone the repository:

git clone https://github.com/ASACStudios/ASACEditor.git
cd ASACEditor

Open `index.html` in any modern browser — that’s it.

No build steps.  
No dependencies.  
No server required.

---

## 📁 Project Structure

ASACEditor/
├─ index.html      # Main application UI
├─ styles.css      # Styling and layout
├─ app.js          # Editor logic and interactions
└─ assets/         # Optional assets (icons, images)

---

## 🧠 How It Works

### Loading Files
- Accepts `.txt` files only  
- Uses the FileReader API to load content into the editor  
- Drag & drop supported

### Editing
- Text is displayed in a `<textarea>`  
- Character count updates automatically  
- Buttons enable/disable based on content state

### Saving
- Creates a Blob and triggers a download  
- Ensures the filename ends with `.txt`

### Keyboard Shortcuts
- Ctrl/Cmd + S triggers the save action

---

## 🔧 Technologies Used

- HTML5  
- CSS3  
- Vanilla JavaScript  
- 100% client‑side

---

## 🤝 Contributing

Contributions are welcome.  
Ideas for future improvements include:

- Dark mode  
- Autosave  
- Markdown support  
- Additional file formats  
- Mobile UI enhancements  

Feel free to open issues or submit pull requests.

---

## 📜 License

This Project have a GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007

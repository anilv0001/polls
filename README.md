# Poll Widget

## Description
A lightweight, reusable poll widget that allows users to vote on pre-configured questions. Results are stored in `localStorage` and scoped by page to avoid conflicts.

## Features
- Dynamic poll rendering.
- LocalStorage-based persistence.
- Reset votes functionality.
- Page-specific scoping to handle duplicate poll IDs across pages.
- Responsive design with customizable styles.

## Usage

### Installation
1. Clone the repository or download the files.
2. Include `pollWidget.js` and `styles.css` in your project.

### Example

HTML:
```html
<div id="poll1"></div>
<div id="poll2"></div>
<script src="pollWidget.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        PollWidget(
            document.getElementById("poll1"),
            "poll1",
            "How do you feel today?",
            ["Brilliant! I have so much energy", "Always can be worse.", "Please, end my misery."]
        );
    });
</script>

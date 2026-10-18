
document.addEventListener("DOMContentLoaded", function () {
    const noteText = document.getElementById("note-text");
    const charCount = document.getElementById("char-count");
    const wordCount = document.getElementById("word-count");
    const clearBtn = document.getElementById("clear-btn");
    const themeToggle = document.getElementById("theme-toggle");

    if (!noteText || !charCount || !wordCount || !clearBtn || !themeToggle) {
        console.error("Some HTML elements are missing. Check the IDs in index.html.");
        return;
    }

    function updateCounts() {
        const text = noteText.value;
        const characters = text.length;
        const trimmedText = text.trim();

        const words = trimmedText === ""
            ? 0
            : trimmedText.split(/\s+/).length;

        charCount.textContent = characters + " / 200 characters";
        wordCount.textContent = words + " words";

        charCount.classList.remove("warning", "over");

        if (characters > 200) {
            charCount.classList.add("over");
        } else if (characters > 180) {
            charCount.classList.add("warning");
        }
    }

    noteText.addEventListener("input", function () {
        updateCounts();
        localStorage.setItem("noteDraft", noteText.value);
    });

    function clearNote() {
        noteText.value = "";
        updateCounts();
        localStorage.removeItem("noteDraft");
    }

    clearBtn.addEventListener("click", clearNote);

    noteText.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            clearNote();
        }
    });

    function setTheme(isDark) {
        document.body.classList.toggle("dark", isDark);
        themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
        localStorage.setItem("noteTheme", isDark ? "dark" : "light");
    }

    themeToggle.addEventListener("click", function () {
        const isDark = !document.body.classList.contains("dark");
        setTheme(isDark);
    });

    const savedDraft = localStorage.getItem("noteDraft");

    if (savedDraft !== null) {
        noteText.value = savedDraft;
    }

    const savedTheme = localStorage.getItem("noteTheme");
    const isDark = savedTheme === "dark";

    document.body.classList.toggle("dark", isDark);
    themeToggle.textContent = isDark ? "Light mode" : "Dark mode";

    updateCounts();
});

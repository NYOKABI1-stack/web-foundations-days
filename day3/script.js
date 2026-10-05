let notes= [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];
function searchNotes(word) {
  return notes.filter(note =>
    note.text.toLowerCase().includes(word.toLowerCase())
  );
}
console.log(searchNotes("day"));
console.log(searchNotes("pizza"));
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (let note of notes) {
    if (note.text.length > longest.text.length) {
      longest = note;
    }
  }

  return longest;
}
console.log(longestNote());
let savedNotes = notes;
notes = [];
console.log(longestNote());
notes = savedNotes;
function countByCategory() {
  let counts = {};

  for (let note of notes) {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }

  return counts;
}
console.log(countByCategory()); // Expected: { personal: 2, study: 2, work: 1 }

let savedNotes2 = notes;
notes = [];
console.log(countByCategory()); // Expected: {}
notes = savedNotes2;
function getSummary() {
  let counts = countByCategory();
  let total = notes.length;
  let word = total === 1 ? "note" : "notes";

  return `${total} ${word}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}
console.log(getSummary()); // Expected: "5 notes: 2 personal, 1 work, 2 study."

let savedNotes3 = notes;
notes = [{ id: 6, text: "Test note", category: "personal" }];
console.log(getSummary()); // Expected: "1 note: 1 personal, 0 work, 0 study."
notes = savedNotes3;
function isDuplicate(text) {
  return notes.some(note =>
    note.text.trim().toLowerCase() === text.trim().toLowerCase()
  );
}
console.log(isDuplicate("Call mum"));
console.log(isDuplicate("  CALL MUM  "));
console.log(isDuplicate("Go to the gym"));
function addNote(text, category) {
  if (text.trim().length < 1 || text.trim().length > 200) {
    console.log("Note must be between 1 and 200 characters.");
    return false;
  }

  if (isDuplicate(text)) {
    console.log("Note is a duplicate.");
    return false;
  }

  if (!["personal", "work", "study"].includes(category)) {
    console.log("Invalid category.");
    return false;
  }

  let newNote = {
    id: notes.length + 1,
    text: text.trim(),
    category: category
  };

  notes.push(newNote);
  return true;
}
console.log(addNote("Buy a new notebook", "personal"));

console.log(addNote("Call mum", "personal"));

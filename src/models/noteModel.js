let notes = [];
let idCounter = 1;

class NoteModel {
  static create(note) {
    const newNote = { id: idCounter++, ...note };
    notes.push(newNote);
    return newNote;
  }

  static findAll() {
    return notes;
  }

  static findById(id) {
    return notes.find(n => n.id === id);
  }

  static update(id, updatedNote) {
    const index = notes.findIndex(n => n.id === id);
    if (index === -1) return null;
    notes[index] = { ...notes[index], ...updatedNote };
    return notes[index];
  }

  static delete(id) {
    const index = notes.findIndex(n => n.id === id);
    if (index === -1) return null;
    return notes.splice(index, 1)[0];
  }
}

module.exports = NoteModel;

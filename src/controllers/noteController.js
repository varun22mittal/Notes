const Note = require("../models/noteModel");
const validateNote = require("../utils/validateNote");

exports.createNote = (req, res, next) => {
  try {
    const { error } = validateNote(req.body);
    if (error) return res.status(400).json({ message: error });

    const note = Note.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

exports.getNotes = (req, res, next) => {
  try {
    res.json(Note.findAll());
  } catch (err) {
    next(err);
  }
};

exports.getNoteById = (req, res, next) => {
  try {
    const note = Note.findById(Number(req.params.id));
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

exports.updateNote = (req, res, next) => {
  try {
    const { error } = validateNote(req.body);
    if (error) return res.status(400).json({ message: error });

    const note = Note.update(Number(req.params.id), req.body);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

exports.deleteNote = (req, res, next) => {
  try {
    const note = Note.delete(Number(req.params.id));
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted", note });
  } catch (err) {
    next(err);
  }
};

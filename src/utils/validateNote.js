function validateNote(data) {
  if (!data.title) return { error: "Title is required" };
  if (data.title.length < 3) return { error: "Title must be at least 3 characters" };
  return {};
}

module.exports = validateNote;

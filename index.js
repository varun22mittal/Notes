const app = require("./src/app");

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

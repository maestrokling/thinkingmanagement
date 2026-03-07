const fs = require("fs");
const path = require("path");

module.exports = function () {
  let medium = [];
  let linkedin = [];

  const mediumPath = path.join(__dirname, "medium.json");
  if (fs.existsSync(mediumPath)) {
    medium = JSON.parse(fs.readFileSync(mediumPath, "utf8")).map((p) => ({
      ...p,
      source: "Medium",
    }));
  }

  const linkedinPath = path.join(__dirname, "linkedin-posts.json");
  if (fs.existsSync(linkedinPath)) {
    linkedin = JSON.parse(fs.readFileSync(linkedinPath, "utf8")).map((p) => ({
      ...p,
      source: "LinkedIn",
    }));
  }

  const all = [...medium, ...linkedin].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return all;
};

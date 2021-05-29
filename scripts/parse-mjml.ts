import mjml from "mjml";

const fs = require("fs");
const path = require("path");

const mjmlFolder = path.join(__dirname, "../src/email/mjml");

fs.readdir(mjmlFolder, (err: Error, files: string[]) => {
  if (err) {
    return console.error(err);
  }
  let hbs;
  let fileContent;

  const mjmlPath = path.join(__dirname, "../src/email/mjml");

  files.forEach(file => {
    if (!file.endsWith('.mjml')) {
      return;
    }
    console.warn("Template: " + file);
    fileContent = fs.readFileSync(path.join(mjmlPath, file));
    fileContent = mjml(fileContent.toString(), { filePath: mjmlPath });
    hbs = path.join(__dirname, "../src/email/hbs/" + file.replace(".mjml", ".hbs"));
    fs.writeFileSync(hbs, fileContent.html);
  });
});

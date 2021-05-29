import * as Handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";

import mailer from "./mailer";

const test = async (data: { name: string }) => {
  const template = "test";
  const templatePath = path.join(__dirname, "hbs/" + template + ".hbs");
  const templateContent: any = fs.readFileSync(templatePath);
  const html = Handlebars.compile(templateContent.toString())(data);

  const text = `Hello ${data.name}`;

  const info = await mailer.sendMail({
    from: '"Chickadee" <chickadee@gmail.com>', // sender address
    to: "dee@chickadee.fi", // list of receivers
    subject: "Welcome to Chickadee", // Subject line
    text, // plain text body
    html,
  });

  return info;
}

export default test;

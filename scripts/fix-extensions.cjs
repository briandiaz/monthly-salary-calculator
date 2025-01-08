const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "../dist");

// Recursively fix .js imports
const fixExtensions = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixExtensions(fullPath);
    } else if (file.endsWith(".js")) {
      let content = fs.readFileSync(fullPath, "utf-8");
      content = content.replace(/from "(\.\/[^"]+)"/g, 'from "$1.js"');
      fs.writeFileSync(fullPath, content, "utf-8");
    }
  }
};

fixExtensions(distDir);

const JSZip = require("jszip");
const fs = require("fs");

// Function to modify EPUB content by replacing specific phrases
async function modifyEPUB(epubPath, originalPhrase, newPhrase) {
  const zip = new JSZip();
  const epubData = fs.readFileSync(epubPath);
  await zip.loadAsync(epubData);

  const regex = new RegExp(originalPhrase, "g"); // Match the exact phrase
  console.log({ regex });
  let counter = 0;

  for (const [relativePath, file] of Object.entries(zip.files)) {
    if (relativePath.endsWith(".xhtml") || relativePath.endsWith(".html")) {
      const content = await file.async("text");
      const modifiedContent = content.replace(regex, newPhrase);
      if (content !== modifiedContent) {
        console.log("Changed ", counter);
      }
      console.log({ relativePath });
      zip.file(relativePath, modifiedContent); // Replace content
      counter++;
    }
  }

  // Re-save the modified EPUB file
  const newEpubData = await zip.generateAsync({ type: "nodebuffer" });
  fs.writeFileSync("modified.epub", newEpubData);

  console.log("Done");
}

// Usage example
modifyEPUB("./DemonLord.epub", "Master Demon Lord", "Demon Lord-sama");

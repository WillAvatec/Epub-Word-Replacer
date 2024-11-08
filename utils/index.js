function getFileName(pathName) {
  const pathArr = pathName.match(/(.*?)\.epub/);
  const title = pathArr[1];
  return title;
}

async function modifyTextFromFile(zip, originalPhrase, newPhrase) {
  const regex = new RegExp(originalPhrase, "g"); // Match the exact phrase
  let counter = 0;

  for (const [relativePath, file] of Object.entries(zip.files)) {
    if (relativePath.endsWith(".xhtml") || relativePath.endsWith(".html")) {
      const content = await file.async("text");
      const modifiedContent = content.replace(regex, newPhrase);
      if (content !== modifiedContent) {
        console.log("Changed ", counter);
        console.log({ regex });
      }
      zip.file(relativePath, modifiedContent); // Replace content
      counter++;
    }
  }
}

async function replaceMisterWithSan(zip) {
  for (const [relativePath, file] of Object.entries(zip.files)) {
    if (relativePath.endsWith(".xhtml") || relativePath.endsWith(".html")) {
      const content = await file.async("text");
      const modifiedContent = content.replace(/\bMister (\w+)\b/g, '$1-san');
      zip.file(relativePath, modifiedContent); // Replace content
    }
  }
}

module.exports = {
  getFileName,
  modifyTextFromFile,
  replaceMisterWithSan
};
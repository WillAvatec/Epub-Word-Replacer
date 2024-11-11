const JSZip = require("jszip");
const fs = require("fs");
const { getFileName, modifyTextFromFile, replaceMisterWithSan } = require('./utils');

// Function to modify EPUB content by replacing specific phrases
async function modifyEPUB(epubPath, strObj) {
  const zip = new JSZip();
  const epubData = fs.readFileSync(epubPath);
  await zip.loadAsync(epubData);

  for(const [original, newPhrase] of Object.entries(strObj)){
    await modifyTextFromFile(zip,original,newPhrase);
  }
  await replaceMisterWithSan(zip);

  const fileName = getFileName(epubPath);

  // Re-save the modified EPUB file
  const newEpubData = await zip.generateAsync({ type: "nodebuffer" });
  fs.writeFileSync(`${fileName} modified.epub`, newEpubData);

  console.log("Done");
}

// Usage example
const fileName = "Demon Lord, Retry! - 05 -- Kanzaki, Kurone -- Demon Lord, Retry! #5, 2020 -- J-Novel Club -- 9ffab786ee29206200ffa71125e55297 -- Anna’s Archive.epub";
const textToModify = {
  "Mister Secretary":"Chief-dono",
  "Demon Lord" : "Maou",
  "Secretary" : "Chief",
  "Lady Luna" : "Luna-sama",
  "Lady White": "White-sama",
  "Lady Queen": "Queen-sama",
  "Lady Aku" : "Aku-sama",
  "Hoppity": "Pyon",
  "hoppity": "pyon",
  "Hippity":"Usa",
  "hippity":"usa",
  "meow":"nyan",
  "old man" : "oyaji",
  "Old man" : "Oyaji",
  "Sniff" : "Kun",
  "sniff" : "Kun",
  "Sniffity": "Sun",
  "sniffity" : "Sun",
  "Little Luna" : "Luna-chan",
  "Little Eagle" : "Eagle-chan",
  "Little Tron" : "Tron-chan",
  "Little Aku" : "Aku-chan",
  "Sister Luna" : "Luna-neesama",
  "Sister White" : "White-neesama",
  "Sister Queen" : "Queen-neesan",
  "Animadmirals" : "Beast Generals",
}

let args = process.argv.slice(2) ?? null;
console.log({args})

if(args != null){
  modifyEPUB(args[0], textToModify);
}else {
  modifyEPUB(fileName,textToModify);
}
import fs from "fs/promises";

async function readingFile(){
    let read = await fs.readFile('./suhail.json',"utf-8");
    console.log(read, typeof read); // string
    
    let stringToObject = JSON.parse(read);
    console.log(stringToObject,typeof stringToObject);
    

}




readingFile()
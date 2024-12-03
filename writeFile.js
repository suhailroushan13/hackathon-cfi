import fs from "fs/promises";

async function writeFile(){

    let data = "please add this data"

    await fs.writeFile("./likho.txt",data)

}

writeFile()
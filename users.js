import fs from "fs";
import readline from "readline-sync";

const dbFile = "db.json";

function readDB() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({ users: [] }, null, 2));
  }
  const data = fs.readFileSync(dbFile, "utf-8");
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

export async function registerUser() {
  const db = readDB();
  const username = readline.question("Enter a username: ");
  const password = readline.question("Enter a password: ", { hideEchoBack: true });
  const userExists = db.users.find((user) => user.username === username);


  console.log("=======================  THIS IS WHAT U FOUND in DB ==============");
  

  console.log(userExists);

  console.log("=========================================================");
  
  

  if (userExists) {
    console.log("User already exists! Please choose a different username.");
    return;
  }

  

  db.users.push({ username, password, todos: [] });
  writeDB(db);
  console.log("User registered successfully!");
}

export async function loginUser() {
  const db = readDB();
  const username = readline.question("Enter your username: ");
  const password = readline.question("Enter your password: ", { hideEchoBack: true });
  const user = db.users.find((u) => u.username === username && u.password === password);
  // console.log(user);
  

  if (user) {
    console.log("Login successful!");
    // console.log(user);
    
    return user;
  } else {
    console.log("Invalid credentials! Please try again.");
    return null;
  }
}

export async function deleteUser(loggedInUser) {
  if (!loggedInUser) {
    console.log("You need to log in first!");
    return;
  }

  const db = readDB();
  const userIndex = db.users.findIndex((u) => u.username === loggedInUser.username);

  if (userIndex > -1) {
    db.users.splice(userIndex, 1);
    writeDB(db);
    console.log("User deleted successfully!");
  } else {
    console.log("User not found!");
  }
}

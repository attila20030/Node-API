import sqlite from "sqlite3";

const db = new sqlite.Database("./data/database.sqlite");

async function initialize(){
  await dbRun("DROP TABLE IF EXISTS products");
  await dbRun("CREATE TABLE IF NOT EXISTS products ( id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, brand STRING, description STRING, price INTEGER) ");

  await dbRun('INSERT INTO products(id, name, brand, description, price) VALUES (1,"Start Wars Millennium Falcon","Lego","LEGO - for adults, recommended for ages 18 and up, LEGO® Star Wars series, release year 2024, pack of 921 building blocks",23760)');
  await dbRun('INSERT INTO products(id, name, brand, description, price) VALUES (2,"játék repülő","játék","Szórakoztató repülő játék gyerekeknek",12500)');
  await dbRun('INSERT INTO products(id, name, brand, description, price) VALUES (3,"Jenga","társasjáték","Szórakoztató társasjáték az egész családnak",2000)');
}

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params,(err,row) =>{
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params,(err,rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}


export{db,dbRun,dbGet,dbAll,initialize}
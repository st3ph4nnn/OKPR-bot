const Borgoose = require('borgoose');
const request = require('request');
const fs = require('fs');
const db = new Borgoose("database/userDB.json", { syncOnWrite: true });

const scheme = {
  'balance': 0,
  'xp': 0,
  'level': 0,

  'weeklyxp': 0,
  'starboard': 0,
  'nerdboard': 0,
  'trollboard': 0
};

let timer = 1;

setInterval(() => {
  timer++;

  if (timer == 60) {
    try {
          request.post({ url:process.env.UPLOAD_URL, formData: {
            file: fs.createReadStream('database/userDB.json')
          } }, function callback( error, response, body ) {
              if (!error && response.statusCode == 200) {
                  return true;
              }
          });
      } catch(err) {
        console.log("[server upload] error: " + err);
    }

    timer = 0;
  } 
}, 1000);

class DatabaseUser {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  async check_user() {
    timer = 1;
    const exists = await db.findOne({ id: this.id });

    if (exists !== undefined) {
        db.updateOne({id: this.id}, {username: this.name});
        return;
    }

    db.insertOne({id: this.id, username: this.name, ...scheme});
  }

  async set(key, val) {
    timer = 1;
    try {
      db.updateOne({id: this.id}, {[key]: val});
    } catch (err) {
      throw err;
    }
  }

  async get(key) {
    timer = 1;
    const value = await db.findOne({id: this.id});  
    return value[key];
  }

  async add(key, val) {
    timer = 1;
    const value = await db.findOne({id: this.id});
    if (value === undefined) { this.check_user(); return; }

    if (value[key] === undefined)
      value[key] = 0;

    let sum = value[key] + val;
    db.updateOne({id: this.id}, {[key]: sum});
  }

  async sub(key, val) {
    timer = 1;
    const value = await db.findOne({id: this.id});  
    if (value === undefined) { this.check_user(); return; }

    if (value[key] === undefined)
      value[key] = 0;

    let sum = value[key] - val;
    db.updateOne({id: this.id}, {[key]: sum});
  }
}

module.exports = { Database: db, DatabaseUser: DatabaseUser }
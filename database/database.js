const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

await delay(5000);

const { client } = require('../index');
const db = client.db;

const scheme = {
  'balance': 0,
  'xp': 0,
  'level': 0,

  'weeklyxp': 0,
  'starboard': 0,
  'nerdboard': 0,
  'trollboard': 0
};

class DatabaseUser {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  async check_user() {
    const exists = await db.findOne({ id: this.id });

    if (exists !== undefined) {
        db.updateOne({id: this.id}, {username: this.name});
        return;
    }

    db.insertOne({id: this.id, username: this.name, ...scheme});
  }

  async set(key, val) {
    try {
      db.updateOne({id: this.id}, {[key]: val});
    } catch (err) {
      throw err;
    }
  }

  async get(key) {
    const value = await db.findOne({id: this.id});  
    return value[key];
  }

  async add(key, val) {
    const value = await db.findOne({id: this.id});
    if (value === undefined) { this.check_user(); return; }

    if (value[key] === undefined)
      value[key] = 0;

    let sum = value[key] + val;
    db.updateOne({id: this.id}, {[key]: sum});
  }

  async sub(key, val) {
    const value = await db.findOne({id: this.id});  
    if (value === undefined) { this.check_user(); return; }

    if (value[key] === undefined)
      value[key] = 0;

    let sum = value[key] - val;
    db.updateOne({id: this.id}, {[key]: sum});
  }
}

module.exports = { Database: db, DatabaseUser: DatabaseUser }
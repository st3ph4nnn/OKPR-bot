const { QuickDB } = require('quick.db');
const db = new QuickDB({ filePath: "database/userDB.sqlite" });

const scheme = {
  'balance': 0,
  'xp': 0,
  'level': 0,

  'weeklyxp': 0,
  'starboard': 0,
  'nerdboard': 0,
  'trollboard': 0
};

async function set_from_id(client, id, key, value) {
  this.client.timer = 0;
  await db.set(`${id}.${key}`, value);
}

class DatabaseUser {
  constructor(client, name, id) {
    this.name = name;
    this.id = id;
    this.client = client;
  }

  async check_user() {
    this.client.timer = 0;
    const exists = await db.has(`${this.id}`);

    if (exists) {
      for (const [key, val] of Object.entries(scheme)) {
        const has = await db.has(`${this.id}.${key}`);

        if (!has)
         	await db.push(`${this.id}.${key}`, val);
      }

      const get = await db.get(`${this.id}.value.username`);
      if (get === undefined)
        await db.push(`${this.id}.value.username`, this.name);
      else {
        if (get !== this.name)
          await db.set(`${this.id}.value.username`, this.name);
      }

      return;
    }

    await db.set(`${this.id}`, {
    	username: this.name,
      ...scheme
    });
  }

  async set(key, val) {
    this.client.timer = 0;
    try {
      await db.set(`${this.id}.${key}`, val);
    } catch(err) {
      throw err;
    }
  }

  async get(key) {
    this.client.timer = 0;
  	const value = await db.get(`${this.id}.${key}`);
    if (value == undefined) {
      await this.check_user();
      return 0;
    }
    return value;
  }

  async fetch_user() {
    this.client.timer = 0;
    const user = await db.get(`${this.id}`);
    return user;
  }

  async add(key, val) {
    this.client.timer = 0;
    try {
      await db.add(`${this.id}.${key}`, val);
    } catch(err) {
      throw err;
    }
  }

  async sub(key, val) {
    this.client.timer = 0;
    try {
      await db.sub(`${this.id}.${key}`, val);
    } catch(err) {
      throw err;
    }
  }

  async mul(key, val) {
    this.client.timer = 0;
    db.get(`${this.id}.${key}`).then((value) => {
      value *= val;
      db.set(`${this.id}.${key}`, value);
    });
  }

  async div(key, val) {
    this.client.timer = 0;
    db.get(`${this.id}.${key}`).then((value) => {
      value /= val;
      db.set(`${this.id}.${key}`, value);
    });
  }
}

module.exports = { Database: db, DatabaseUser: DatabaseUser, set_from_id: set_from_id }
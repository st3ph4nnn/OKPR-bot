let EventEmitter = require('events').EventEmitter;
let deck = require('deck');
let Lazy = require('lazy');
let Hash = require('hashish');

module.exports = function (order) {
    if (!order) order = 2;
    let db = {};
    let self = {};
    
    self.seed = function (seed, cb) {
        if (seed instanceof EventEmitter) {
            Lazy(seed).lines.forEach(self.seed);
            
            if (cb) {
                seed.on('error', cb);
                seed.on('end', cb);
            }
        }
        else {
            let text = (Buffer.isBuffer(seed) ? seed.toString() : seed)
            if (!text) return undefined;
            let words = text.split(/\s+/);
            let links = [];
            
            for (let i = 0; i < words.length; i += order) {
                let link = words.slice(i, i + order).join(' ');
                links.push(link);
            }
            
            if (links.length <= 1) {
                if (cb) cb(null);
                return;
            }
            
            for (let i = 1; i < links.length; i++) {
                var word = links[i-1];
                var cword = clean(word);
                var next = links[i];
                var cnext = clean(next);

                if (!word || !cword || !next || !cnext) return undefined;
                
                let node = Hash.has(db, cword)
                    ? db[cword]
                    : {
                        count : 0,
                        words : {},
                        next : {},
                        prev : {},
                    }
                ;
                db[cword] = node;
                
                node.count ++;
                node.words[word] = (
                    Hash.has(node.words, word) ? node.words[word] : 0
                ) + 1;
                node.next[cnext] = (
                    Hash.has(node.next, cnext) ? node.next[cnext] : 0
                ) + 1
                if (i > 1) {
                    let prev = clean(links[i-2]);
                    node.prev[prev] = (
                        Hash.has(node.prev, prev) ? node.prev[prev] : 0
                    ) + 1;
                }
                else {
                    node.prev[''] = (node.prev[''] || 0) + 1;
                }
            }
            
            if (!Hash.has(db, cnext)) db[cnext] = {
                count : 1,
                words : {},
                next : { '' : 0 },
                prev : {},
            };
            let n = db[cnext];
            n.words[next] = (Hash.has(n.words, next) ? n.words[next] : 0) + 1;
            n.prev[cword] = (Hash.has(n.prev, cword) ? n.prev[cword] : 0) + 1;
            n.next[''] = (n.next[''] || 0) + 1;
            
            if (cb) cb(null);
        }
    };
    
    self.search = function (text) {
        if (!text) return undefined;
        let words = text.split(/\s+/);
        
        // find a starting point...
        let start = null;
        let groups = {};
        for (let i = 0; i < words.length; i += order) {
            let word = clean(words.slice(i, i + order).join(' '));
            if (Hash.has(db, word)) groups[word] = db[word].count;
        }
        
        return deck.pick(groups);
    };
    
    self.pick = function () {
        return deck.pick(Object.keys(db))
    };
    
    self.next = function (cur) {
        if (!cur || !db[cur]) return undefined;
        
        let next = deck.pick(db[cur].next);
        return next && {
            key : next,
            word : deck.pick(db[next].words),
        } || undefined;
    };
    
    self.prev = function (cur) {
        if (!cur || !db[cur]) return undefined;
        
        let prev = deck.pick(db[cur].prev);
        return prev && {
            key : prev,
            word : deck.pick(db[prev].words),
        } || undefined;
    };
    
    self.forward = function (cur, limit) {
        let res = [];
        while (cur && !limit || res.length < limit) {
            let next = self.next(cur);
            if (!next) break;
            cur = next.key;
            res.push(next.word);
        }
        
        return res;
    };
    
    self.backward = function (cur, limit) {
        let res = [];
        while (cur && !limit || res.length < limit) {
            let prev = self.prev(cur);
            if (!prev) break;
            cur = prev.key;
            res.unshift(prev.word);
        }
        
        return res;
    };
    
    self.fill = function (cur, limit) {
        if (!db[cur]) return undefined;
        if (!db[cur].words) return undefined;

        let res = [ deck.pick(db[cur].words) ];
        if (!res[0]) return [];
        if (limit && res.length >= limit) return res;;
        
        let pcur = cur;
        let ncur = cur;
        
        while (pcur || ncur) {
            if (pcur) {
                let prev = self.prev(pcur);
                pcur = null;
                if (prev) {
                    pcur = prev.key;
                    res.unshift(prev.word);
                    if (limit && res.length >= limit) break;
                }
            }
            
            if (ncur) {
                let next = self.next(ncur);
                ncur = null;
                if (next) {
                    ncur = next.key;
                    res.unshift(next.word);
                    if (limit && res.length >= limit) break;
                }
            }
        }
        
        return res;
    };
    
    self.respond = function (text, limit) {
        let cur = self.search(text) || self.pick();
        return self.fill(cur, limit);
    };
    
    self.word = function (cur) {
        return db[cur] && deck.pick(db[cur].words);
    };
    
    return self;
};

function clean (s) {
    return s
        .toLowerCase()
        .replace(/[^a-z\d]+/g, '_')
        .replace(/^_/, '')
        .replace(/_$/, '')
    ;
}

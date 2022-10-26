let express = require("express");
let app = express();
app.use(express.json());

let Datastore = require("nedb");
let db = new Datastore({filename: 'chats.db', timestampData: true});
db.loadDatabase();

msgs = [];

app.use('/', express.static('public'))

app.post('/message', (req,res) => {
    //msgs.push(req.body);
    db.insert(req.body, (err, newDoc) => {
        if (err) {
            res.send({"task":"failed"})
        } else {
            res.send({"latestMsg":req.body})
        }
    })
    console.log(msgs)
})

app.get('/messages', (req,res) => {
    db.find({}, function (err,docs) {
        if (err) {
            res.send({"task":"failed"})
        } else {
            res.send({"msgs":docs})
        }
    });
    //res.json({"msgs":msgs})
})

app.listen(3000, () => {
    console.log("Server is Running")
})
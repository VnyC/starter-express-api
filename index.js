const express = require('express');
const knex = require('knex');
const { json, urlencoded } = require('express');
const cors = require('cors');

const app = express();

app.use(urlencoded({type:false}));
app.use(json());
app.use(cors());

const pgdb = knex({
    client: 'pg',
    connection: {
      connectionString: "postgres://vinayakcprofileadmin:VnyC@1234$@vinayakcprofile.postgres.database.azure.com/portal",
        ssl: {
        rejectUnauthorized: false
      }
    }
  });



app.get('/', (req, res) => {
    res.send("It works 8, goto vinayakc.netlify.app");
});

app.get('/getall', (req, res) => {
    pgdb('profilepage').then(data => {
        res.json(data);
    });
});

app.put('/putdata', (req, res) => {
    var body = req.body;
        pgdb('profile')
        .where({head:body.head, type:body.type})
        .update({
            title:body.title,
            subtitle:body.subtitle,
            para1:body.para1,
            para2:body.para2,
            image:body.image,
            icon:body.icon,
            url:body.url
        }, ['*']).then(data => {
            res.send(data);
        });
});

app.post('/postdata', (req, res) => {
    var body = req.body;
        pgdb('profile')
        .insert({
            head:body.head,
            type:body.type,
            title:body.title,
            subtitle:body.subtitle,
            para1:body.para1,
            para2:body.para2,
            image:body.image,
            icon:body.icon,
            url:body.url
        }, ['*']).then(data => {
            res.send(data);
        });
});

app.get('/getdata', (req, res) => {
    var head = req.query.head;
    var type = req.query.type;
    if (type == "*") {
        var que = {head:head};
      } else {
        var que = {head:head,type:type};
      }
    pgdb('profilepage')
        .where(que)
        .then(data => {
            res.json(data)
        });
});



app.listen(process.env.PORT || 3000)

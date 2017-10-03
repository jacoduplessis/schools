const sqlite3 = require('sqlite3')

const express = require('express')
const compression = require('compression')
const app = express()
const db = new sqlite3.Database('schools.db')

app.use(compression())
app.use(express.static('static'))

app.get('/', function (req, res) {
  res.sendFile('map.html', {root: __dirname})
})

app.get('/schools/', (req, res) => {

  db.all('select * from schools limit 10;', (err, rows) => {
    if (err) console.error(err)
    res.json(rows)
  })
})

app.get('/schools/:emis/', (req, res) => {
  const $emis = req.params.emis
  db.get('select * from schools where emis = $emis;', {$emis}, (err, row) => {
    if (err) console.log(err)
    res.json(row)
  })
})

app.get('/search/', (req, res) => {
  const $name = req.query.name
  if (!$name) {
    res.json({
      message: "Please provide a query."
    })
    res.end()
  }
  db.all("select * from schools where name like $name;", {$name}, (err, rows) => {
    if (err) console.error(err)
    res.json({
      length: rows.length,
      results: rows
    })
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})




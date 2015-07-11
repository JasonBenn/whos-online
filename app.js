import fs from 'fs'
import express from 'express'
import request from 'request'

let app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static('public'));

app.get('/', (req, res) => {
  // If you see a buffer-- what's the filetype? Remember the utf8 argument!
  fs.readFile('./whos-online.json', 'utf8', (err, data) => {
    let matches = JSON.parse(data).result.user_data.matches
    let onlineNow = []
    for (let { id, subject } of matches) if (/(\d+ minutes ago|just now\!)/.test(subject.last_seen)) {
      onlineNow.push(subject)
    }
    res.render('index', {onlineNow})
  })
})

app.listen(3000, () => console.log('up'))

// request('http://www.google.com', (error, response, body) => {
//   if (!error && response.statusCode == 200) {
//     console.log(body)
//   }
// })
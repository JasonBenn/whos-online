import fs from 'fs'
import express from 'express'
import request from 'request'
import moment from 'moment'
// import { List } from 'immutable'

let app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.static('public'));

let ONLINE = /(\d+ minutes ago|just now\!)/
let formatUnixTime = unixTime => moment.unix(unixTime).format("MMM Do")

app.get('/', (req, res) => {
  // If you see a buffer-- what's the filetype? Remember the utf8 argument!
  fs.readFile('./whos-online.json', 'utf8', (err, data) => {
    let matches = JSON.parse(data).result.user_data.matches
    let onlineNow = []
    for (let { id, subject, match_date } of matches) if (ONLINE.test(subject.last_seen)) {
      subject.matchDate = match_date
      onlineNow.push(subject)
    }
    onlineNow = onlineNow.sort((a, b) => a.matchDate > b.matchDate ? -1 : 1)
    onlineNow.forEach(match => match.matchDate = formatUnixTime(match.matchDate))
    res.render('index', {onlineNow})
  })
})

app.listen(3000, () => console.log('up'))

// request('http://www.google.com', (error, response, body) => {
//   if (!error && response.statusCode == 200) {
//     console.log(body)
//   }
// })

// import moment from 'moment'
// moment(1424753341, 'MMM Do, YY')
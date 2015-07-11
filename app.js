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

const TOKEN='CAAEFa9d47GIBAJCheMPijDzG9bNZAT9Hl7kwYAh1Rw7JLgi4pzcbv5ObBezAnAZBuTzgZCayEjcRyVtivNoIEMfNF8rM3kAovTuLYnZBBVOwWZBVjrUD8oGIa0koBZBVSUoI3M7MrjmefozEKezxDTj5FeOdMKirz4pfWZCPrcIilPKq7ktlTKDWJaNlF078fAecj70ptroo5uCZAIXRagiWChPwCcZC4mzEZD'

let options = {
  url: 'https://prod-hinge-mobile-02.herokuapp.com/api/v1/users/1565310227/init/?chat_enabled=3&delta_since_timestamp=1',
  headers: {
    "X-Token": TOKEN,
    "X-Version": "2015.07.06",
    "Content-Type": "application/json",
    "X-Facebook-API-Version": "2.2",
    "X-Device-Type": "ios"
  }
}

app.get('/', (req, res) => {
  request(options, (error, response, body) => {
    let matches = JSON.parse(body).result.user_data.matches
    let onlineNow = []
    for (let { id, subject, match_date } of matches) if (ONLINE.test(subject.last_seen)) {
      if (/just now\!/.test(subject.last_seen)) subject.onlineNow = true;
      subject.matchDate = match_date
      onlineNow.push(subject)
    }
    onlineNow = onlineNow.sort((a, b) => a.matchDate > b.matchDate ? -1 : 1)
    onlineNow.forEach(match => match.matchDate = formatUnixTime(match.matchDate))
    res.render('index', {onlineNow})
  })
})

app.listen(3000, () => console.log('up'))

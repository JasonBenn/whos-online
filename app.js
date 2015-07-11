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

const HINGE_TOKEN='CAAEFa9d47GIBAJCheMPijDzG9bNZAT9Hl7kwYAh1Rw7JLgi4pzcbv5ObBezAnAZBuTzgZCayEjcRyVtivNoIEMfNF8rM3kAovTuLYnZBBVOwWZBVjrUD8oGIa0koBZBVSUoI3M7MrjmefozEKezxDTj5FeOdMKirz4pfWZCPrcIilPKq7ktlTKDWJaNlF078fAecj70ptroo5uCZAIXRagiWChPwCcZC4mzEZD'

let tinderReqOptions = (id) => {
  return {
    url: `https://api.gotinder.com/user/${id}?locale=en`,
    headers: { "X-Auth-Token": "aaa9aa4b-4989-47eb-b136-627ee49566e3" }
  }
}

let tinderIDs = [
  '551ca8b3612c03085e04ad4a',
  '533f51a44800b01b5000019f',
  '55654edeef5b98583b8689cf',
  '55517d58c7d8341c3b3e7c02',
  '521062b97cea6c161b000066',
  '545dbf2e216669ac2df0ec65',
  '5369636c7f101f267e00bf3f',
  '529295ca497d20b54700002a',
  '53770104dab480ad24478606',
  '55124f71b85b3b1b73dee0a8',
  '554aec24382c90fc4a9ef169',
  '554aa94ab21d8df67a6aff15',
  '52f09e1b6d2d7da97c00350a',
  '5561038a3d9ab8821303c49f',
  '52afb7c187c03bf87500055a',
  '51ca7065103905ce0500013c',
  '510c7fa6024a4915160008e4',
  '54800283879fd7b936fe7623',
  '534a8de3b8636cd9220020ab',
  '52cacb20a439dc1744001b24',
  '554997850130c5b2729ce3e2',
  '5547049f904b2c7b316ff7dc',
  '53e500cc53f1001922ade211',
  '54c84eec12ce2a2e7230d740',
  '544f10888fb3d95d5300f6fe',
  '54f3b11fbbf89d2f1b58958a',
  '511400c1ea37656c03000062',
  '5209ceb3755906e52a000029',
  '531509723ebf2acf0300003a',
  '551f8f65557a38fd0101e3b7',
  '5538a0def94f83fe2d677de5',
  '552c9596dc62356263e75874',
  '51a0ebbc86921af764000462',
  '53f768206f01e4015f0fcf24',
  '5454aff1f5aa48674e57e48b',
  '5143b251d965dcaf2e000451',
  '5139529e0ebfb16a0e0002cd',
  '54874a89f81012854ddfbd8d',
  '53516d2af0c4f7c663000cbb',
  '53f65aaab0dc484d56a8f319',
  '541231c2bc9853094acc76e1',
  '543ff1da69db7a8b4a17a200',
  '5479625cfd503f2e4b113369',
  '51685c3b04ea88ea0800039d',
  '54b2dd30fe2c68cf6f335b1b',
  '54b2dd30fe2c68cf6f335b1b',
  '5274c1516dd6e7a12d0029c8',
  '5372aed8075fd6830700031d',
  '5399199af201ff8b15f6cdee',
  '54e47dac4087beb32e2dfc47',
  '52519e19c3cd853f330012be',
  '54aef71e44c271274c681dda',
  '54961e53945558b519365f03',
  '537cdd3153f25351182bb47b'
]

let hingeReq = {
  url: 'https://prod-hinge-mobile-02.herokuapp.com/api/v1/users/1565310227/init/?chat_enabled=3&delta_since_timestamp=1',
  headers: {
    "X-Token": HINGE_TOKEN,
    "X-Version": "2015.07.06",
    "Content-Type": "application/json",
    "X-Facebook-API-Version": "2.2",
    "X-Device-Type": "ios"
  }
}

app.get('/', (req, res) => {
  request(hingeReq, (error, response, body) => {
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

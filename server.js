const express = require('express')
const app = express()
const requestInfo = require('request-info')


app.use(express.static('public'))

app.get("/api/whoami", (request, response) => {
  const { ip, ua: { os: { name:software, version} } } = requestInfo(request)
  response.json({
    ip: getIP(request.headers),
    language: request.headers['accept-language'],
    sofware: `${software} ${version}`
  })
})
  


const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

function getIP(headers) {
  return headers['x-forwarded-for'].split(',')[0]
}

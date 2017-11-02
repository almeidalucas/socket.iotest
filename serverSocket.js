const express = require('express'),
  path = require('path'),
  app = express(),
  bodyParser = require('body-parser'),
  displayRoutes = require('express-routemap'),
  cors = require('cors'),
  nodemailer = require('nodemailer')

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.post('/sendEmail', function (req, res) {

  const params = req.body

  var transporter = nodemailer.createTransport({
    host: 'smtpout.secureserver.net',
    port: 80,
    secure: false,
    auth: {
      user: 'contato@idea-techlab.com', // Email id
      pass: 'Daddy@1316', // Password
    },
  })

  const mailOptions = {
    from: params.email, // sender address
    to: 'contato@idea-techlab.com', // list of receivers
    subject: params.subject, // Subject line
    text: params.text, // plaintext body
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      res.send({ status: error, message: 'N�o Enviado!' })
    } else {
      console.log('Message sent: ' + info.response)
      res.send({ status: info.response, message: 'Enviado!' })
    }
  })
})

const port = process.env.PORT || 3030
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
  displayRoutes(app)
})
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
const stringify = require('csv-stringify').stringify
const parse = require('csv-parse').parse
const os = require('os')
const multer  = require('multer')
const upload = multer({ dest: 'CSV' })
const port = 3000

app.use(bodyParser.json())
app.use(express.static('../frontend'))

app.get('/csv', (req, res) => {
    fs.readFile('CSV/school_book.csv', 'utf8', function (err,data) {
        res.send(data);
    });
});

app.post('/read', upload.single('file'), (req, res) => {
    const file = req.file
  
    const data = fs.readFileSync(file.path)
    parse(data, (err, records) => {
      if (err) {
        console.error(err)
        return res.status(400).json({success: false, message: 'An error occurred'})
      }
  
      return res.json({data: records})
    })
})

app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}`)
})
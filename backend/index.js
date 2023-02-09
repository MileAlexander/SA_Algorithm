const express = require('express')
const app = express()
const fs = require('fs')
const parse = require('csv-parse').parse
const port = 3000

app.use(express.static('../frontend'))
app.use(express.json())


app.get('/csv', (req, res) => {
    const arr = []
    fs.createReadStream("CSV/school_book.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        arr.push(row);
    })
    .on("end", function () {
        res.send(arr);
    })
    .on("error", function (error) {
      console.log(error.message);
    });
});

app.listen(port, () => {
  console.log(`App listening on port http://127.0.0.1:${port}`)
})
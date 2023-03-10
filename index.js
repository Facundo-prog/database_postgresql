const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { 
    logErrors, 
    errorHandler, 
    boomErrorHandler, 
    sequelizeErrorHandler 
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(sequelizeErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

// Express configuration
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors())
app.listen(process.env.PORT || 8081);

// Mongoose configuration
//import mongoose, { Query } from 'mongoose';
//mongoose.connect(`mongodb://localhost/users`);
//mongoose.Promise = global.Promise;

app.get('/', (req, res) => {
  res.send(
    
  )
});

app.get('/test', (req, res) => {
  res.send(
    [{
      serviceName: 'test',
      isRunning: true
    }]
  );
});

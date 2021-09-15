import express from 'express';
import BodyParser from 'body-parser';
import routes from './routes';
import { getConfigFunc } from './data/callToPitstop.controller';
import { IConfig } from './utilities/config';
const app = express();

app.use('/', [
  BodyParser.json({ limit: '50mb' }), // json
  BodyParser.urlencoded({ extended: true }), //url encoding
  (req, res, next) => {
    return next();
  }
]);

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use('/api', routes);

const PORT = 4000;

(async () => {
  //While starting the server call the config api from pitstop and store it.
  const configResult : IConfig = await getConfigFunc() as IConfig;
  
  app.listen(PORT, () => {
    console.log(`Sample Source listening at port`, PORT);
  });
})();
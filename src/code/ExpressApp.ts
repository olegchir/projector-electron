import * as express from 'express';
import * as url from 'url';

class ExpressApp {
  public express:any

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {           
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;      
      res.set('Content-Type', 'application/json');
      res.json({});      
    })
    this.express.use('/', router)
  }
}

export default new ExpressApp().express
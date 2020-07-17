import * as express from "express";

class App {
  public app: express.Application;

  /**
   * @ class App
   * @ method bootstrap
   * @ static
   * 
   */
  public static bootstrap (): App {
    return new App();
  }

  constructor () {
    this.app = express();
    const path = require('path');
    this.app.use(express.static(path.resolve(__dirname,"../dist")));
    this.app.use(express.static(path.resolve(__dirname,"../static")));
    this.app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.sendFile(path.resolve(__dirname,"../views/index.html"));
    });
  }
}

export default App;
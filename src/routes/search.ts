import * as express from "express";
import pgPromise from "pg-promise";
import path from "path";
import fs from "fs";

export const register = (app: express.Application) => {
  const oidc = app.locals.oidc;

  app.get(
    `/search/search/list`,
    oidc.ensureAuthenticated(),
    async (req: any, res) => {
      try {
        const userId: number = req.userContext.userinfo.sub;
        const directoryPath: string = path.join(__dirname,  userId.toString());
        const documents: string[] = [];

        fs.readdir(directoryPath, (err: any, files: string[]) => {
          // handling error
          if (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
          }
          // listing all files using forEach
          files.forEach((file) => {
            // Do whatever you want to do with the file
            documents.push(file);
          });
        });
        return res.json({ message: userId.toString() });
      } catch (err) {
        // tslint:disable-next-line:no-console
        console.error(err);
        res.json({ error: err.message || err });
      }
    }
  );
  //   app.post(
  //     `/api/search/add`,
  //     oidc.ensureAuthenticated(),
  //     async (req: any, res) => {
  //       try {
  //         const userId = req.userContext.userinfo.sub;
  //         return res.json({ id });
  //       } catch (err) {
  //         // tslint:disable-next-line:no-console
  //         console.error(err);
  //         res.json({ error: err.message || err });
  //       }
  //     }
  //   );
};

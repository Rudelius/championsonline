"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.register = (app) => {
    const oidc = app.locals.oidc;
    app.get(`/search/search/list`, oidc.ensureAuthenticated(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.userContext.userinfo.sub;
            const directoryPath = path_1.default.join(__dirname, userId.toString());
            const documents = [];
            fs_1.default.readdir(directoryPath, (err, files) => {
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
        }
        catch (err) {
            // tslint:disable-next-line:no-console
            console.error(err);
            res.json({ error: err.message || err });
        }
    }));
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
//# sourceMappingURL=search.js.map
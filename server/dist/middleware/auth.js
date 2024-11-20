"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatejwt = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticatejwt = (req, res, next) => {
    const authtoken = req.headers["authorization"];
    const decode = jsonwebtoken_1.default.verify(authtoken, config_1.jwt_password);
    if (authtoken) {
        if (decode) {
            //  @ts-ignore
            req.userId = decode.id;
            next();
        }
        else {
            res.sendStatus(401);
        }
    }
    else {
        res.status(404).json({
            msg: "authentication failed"
        });
    }
};
exports.authenticatejwt = authenticatejwt;

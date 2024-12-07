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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db/db");
const config_1 = require("./config");
const auth_1 = require("./middleware/auth");
const cors_1 = __importDefault(require("cors"));
// import {z} from "zod"
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// const SignupSchema = z.object({
// })
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.userModel.create({
            username: username,
            password: password
        });
        res.json({
            msg: "signed up successfully"
        });
    }
    catch (e) {
        res.status(411).json({
            msg: "user already exist"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.userModel.findOne({
        username,
        password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.jwt_password);
        res.json({
            token,
            msg: "signin success"
        });
    }
    else {
        res.status(403).json({
            msg: "incorrect credentials "
        });
    }
}));
app.post("/api/v1/content", auth_1.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.contentModel.create({
        link,
        type,
        title: req.body.title,
        //  @ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        msg: "content added not yet babe"
    });
}));
app.post("/api/v1/content/update", auth_1.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.id;
    // await contentModel.create({
    //      link,
    //      type,
    //      title:req.body.title,
    //     //  @ts-ignore
    //      userId:req.userId,
    //      tags:[]
    // })
    console.log("you reached to backend");
    const content = yield db_1.contentModel.findByIdAndUpdate(userId, req.body, { new: true });
    res.json({
        content: content,
        msg: "content updated"
    });
}));
app.get("/api/v1/me", auth_1.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        if (userId) {
            const details = yield db_1.userModel.findOne({
                _id: userId,
            });
            res.json({
                username: details === null || details === void 0 ? void 0 : details.username
            });
        }
    }
    catch (error) {
        res.json({
            error
        });
    }
}));
app.get("/api/v1/content", auth_1.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.userId;
    const content = yield db_1.contentModel.find({
        userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", auth_1.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    const result = yield db_1.contentModel.deleteMany({
        _id: contentId,
        userId: req.userId
    });
    res.json({
        msg: "content deleted"
    });
}));
function random(n) {
    let options = "laksdfjlajdfjasdlfja;dsl";
    let len = options.length;
    let ans = "";
    for (let i = 0; i < len; ++i) {
        ans += options[Math.floor((Math.random() * len))];
    }
    return ans;
}
app.post("/api/v1/brain/share", auth_1.authenticatejwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.linkModel.findOne({
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = random(10);
        yield db_1.linkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.linkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const links = yield db_1.linkModel.findOne({
        hash: hash
    });
    if (!links) {
        res.status(411).json({
            message: "sorry incorrect input"
        });
        return;
    }
    const content = yield db_1.contentModel.find({
        userId: links.userId
    });
    const username = yield db_1.userModel.findOne({
        _id: links.userId
    });
    if (!username) {
        res.status(411).json({
            message: "user not found, fuck ya "
        });
    }
    res.json({
        username: username === null || username === void 0 ? void 0 : username.username,
        content: content
    });
}));
app.get("/", (req, res) => {
    res.json({ msg: "hellow" });
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGO_URL);
        app.listen(3000, () => {
            console.log("server is listening");
        });
    });
}
main();

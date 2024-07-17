import Koa from "koa"
import Router from "koa-router"
import bodyparser from "koa-bodyparser"
import cors from "koa-cors"
import logger from "./logger/winston.js"
import { mainRouter } from "./api/router.js"

export const app = new Koa()

app.use(cors())

app.use(bodyparser())

const router = new Router()

router.use("/", mainRouter.routes())

app.use(router.routes())

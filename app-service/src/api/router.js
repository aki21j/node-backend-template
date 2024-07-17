import Router from "koa-router"
export const mainRouter = new Router()

mainRouter.get("", (ctx, next) => {
  ctx.body = "Hello World!"
})

import Express, { Request, Response } from "express";

const route = Express.Router();

route.get("/api/users/currentuser", (req: Request, res:Response) => {
  console.log("server is running");
  console.log(req.headers.location);
  console.log(req.headers.host);
  console.log(req.headers.date);

  res.send("hi there");
});

export { route as currentUserRouter };
// export default currentUserRouter;

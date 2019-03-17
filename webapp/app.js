import express from "express"
import queryParser from "./middlewares/queryParser"
import cookieParser from "./middlewares/cookieParser"
import routes from "./routes"

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(express.json());
routes(app);

export default app;
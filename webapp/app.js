import express from "express"
import queryParser from "./middlewares/queryParser"
import cookieParser from "./middlewares/cookieParser"

const app = express();
const port = 8090;

app.listen(port, () => console.log(`App listening on port ${port}`));
app.use(cookieParser);
app.use(queryParser);

export default app;
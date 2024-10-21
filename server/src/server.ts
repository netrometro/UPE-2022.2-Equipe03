import express from "express";

import { usuarioRouter } from "./routes/usuarioRoutes";
import { inventarioRouter } from "./routes/invRoutes";
import { gatRouter } from "./routes/gatRoutes";
import { albumRouter } from "./routes/albumRoutes";
import { dailyRouter } from "./routes/dailyRoutes";
import { pacRouter } from "./routes/stickerPackRoute";
import { tradeRouter } from "./routes/tradeRoute";

const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors());

app.use(usuarioRouter);
app.use(inventarioRouter);
app.use(gatRouter);
app.use(albumRouter);
app.use(dailyRouter);
app.use(pacRouter);
app.use(tradeRouter);

app.listen(3030, () => console.log("Server está rodando na porta 3030 🚀"));

// npm install prisma --save-dev
// npx prisma migrate dev
// Dar start no projeto => npm dev e pra parar (ctrl + c)

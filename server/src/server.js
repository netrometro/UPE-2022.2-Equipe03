import express from "express";

import { usuarioRouter } from "./allRoutes/usuarioRoutes";
import { inventarioRouter } from "./allRoutes/invRoutes";
import { gatRouter } from "./allRoutes/gatRoutes";
import {albumRouter} from "./allRoutes/albumRoutes";
import { dailyRouter } from "./allRoutes/dailyRoutes";
import { pacRouter } from "./allRoutes/stickerPackRoute";

const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors());

app.use(usuarioRouter);
app.use(inventarioRouter)
app.use(gatRouter)
app.use(albumRouter)
app.use(dailyRouter)
app.use(pacRouter)

app.listen(3030, () => console.log("Serve está rodando na porta 3030🚀"));

// caso não tenha o yarn => npm install --global yarn
// npm install prisma --save-dev
// yarn prisma migrate dev
//Dar start no projeto => yarn dev e pra parar (ctrl + c)

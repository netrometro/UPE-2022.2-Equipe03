import { Router } from "express";

import UsuarioController from "../controllers/UsuarioController";

const usuarioRouter = Router();

usuarioRouter.post("/usuario", UsuarioController.createUsuario);
usuarioRouter.get("/usuarios", UsuarioController.findAllUsuarios);
usuarioRouter.get("/usuario/:userId", UsuarioController.findUsuario);
usuarioRouter.put("/usuario/:userId", UsuarioController.updateUsuario);
usuarioRouter.delete("/usuario/:userId", UsuarioController.deleteUsuario);

usuarioRouter.post("/login", UsuarioController.login);

export { usuarioRouter };

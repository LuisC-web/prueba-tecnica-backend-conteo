import { Router } from "express";
import { body, param, query } from "express-validator";

import { UserController } from "../controllers/UserController";
import {
  handleInputError,
  handleValidExistUser,
} from "../middleware/validation";
import { IAddress } from "../models/Address";

const usersRoutes = Router();

usersRoutes.get("/usuarios", UserController.getUsers);
usersRoutes.post(
  "/usuarios",
  body("nombre").notEmpty().withMessage("Es requerido el nombre"),
  body("email").isEmail().withMessage("El email es inválido"),
  body("edad")
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage("No es un edad válida"),
  body("direcciones")
    .isArray({ min: 1 })
    .withMessage("Debe tener al menos una dirección"),
  body("direcciones.*.calle").notEmpty().withMessage("Calle requerida"),
  body("direcciones.*.ciudad").notEmpty().withMessage("Ciudad requerida"),
  body("direcciones.*.pais").notEmpty().withMessage("País requerido"),
  body("direcciones.*.codigo_postal")
    .notEmpty()
    .withMessage("Código postal requerido")
    .isPostalCode("any")
    .withMessage("Código postal inválido"),
  handleInputError,
  UserController.createUser
);
usersRoutes.get(
  "/usuarios/buscar",
  query("ciudad")
    .exists()
    .withMessage("El parámetro 'ciudad' es requerido")
    .notEmpty()
    .withMessage("Debe exister el parametro de buscqueda ciudad"),
  UserController.searchByQuery
);
usersRoutes.get(
  "/usuarios/:id",
  param("id").isMongoId().withMessage("No es un id válido"),
  handleInputError,
  handleValidExistUser,
  UserController.getUserId
);
usersRoutes.put(
  "/usuarios/:id",
  param("id").isMongoId().withMessage("No es un id válido"),
  handleInputError,
  handleValidExistUser,
  UserController.updateUserById
);
usersRoutes.delete(
  "/usuarios/:id",
  param("id").isMongoId().withMessage("No es un id válido"),
  handleInputError,
  handleValidExistUser,
  UserController.deleteUserById
);
export default usersRoutes;

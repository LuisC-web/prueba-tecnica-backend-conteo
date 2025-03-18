import { Request, Response } from "express";
import User from "../models/User";
export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await User.exists({
        email,
      });

      if (user) {
        res
          .status(409)
          .json({ msg: "Correo registrado, no se puede crear usuario" });
        return;
      }
      await User.create(req.body);
      res.status(201).json({ msg: "Usuario creado" });
      return;
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ msg: "Hubo un error" });
      return;
    }
  }
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.status(200).json(users);
      return;
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ msg: "Hubo un error" });
      return;
    }
  }
  static async getUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
      return;
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ msg: "Hubo un error" });
      return;
    }
  }
  static async updateUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await User.updateOne(req.body);
      res.status(200).json({ msg: "Usuario actualizada" });
      return;
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ msg: "Hubo un error" });

      return;
    }
  }
  static async deleteUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await User.deleteOne({ _id: id });
      res.status(200).json({ msg: "Usuario eliminado" });
      return;
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ msg: "Hubo un error" });
      return;
    }
  }
  static async searchByQuery(req: Request, res: Response) {
    try {
      const { ciudad } = req.query;

      const usuarios = await User.find({
        "direcciones.ciudad": ciudad.toString(),
      });
      res.status(201).json(usuarios);
      return;
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ msg: "Hubo un error" });
      return;
    }
  }
}

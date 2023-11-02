import { Request, Response } from "express";
import { SuperHeroesDatabase } from "../database/SuperHeroesDatabase";
import { SuperHeroes } from "../models/SuperHeroes";
import { SuperHeroesDB } from "../types";

// Prática da aula

export class SuperHeroesController {
  public getSuperHeroes = async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string | undefined;

      const superHeroesDatabase = new SuperHeroesDatabase();
      const superHeroesDB = await superHeroesDatabase.findSuperHeroes(q);

      const superHeroes: SuperHeroes[] = superHeroesDB.map(
        (superHeroesDB) =>
          new SuperHeroes(
            superHeroesDB.id,
            superHeroesDB.name,
            superHeroesDB.super_power,
            superHeroesDB.overall
          )
      );

      res.status(200).send(superHeroes);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public createSuperHero = async (req: Request, res: Response) => {
    try {
      const { id, name, super_power, overall } = req.body;

      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (typeof name !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (typeof super_power !== "string") {
        res.status(400);
        throw new Error("'super_power' deve ser string");
      }

      if (typeof overall !== "number") {
        res.status(400);
        throw new Error("'overall' deve ser número");
      }

      const superHeroesDatabase = new SuperHeroesDatabase();
      const superHeroDBExists = await superHeroesDatabase.findSuperHeroById(id);

      if (superHeroDBExists) {
        res.status(400);
        throw new Error("'id' já existe");
      }

      const newSuperHero = new SuperHeroes(
        id,
        name,
        super_power,
        overall
      ); 

      const newSuperHeroDB: SuperHeroesDB = {
        id: newSuperHero.getId(),
        name: newSuperHero.getName(),
        super_power: newSuperHero.getSuperPower(),
        overall: newSuperHero.getOverall(),
      };

      await superHeroesDatabase.insertSuperHero(newSuperHeroDB);

      res.status(201).send(newSuperHeroDB);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };

  public updateSuperHero = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      const superHeroesDatabase = new SuperHeroesDatabase();
      const superHeroDB = await superHeroesDatabase.findSuperHeroById(id);

      if (!superHeroDB) {
        res.status(404);
        throw new Error("'id' não encontrado");
      }

      const superHero = new SuperHeroes(
        superHeroDB.id,
        superHeroDB.name,
        superHeroDB.super_power,
        superHeroDB.overall
      );

      const newId = superHero.getId();
      superHero.setId(newId);
      const newName = superHero.getName();
      superHero.setName(newName);
      const newSuperPower = superHero.getSuperPower();
      superHero.setSuperPower(newSuperPower);
      const newOverall = superHero.getOverall();
      superHero.setOverall(newOverall);

      await superHeroesDatabase.updateSuperHero(id, newId, newName, newName, newSuperPower, newOverall);

      res.status(200).send(superHero);
    } catch (error) {
      console.log(error);

      if (req.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}

import { SuperHeroes } from "../models/SuperHeroes";
import { SuperHeroesDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class SuperHeroesDatabase extends BaseDatabase {
    public static TABLE_SUPERHEROES = "superHeroes";

    public async findSuperHeroes (q: string | undefined) {
        let superHeroesDB

        if (q) {
            const result: SuperHeroesDB[] = await BaseDatabase
                .connection(SuperHeroesDatabase.TABLE_SUPERHEROES)
                .where("name", "LIKE", `%${q}%`)

                superHeroesDB = result
        } else {
            const result: SuperHeroesDB[] = await BaseDatabase
                .connection(SuperHeroesDatabase.TABLE_SUPERHEROES)

                superHeroesDB = result
        }

        return superHeroesDB
    }

    public async findSuperHeroById(id: string) {
        const [ SuperHeroesDB ]: SuperHeroesDB[] | undefined[] = await BaseDatabase
            .connection(SuperHeroesDatabase.TABLE_SUPERHEROES)
            .where({ id })

        return SuperHeroesDB
    }

    public async insertSuperHero(newSuperHeroesDB: SuperHeroesDB) {
        await BaseDatabase
            .connection(SuperHeroesDatabase.TABLE_SUPERHEROES)
            .insert(newSuperHeroesDB)
    }

    public async updateSuperHero(id: string) {
        await BaseDatabase
            .connection(SuperHeroesDatabase.TABLE_SUPERHEROES)
            .update(SuperHeroes).where({ id })
    }

    public async deletetSuperHero(id: string) {
        await BaseDatabase
            .connection(SuperHeroesDatabase.TABLE_SUPERHEROES)
            .delete().where({ id })
    }
}

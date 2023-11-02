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

    public async findUserById(id: string) {
        const [ SuperHeroesDB ]: SuperHeroesDB[] | undefined[] = await BaseDatabase
            .connection(SuperHeroesDatabase.TABLE_SUPERHEROES)
            .where({ id })

        return SuperHeroesDB
    }

    public async insertUser(newSuperHeroesDB: SuperHeroesDB) {
        await BaseDatabase
            .connection(SuperHeroesDatabase.TABLE_SUPERHEROES)
            .insert(newSuperHeroesDB)
    }
}

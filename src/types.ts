export interface SuperHeroesDB {
    id: string,
    name: string,
    superPower: string,
    overall: number
}

// tipagem para criação (POST) sem created_at
export interface UserDBPost {
    id: string,
    name: string,
    superPower: string,
    overall: number
}
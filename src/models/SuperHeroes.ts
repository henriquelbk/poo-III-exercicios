export class SuperHeroes {    
    constructor(
        private id: string,
        private name: string,
        private super_power: string,
        private overall: number
    ) {}

    public getId(): string {
        return this.id
    }
    
    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getSuperPower(): string {
        return this.super_power
    }

    public setSuperPower(value: string): void {
        this.super_power = value
    }

    public getOverall(): number {
        return this.overall
    }

    public setOverall(value: number): void {
        this.overall = value
    }
}
import { Repository, getRepository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        name,
        description,
        brand,
        category_id,
        dailyRate,
        fineAmount,
        licensePlate,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            brand,
            category_id,
            dailyRate,
            fineAmount,
            licensePlate,
        });

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(licensePlate: string): Promise<Car> {
        const car = await this.repository.findOne({
            licensePlate,
        });

        return car;
    }
}

export { CarsRepository };

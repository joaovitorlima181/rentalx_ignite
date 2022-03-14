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
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            brand,
            category_id,
            dailyRate,
            fineAmount,
            licensePlate,
            specifications,
            id,
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

    async findAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand });
        }

        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", {
                category_id,
            });
        }

        if (name) {
            carsQuery.andWhere("name = :name", { name });
        }

        const cars = await carsQuery.getMany();

        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }
}

export { CarsRepository };

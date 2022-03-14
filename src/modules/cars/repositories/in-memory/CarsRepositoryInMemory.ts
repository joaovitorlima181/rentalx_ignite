import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async create({
        name,
        description,
        brand,
        category_id,
        dailyRate,
        fineAmount,
        licensePlate,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            brand,
            category_id,
            dailyRate,
            fineAmount,
            licensePlate,
            id,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(licensePlate: string): Promise<Car> {
        return this.cars.find((car) => car.licensePlate === licensePlate);
    }

    async findAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {
        const cars = this.cars.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return null;
        });
        return cars;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }
}

export { CarsRepositoryInMemory };

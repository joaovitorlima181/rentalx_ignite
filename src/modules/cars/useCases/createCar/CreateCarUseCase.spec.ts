import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            dailyRate: 100,
            licensePlate: "ABC-1234",
            fineAmount: 10,
            brand: "Brand",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a new car with the same license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Name Car 1",
                description: "Description Car 1",
                dailyRate: 100,
                licensePlate: "ABC-1234",
                fineAmount: 10,
                brand: "Brand",
                category_id: "category",
            });

            await createCarUseCase.execute({
                name: "Name Car 2",
                description: "Description Car 2",
                dailyRate: 100,
                licensePlate: "ABC-1234",
                fineAmount: 10,
                brand: "Brand",
                category_id: "category",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car 2",
            description: "Description Car 2",
            dailyRate: 100,
            licensePlate: "ABC-1234",
            fineAmount: 10,
            brand: "Brand",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
});

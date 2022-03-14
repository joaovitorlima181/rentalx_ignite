import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

interface ICreateCarDTO {
    name: string;
    description: string;
    dailyRate: number;
    licensePlate: string;
    fineAmount: number;
    brand: string;
    category_id: string;
    specifications?: Specification[];
    id?: string;
}

export { ICreateCarDTO };

interface ICreateCarDTO {
    name: string;
    description: string;
    dailyRate: number;
    licensePlate: string;
    fineAmount: number;
    brand: string;
    category_id: string;
}

export { ICreateCarDTO };

import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

@Entity()
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    dailyRate: number;

    @Column()
    available: boolean;

    @Column()
    licensePlate: string;

    @Column()
    fineAmount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumn: { name: "car_id" },
        inverseJoinColumn: { name: "specification_id" },
    })
    specifications: Specification[];

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.available = true;
        }
    }
}

export { Car };

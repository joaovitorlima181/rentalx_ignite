import { hash } from "bcrypt";
import { createConnection } from "typeorm";
import { v4 as uuid } from "uuid";

async function create() {
    const connection = await createConnection();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO USERS(id, name, email, password,"isAdmin", created_at, driver_license) values ('${id}', 'admin', 'admin@rentalx.com', '${password}', true, now(), 'XXXXXXXX')`
    );

    await connection.close();
}

create().then(() => console.log("Admin created"));

import request from 'supertest';
import { app } from '../app';

import createConnection from '../database'

describe("users",  () =>{
    beforeAll( async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })
    it("Should be able to create a new user" , async () => {
        const response = await request(app).post("/users")
        .send({
            email : "user@example.com",
            name: "User example"    
        })

        expect(response.status).toBe(201);
    })

    it("Shoudn't be able to a create a user with exists email" , async() =>{
        const response = await request(app).post("/users").send({
            email : "user@example.com",
            name: "User example"    
        })

        expect(response.status).toBe(400);

    });


})
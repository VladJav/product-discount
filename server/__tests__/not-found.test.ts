import request from "supertest";
import app from "../src/app";

describe('NOT FOUND ENDPOINT', ()=>{
    it('should return exception 404', async () => {
        const res = await request(app).get('/error/not/found');
        expect(res.statusCode).toBe(404);
    });
});
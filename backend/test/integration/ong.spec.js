const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
      });
    
    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "NOME ONG",
                email: "email@domain.com",
                whatsapp: "(99) 99999-9999",
                city: "CIDADE",
                uf: "UF"
            });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be able to deleta a created ONG', async () => {
        const responseCreateOng = await request(app)
            .post('/ongs')
            .send({
                name: "NOME ONG",
                email: "email@domain.com",
                whatsapp: "(99) 99999-9999",
                city: "CIDADE",
                uf: "UF"
            });
        const responseDeleteOng = await request(app).delete(`/ongs/${responseCreateOng.body.id}`)
        const responseListOng = await request(app).get('/ongs');

        expect(responseDeleteOng.status).toBe(204);
		expect(responseListOng.body).toHaveLength(0)
    });
    
    it('should be able to list the existents ONGS', async () => {
		const responseCreateOng = await request(app)
            .post('/ongs')
            .send({
                name: "NOME ONG",
                email: "email@domain.com",
                whatsapp: "(99) 99999-9999",
                city: "CIDADE",
                uf: "UF"
            });
        const responseListOng = await request(app).get('/ongs');
		expect(responseListOng.body).toHaveLength(1);
	});
});
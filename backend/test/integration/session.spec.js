const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Session', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
      });
    
    afterAll(async () => {
        await connection.destroy();
    });

	it('should be able to list the incidents of an ONG', async () => {
        const responseCreateOng = await request(app)
        .post('/ongs')
        .send({
            name: "NOME ONG",
            email: "email@domain.com",
            whatsapp: "(99) 99999-9999",
            city: "CIDADE",
            uf: "UF"
        });
		const responseCreateSession = await request(app).post('/session').send({
			id: responseCreateOng.body.id
        });
		expect(responseCreateSession.body).toHaveProperty('name');
		expect(responseCreateSession.status).toBe(200);
	});
});
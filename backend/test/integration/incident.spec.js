const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incident', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
      });
    
    afterAll(async () => {
        await connection.destroy();
    });

	it('should be able to crete a new incident', async () => {
        const responseCreateOng = await request(app)
            .post('/ongs')
            .send({
                name: "NOME ONG",
                email: "email@domain.com",
                whatsapp: "(99) 99999-9999",
                city: "CIDADE",
                uf: "UF"
            });
        const responseCreateIncident = await request(app)
            .post('/incidents')
            .send({
                title: "TITULO CASO",
                description: "DESCRICAO CASO",
                value: 999.99
            })
            .set('authorization', responseCreateOng.body.id);

		expect(responseCreateIncident.body).toHaveProperty('id');
		expect(responseCreateIncident.body.id).toBe(1);
	});

	it('should be able to list the existents incidents', async () => {
		const responseCreateOng = await request(app)
            .post('/ongs')
            .send({
                name: "NOME ONG",
                email: "email@domain.com",
                whatsapp: "(99) 99999-9999",
                city: "CIDADE",
                uf: "UF"
            });
        const responseCreateIncident = await request(app)
            .post('/incidents')
            .send({
				title: "TITULO CASO",
                description: "DESCRICAO CASO",
                value: 999.99
            })
            .set('authorization', responseCreateOng.body.id);
		const responseListIncident = await request(app).get('/incidents');
		expect(responseListIncident.body).toHaveLength(1);
	});

	it('should be able to delete a created incident', async () => {
		const responseCreateOng = await request(app)
            .post('/ongs')
            .send({
                name: "NOME ONG",
                email: "email@domain.com",
                whatsapp: "(99) 99999-9999",
                city: "CIDADE",
                uf: "UF"
            });
        const responseCreateIncident = await request(app)
            .post('/incidents')
            .send({
                title: "TITULO CASO",
                description: "DESCRICAO CASO",
                value: 999.99
            })
            .set('authorization', responseCreateOng.body.id);

        const responseDeleteIncident = await request(app)
            .delete(`/incidents/${responseCreateIncident.body.id}`)
            .set('authorization', responseCreateOng.body.id);

        const responseListIncident = await request(app).get('/incidents');

		expect(responseDeleteIncident.status).toBe(204);
		expect(responseListIncident.body).toHaveLength(0)
	});
});
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Profile', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
      });
    
    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to list the existing incidents of an ONG', async () => {
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
        const responseProfile = await request(app)
            .get('/profile')
            .set('authorization', responseCreateOng.body.id);

        expect(responseProfile.body).toHaveLength(1);
    });
});
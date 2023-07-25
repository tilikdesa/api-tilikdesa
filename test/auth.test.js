const request = require('supertest')
const {
    sequelize
} = require('../models/index')
const {
    queryInterface
} = sequelize
const bcrypt = require('bcryptjs')
const app = require('../app')

beforeEach(async () => {
    // memasukkan data dummy ke database testing
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("danialfian", salt);
    await queryInterface.bulkInsert("Employees", [{
        username: "danialfian",
        password: hash,
        createdAt: new Date(),
        updatedAt: new Date()
    }]);
});

afterEach(async () => {
    await queryInterface.bulkDelete('Employees', {}, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
});

describe('Login Employee', () => {
    it('Success', (done) => {
        request(app)
            .post('/employee/auth/login')
            .send({
                username: "danialfian",
                password: "danialfian"
            })
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty('token')
                    done()
                }
            });
    });

    it('Invalid username or password', (done) => {
        request(app)
            .post('/employee/auth/login')
            .send({
                username: "danialfian",
                password: "qweqwe"
            })
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('message')
                    expect(res.body.message).toBe('Invalid username or password')
                    done()
                }
            })
    })

    it('Username is not registered', (done) => {
        request(app)
            .post('/employee/auth/login')
            .send({
                username: "danialfiania",
                password: "danialfiania"
            })
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('message')
                    expect(res.body.message).toBe('Username is not registered!')
                    done()
                }
            })
    })

    it('Bad Request', (done) => {
        request(app)
            .post('/employee/auth/login')
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty('message')
                    expect(res.body.message).toBe('Username is required')
                    done()
                }
            })
    })
});
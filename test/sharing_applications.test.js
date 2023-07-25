const request = require('supertest')
const {
    sequelize
} = require('../models/index')
const {
    queryInterface
} = sequelize
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const app = require('../app')
let token;

// Create Table before Execute
beforeEach(async () => {
    // memasukkan data dummy ke database testing
    await queryInterface.bulkInsert("Employees", [{
        role_id: "1",
        identity_number: "89237891",
        fullname: "Dani Alfian",
        username: "danialfian",
        password: bcrypt.hashSync("danialfian", bcrypt.genSaltSync(10)),
        birth_date: "1992-12-12",
        last_education: "S1 Akuntansi",
        department: "Perdata",
        class: "Perdata",
        createdAt: new Date(),
        updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert("Partners", [{
        username: "iwangwidodo",
        password: bcrypt.hashSync("iwangwidodo", bcrypt.genSaltSync(10)),
        institution: "Kejaksaan RI",
        createdAt: new Date(),
        updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert("Sharing_Applications", [{
        application_id: "1",
        partner_id: "1",
        createdAt: new Date(),
        updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert("Applications", [{
        user_id: 1,
        title: "Permohonan Pengaduan Tindakan Tidak Menyenangkan",
        status: "0",
        createdAt: new Date(),
        updatedAt: new Date()
    }]);

    // create token
    token = jwt.sign({
        id: 1,
        username: "danialfian"
    }, process.env.MY_JWT_TOKEN)
});

// Delete Table After Execute
afterEach(async () => {
    await queryInterface.bulkDelete('Employees', {}, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });

    await queryInterface.bulkDelete('Partners', {}, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });

    await queryInterface.bulkDelete('Sharing_Applications', {}, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });

    await queryInterface.bulkDelete('Applications', {}, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
});

// Get Sharing Application All
describe('Get Sharing Application All', () => {
    // Success
    it('Success', (done) => {
        request(app)
            .get('/employee/sharing-applications')
            .set('Authorization', token)
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.status).toBe(200)
                    done()
                }
            });
    });

    // No Token or Authorization
    it('401 Unauthorized', (done) => {
        request(app)
            .get('/employee/sharing-applications')
            .end((err, res) => {
                if (err) {
                    done(err)
                } else {
                    expect(res.status).toBe(401)
                    expect(res.body).toHaveProperty('message')
                    expect(res.body.message).toBe('Unauthorized request')
                    done()
                }
            })
    })

    // If Empty Data
    it('404 Empty', (done) => {
        queryInterface
            .bulkDelete(
                "Sharing_Applications", {}, {
                    truncate: true,
                    restartIdentity: true,
                    cascade: true
                }
            )
            .then(() => {
                request(app)
                    .get('/employee/sharing-applications')
                    .set('Authorization', token)
                    .end((err, res) => {
                        if (err) {
                            done(err)
                        } else {
                            expect(res.status).toBe(404)
                            expect(res.body).toHaveProperty('message')
                            expect(res.body.message).toBe('Data Empty')
                            done()
                        }
                    })
            })
            .catch((err) => err);
    })
});

// // Get Application By Id
// describe('Get Sharing Application By Id', () => {
//     // Success
//     it('Success', (done) => {
//         request(app)
//             .get('/employee/sharing-applications/1')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(200)
//                     done()
//                 }
//             });
//     });

//     // Not Found
//     it('Not Found', (done) => {
//         request(app)
//             .get('/employee/sharing-applications/100')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(404)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe("Data Not Found")
//                     done()
//                 }
//             });
//     });

//     // Bad Request
//     it('Bad Request', (done) => {
//         request(app)
//             .get('/employee/sharing-applications/satu')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(400)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe("Sharing Application Id must be an integer")
//                     done()
//                 }
//             });
//     });

//     // No Token or Authorization
//     it('Unauthorized', (done) => {
//         request(app)
//             .get('/employee/sharing-applications/1')
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(401)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Unauthorized request')
//                     done()
//                 }
//             })
//     })
// });

// // Create Sharing Applications
// describe('Create Sharing Applications', () => {
//     // Success
//     it('Success', (done) => {
//         queryInterface
//             .bulkDelete(
//                 "Sharing_Applications", {}, {
//                     truncate: true,
//                     restartIdentity: true,
//                     cascade: true
//                 }
//             )
//             .then(() => {
//                 request(app)
//                     .post('/employee/sharing-applications')
//                     .set('Authorization', token)
//                     .send({
//                         application_id: 1,
//                         partner_id: 1
//                     })
//                     .end((err, res) => {
//                         if (err) {
//                             done(err)
//                         } else {
//                             expect(res.status).toBe(201)
//                             expect(res.body).toHaveProperty('message')
//                             expect(res.body.message).toBe('Successfully Created!')
//                             done()
//                         }
//                     });
//             })
//             .catch((err) => err);
//     });

//     // Unauthorized
//     it('Unauthorized', (done) => {
//         request(app)
//             .post('/employee/sharing-applications')
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(401)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Unauthorized request')
//                     done()
//                 }
//             });
//     });

//     // Already Exists
//     it('Already Exists', (done) => {
//         request(app)
//             .post('/employee/sharing-applications')
//             .set('Authorization', token)
//             .send({
//                 application_id: 1,
//                 partner_id: 1
//             })
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(401)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Application and Partner already exists!')
//                     done()
//                 }
//             });
//     });

//     // Bad Request
//     it('Bad Request', (done) => {
//         request(app)
//             .post('/employee/sharing-applications')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(400)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Application Id is required')
//                     done()
//                 }
//             });
//     });
// });

// // Update Sharing Applications
// describe('Update Sharing Applications', () => {
//     // Success
//     it('Success', (done) => {
//         request(app)
//             .put('/employee/sharing-applications/1')
//             .set('Authorization', token)
//             .send({
//                 application_id: 1,
//                 partner_id: 1
//             })
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(200)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Successfully Updated!')
//                     done()
//                 }
//             });
//     });

//     // Unauthorized
//     it('Unauthorized', (done) => {
//         request(app)
//             .put('/employee/sharing-applications/1')
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(401)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Unauthorized request')
//                     done()
//                 }
//             });
//     });

//     // Not Found
//     it('Not Found', (done) => {
//         request(app)
//             .put('/employee/sharing-applications/100')
//             .set('Authorization', token)
//             .send({
//                 application_id: 1,
//                 partner_id: 1
//             })
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(404)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Data not found!')
//                     done()
//                 }
//             });
//     });

//     // Already Exists
//     it('Already Exists', (done) => {
//         queryInterface.bulkInsert("Sharing_Applications", [{
//                 application_id: "2",
//                 partner_id: "1",
//                 createdAt: new Date(),
//                 updatedAt: new Date()
//             }])
//             .then(() => {
//                 request(app)
//                     .put('/employee/sharing-applications/1')
//                     .set('Authorization', token)
//                     .send({
//                         application_id: 2,
//                         partner_id: 1
//                     })
//                     .end((err, res) => {
//                         if (err) {
//                             done(err)
//                         } else {
//                             expect(res.status).toBe(401)
//                             expect(res.body).toHaveProperty('message')
//                             expect(res.body.message).toBe('Application and Partner already exists!')
//                             done()
//                         }
//                     });
//             })
//             .catch((err) => err);
//     });

//     // Bad Request
//     it('Bad Request', (done) => {
//         request(app)
//             .put('/employee/sharing-applications/1')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(400)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Application Id is required')
//                     done()
//                 }
//             });
//     });
// });

// // Delete Sharing Application By Id
// describe("Delete Sharing Application By Id", () => {
//     // Success
//     it("Success", (done) => {
//         request(app)
//             .delete("/employee/sharing-applications/1")
//             .set("Authorization", token)
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(200)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Successfully Deleted!')
//                     done()
//                 }
//             });
//     });

//     // Unauthorized
//     it("Unauthorized", (done) => {
//         request(app)
//             .delete("/employee/sharing-applications/1")
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(401)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Unauthorized request')
//                     done()
//                 }
//             });
//     });

//     // Not Found
//     it("Not Found", (done) => {
//         request(app)
//             .delete("/employee/sharing-applications/100")
//             .set("Authorization", token)
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(404)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Data not found!')
//                     done()
//                 }
//             });
//     });

//     // Bad Request
//     it("Bad Request", (done) => {
//         request(app)
//             .delete("/employee/sharing-applications/satu")
//             .set("Authorization", token)
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(400)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Sharing Application Id must be an integer')
//                     done()
//                 }
//             });
//     });
// });
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
    const hash = bcrypt.hashSync("danialfian", bcrypt.genSaltSync(10));
    await queryInterface.bulkInsert("Employees", [{
        role_id: "2",
        identity_number: "89237891",
        fullname: "Dani Alfian",
        username: "danialfian",
        password: hash,
        birth_date: "1992-12-12",
        last_education: "S1 Akuntansi",
        department: "Perdata",
        class: "Perdata",
        createdAt: new Date(),
        updatedAt: new Date()
    }]);

    await queryInterface.bulkInsert("Users", [{
        nik: "350989007899929",
        fullname: "Renaldi Dwi Hartanto",
        email: "renaldi@gmail.com",
        username: "renaldidw",
        contact_number: "0827687778",
        place_of_birth: "Jakarta Selatan",
        birth_date: "2001-12-23T00:00:00.000Z",
        gender: "Pria",
        status: "Belum Menikah",
        job: "TNI",
        nationality: "Indonesia",
        address: "Jl. Soedirman No. 23",
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

    await queryInterface.bulkInsert("Sessions", [{
        application_id: "1",
        judge_id: "1",
        register_date: "2023-07-12",
        case_number: "092/PN/A/VI/2023",
        case_schedule: "2023-07-22",
        session_location: "Pengadilan Negeri Jember Kelas 1A",
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

    await queryInterface.bulkDelete('Users', {}, {
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

// Get Application All
describe('Get Application All', () => {
    // Success
    it('Success', (done) => {
        request(app)
            .get('/employee/applications')
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
            .get('/employee/applications')
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
                "Applications", {}, {
                    truncate: true,
                    restartIdentity: true,
                    cascade: true
                }
            )
            .then(() => {
                request(app)
                    .get('/employee/applications')
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

// Get Application By Id
// describe('Get Application By Id', () => {
//     // Success
//     it('Success', (done) => {
//         request(app)
//             .get('/employee/applications/1')
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
//             .get('/employee/applications/100')
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
//             .get('/employee/applications/satu')
//             .set('Authorization', token)
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(400)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe("Application id must be an integer")
//                     done()
//                 }
//             });
//     });

//     // No Token or Authorization
//     it('Unauthorized', (done) => {
//         request(app)
//             .get('/employee/applications/1')
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

// // Create Case Number By Application Id
// describe('Create Case Number', () => {
//     // Success
//     it('Success', (done) => {
//         request(app)
//             .put('/employee/applications/createCaseNumber/1')
//             .set('Authorization', token)
//             .send({
//                 case_number: "08/PN/PTSP/PGN/VI/2023"
//             })
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(200)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Successfully Created!')
//                     done()
//                 }
//             });
//     });

//     // Unauthorized
//     it('Unauthorized', (done) => {
//         request(app)
//             .put('/employee/applications/createCaseNumber/1')
//             .send({
//                 case_number: "08/PN/PTSP/PGN/VI/2023"
//             })
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
//             .put('/employee/applications/createCaseNumber/100')
//             .set('Authorization', token)
//             .send({
//                 case_number: "08/PN/PTSP/PGN/VI/2023"
//             })
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(404)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Data not found! Don`t forget create Sessions')
//                     done()
//                 }
//             });
//     });

//     // Bad Request
//     it('Bad Request', (done) => {
//         request(app)
//             .put('/employee/applications/createCaseNumber/satu')
//             .set('Authorization', token)
//             .send({
//                 case_number: "08/PN/PTSP/PGN/VI/2023"
//             })
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(400)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Application id must be an integer')
//                     done()
//                 }
//             });
//     });
// });

// // Delete Application By Id
// describe("Delete Application By Id", () => {
//     // Success
//     it("Success", (done) => {
//         request(app)
//             .delete("/employee/applications/1")
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
//             .delete("/employee/applications/1")
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
//             .delete("/employee/applications/100")
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
//             .delete("/employee/applications/satu")
//             .set("Authorization", token)
//             .end((err, res) => {
//                 if (err) {
//                     done(err)
//                 } else {
//                     expect(res.status).toBe(400)
//                     expect(res.body).toHaveProperty('message')
//                     expect(res.body.message).toBe('Application id must be an integer')
//                     done()
//                 }
//             });
//     });
// });
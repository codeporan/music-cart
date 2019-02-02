const expect = require("expect");
const request = require("supertest");

const app = require("../index");
const { Wood } = require("../models/wood");

// beforeEach(done => {
//   Wood.remove({})
//     .then(() => done())
//     .catch(err => done(err));
// });

describe("POST /todos", () => {
  it("should create a new todo", done => {
    var name = "Test";

    request(app)
      .post("/api/product/wood")
      .send({ name })
      .expect(200)
      .expect(res => {
        expect(res.body.name).toBe(name);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Wood.find()
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].name).toBe(name);
            done();
          })
          .catch(e => done(e));
      });
  });
});

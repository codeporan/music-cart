const expect = require("expect");
const request = require("supertest");
const app = require("../index");
const { Brand } = require("../models/brand");

describe("a suite of tests", function() {
  this.timeout(500);

  it("should take less than 500ms", function(done) {
    var title = "Apexafdsf";

    request(app)
      .post("/api/product/brand")
      .send({ title })
      .expect(200)
      .expect(res => {
        expect(res.body.title).toBe(title + "1");
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Brand.find({ name })
          .then(brands => {
            expect(brands.length).toBe(1);
            expect(brands[0].name).toBe(name);
            done();
          })
          .catch(e => done(e));
      });
    setTimeout(done, 300);
  });
});

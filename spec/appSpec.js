const request = require("supertest");
const app = require("../server/server");

// Test our App
describe("App", () => {
  console.log("Testing App");

  // Test our static pages
  describe("Angular pages", () => {
    console.log("Testing Angular pages");
    it("should return a 200 response", (done) => {
      request(app).get("/").expect(200, done);
    }, 5000);
  });

  // Test our API
  describe("API", () => {
    console.log("Testing API");

    let testProject = {
      _id: "test-project-id",
      startDate: Date.now().toString(),
      endDate: "",
      title: "Test Project",
      description: "description",
      platform: "node",
      tags: ["test", "tag"],
    };

    describe("Get Methods", () => {
      console.log("Testing Get Methods");
      it("should return a 200 response", (done) => {
        console.log("Getting /api/projects");
        request(app)
          .get("/api/projects")
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.log(err);
              done.fail(err);
            } else {
              console.log("Successfully got /api/projects: ", res.body);
              done();
            }
          });
      }, 5000);

      it("should return a 200 response", (done) => {
        console.log("Getting /api/tags");
        request(app)
          .get("/api/tags")
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.log(err);
              done.fail(err);
            } else {
              console.log("Successfully got /api/tags: ", res.body);
              done();
            }
          });
      }, 5000);
    });

    describe("Post Methods", () => {
      console.log("Testing Post Methods");

      it("should return a 200 response", (done) => {
        console.log("Posting /api/projects");
        request(app)
          .post("/api/projects")
          .send(testProject)
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.log(err);
              done.fail(err);
            } else {
              console.log("Successfully posted /api/projects: ", res.body);
              done();
            }
          });
      }, 5000);

      afterAll(() => {
        console.log("Deleting /api/projects/test-project-id");
        request(app)
          .delete("/api/projects/test-project-id")
          .expect(200)
          .end(function (err, res) {
            if (err) {
              console.log(err);
              done.fail(err);
            } else {
              console.log(
                "Successfully deleted /api/projects/test-project-id: ",
                res.body
              );
              done();
            }
          });
      }, 5000);
    });
  });
});

const { app } = require("./app");

const { database } = require("./database/database");

const { relationModel } = require("./database/relationModel");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

database
  .authenticate()
  .then(() => console.log("Database is authenticated"))
  .catch((err) => console.log(err));

relationModel();

database
  .sync()
  .then(() => console.log("Database is synced"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});

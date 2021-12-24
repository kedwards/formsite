db.createUser({
  user: "formsiteAdmin2",
  pwd: "formsiteAdmin2Pass",
  roles: [
    {
      role: "readWrite",
      db: "formsite",
    },
  ],
});
db = db.getSiblingDB("formsite");
db.test.insertOne({});
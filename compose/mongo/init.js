db.createUser({
  user: "formsiteAdmin",
  pwd: "formsiteAdminPass",
  roles: [
    {
      role: "readWrite",
      db: "formsite",
    },
  ],
});
db = db.getSiblingDB("formsite");
db.test.insertOne({});
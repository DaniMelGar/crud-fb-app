const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");

const db = admin.firestore();

router.post("/api/user", async (req, res) => {
  try {
    await db
      .collection("user")
      .doc()
      .create({ name: req.body.name, age: req.body.age });
    return res.status(204).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/api/user/:user_id", async (req, res) => {
  try {
    const doc = db.collection("user").doc(req.params.user_id);
    const item = await doc.get();
    const response = item.data();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/api/user", async (req, res) => {
  try {
    const query = db.collection("user");
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      age: doc.data().age,
    }));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/api/user/:user_id", async (req, res) => {
  try {
    const doc = db.collection("user").doc(req.params.user_id);
    await doc.delete();

    return res.status(204).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/api/user/:user_id", async (req, res) => {
  try {
    const doc = db.collection("user").doc(req.params.user_id);
    await doc.update({
      name: req.body.name,
      age: req.body.age,
    });

    return res.status(204).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;

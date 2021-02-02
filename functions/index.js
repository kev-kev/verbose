const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://verbose-1c690-default-rtdb.firebaseio.com",
});
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

app.get("/api/index", (req, res) => {
  (async () => {
    try {
      const response = [];
      const entriesRef = db.collection("entries");
      const snapshot = await entriesRef.get();
      snapshot.forEach((doc) => {
        response.push(doc.data());
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get("/api/:word", (req, res) => {
  (async () => {
    try {
      const entryRef = db.collection("entries").doc(req.params.word);
      const doc = await entryRef.get();
      if (!doc.exists) {
        return res.status(404).send(`No entry for ${req.params.word}`);
      }
      return res.status(200).send(doc.data());
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/api/create", (req, res) => {
  (async () => {
    const entry = req.body;
    try {
      await db.collection("entries").doc(entry.word).set(entry);
      return res.status(200).send(entry);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.put("/api/:word", (req, res) => {
  (async () => {
    const entry = req.body;
    try {
      const entryRef = db.collection("entries").doc(req.params.word);
      const doc = await entryRef.get();
      if (!doc.exists) {
        return res.status(404).send(`No entry for ${req.params.word}`);
      }
      entryRef.update(entry);
      return res.status(200).send('Entry successfully updated');
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.delete("/api/:word", (req, res) => {
  (async () => {
    try {
      await db.collection("entries").doc(req.params.word).delete();
      return res.status(200).send(`Deleted entry for ${req.params.word}`);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);

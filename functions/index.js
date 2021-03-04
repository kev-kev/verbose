require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_DB_URL,
});

const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

function getIndex(res) {
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
}

app.get("/api/index", (req, res) => {
  getIndex(res);
});

app.get("/api/:word", (req, res) => {
  (async () => {
    try {
      const entryRef = db.collection("entries").doc(req.params.word);
      const doc = await entryRef.get();
      if (!doc.exists) {
        return res.status(404).send("Entry not found");
      }
      getIndex(res);
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
      getIndex(res);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.put("/api/:word", (req, res) => {
  (async () => {
    try {
      await db.collection("entries").doc(req.params.word).set(req.body);
      getIndex(res);
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
      getIndex(res);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);

require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const serviceAccount = require("./permissions.json");
const fetch = require("node-fetch");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://verbose-1c690-default-rtdb.firebaseio.com",
});
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

// Dictionary API setup
const endpoint = "entries";
const languageCode = "en-us";
const wordID = "example";
const url =
  process.env.DICT_APP_URL +
  endpoint +
  "/" +
  languageCode +
  "/" +
  wordID.toLowerCase();
const headers = {
  app_id: process.env.DICT_APP_ID,
  app_key: process.env.DICT_APP_KEY,
};

getDefinitionsFromJson = (json) => {
  return json.results[0].lexicalEntries[0].entries[0].senses[0].definitions;
};

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

app.get("/api/:id", (req, res) => {
  (async () => {
    try {
      const entryRef = db.collection("entries").doc(req.params.id);
      const doc = await entryRef.get();
      if (!doc.exists) {
        return res.status(404).send("Entry not found");
      }
      return res.status(200).send(doc.data());
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/api/create", (req, res) => {
  fetch(url, {
    headers: headers,
  })
    .then((r) => r.json())
    .then((json) => {
      (async () => {
        const entry = req.body;
        entry.dictionaryDefinitions = getDefinitionsFromJson(json);
        try {
          await db.collection("entries").add(entry);
          return res.status(200).send(entry);
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      })();
    });
});

app.put("/api/:id", (req, res) => {
  (async () => {
    const entry = req.body;
    try {
      const entryRef = db.collection("entries").doc(req.params.id);
      const doc = await entryRef.get();
      if (!doc.exists) {
        return res.status(404).send(`No entry for ${req.params.id}`);
      }
      entryRef.update(entry);
      return res.status(200).send("Entry successfully updated");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.delete("/api/:id", (req, res) => {
  (async () => {
    try {
      await db.collection("entries").doc(req.params.id).delete();
      return res.status(200).send(`Deleted entry for ${req.params.id}`);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);

import express from "express";
const app = express();

/* app.get((req, res) => {
    res.send('Hello World!');
   
}); */

app.use(express.urlencoded({ extended: true }));

/** SETTING UP LOWDB */
//lowdb
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();

db.data ||= { records: [] };

app.get("/api/records", async (req, res, next) => {
	const { records } = db.data;

	res.send(records);
});

app.post("/api/records", async (req, res) => {
	const { records } = db.data;
	records.push({ ...req.body, id: Date.now().toString() });
	await db.write();
	res.send(records);
});

const port = process.env.PORT || 6000;
app.listen(port, () => console.log("Server is running on port:", port));

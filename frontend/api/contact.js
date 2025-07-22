// api/contact.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  try {
    await client.connect();
    const db = client.db('your_db_name');
    const collection = db.collection('contacts');

    const { name, email, message } = req.body;

    await collection.insertOne({ name, email, message, createdAt: new Date() });

    return res.status(200).json({ message: 'Contact saved successfully!' });
  } catch (err) {
    console.error('MongoDB Error:', err);
    return res.status(500).json({ error: 'Failed to save contact' });
  } finally {
    await client.close();
  }
}

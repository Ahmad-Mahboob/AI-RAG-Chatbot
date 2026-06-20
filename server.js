const express = require('express');
require('dotenv').config();
const { storeEmbeddings } = require('./ingest');
const { handleQuery } = require('./rag');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const showName = (req, res) => {
    const query = req.body.query;
    console.log(query);
    res.json({ query });
}

app.get('/', showName);
app.post('/storeEmbeddings', storeEmbeddings);
app.post('/question', handleQuery);

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});
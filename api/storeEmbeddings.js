const { storeEmbeddings } = require('../ingest');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method Not Allowed'
        });
    }

    return storeEmbeddings(req, res);
};
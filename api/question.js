const { handleQuery } = require('../rag');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method Not Allowed'
        });
    }

    return handleQuery(req, res);
};
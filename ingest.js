const supabase = require('./supabaseClient');
// Local
const splitter = require('./chunking');
const { generateEmbedding } = require('./embedding');

// Data:
const data = require('./data');


const ingestData = async (data, section) => {
    for (const key in data) {
        if (key != section) continue

        if (!Object.hasOwn(data, key)) continue;
        const source = key;
        const textChunk = data[key];
        const texts = await splitter.splitText(textChunk);
        console.log(texts);

        // For Loop to Insert Each Vector Embedding
        let errorMessage;
        for (const text of texts) {
            const embedding = await generateEmbedding(text);
            const vector = embedding[0]['values'];
            const { error } = await supabase.from('documents').insert({ content: text, metadata: { source }, embedding: vector });
            errorMessage = error;
        }
        return errorMessage || '';

    }
}

exports.storeEmbeddings = async (req, res) => {
    const section = req.body.section;
    const result = await ingestData(data, section);

    res.json({ status: true, result });
}
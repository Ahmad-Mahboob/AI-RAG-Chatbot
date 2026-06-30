const ai = require('./geminiClient');
const embeddingModel = process.env.EMBEDDING_MODEL;
exports.generateEmbedding = async (chunk) => {
    try {
        const response = await ai.models.embedContent({
            model: embeddingModel,
            contents: chunk,
            config: { outputDimensionality: process.env.EMBEDDING_DIMENSIONS },
        });

        // console.log(response.embeddings);
        return response.embeddings;
    } catch (error) {
        console.log(error);
        throw new Error("No Embeddings Found!")
    }

}

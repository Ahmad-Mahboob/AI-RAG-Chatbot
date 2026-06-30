const supabase = require('./supabaseClient');
const { generateEmbedding } = require('./embedding')


exports.getQueryEmbeddings = async (query) => {

    try {
        const questionEmbedding = await generateEmbedding(query);
        const embedding = questionEmbedding[0]['values'];
        const { data, error } = await supabase.rpc(
            "match_documents",
            {
                query_embedding: embedding,
                match_count: 5,
            }
        );
        if (error) {
            console.log(error);
            throw new Error('Error while fetching related chunks from DB using match_documents');
        }
        return data;

    } catch (error) {
        console.log(error);
        throw new Error('Error while generating embeddings;')
    }
}
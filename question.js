const supabase = require('./supabaseClient');
const { generateEmbedding } = require('./embedding')


exports.getQueryEmbeddings = async (query) => {
    const questionEmbedding = await generateEmbedding(query);
    const embedding = questionEmbedding[0]['values'];
    const { data, error } = await supabase.rpc(
        "match_documents",
        {
            query_embedding: embedding,
            match_count: 5,
        }
    );
    console.log("ERROR: ", error);
    return data;
}
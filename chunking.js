const { TokenTextSplitter } = require('@langchain/textsplitters');

const splitter = new TokenTextSplitter({ encodingName: "cl100k_base", chunkSize: 500, chunkOverlap: 200 });

module.exports = splitter;
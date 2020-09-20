const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Definition {
    etymologies: [String!],
    definitions: [String!]
    examples: [String!]
    lexicalCategory: String
}

type Word {
    _id: ID!
    word: String!
    definitions: [Definition]!
}

type RootQuery{
    words: [Word!]!  
    searchWords(word: String!): [Word!]!
    searchWordById(_id: ID!): Word!               
}

type RootMutation{
    createWord(word: String!): Word
}

schema{
    query: RootQuery
    mutation: RootMutation
}
`);

const { gql } = require("@apollo/client");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

// // const { v1: uuid } = require("uuid");

let pages = [
  {
    id: 1,
    date: {
      month: 11,
      day: {
        number: 11,
        name: "mon",
      },
      year: 2024,
    },
  },
  {
    id: 2,
    date: {
      month: 11,
      day: {
        number: 12,
        name: "tue",
      },
      year: 2024,
    },
  },
];

const typeDefs = gql`
  type Day {
    number: Int!
    name: String!
  }

  type Date {
    month: Int!
    day: Day!
    year: Int!
  }

  type Page {
    id: ID!
    date: Date!
  }

  type Query {
    pageCount: Int!
    findPage(month: Int!, dayNum: Int!, year: Int!): Page
  }
`;

const resolvers = {
  Query: {
    pageCount: () => pages.length,
    findPage: (root, args) => {
      const { month, dayNum, year } = args;
      return pages.find(
        (page) =>
          page.date.month === month &&
          page.date.day.number === dayNum &&
          page.date.year === year
      );
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

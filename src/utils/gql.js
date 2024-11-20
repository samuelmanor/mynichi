const { gql } = require("@apollo/client");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { v1: uuid } = require("uuid");

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
        number: 18,
        name: "mon",
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
    getAvailablePages: [ID]
  }

  type Mutation {
    addPage(month: Int!, dayName: String!, dayNum: Int!, year: Int!): Page
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
    getAvailablePages: () => {
      return pages.map((page) => page.id);
    },
  },
  Mutation: {
    addPage: (root, args) => {
      const pageAlreadyExists = pages.find((p) => {
        return (
          p.date.month === args.month &&
          p.date.day.number === args.dayNum &&
          p.date.year === args.year
        );
      });

      if (pageAlreadyExists) {
        return pageAlreadyExists;
      } else {
        const newPage = {
          id: uuid(),
          date: {
            month: args.month,
            day: {
              name: args.dayName,
              number: args.dayNum,
            },
            year: args.year,
          },
        };

        pages.push(newPage);
        return newPage;
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: false,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

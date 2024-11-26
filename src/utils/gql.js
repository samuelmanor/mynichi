const { gql } = require("@apollo/client");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { v1: uuid } = require("uuid");

let pages = [
  {
    id: "1",
    date: {
      month: 11,
      week: 3,
      day: {
        number: 11,
        name: "mon",
      },
      year: 2024,
    },
  },
  {
    id: "603bef20-ab62-11ef-9d82-9fc91bb95cd1",
    date: {
      month: 11,
      week: 5,
      day: {
        number: 25,
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
    week: Int!
    day: Day!
    year: Int!
  }

  type Page {
    id: ID!
    date: Date!
  }

  type Query {
    pageCount: Int!
    findPage(month: Int, dayNum: Int, year: Int, id: String): Page
    getAvailablePages: [ID]
  }

  type Mutation {
    addPage: Page
  }
`;

const resolvers = {
  Query: {
    pageCount: () => pages.length,
    findPage: (root, args) => {
      console.log(args);
      if (args.id) {
        const page = pages.find((page) => page.id === args.id);
        return page;
      } else {
        return pages.find(
          (page) =>
            page.date.month === args.month &&
            page.date.day.number === args.dayNum &&
            page.date.year === args.year
        );
      }
    },
    getAvailablePages: () => {
      return pages.map((page) => page.id);
    },
  },
  Mutation: {
    addPage: (root, args) => {
      const date = new Date();
      const today = {
        day: {
          number: date.getDate(),
          name: date.toDateString().split(" ")[0].toLowerCase(),
        },
        month: date.getMonth() + 1,
        week: Math.floor((date.getDate() + date.getDay()) / 7) + 1,
        year: date.getFullYear(),
      };

      const pageAlreadyExists = pages.find((p) => {
        return (
          p.date.month === today.month &&
          p.date.day.number === today.day.number &&
          p.date.week === today.week &&
          p.date.year === today.year
        );
      });

      if (pageAlreadyExists) {
        return pageAlreadyExists;
      } else {
        const newPage = {
          id: uuid(),
          date: today,
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

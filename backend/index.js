const { ApolloServer } = require("@apollo/server");
require("dotenv").config();
const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Page = require("./models/page");

console.log("connecting to", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI, { dbName: "notebook" })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const typeDefs = `
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
    pageCount: () => Page.collection.countDocuments(),
    // pageCount: () => pages.length,
    // findPage: (root, args) => {
    //   console.log(args);
    //   if (args.id) {
    //     const page = pages.find((page) => page.id === args.id);
    //     return page;
    //   } else {
    //     return pages.find(
    //       (page) =>
    //         page.date.month === args.month &&
    //         page.date.day.number === args.dayNum &&
    //         page.date.year === args.year
    //     );
    //   }
    // },
    // getAvailablePages: () => {
    //   return pages.map((page) => page.id);
    // },
  },
  Mutation: {
    // addPage: (root, args) => {
    //   const date = new Date();
    //   const today = {
    //     day: {
    //       number: date.getDate(),
    //       name: date.toDateString().split(" ")[0].toLowerCase(),
    //     },
    //     month: date.getMonth() + 1,
    //     week: Math.floor((date.getDate() + date.getDay()) / 7) + 1,
    //     year: date.getFullYear(),
    //   };
    //   const pageAlreadyExists = pages.find((p) => {
    //     return (
    //       p.date.month === today.month &&
    //       p.date.day.number === today.day.number &&
    //       p.date.week === today.week &&
    //       p.date.year === today.year
    //     );
    //   });
    //   if (pageAlreadyExists) {
    //     return pageAlreadyExists;
    //   } else {
    //     const newPage = {
    //       id: uuid(),
    //       date: today,
    //     };
    //     pages.push(newPage);
    //     return newPage;
    //   }
    // },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => {
  console.log(`server ready at ${url}`);
});

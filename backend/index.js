const { ApolloServer } = require("@apollo/server");
require("dotenv").config();
const { startStandaloneServer } = require("@apollo/server/standalone");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const Page = require("./models/page");
const { GraphQLError } = require("graphql");

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

  type Habit {
    id: ID!
    name: String!
    completed: Boolean!
  }

  type Page {
    id: ID!
    date: Date!
    habits: [Habit]
  }

  type PageInfo {
    page: Page
    isEnd: Boolean
  }

  type WeeklyHabits {
    day: Int!
    habits: [Habit]
  }

  type Query {
    pageCount: Int!
    findPage(month: Int, dayNum: Int, year: Int, id: String): Page
    getPreviousPage(id: String!): PageInfo
    getNextPage(id: String!): PageInfo
    getWeeklyHabits(week: Int!, month: Int!, year: Int!): [WeeklyHabits]
  }

  type Mutation {
    addPage: Page
    updateHabit(pageId: ID!, habitId: ID!, name: String!, completed: Boolean!): Habit
  }
`;

const resolvers = {
  Query: {
    pageCount: () => Page.collection.countDocuments(),
    findPage: async (root, args) => {
      if (args.id) {
        const page = await Page.findById(args.id);
        return page;
      } else {
        const page = await Page.findOne({
          "date.month": args.month,
          "date.day.number": args.dayNum,
          "date.year": args.year,
        });
        return page;
      }
    },
    getPreviousPage: async (root, args) => {
      const previousPage = await Page.findOne({
        _id: { $lt: args.id },
      })
        .sort({ _id: -1 })
        .limit(1);

      if (previousPage) {
        const firstPage = await Page.findOne().sort({ _id: 1 }).limit(1);
        const isEnd = previousPage.id === firstPage.id;
        return { page: previousPage, isEnd };
      } else {
        return { page: null, isEnd: true };
      }
    },
    getNextPage: async (root, args) => {
      const nextPage = await Page.findOne({
        _id: { $gt: args.id },
      })
        .sort({ _id: 1 })
        .limit(1);

      if (nextPage) {
        const lastPage = await Page.findOne().sort({ _id: -1 }).limit(1);
        const isEnd = nextPage.id === lastPage.id;
        return { page: nextPage, isEnd };
      } else {
        return { page: null, isEnd: true };
      }
    },
    getWeeklyHabits: async (root, args) => {
      const habits = await Page.find({
        "date.month": args.month,
        "date.week": args.week,
        "date.year": args.year,
      }).then((pages) => {
        const weeklyHabits = pages.map((page) => {
          return {
            day: page.date.day.number,
            habits: page.habits,
          };
        });

        return weeklyHabits;
      });

      if (habits) {
        return habits;
      } else {
        throw new GraphQLError("No habits found for the week");
      }
    },
  },
  Mutation: {
    addPage: async (root, args) => {
      const date = new Date();
      Date.prototype.getWeekOfMonth = function () {
        var firstWeekday = new Date(
          this.getFullYear(),
          this.getMonth(),
          1
        ).getDay();
        var offsetDate = this.getDate() + firstWeekday - 1;
        return Math.floor(offsetDate / 7) + 1;
      };

      const today = {
        day: {
          number: date.getDate(),
          name: date.toDateString().split(" ")[0].toLowerCase(),
        },
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        week: date.getWeekOfMonth(),
      };

      const pageAlreadyExists = await Page.findOne({
        "date.month": today.month,
        "date.day.number": today.day.number,
        "date.year": today.year,
      });

      if (pageAlreadyExists) {
        return pageAlreadyExists;
      }

      // if a previous page exists, copy its habits
      const previousPage = await Page.findOne({
        _id: { $lt: args.id },
      })
        .sort({ _id: -1 })
        .limit(1);

      const habits = previousPage
        ? previousPage.habits.map((habit) => ({ ...habit, completed: false }))
        : [
            { name: "blank", completed: false },
            { name: "blank", completed: false },
            { name: "blank", completed: false },
            { name: "blank", completed: false },
          ];

      const newPage = new Page({
        date: today,
        habits,
      });

      const savedPage = await newPage.save();
      return savedPage;
    },
    updateHabit: async (root, args) => {
      const page = await Page.findById(args.pageId);
      const habit = page.habits.filter((habit) => habit.id === args.habitId)[0];
      habit.name = args.name;
      habit.completed = args.completed;
      await page.save();
      return habit;
    },
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

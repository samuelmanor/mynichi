import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./reducers/store";

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
import { pages } from "./reducers/JournalReducer";

const typeDefs = `
  type Page {
    id: Int!
    date: {
    month: Int!
    day: {
      number: Int!
      name: String!
    }
    year: Int!
    }
  }

  type Query {
    pages: [Page!]!
    getPage(id: Int, date: {month: Int!, day: {number: Int!, name: String!}, year: Int!}): Page
  }
`;

const resolvers = {
  Query: {
    pages: () => pages,
    getPage: (parent, args) => {
      const { id, date } = args;
      if (id) {
        return pages.find((page) => page.id === id);
      } else {
        return pages.find(
          (page) =>
            page.date.year === date.year &&
            page.date.month === date.month &&
            page.date.day.number === date.day.number
        );
      }
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

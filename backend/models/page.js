const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  date: {
    month: {
      type: Number,
      required: true,
    },
    week: {
      type: Number,
      required: true,
    },
    day: {
      number: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    year: {
      type: Number,
      required: true,
    },
  },
  habits: [
    {
      name: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

pageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Page", pageSchema);

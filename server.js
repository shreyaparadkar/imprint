const express = require("express");
const app = express();
const cors=require('cors')
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./DB/config/connect');
connectDB();

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

const signupRoute = require("./routes/api/signup.routes");
const loginRoute = require("./routes/api/login.routes");
const addNotesRoute=require('./routes/api/addnotes.routes');
const viewClientRoute = require("./routes/api/viewclient.routes");
const followUpRoute = require("./routes/api/followup.routes");
const removeClientRoute = require("./routes/api/removeclient.routes");
const updateNoteRoute = require("./routes/api/updatenote.routes");
const deleteNoteRoute = require("./routes/api/deletenote.routes");


app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use('/api/addnotes',addNotesRoute);
app.use("/api/viewclient", viewClientRoute);
app.use("/api/followup", followUpRoute);
app.use("/api/removeclient", removeClientRoute);
app.use("/api/updatenote", updateNoteRoute);
app.use("/api/deletenote", deleteNoteRoute);

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.use('*', express.static(path.join(__dirname, "client", "build")))
// }

app.listen(port, () => {
  console.log(`Server is running on 5000`);
});

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

//connecting to db
connectDB();

//middleware

app.use(express.json({ extended: false }));

//serve in production

if (process.env.NODE_ENV === 'production') {
  //set static folder!
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
//Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/users', require('./routes/users'));
app.listen(PORT, () => {
  console.log(`Server Listening @ PORT - ${PORT}`);
});

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  res.json({ msg: 'server is up and getting requests to send respones :) ;' });
});

//Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/users', require('./routes/users'));
app.listen(PORT, () => {
  console.log(`Server Listening @ PORT - ${PORT}`);
});

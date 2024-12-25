const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dataRoutes = require('./routes/dataRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :response-time ms'));


app.use('/api', dataRoutes);
app.get('/', (req, res) => {
  res.send({ message: 'Node.js Express server!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

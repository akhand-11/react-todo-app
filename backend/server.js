const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const taskRoutes = require('./routes/tasks');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI=
    "mongodb+srv://akhandyadav16:dH11RKkO07pQpmGB@cluster0.zm1ldse.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    }

)
.then(() => {console.log("MongoDB connected successfully");
app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
})
.catch((err) => console.error("MongoDB connection error:", err));

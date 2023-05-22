const express = require('express')
const app = express()
const path = require('path')
const Score = require('./model.score')
require('./db')


PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.put('/scoreupdate',async (req,res) => {
    const {scorebd} = req.body;
    await Score.findByIdAndUpdate('646baaee9e2877f5c2a6035c',{scorebd});
    //console.log(scorebd)
});

app.get('/scorebd', async (req, res) => {
  try {
    const scores = await Score.findById('646baaee9e2877f5c2a6035c');
    res.json({ scores });
  } catch (error) {
    console.error('Error al obtener el puntaje:', error);
    res.status(500).json({ error: 'Error al obtener el puntaje' });
  }
});

  

app.listen(PORT,()=>{
    console.log('Abierto puerto 3000')
})
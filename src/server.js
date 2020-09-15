const app = require("./app");

const port = 3333;
app.listen(port, () => {
    console.log(`🎉 Server is running at http://localhost:${port}\n`); 
    //`lorem ipsum ... ${var name}` -> Interpola var name na string (as aspas (`) são importantes)
});
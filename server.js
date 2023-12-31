const app = require("./app");
const express=require("express")


// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
app.use(express.json()),

app.get("/",(req,res)=>{
  res.send("server working")
})


const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

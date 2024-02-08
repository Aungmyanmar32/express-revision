import express, { Request, Response } from "express";
import fs from "fs";

//fs - file system module

const app = express(); // cosnt server = http.crateServer()
const PORT = 5000;

app.use(express.json());
app.use(express.text());

// middleware
//middleware("route" , (req,res)=>{ })
//GET -> get()
//POST -> post()
//PUT -> put()
//DELETE -> delete()
//use(middleware)
//use(json())
//express
//json()
//text()

app.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync("data.json");
  res.send(data);
});

/*
fetch("url",{
    method: "POST",
    body: "hello"
})

*/
app.post("/", (req: Request, res: Response) => {
  const data = req.body;
  const existingData = fs.readFileSync("data.json").toString();
  const existArray = JSON.parse(existingData);
  const newArray = [...existArray, data];
  const newFile = fs.writeFileSync("data.json", JSON.stringify(newArray)); //Buffer,string,unit8arry
  res.send("file updated");
});

app.put("/", (req: Request, res: Response) => {
  const method = req.method;
  res.send(method);
});

app.delete("/", (req: Request, res: Response) => {
  const method = req.method;
  const { filename } = req.query;
  console.log(filename);

  fs.unlink(filename as string, (error) => {
    if (error) throw error;
    console.log("file deleted");
  });
  res.send(method);
});

app.listen(PORT, () => console.log("Server is running on Port", PORT));

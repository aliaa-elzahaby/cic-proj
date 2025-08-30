import  express from 'express'
import os from 'os'


const  app = express()
const PORT =3000

app.get("/", (req,res)=>{
       const message='hello world,i am Aliaa Ahmed .  we are working with CIC students :)  ...'
       res.send('hello world,i am Aliaa Ahmed .... we are cic .... ')

})

app.listen(PORT,()=>{
        console.log(`web server is listening at port ${PORT}`);
        console.log(os.hostname())
})

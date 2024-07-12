const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
app.use(express.json());

function getval(num){

    let arr=[];
    for(i=0;i<num;i++){
        arr[i]= faker.number.int({'min':0,'max':10});
    }
    return arr;
}
function calavg(arrs){
    let sum=0;
    for(i=0;i<arrs.length;i++){
        sum+=parseInt(arrs[i]);
    }
    return sum/arrs.length;
}
app.get('/numbers/:e',(req,res)=>{
const val = getval(10);
const t =calavg(val)
const r ={
    "numbers":val,
    "avg":t
}
res.json(r);
});

app.listen(2000, () => {
    console.log(`Server is running on http://localhost:${2000}`);
});

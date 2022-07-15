const {Router} = require ("express");
const router = Router();

//Import fakedata
const {data} = require('../fakedatabase.js');


//Order array by name property 
function orderByName( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

router.get('/',(req,res) =>{
  const isEmptyQuery= Object.keys(req.query).length === 0;
  if(isEmptyQuery){
    data.sort(orderByName);
    res.json(data);
  }else{
    const {pfrase} = req.query;
    if(pfrase){
      const result = data.filter(element => element.name.toLowerCase().includes(pfrase.toLowerCase()));
      result.sort(orderByName);
      res.json(result);
    }else{
      res.status(400);
      res.send('400 Bad Request');
    }
  }
    
});

router.get('/:id',(req,res) =>{
  const {id}=req.params;
  const elementFound =data.find(element => element.id===id);
  if(elementFound!=null){
    res.json(elementFound);
  }else{
    res.status(404);
    res.send('404 Not found');
  }
});

router.delete('/:id',(req,res)=>{
  const {id}=req.params;
  const index =data.findIndex(element => element.id===id);
  if(index===-1){
    res.status(404);
    res.send('404 Not found');
  }else{
    data.splice(index, 1);
    res.status(204);
    res.send('204 No Content');
  }
  
});

module.exports = router;
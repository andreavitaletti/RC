setTimeout(function(){
  console.log('A) prima accedo');
}, 2000);  

setTimeout(function(){
  console.log('A) poi leggo');
}, 500);  


setTimeout(function(){
  console.log('B) prima accedo');
  setTimeout(function(){
		console.log('B) poi leggo');
  }, 500);  
}, 2000);  





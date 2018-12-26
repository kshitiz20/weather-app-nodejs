console.log('Starting');

setTimeout(()=>{
console.log('Inside Callback');
},2000)

setTimeout(()=>{
    console.log('Inside Second')
},0);

console.log('Ending');
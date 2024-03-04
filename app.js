const express = require('express');
const process = require('process');
const app = express();
const port = process.env.PORT || 3000;

let totalRequestedMemory = []
let bufferArray = []

app.get('/allocate', (req, res) => {
  // Receive the desired memory allocation 
  const requestedMemory = parseInt(req.query.memory, 10) || 0
  const requestedCount = parseInt(req.query.count, 10) || 1
  // Allocate memory in MB
  const BUFFER_SIZE = requestedMemory * 1024 * 1024;

  const allocateMemory = () => {
    console.log('Memory Buffer in MB: ' + (BUFFER_SIZE * requestedCount))

    for (let i = 0; i < requestedCount; i++) {
      bufferArray.push(Buffer.alloc(BUFFER_SIZE))
      const bufferAt = (bufferArray.length - 1)
      bufferArray[bufferAt].fill(1)
      totalRequestedMemory.push(requestedMemory)
    }
    console.log(`BUFFER ARRAY: ${bufferArray.length}`)
    console.log(`Total requested memory: ${totalRequestedMemory.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`)

  };

  // Simulate memory allocation in a loop
  allocateMemory();

  res.send(`Memory allocated: ${(BUFFER_SIZE)}`);
});

// Deallocate latest added memory buffer
app.get('/deallocate', (req, res) => {
  const requestedCount = parseInt(req.query.count, 10) || 1
  const deallocateMemory = () => {
    for (let i = 0; i < requestedCount; i++) {
      bufferArray.pop()
      totalRequestedMemory.pop()
    }
    global.gc()
  }
  deallocateMemory()
  console.log(`Total requested memory: ${totalRequestedMemory.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`)
  res.send(`Deallocated memory`)
})

app.get('/clear', (req, res) => {
  const clearMemory = () => {
    bufferArray = []
    totalRequestedMemory = []
    console.log(`Total requested memory: ${totalRequestedMemory.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}`)
    global.gc()
  }
  clearMemory()
  res.send(`Cleared all memory`)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const express = require('express');
const process = require('process');
const app = express();
const port = process.env.PORT || 3000; 

let bufferArray = []

app.get('/allocate', (req, res) => {
  // Receive the desired memory allocation 
  const requestedMemory = parseInt(req.query.memory, 10) || 0
  // Allocate memory in MB
  const BUFFER_SIZE = requestedMemory * 1024 * 1024;
  const allocationDelay = 1000

  const allocateMemory = () => {
    console.log('Memory Buffer in MB: ' + (BUFFER_SIZE))
    setTimeout(() => {

      bufferArray.push(Buffer.alloc(BUFFER_SIZE))
      bufferArray[bufferArray.length - 1].fill(0)
      console.log(`Buffer array length: ${bufferArray.length}`)
      
      console.log('Memory released');
    }, allocationDelay);
  };

  allocateMemory();
  res.send(`Memory allocated: ${(BUFFER_SIZE)}`);
});

// Deallocate latest added memory buffer
app.get('/deallocate', (req, res) => {
  const deallocateMemory = () => {
    bufferArray.pop()
    global.gc()
  }
  deallocateMemory()
  res.send(`Deallocated memory`)
})

// Clear all memory buffers
app.get('/clear', (req, res) => {
  const clearMemory = () => {
    bufferArray = null
    global.gc()
  }
  clearMemory()
  res.send(`Cleared all memory`)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
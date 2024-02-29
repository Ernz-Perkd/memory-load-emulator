const express = require('express');
const process = require('process');
const app = express();
const port = process.env.PORT || 3000; 

app.get('/', (req, res) => {
  // Receive the desired memory allocation 
  const requestedMemory = parseInt(req.query.memory, 10) || 0;
  // Allocate memory in MB
  const BUFFER_SIZE = requestedMemory * 1024 * 1024;
  const allocationDelay = 1000; // 1 second

  const allocateMemory = () => {
    const buffer = Buffer.alloc(BUFFER_SIZE);
    console.log('Memory Buffer in MB: ' + requestedMemory)
    setTimeout(() => {
      buffer.fill(0); // Release the allocated memory
      console.log('Memory released');
    }, allocationDelay);
  };

  // Simulate memory allocation in a loop
    allocateMemory();

  // Informative response indicating memory load simulation (not modifying memory directly)
  res.send(`Simulating memory load with Buffer allocation and delay. Requested memory: ${requestedMemory}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
# memory-load-emulator
 A simple nodejs app that emulates memory load

## Installation
* Clone the repo to your local machine 
```
git clone https://github.com/Ernz-Perkd/memory-load-emulator.git
```

* Redirect to app folder
```
cd memory-load-emulator
```
* Open Docker Destop 

* Build using docker-compose file
```
docker-compose up --build      
```

* Once running, using postman and GET method, run one of the following requests:
* To allocate memory, use the following URL 
```
http://localhost:3000/allocate?memory=<memorySize>&count=<bufferCount>
```
where memorySize is the amount of memory in MB to be allocated incrementally to the app, and the optional bufferCount is the number of times the mrmory is allocated (default value is 1). Note that the maximum buffer size of nodejs per buffer is 4096 MB. 

* To deallocate latest memory added to the memory buffer
```
http://localhost:3000/deallocate?count=<bufferCount>
```
where bufferCount is the number of most recent buffers to be removed

* To clear all existing memory buffers
```
http://localhost:3000/clear
```

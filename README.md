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

* Once running, open the following in your browser
```
http://localhost:3000/?memory=<size>
```
where <size> is the amount of memory in MB to be allocated to the app. Note that the maximum buffer size of nodejs is 4096 MB. Example:

```
http://localhost:3000/?memory=1024

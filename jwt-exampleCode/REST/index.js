import fetch from 'node-fetch'
//import fs from 'fs'
//const reader = fs.readFileSync
//const write = fs.writeFileSync
let config = ''
let data = ''
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyeSIsImVtYWlsIjoieGluamlhbmdjcm9zaW5AZ21haWwuY29tIiwiaWQiOiI2MjYxZTAxMjhkYTA3MTExNmFiM2ViNDQiLCJpYXQiOjE2NTA2MTM3ODEsImV4cCI6MTY1MDYxMzgxMX0.9304KmuCiOMExuzbO3zHjGTUJfYbdEJJ9LQvHkii_7g'//29tIiwiaWQiOiI2MjYxZTAxMjhkYTA3MTExNmFiM2ViNDQiLCJpYXQiOjE2NTA2MTMyMjMsImV4cCI6MTY1MDYxMzI1M30.gaSVL_9Nr5vsiSpzcnItQb4Wqo5xcuF-4d9yx5At9R0'
//token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyeSIsImVtYWlsIjoieGluamlhbmdjcm9zaW5AZ21haWwuY29tIiwiaWQiOiI2MjYxZTAxMjhkYTA3MTExNmFiM2ViNDQiLCJpYXQiOjE2NTA2MTQwNTksImV4cCI6MTY1MDYxNDA4OX0.QrlqKPs-y_hTG7ziMr_q8CFdU2OduXWRKgQKB5uC7igi'
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyeSIsImVtYWlsIjoieGluamlhbmdjcm9zaW5AZ21haWwuY29tIiwiaWQiOiI2MjYxZTAxMjhkYTA3MTExNmFiM2ViNDQiLCJpYXQiOjE2NTA2MTQxNDQsImV4cCI6MTY1MDYxNzc0NH0._UY6VSXshkN2S4RChMLa0Llo2B8TvIOjGdGB4Iwx3vM'
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFyeSIsImVtYWlsIjoieGluamlhbmdjcm9zaW5zQGdtYWlsLmNvbSIsImlkIjoiNjI2MzE2NjNiZDU3YTU1MzVjM2ZkZWZhIiwiaWF0IjoxNjUwNjYxMDI5LCJleHAiOjE2NTA2NjQ2Mjl9.cHk5FPmh3-jMqwL4jUjd7MiWEh4K_7oNVWXvnZDudTY'
const create = () =>{
    //data is body
    data = {name:'ary',password:'28',confirmPassword:'28',email:"xinjiangcrosins@gmail.com"}
    let usersGET = {
        url:'http://127.0.0.1:8888',
        path:'/token/xinjiangcrosins@gmail.com',
        method:'GET',
        headers:{'Content-Type':'application/json'},//'Authorization':'Bearer '+token },
        credentials:'include'
        //body:JSON.stringify(data) 
    }
    let login = {
        url:'',
        path:'/login/',
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    }
    let usersPOST = {
        url:'http://localhost:8888',
        path:'/users/',
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
    }

    config = usersGET

}


const run = async() =>{
    config = ''
    data = ''
    create()
    console.clear()
    //console.log('send-request:',config)
    let option = {method:config.method}
    if(config.headers != undefined){
        option.headers = config.headers
    }
    if(config.body != undefined){
        option.body = config.body
    }
    console.log('sending request to host :\n',option)
    try {
        const req = await fetch(config.url+config.path,option)
        console.log(config.url+config.path)
        const request = await req.json()
        //console.log(await req.json())
        console.log('request.status :',req.status)
        console.log('http respons :',request)
        //console.log(req)
    } catch (e) {
       console.log(e.toString()) 
    }
}
export default run

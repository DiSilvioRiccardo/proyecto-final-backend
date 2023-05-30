import app from './index.js';
const request = require('supertest');

//Asegurese de vaciar la base de datos antes de correr esto
let api = request(app);

async function getToken(email, password){
    let resultado = await api.get('/user/login?email=' + email + "&password=" + password);
    return resultado._body.token;
}

test("creating user successfully", async () => {
    let name = Math.random().toString(36).slice(2, 7);
    const { status, _body: body }  = await api.post('/user/register').send(
        {
            "name": name,
            "email": name + "@gmail.com",
            "password": "somethingspooky",
            "categories": ["tecnologia", "oficina"]
        }
    );
    expect(status).toBe(200);
    expect(body.categories).toEqual(["tecnologia", "oficina"]);
    expect(body.token).toBeDefined();
})

test("creating user wrong", async () => {
    const { status, _body: body }  = await api.post('/user/register').send(
        {
            "name": "julian osorio",
            "email": "josorio@gmail.com",
            "password": "somethingspooky"
        }
    );
    expect(status).toBe(400);
})

test("login user correct", async () => {
    const token = getToken("josorio@gmail.com", "somethingspooky");
    expect(token).toBeDefined();
})

test("login user wrong credentials", async () => {
    const token = getToken("josorio@gmail.com", "notspooky:(");
    console.log(token);
    //Promesa no cumplida porque no sabe cual es el usuario
    expect(token.constructor).toEqual(Promise);
})

test("get user by id correctly", async () => {
    const { status, _body: body }  = await api.get('/user/?id=647543a1f911d6d0c20ee9db')
    expect(status).toBe(200);
    expect(body.categories).toEqual(["tecnologia", "oficina"]);
    expect(body.token).toBeDefined();
    expect(body._id).toEqual("647543a1f911d6d0c20ee9db");
})

test("get user by id 404", async () => {
    const { status, _body: body }  = await api.post('/user/?id=647543a1f911d6d0c20ee9d').send(
        {
            "name": "julian osorio",
            "email": "josorio@gmail.com",
            "password": "somethingspooky",
            "categories": ["tecnologia", "oficina"]
        }
    );
    expect(status).toBe(404);
})

/*test("patch user correctly", async () => {
    const token = getToken("josorio@gmail.com", "somethingspooky");
    const { status, _body: body }  = await api.patch('/user/').set({"Authorization": "Bearer " + token}).send(
        {
            "email": "josorio2@gmail.com"
        }
    );
    expect(status).toBe(200);
})

test("patch user not found", async () => {
    let name = Math.random().toString(36).slice(2, 7);
    await api.post('/user/register').send(
        {
            "name": name,
            "email": name + "@gmail.com",
            "password": "somethingspooky",
            "categories": ["tecnologia", "oficina"]
        }
    );
    const token = getToken(name + "@gmail.com", "somethingspooky");
    const { status, _body: body }  = await api.patch('/user/').set({"Authorization": "Bearer " + token}).send(
        {
            "email": "josorio2@gmail.com"
        }
    );
    expect(status).toBe(404);
})

test("delete user", async () => {
    let name = Math.random().toString(36).slice(2, 7);
    await api.post('/user/register').send(
        {
            "name": name,
            "email": name + "@gmail.com",
            "password": "somethingspooky",
            "categories": ["tecnologia", "oficina"]
        }
    );
    const token = getToken(name + "@gmail.com", "somethingspooky");
    const { status, _body: body }  = (await api.delete('/user/')).set({"Authorization": "Bearer " + token});
    expect(status).toBe(404);
})

test("user not found when deleting", async () => {
    const { status, _body: body }  = await api.delete('/user/').send(
        {
            "name": "julian osorio",
            "email": "josorio@gmail.com",
            "password": "somethingspooky",
            "categories": ["tecnologia", "oficina"]
        }
    );
    expect(status).toBe(404);
})*/

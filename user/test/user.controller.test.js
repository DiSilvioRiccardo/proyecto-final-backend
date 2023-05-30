import { createUser, getUser, loginUser, patchUser, deleteUser } from '../../user/user.controller';

let email = "cyansmash@gmail.com";
let password = "coolpassword";
let username = "David Ferrer";
let categories = ["tecnologia", "herramienta"];

test("create user", async () => {
    let res = {};
    let req = {};
    let result = createUser({body: {
        email, password, username, categories
    }}, {});
    console.log(result);
});
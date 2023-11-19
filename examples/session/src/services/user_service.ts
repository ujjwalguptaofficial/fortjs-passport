import { User } from "@/models";
import { db } from "./db";


export class UserService {
    getUsers() {
        return db.users;
    }

    addUser(user: User) {
        const lastUser = db.users[db.users.length - 1];
        user.id = lastUser == null ? 1 : lastUser.id + 1;
        db.users.push(user);
        return user;
    }

    updateUser(user: User) {
        const existingUser = db.users.find(qry => qry.id === user.id);
        if (existingUser != null) {
            existingUser.name = user.name;
            existingUser.address = user.address;
            existingUser.gender = user.gender;
            existingUser.emailId = user.emailId;
            return true;
        }
        return false;
    }

    getUser(id: number) {
        return db.users.find(user => user.id === id);
    }

    removeUser(id: number) {
        const index = db.users.findIndex(user => user.id === id);
        db.users.splice(index, 1);
    }

    getUserByEmailAndPassword(email, password) {
        return db.users.find(user => user.emailId === email && user.password === password);
    }
}
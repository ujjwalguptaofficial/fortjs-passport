import { User } from "@/models";

interface IStore {
    users: User[];
}

export const db: IStore = {
    users: [{
        id: 1,
        name: "Ujjwal",
        address: "bhubaneswar india",
        emailId: "ujjwal@mg.com",
        gender: "male",
        password: "admin"
    }]
}
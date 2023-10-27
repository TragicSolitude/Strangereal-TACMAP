import { Permission } from "@strangereal/util-constants";

export class User {
    id: number;
    username: string;
    password: string;
    permissions: Permission[]
}

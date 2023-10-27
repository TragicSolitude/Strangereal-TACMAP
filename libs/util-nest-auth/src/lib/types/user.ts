import { Permission } from "@strangereal/util-constants";

export interface UserDetails {
    id: number;
    username: string;
    password: string;
    permissions: Permission[]
}

// export class User implements UserDetails {
//     constructor(public readonly username: string,
//                 public readonly password: string) {}
// }

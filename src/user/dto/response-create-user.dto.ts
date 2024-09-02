import { User } from "../entities/user.entity";

export class UserCreateResponseDto {
    email: string;
    createdAt: Date;
    updatedAt: Date;
    accountStatus: string;
    id: number;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.accountStatus = user.accountStatus;
    }
}
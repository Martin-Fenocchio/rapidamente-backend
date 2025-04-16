export declare class CreateUserDto {
    name: string;
    points: number;
    email: string;
}
export declare class UpdatePointsDto {
    id: string;
    points: number;
    history: string;
}
export declare class LinkEmailDto {
    email: string;
    userId: string;
    history: string;
}

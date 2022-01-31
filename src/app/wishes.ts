import { Equipment } from "./equipment";
import { User } from "./user";

export interface Wishes {
    id: number;
    user: User;
    equipment: Equipment;
}

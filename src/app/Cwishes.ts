import { Equipment } from "./equipment";
import { User } from "./user";

export class Cwishes{
    constructor(
        public id: number,
        public user: User,
        public equipment: Equipment
    ) {
        this.id = id
        this.user = user
        this.equipment = equipment
    }
}

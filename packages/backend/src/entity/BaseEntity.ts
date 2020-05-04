import { validateOrReject } from 'class-validator';
import { BeforeInsert, BeforeUpdate } from 'typeorm';

export class BaseEntity {
    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}

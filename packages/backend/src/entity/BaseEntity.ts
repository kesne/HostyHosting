import { validateOrReject } from 'class-validator';
import { BaseEntity as TypeORMBaseEntity, BeforeInsert, BeforeUpdate } from 'typeorm';

export class BaseEntity extends TypeORMBaseEntity {
    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        await validateOrReject(this);
    }
}

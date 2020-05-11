import { ExternalEntity } from './BaseEntity';
import {
    Entity,
    Column,
} from 'typeorm';
import { Field, ObjectType, registerEnumType } from 'type-graphql';

export enum NotificationType {
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

registerEnumType(NotificationType, {
    name: 'NotificationType'
});

@ObjectType()
@Entity()
export class Notification extends ExternalEntity {
    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    body!: string;
}

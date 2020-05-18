import crypto from 'crypto';
import {
    Entity,
    ManyToOne,
    Column,
    BeforeInsert,
} from 'typeorm';
import { User } from './User';
import { ExternalEntity } from './BaseEntity';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class APIKey extends ExternalEntity {
    static async createForUser(user: User, description: string) {
        const apiKey = APIKey.create({
            description,
            user
        });

        return await this.save(apiKey);
    }

    // NOTE: Never expose this column externally via GraphQL.
    @Column()
    key!: string;

    // NOTE: This is only ever exposed when creating an API Key from a session.
    // It is only initialized in the BeforeInsert method, so it should never be
    // initialized to a value when loading from the database.
    @Field({ nullable: true })
    privateKey?: string;

    @Field()
    @Column()
    description!: String;

    @ManyToOne(() => User)
    user!: User;

    @BeforeInsert()
    generateKey() {
        this.key = crypto.randomBytes(64).toString('base64');
        this.privateKey = this.key;
    }
}

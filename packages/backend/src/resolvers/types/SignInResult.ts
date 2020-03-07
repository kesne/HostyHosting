import { ObjectType, Field } from 'type-graphql';
import Result from './Result';

@ObjectType({ description: 'A special type of result used just for SignIns. Provides a boolean for if the user requires a TOTP exchange before being fully logged in.' })
export default class SignInResult extends Result {
    @Field()
    requiresTOTP: boolean;

    constructor(requiresTOTP: boolean, ok: boolean = true) {
        super(ok);
        this.requiresTOTP = requiresTOTP;
    }
}

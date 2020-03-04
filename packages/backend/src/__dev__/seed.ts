import { createConnection } from 'typeorm';
import ormconfig from '../../ormconfig';
import { User } from '../entity/User';
import { PasswordReset } from '../entity/PasswordReset';
import { Application } from '../entity/Application';
import { Organization } from '../entity/Organization';
import { Container } from '../entity/Container';

async function seed() {
    const connection = await createConnection(ormconfig);

    // Start by removing the ENTIRE world.
    await Container.delete({});
    await Application.delete({});
    await Organization.delete({});
    await PasswordReset.delete({});
    await User.delete({});

    // Create an org and a user account:
    const organization = new Organization();
    organization.name = 'DaaS';
    await organization.save();

    const user = new User();
    user.email = 'admin@vapejuicejordan.rip';
    user.name = 'Admin (DEV)';
    user.organization = Promise.resolve(organization);
    await user.setPassword('admin');
    await user.save();

    await connection.close();
}

seed();

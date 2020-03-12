import { createConnection } from 'typeorm';
import ormconfig from '../../ormconfig';
import { User } from '../entity/User';
import { PasswordReset } from '../entity/PasswordReset';
import { Application } from '../entity/Application';
import { Organization } from '../entity/Organization';
import { ContainerGroup } from '../entity/ContainerGroup';

async function seed() {
    const connection = await createConnection(ormconfig);

    // Start by removing the ENTIRE world.
    await ContainerGroup.delete({});
    await Application.delete({});
    await Organization.delete({});
    await PasswordReset.delete({});
    await User.delete({});

    // Create an admin user:
    const user = new User();
    user.email = 'admin@vapejuicejordan.rip';
    user.name = 'Admin (DEV)';
    await user.setPassword('admin');
    await user.save();

    // Create an org:
    const organization = new Organization();
    organization.name = 'DaaS';
    organization.users = [user];
    await organization.save();

    await connection.close();
}

seed();

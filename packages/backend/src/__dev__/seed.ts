import { createConnection } from 'typeorm';
import ormconfig from '../../ormconfig';
import { User } from '../entity/User';
import { PasswordReset } from '../entity/PasswordReset';
import { Application } from '../entity/Application';
import { Organization } from '../entity/Organization';
import { ContainerGroup } from '../entity/ContainerGroup';
import { Deployment } from '../entity/Deployment';

// TODO: Make this execute a bunch of GraphQL commands, instead of just being ORM operations.
async function seed() {
    const connection = await createConnection(ormconfig);

    // Start by removing the ENTIRE world.
    await ContainerGroup.delete({});
    await Deployment.delete({});
    await Application.delete({});
    await PasswordReset.delete({});
    await User.delete({});
    await Organization.delete({});

    // Create an admin user:
    const user = new User();
    user.email = 'admin@vapejuicejordan.rip';
    user.name = 'Admin (DEV)';
    await user.setPassword('admin');
    await user.save();

    // Create the personal org:
    const personalOrg = new Organization();
    personalOrg.name = 'Personal';
    personalOrg.isPersonal = true;
    personalOrg.users = [user];
    user.personalOrganization = personalOrg;

    await personalOrg.save();
    await user.save();


    // Create orgs:
    const netflixOrg = new Organization();
    netflixOrg.name = 'Netflix';
    netflixOrg.users = [user];
    await netflixOrg.save();

    await connection.close();
}

seed();

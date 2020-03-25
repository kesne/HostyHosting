import { createConnection } from 'typeorm';
import ormconfig from '../../ormconfig';
import { User } from '../entity/User';
import { PasswordReset } from '../entity/PasswordReset';
import { Application } from '../entity/Application';
import { Organization } from '../entity/Organization';
import { ContainerGroup } from '../entity/ContainerGroup';
import { Deployment } from '../entity/Deployment';
import { OrganizationMembership, OrganizationPermission } from '../entity/OrganizationMembership';
import { APIKey } from '../entity/APIKey';

// TODO: Make this execute a bunch of GraphQL commands, instead of just being ORM operations.
async function seed() {
    const connection = await createConnection(ormconfig);

    // Start by removing the ENTIRE world.
    await APIKey.delete({})
    await ContainerGroup.delete({});
    await Deployment.delete({});
    await Application.delete({});
    await PasswordReset.delete({});
    await OrganizationMembership.delete({});
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
    await personalOrg.save();

    const membership = new OrganizationMembership();
    membership.user = user;
    membership.organization = personalOrg;
    membership.permission = OrganizationPermission.ADMIN;
    await membership.save();

    user.personalOrganization = personalOrg;
    await user.save();

    // Create orgs:
    const netflixOrg = new Organization();
    netflixOrg.name = 'Netflix';
    await netflixOrg.save();

    const netflixMembership = new OrganizationMembership();
    netflixMembership.user = user;
    netflixMembership.organization = netflixOrg;
    netflixMembership.permission = OrganizationPermission.ADMIN;
    await netflixMembership.save();

    await connection.close();
}

seed();

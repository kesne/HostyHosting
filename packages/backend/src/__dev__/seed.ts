import { createConnection } from 'typeorm';
import ormconfig from '../../ormconfig';
import { User } from '../entity/User';
import { PasswordReset } from '../entity/PasswordReset';
import { Application } from '../entity/Application';
import { Organization } from '../entity/Organization';
import { ContainerGroup } from '../entity/ContainerGroup';
import { Component } from '../entity/Component';
import { OrganizationMembership, OrganizationPermission } from '../entity/OrganizationMembership';
import { APIKey } from '../entity/APIKey';
import { Notification } from '../entity/Notification';
import { Environment } from '../entity/Environment';

async function withConnection(fn: any) {
    const connection = await createConnection(ormconfig);
    try {
        await fn()
    } finally {
        connection.close();
    }
}

async function test() {
    const component = await Component.findOne(2);

    console.log(await component?.containerGroups);
}

// TODO: Make this execute a bunch of GraphQL commands, instead of just being ORM operations.
async function seed() {
    // Start by removing the ENTIRE world.
    await APIKey.delete({})
    await ContainerGroup.delete({});
    await Component.delete({});
    await Application.delete({});
    await PasswordReset.delete({});
    await OrganizationMembership.delete({});
    await User.delete({});
    await Environment.delete({});
    await Organization.delete({});
    await Notification.delete({});

    // Create a notification for shits and giggles:
    const notification = new Notification();
    notification.title = 'Test Notification';
    notification.body = 'This is a test notification. It should exist.';
    await notification.save();

    // Create an admin user:
    const user = new User();
    user.email = 'admin@vapejuicejordan.rip';
    user.name = 'Admin (DEV)';
    user.username = 'admin';
    await user.setPassword('admin');
    await user.save();

    await Organization.createPersonal(user);

    // Allocate more max compute units to myself for testing:
    const personalOrg = await user.personalOrganization;
    personalOrg.maxComputeUnits = 100;
    await personalOrg.save();

    // Create orgs:
    const netflixOrg = new Organization();
    netflixOrg.name = 'Netflix';
    netflixOrg.username = 'netflix';
    await netflixOrg.save();

    const netflixMembership = new OrganizationMembership();
    netflixMembership.user = user;
    netflixMembership.organization = netflixOrg;
    netflixMembership.permission = OrganizationPermission.ADMIN;
    await netflixMembership.save();

    await netflixOrg.createDefaultEnvironments();
}

withConnection(seed);

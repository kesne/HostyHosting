import { createConnection, getRepository, getCustomRepository } from 'typeorm';
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
import { OrganizationRepository } from '../repositories/OrganizationRepository';
import { EnvironmentRepository } from '../repositories/EnvironmentRepository';

async function withConnection(fn: any) {
    const connection = await createConnection(ormconfig);
    try {
        await fn();
    } finally {
        connection.close();
    }
}

// TODO: Make this execute a bunch of GraphQL commands, instead of just being ORM operations.
async function seed() {
    const repos = {
        APIKey: getRepository(APIKey),
        ContainerGroup: getRepository(ContainerGroup),
        Component: getRepository(Component),
        Application: getRepository(Application),
        PasswordReset: getRepository(PasswordReset),
        OrganizationMembership: getRepository(OrganizationMembership),
        User: getRepository(User),
        Environment: getCustomRepository(EnvironmentRepository),
        Organization: getCustomRepository(OrganizationRepository),
        Notification: getRepository(Notification),
    };

    // Start by removing the ENTIRE world.
    await repos.APIKey.delete({});
    await repos.ContainerGroup.delete({});
    await repos.Component.delete({});
    await repos.Application.delete({});
    await repos.PasswordReset.delete({});
    await repos.OrganizationMembership.delete({});
    await repos.User.delete({});
    await repos.Environment.delete({});
    await repos.Organization.delete({});
    await repos.Notification.delete({});

    // Create a notification for shits and giggles:
    const notification = new Notification();
    notification.title = 'Test Notification';
    notification.body = 'This is a test notification. It should exist.';
    await repos.Notification.save(notification);

    // Create an admin user:
    const user = new User();
    user.email = 'admin@vapejuicejordan.rip';
    user.name = 'Admin (DEV)';
    user.username = 'admin';
    await user.setPassword('admin');
    await repos.User.save(user);

    await repos.Organization.createPersonal(user);

    // Allocate more max compute units to myself for testing:
    const personalOrg = await user.personalOrganization;
    personalOrg.maxComputeUnits = 100;
    await repos.Organization.save(personalOrg);

    // Create orgs:
    const netflixOrg = new Organization();
    netflixOrg.name = 'Netflix';
    netflixOrg.username = 'netflix';
    await repos.Organization.save(netflixOrg);

    const netflixMembership = new OrganizationMembership();
    netflixMembership.user = user;
    netflixMembership.organization = netflixOrg;
    netflixMembership.permission = OrganizationPermission.ADMIN;
    await repos.OrganizationMembership.save(netflixMembership);
    repos.Environment.createDefaultEnvironments(netflixOrg);
}

withConnection(seed);

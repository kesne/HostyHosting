import { createConnection } from 'typeorm';
import ormconfig from '../../ormconfig';
import { PasswordReset } from '../entity/PasswordReset';
import { Application } from '../entity/Application';
import { Organization } from '../entity/Organization';
import { ContainerGroup } from '../entity/ContainerGroup';
import { Component } from '../entity/Component';
import { OrganizationMembership, OrganizationPermission } from '../entity/OrganizationMembership';
import { APIKey } from '../entity/APIKey';
import { Notification } from '../entity/Notification';
import { run } from '../utils/currentRequest';
import { Network } from '../entity/Network';
import { User } from '../entity/User';
import { Environment } from '../entity/Environment';
import { Secret } from '../entity/Secret';

async function withConnection(fn: any) {
    const mockContext = {
        IS_MOCKED_CONTEXT: true,
        session: {},
        cookies: {
            get() {},
            set() {},
        },
    } as any;

    const connection = await createConnection({ ...ormconfig });

    try {
        await run(mockContext, fn);
    } finally {
        connection.close();
    }
}

// TODO: Make this execute a bunch of GraphQL commands, instead of just being ORM operations.
async function seed() {
    // Start by removing the ENTIRE world.
    await APIKey.delete({});
    await Secret.delete({});
    await ContainerGroup.delete({});
    await Component.delete({});
    await Application.delete({});
    await PasswordReset.delete({});
    await OrganizationMembership.delete({});
    await User.delete({});
    await Network.delete({});
    await Environment.delete({});
    await Organization.delete({});
    await Notification.delete({});

    // Create a notification for shits and giggles:
    const notification = new Notification();
    notification.title = 'Test Notification';
    notification.body = 'This is a test notification. It should exist.';
    await notification.save();

    const user = await User.signUp({
        email: 'admin@vapejuicejordan.rip',
        name: 'Admin (DEV)',
        username: 'admin',
        password: 'admin',
    });

    // Allocate more max compute units to myself for testing:
    const personalOrg = await user.personalOrganization;
    personalOrg.maxComputeUnits = 100;
    await personalOrg.save();

    // Create orgs:
    const netflixOrg = new Organization();
    netflixOrg.name = 'Netflix';
    netflixOrg.username = 'netflix';
    netflixOrg.environments = Environment.createDefaultEnvironments(netflixOrg);
    await netflixOrg.save();

    const netflixMembership = new OrganizationMembership();
    netflixMembership.user = user;
    netflixMembership.organization = netflixOrg;
    netflixMembership.permission = OrganizationPermission.ADMIN;
    await netflixMembership.save();
}

withConnection(seed);

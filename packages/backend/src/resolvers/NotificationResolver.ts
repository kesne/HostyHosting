import { getRepository } from 'typeorm';
import { Resolver, Authorized, Query } from 'type-graphql';
import { Notification } from '../entity/Notification';

@Resolver()
export class NotificationResolver {
    constructor(private notificationRepo = getRepository(Notification)) {}

    @Authorized()
    @Query(() => [Notification])
    async notifications() {
        const notifications = await this.notificationRepo.find({
            take: 10,
        });

        return notifications;
    }
}

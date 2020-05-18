import { getRepository } from 'typeorm';
import { Resolver, Authorized, Query } from 'type-graphql';
import { Notification } from '../entity/Notification';

@Resolver()
export class NotificationResolver {
    @Authorized()
    @Query(() => [Notification])
    async notifications() {
        const notifications = await Notification.find({
            take: 10,
        });

        return notifications;
    }
}

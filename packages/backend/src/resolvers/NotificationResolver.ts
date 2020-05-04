import { Resolver, Authorized, Query } from 'type-graphql';
import { Notification } from '../entity/Notification';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

@Resolver()
export class NotificationResolver {
    @InjectRepository(Notification)
    notificationRepo!: Repository<Notification>;

    @Authorized()
    @Query(() => [Notification])
    async notifications() {
        const notifications = await this.notificationRepo.find({
            take: 10,
        });

        return notifications;
    }
}

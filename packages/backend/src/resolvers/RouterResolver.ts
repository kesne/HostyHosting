import { Resolver, Query, Arg, FieldResolver, Root, Args } from 'type-graphql';
import { Router } from '../entity/Router';
import { createConnection, LimitOffsetArgs } from './types/Pagination';
import { RouterRule } from '../entity/RouterRule';

const [RouterRuleConnection] = createConnection(RouterRule);

@Resolver(() => Router)
export class RouterResolver {
    @Query(() => Router)
    router(@Arg('organization') organization: string) {
        return Router.findOneOrFail({
            where: {
                organization: {
                    id: organization,
                },
            },
        });
    }

    @FieldResolver(() => RouterRuleConnection)
    rules(@Root() router: Router, @Args() args: LimitOffsetArgs) {
        return RouterRule.findAndPaginate(
            {
                where: {
                    router,
                },
            },
            args,
        );
    }
}

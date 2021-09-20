import { Resolver, Query, Args } from '@nestjs/graphql';
import { DashboardService } from './dashboard.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user';
import { User } from '../users/entities/user.entity';
import { Dashboard } from './entities/dashboard.entity';

@UseGuards(JwtGuard)
@Resolver(() => Dashboard)
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) {}

  @Query(() => Dashboard, { name: 'getMonthBalance' })
  async getMonthBalance(
    @Args('month', { type: () => Number }) month: number,
    @Args('year', { type: () => Number }) year: number,
    @CurrentUser() user: User,
  ) {
    const result = await this.dashboardService.getMonthBalance(
      user,
      year,
      month,
    );

    return result;
  }
}

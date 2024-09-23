import { Injectable } from '@nestjs/common';
import { FoodsService } from 'src/foods/food.service';
import { WorkoutsService } from 'src/workouts/workouts.service';

@Injectable()
export class DataService {
  constructor(
    private readonly foodsService: FoodsService,
    private readonly workoutsService: WorkoutsService,
  ) {}

  async getPaginatedData(page: number, limit: number) {
    const foods = await this.foodsService.getFoods();
    const workouts = await this.workoutsService.getWorkouts();

    const combinedActivities = [foods, workouts].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedActivities = combinedActivities.slice(start, end);

    return {
      activities: paginatedActivities,
      totalCount: combinedActivities.length,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { FoodsService } from 'src/foods/food.service';
import { Workouts } from 'src/workouts/workout.model';
import { Foods } from 'src/foods/food.model';
import { WorkoutsService } from 'src/workouts/workouts.service';

type Activity = Foods | Workouts;

@Injectable()
export class DataService {
  constructor(
    private readonly foodsService: FoodsService,
    private readonly workoutsService: WorkoutsService,
  ) {}

  async getPaginatedData(page: number, limit: number, filter: string) {
    const foods = await this.foodsService.getFoods();
    const workouts = await this.workoutsService.getWorkouts();

    let combinedActivities: Activity[] = [...foods, ...workouts];

    if (filter !== 'all') {
      combinedActivities = combinedActivities.filter(
        (activity) => activity.type === filter,
      );
    }

    const sortedActivities = combinedActivities.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedActivities = sortedActivities.slice(start, end);

    return {
      activities: paginatedActivities,
      totalCount: combinedActivities.length,
    };
  }
}

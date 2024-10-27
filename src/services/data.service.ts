import { Injectable } from '@nestjs/common';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class DataService {
  constructor(private readonly activityService: ActivityService) {}

  async getPaginatedData(page: number, limit: number, filter: string) {
    const activities = await this.activityService.getActivities();

    if (filter !== 'all') {
      activities.filter((activity) => activity.type === filter);
    }

    const sortedActivities = activities.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedActivities = sortedActivities.slice(start, end);

    return {
      activities: paginatedActivities,
      totalCount: activities.length,
    };
  }
}

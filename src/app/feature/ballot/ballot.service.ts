import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ContestView } from './models';

@Injectable({
  providedIn: 'root',
})
export class BallotService {
  http = inject(HttpClient);

  private contestAPIUrl = 'api/contestViews';

  getAllContestViews(): Promise<ContestView[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.http.get<ContestView[]>(this.contestAPIUrl).subscribe({
          next: data => {
            resolve(data);
          },
          error: error => {
            reject(error);
          },
        });
      }, 500);
    });
  }
}

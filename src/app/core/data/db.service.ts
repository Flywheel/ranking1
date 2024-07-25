import { Injectable } from '@angular/core';
import { ContestView } from '../../feature/ballot/models';
import { MockdataService } from './mockdata.service';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DbService implements InMemoryDbService {
  mockData = new MockdataService();
  constructor() { }
  createDb() {
    const contestViews: ContestView[] = this.mockData.contestViews;
    return { contestViews };
  }
}

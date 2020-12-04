import {Injectable} from '@angular/core';
import {GithubJobsModel} from '../models/github-jobs.model';
import {BehaviorSubject} from 'rxjs';
import {PositionModel} from '../models/position.model';

@Injectable({providedIn: 'root'})
export class DataService{

  gitHubJobs: BehaviorSubject<GithubJobsModel[]> = new BehaviorSubject(null);
  keywords: BehaviorSubject<string> = new BehaviorSubject('');
  isFullTime: BehaviorSubject<boolean> = new BehaviorSubject(false);
  location: BehaviorSubject<string> = new BehaviorSubject('');
  position: BehaviorSubject<PositionModel> = new BehaviorSubject(null);
  loading: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() {
  }

  getSingle(id: string): GithubJobsModel{
    const jobs = this.gitHubJobs.value;
    const job = jobs.filter(x => x.id === id);
    return job[0];
  }
  getPosition(): Promise<any> {

    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
}

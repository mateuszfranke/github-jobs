import {Injectable} from '@angular/core';
import {GithubJobsModel} from '../models/github-jobs.model';
import {BehaviorSubject} from 'rxjs';
import {SearchModel} from '../models/search.model';

@Injectable({providedIn: 'root'})
export class DataService{

  gitHubJobs: BehaviorSubject<GithubJobsModel[]> = new BehaviorSubject(null);
  searchModel: BehaviorSubject<SearchModel> = new BehaviorSubject(null);
  keywords: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
  }

  getSingle(id: string): GithubJobsModel{
    const jobs = this.gitHubJobs.value;
    const job = jobs.filter(x => x.id === id);
    return job[0];
  }

}

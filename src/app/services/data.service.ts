import {Injectable} from '@angular/core';
import {GithubJobsModel} from '../models/github-jobs.model';
import {BehaviorSubject} from 'rxjs';
import {SearchModel} from '../models/search.model';

@Injectable({providedIn: 'root'})
export class DataService{

  gitHubJobs: BehaviorSubject<GithubJobsModel[]> = new BehaviorSubject(null);
  searchModel: BehaviorSubject<SearchModel> = new BehaviorSubject(null);

  constructor() {
  }


}

import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GithubJobsModel} from '../models/github-jobs.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DataService} from './data.service';

@Injectable({providedIn: 'root'})
export class GithubJobsService {

  constructor(private http: HttpClient,
              private data: DataService) {
  }

  init(): Observable<GithubJobsModel[]> {
    let githubJobsUrl;
    const position = this.data.position.value;
    if (position !== null){
      githubJobsUrl = `https://jobs.github.com/positions.json?lat=${position.lat}&long=${position.lng}`;
    }else{
      githubJobsUrl = `https://jobs.github.com/positions.json?lat=37.3229978&long=-122.0321823`;
    }
    const url = `${environment.herokuUrl}${githubJobsUrl}`;
    return this.http.get<GithubJobsModel[]>(url)
      .pipe(map((observer: GithubJobsModel[]) => {
        const jobs: GithubJobsModel[] = [];
        observer.forEach(el => {
          el.created_at = this.daysPassedFromPublication(el.created_at);
          jobs.push(el);
        });
        return jobs;
      }));
  }

  getDescriptions(page: number): Observable<GithubJobsModel[]> {
    // https://jobs.github.com/positions.json?description=python&full_time=true&location=sf
    const githubJobsUrl = `https://jobs.github.com/positions.json?description=${this.data.keywords.value}&full_time=${this.data.isFullTime.value}&page=${page}&location=${this.data.location.value}`;
    const url = `${environment.herokuUrl}${githubJobsUrl}`;
    if (isDevMode()){
      console.log(githubJobsUrl);
    }
    return this.http.get<GithubJobsModel[]>(url)
      .pipe(map((observer: GithubJobsModel[]) => {
        const jobs: GithubJobsModel[] = [];
        observer.forEach(el => {
          el.created_at = this.daysPassedFromPublication(el.created_at);
          jobs.push(el);
        });
        return jobs;
      }));
  }

  daysPassedFromPublication(date: string): string {
    const currentDate = new Date();
    const newDate = new Date(date);
    const differenceInTime = currentDate.getTime() - newDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return `${Math.floor(differenceInDays).toString()} days ago`;
  }
}

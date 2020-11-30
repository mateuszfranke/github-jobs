import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GithubJobsModel} from '../models/github-jobs.model';
import {Observable} from 'rxjs';
import {SearchModel} from '../models/search.model';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class GithubJobsService{

  constructor(private http: HttpClient) {
  }

  getResults(): Observable<GithubJobsModel[]>{
    const url = `${environment.herokuUrl}` + 'https://jobs.github.com/positions.json?description=python&location=new+york';
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
  getDescriptions(description: string, search: SearchModel, page: number): Observable<GithubJobsModel[]>{
    // https://jobs.github.com/positions.json?description=python&full_time=true&location=sf
    const githubJobsUrl = `https://jobs.github.com/positions.json?description=${description}&full_time=${search.isFullTime}&page=${page}`;
    const url = `${environment.herokuUrl}${githubJobsUrl}`;
    console.log(githubJobsUrl);
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



  daysPassedFromPublication(date: string): string{
    const currentDate = new Date();
    const newDate = new Date(date);
    const differenceInTime = currentDate.getTime() - newDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return `${Math.floor(differenceInDays).toString()} days ago`;
  }
}

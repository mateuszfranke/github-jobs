import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {GithubJobsModel} from '../models/github-jobs.model';
import {Observable} from 'rxjs';
import {SearchModel} from '../models/search.model';

@Injectable({providedIn: 'root'})
export class GithubJobsService{

  constructor(private http: HttpClient) {
  }

  getResults(): Observable<GithubJobsModel[]>{
    const url = `${environment.herokuUrl}` + 'https://jobs.github.com/positions.json?description=python&location=new+york';
    return this.http.get<GithubJobsModel[]>(url);
  }
  getDescriptions(description: string, search: SearchModel, page: number): Observable<GithubJobsModel[]>{
    // https://jobs.github.com/positions.json?description=python&full_time=true&location=sf
    const githubJobsUrl = `https://jobs.github.com/positions.json?description=${description}&full_time=${search.isFullTime}&page=${page}`;
    const url = `${environment.herokuUrl}${githubJobsUrl}`;
    console.log(githubJobsUrl);
    return this.http.get<GithubJobsModel[]>(url);
  }
}

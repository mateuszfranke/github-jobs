import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class GithubJobsService{

  constructor(private http: HttpClient) {
  }

  getResults(){
    const url = `${environment.herokuUrl}` + 'https://jobs.github.com/positions.json?description=python&location=new+york';
    this.http.get(url).subscribe(x => console.log(x));
  }
}

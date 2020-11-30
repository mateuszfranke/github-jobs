import { Component, OnInit } from '@angular/core';
import {GithubJobsService} from '../services/github-jobs.service';
import {GithubJobsModel} from '../models/github-jobs.model';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: GithubJobsModel[] = [];
  allFetchedJobs: GithubJobsModel[] = [];
  maxPages: number = 0;
  paginationPerPage = 5;
  currentPage = 0;

  constructor(private ghService: GithubJobsService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.ghService.getResults()
      .subscribe((observer: GithubJobsModel[]) => {
        this.jobs = observer;
        this.dataService.gitHubJobs.next(observer);
    });

    this.dataService.gitHubJobs.subscribe((observer: GithubJobsModel[]) => {
      this.allFetchedJobs = observer;
      this.maxPages = (this.allFetchedJobs?.length / this.paginationPerPage);
      this.jobs = this.allFetchedJobs?.slice(this.currentPage, this.paginationPerPage);
    });
  }

  getJobs(currentPage: number){
    this.jobs = this.allFetchedJobs?.slice((currentPage * this.paginationPerPage), this.paginationPerPage);
    console.log(this.jobs);
  }
}

import {Component, OnInit} from '@angular/core';
import {GithubJobsService} from '../services/github-jobs.service';
import {GithubJobsModel} from '../models/github-jobs.model';
import {DataService} from '../services/data.service';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: GithubJobsModel[] = [];
  allFetchedJobs: GithubJobsModel[] = [];
  maxPages: number = 0;
  pages: number[] = [];
  paginationPerPage = 5;

  constructor(private ghService: GithubJobsService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.ghService.getResults()
      .subscribe((observer: GithubJobsModel[]) => {
        this.jobs = observer;
        this.dataService.gitHubJobs.next(observer);
      });

    this.dataService.gitHubJobs.subscribe((observer: GithubJobsModel[]) => {
      this.allFetchedJobs = observer;
      this.maxPages = (this.allFetchedJobs?.length / this.paginationPerPage);
      if (isNotNullOrUndefined(this.maxPages) && !isNaN(this.maxPages)) {
        this.getPages(Math.round(this.maxPages));
      }
      this.getJobs(0);
    });
  }

  getJobs(currentPage: number): void {
    let startIndex;
    if (currentPage === 0){
      startIndex = 0;
    }else{
      startIndex = (currentPage * this.paginationPerPage);
    }
    const howMany = (startIndex + (this.paginationPerPage));
    this.jobs = this.allFetchedJobs?.slice(startIndex, howMany);
  }

  getPages(totalPages: number): void{
    console.log(totalPages);
    this.pages = [];
    if (totalPages >= 2){
      for (let i = 1; i <= totalPages; i++){
        this.pages.push(i);
      }
    } else{
      this.pages.push(1);
    }
    console.log(this.pages);
  }
}

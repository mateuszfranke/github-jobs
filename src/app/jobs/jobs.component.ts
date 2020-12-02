import {Component, isDevMode, OnInit} from '@angular/core';
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
  currentPageIndex: number = 0;

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
        this.onGetPages(Math.round(this.maxPages));
      }
      this.onGetJobs(this.currentPageIndex);
    });
  }
  onGetJobs(currentPage: number): void {
    let startIndex;
    if (currentPage === 0){
      startIndex = 0;
    }else{
      startIndex = (currentPage * this.paginationPerPage);
      this.currentPageIndex = startIndex;
    }
    const howMany = (startIndex + (this.paginationPerPage));
    if (isDevMode()){
      console.log(`${startIndex}:${howMany}`);
    }
    this.jobs = this.allFetchedJobs?.slice(startIndex, howMany);
  }

  onNextPage(): void{
    const pageIndex = (this.currentPageIndex + this.paginationPerPage);

    if (this.outOfArray(pageIndex)) {
      console.log('0 elements in next page');
    }else{
      this.currentPageIndex = pageIndex;
      const howMany = (pageIndex + (this.paginationPerPage));
      this.jobs = this.outOfArray(pageIndex) ? this.jobs : this.allFetchedJobs?.slice(pageIndex, howMany);
    }

  }

  onPreviousPage(): void{
    const pageIndex = (this.currentPageIndex - this.paginationPerPage);
    this.currentPageIndex = pageIndex;
    const howMany = (pageIndex + (this.paginationPerPage));
    this.jobs = this.allFetchedJobs?.slice(pageIndex, howMany);
  }

  outOfArray(iteration: number): boolean{
    console.log((iteration + 5));
    console.log(this.allFetchedJobs.length);
    console.log(((iteration + 5) - this.allFetchedJobs.length));

    if (((iteration + 5) - this.allFetchedJobs.length) < 5){
      return false;
    }else{
      return true;
    }
  }

  onGetPages(totalPages: number): void{
    this.pages = [];
    if (totalPages >= 2){
      for (let i = 1; i <= totalPages; i++){
        this.pages.push(i);
      }
    } else{
      this.pages.push(1);
    }
  }
}

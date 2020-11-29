import { Component, OnInit } from '@angular/core';
import {GithubJobsService} from '../services/github-jobs.service';
import {DataService} from '../services/data.service';
import {GithubJobsModel} from '../models/github-jobs.model';
import {SearchModel} from '../models/search.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  keywords: string;
  search: SearchModel;

  constructor(private githubServices: GithubJobsService,
              private dataService: DataService) { }


  ngOnInit(): void {

    this.dataService.searchModel.subscribe((observer: SearchModel) => {
      console.log(observer);
      this.search = observer;
    });

  }

  onSearch(): void {
    this.githubServices.getDescriptions(this.keywords).subscribe((observer: GithubJobsModel[]) => {
      this.dataService.gitHubJobs.next(observer);
      console.log(observer);
    });

  }
}

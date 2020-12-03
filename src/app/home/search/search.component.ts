import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {SearchModel} from '../../models/search.model';
import {GithubJobsService} from '../../services/github-jobs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit{

  search: SearchModel = new SearchModel();

  constructor(private dataService: DataService,
              private ghService: GithubJobsService) { }

  ngOnInit(): void {
    this.search.isFullTime = false;
    this.dataService.searchModel.next(this.search);

  }

  onModelUpdate(): void {
    // this.ghService.
    this.dataService.searchModel.next(this.search);
  }
}

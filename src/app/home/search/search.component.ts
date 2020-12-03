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

  isFullTime: boolean;
  location: string;
  val: string;
  isLondon: boolean;
  isBerlin: boolean;
  isNewYork: boolean;
  isRemote: boolean;

  constructor(private dataService: DataService,
              private ghService: GithubJobsService) { }

  ngOnInit(): void {
    // this.search.isFullTime = false;
    // this.dataService.searchModel.next(this.search);

  }

  onFullTime(): void{
    this.dataService.isFullTime.next(this.isFullTime);
  }

  onLocation(): void {
    this.dataService.location.next(this.location);
    this.unCheck();
  }

  onModelUpdate(): void {
    // this.ghService.
    // this.dataService.searchModel.next(this.search);
  }

  unCheck(): void{
    this.isLondon = false;
    this.isBerlin = false;
    this.isNewYork = false;
    this.isRemote = false;
  }

}

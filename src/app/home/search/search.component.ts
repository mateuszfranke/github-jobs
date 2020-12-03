import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {GithubJobsService} from '../../services/github-jobs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit{

  isFullTime: boolean;
  location: string;
  radioValue: string;
  isLondon: boolean;
  isBerlin: boolean;
  isNewYork: boolean;
  isRemote: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }
  onFullTime(): void{
    this.dataService.isFullTime.next(this.isFullTime);
  }
  onLocation(): void {
    this.dataService.location.next(this.location);
    this.unCheck();
  }
  unCheck(): void{
    this.isLondon = false;
    this.isBerlin = false;
    this.isNewYork = false;
    this.isRemote = false;
  }
  onRadio(): void {
    this.dataService.location.next(this.radioValue);
  }
}

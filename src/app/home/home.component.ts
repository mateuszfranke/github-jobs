import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {PositionModel} from '../models/position.model';
import {GithubJobsService} from '../services/github-jobs.service';
import {GithubJobsModel} from '../models/github-jobs.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private data: DataService,
              private gh: GithubJobsService) {
    this.data.getPosition().then(pos =>
    {
      // console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.data.position.next({lng: pos.lng , lat: pos.lat});
      this.gh.init().subscribe( (jobs: GithubJobsModel[]) => data.gitHubJobs.next(jobs));
    });
  }

  ngOnInit(): void {

  }

}

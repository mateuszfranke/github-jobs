import {Component, OnInit} from '@angular/core';
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
              private dataService: DataService) {
  }


  ngOnInit(): void {

    this.dataService.searchModel.subscribe((observer: SearchModel) => {
      this.search = observer;
    });

  }

   onSearch() {
    this.githubServices.getDescriptions(this.keywords, this.search, 0)
      .subscribe((observer: GithubJobsModel[]) => {
      this.dataService.gitHubJobs.next(observer);
      if (observer.length <= 50) {
        console.log('finished');
      }else{
        console.log('next');
      }
    });
    //
    // await new Promise(next => {
    //   while (!isAll) {
    //     this.githubServices.getDescriptions(this.keywords, this.search, counter).subscribe((observer: GithubJobsModel[]) => {
    //       this.dataService.gitHubJobs.next(observer);
    //       if (observer.length <= 50) {
    //         isAll = true;
    //         console.log('finished at' + counter);
    //       }
    //       console.log(observer);
    //       console.log(counter);
    //
    //     });
    //     counter++;
    //     next();
    //   }
    // });

    // await new Promise(next=> {
    //   someAsyncTask(array[i], function(err, data){
    //     /*.... code here and when you finish...*/
    //     next()
    //   })
  }
}


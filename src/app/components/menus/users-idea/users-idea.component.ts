import { Component, OnInit, Input } from '@angular/core';
import { UserIdea } from '../../class/userIdea.class';
import { CustomFunctionsService } from '../../../services/functions/custom-functions.service';


@Component({
  selector: 'app-users-idea',
  templateUrl: './users-idea.component.html',
  styleUrls: ['./users-idea.component.css']
})

export class UsersIdeaComponent implements OnInit {

  @Input() ideasList:UserIdea[];

  mainTitle:string = 'نظرات کاربران';
  idea_stars:number[] = [];
  listOfStarsIdea:Array<number[]> = [];
  

  constructor(private customFunction: CustomFunctionsService) { } 

  ngOnInit() {
    for(let i=0; i < this.ideasList.length; i++){
      this.idea_stars = [];
      this.idea_stars = this.customFunction.makeStarScore(Number(this.ideasList[i].rank));
      this.listOfStarsIdea[i] = this.idea_stars;
    }
  }

}

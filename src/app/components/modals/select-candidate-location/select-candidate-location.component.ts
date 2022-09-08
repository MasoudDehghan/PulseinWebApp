import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';
import { CandidateLocationV } from '../../webApp/class/backend/candidateLocationV.class';

@Component({
  selector: 'app-select-candidate-location',
  templateUrl: './select-candidate-location.component.html',
  styleUrls: ['./select-candidate-location.component.css']
})
export class SelectCandidateLocationComponent implements OnInit {
  
  @Input() candidateLocationList: CandidateLocationV[];
  listLocations: CandidateLocationV[] = [];

  constructor(public shared: SharedService) { }

  ngOnInit() {
    this.candidateLocationList.forEach(item => {
      let find:boolean = false;
      this.listLocations.forEach(eleman => {
        if(eleman == item){
          find = true;
        }
      });
      if(!find){
        this.listLocations.push(item);
      }
    });
  }//end ngOnInit

  onlocation(item:CandidateLocationV){
    this.shared.selectedLocation.next(item);
    this.shared.selectedArea.next(null);
    this.candidateLocationList = [];
    this.listLocations = [];
    this.shared.showModalCandidateLocation.next(false);
  }//end onlocation

  onClose(){
    this.candidateLocationList = [];
    this.listLocations = [];
    this.shared.showModalCandidateLocation.next(false);
  }//end onClose

}

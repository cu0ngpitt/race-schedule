import { Component, OnInit } from '@angular/core';
import { Race } from '../race';
import { RaceService } from '../race.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {
  cash = 10000;

  races: Race[];

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.raceService.getRaces()
        .subscribe(races => this.races = races)
  }

  totalCost() {
    let sum = 0;
      for (let race of this.races) {
        if (race.isRacing) sum += race.entryFee;
      }
    return sum;
  }

  cashLeft() {
    return this.cash - this.totalCost();
  }

  cancelRace(race) {
    return race.isRacing = false;
  }

  enterRace(race) {
    if (this.cashLeft() > race.entryFee) return race.isRacing = true;
    else alert("You don't have enough cash.");
  }

}

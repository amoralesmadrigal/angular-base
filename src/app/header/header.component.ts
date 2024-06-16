import { Component, OnInit } from '@angular/core';
import { TabStateService } from '../services/tab-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  isPecasDisabled = true;
  selectedIndex = 0;

  constructor(private tabStateService: TabStateService){
    
  }

  ngOnInit() {
    this.tabStateService.tabDisabledState$.subscribe(state => {
      this.isPecasDisabled = state['pecas'];
    });

    this.tabStateService.selectedIndex$.subscribe(index => {
      this.selectedIndex = index;
    });
  }
}

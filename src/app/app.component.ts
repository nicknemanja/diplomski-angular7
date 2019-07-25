import { Component } from '@angular/core';

import { AuthguardService } from './services/authguard.service';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'meanauthapp';

  constructor(private authguard: AuthguardService,
              private navigation: NavigationService) { 
                //Nothing to do
  }

}

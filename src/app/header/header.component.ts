//import 
import 
{
  Component,

} from '@angular/core';


@Component
({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.styles.scss','../main/main.styles.scss'],
    
})

export class headerComponent 
{
  

  public user =
  {
      name: 'test',
      avatar: 'images\/profilePic_09.png'
  }
  
  public isSessionStarted: Boolean = false;
  public outputHide
  ngOnInit()
  {
     if(!this.isSessionStarted)
      {
          this.outputHide = 'hide';
      }
  }
}
import {Component} from '@angular/core';
import {User} from './user';

@Component({
    selector: 'app-ol-form',
    templateUrl: './ol-form.component.html',
    styleUrls: ['./ol-form.component.css']
})

export class OlFormComponent{
    model = new User('test','','','','','','',0,0);
    submitted=false;
    onSubmit(){
        this.submitted = true;
    }
}


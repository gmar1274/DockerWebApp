import { Component, ViewChild } from '@angular/core';
import { User } from './user';
import { NgForm } from '@angular/forms'
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-ol-form',
    templateUrl: './ol-form.component.html',
    styleUrls: ['./ol-form.component.css']
})

export class OlFormComponent {
    
    @ViewChild('olForm', { static: true }) ngForm: NgForm;

    user = new User('', '', '', '', '', '', '', 0, 0);
    submitted = false;
    error = false;
    onSubmit(data) {
        this.submitted = true;
        //console.log("Submit pressed!! ");
        //console.log(data);
        this.http.get("http://api.positionstack.com/v1/forward?access_key=d978d8c37e21cc1e2b44197ab283e307&query=" + data.address).subscribe(resp => {
            let jsonstr = JSON.stringify(resp);
            let json = JSON.parse(jsonstr);
            console.log(json['data']);
            if(json['data'].length==0){
                console.log("Error");
                this.error=true;
            }else{
                this.error=false;
            }
            this.ngForm.resetForm();
        });
    }
    ngOnInit() {
        this.ngForm.form.valueChanges.subscribe(x => {
            console.log(x);
        })
    }
    constructor(private http: HttpClient) { }
}
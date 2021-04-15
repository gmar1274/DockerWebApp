import { Component, ViewChild } from '@angular/core';
import { User } from './user';
import { NgForm } from '@angular/forms'
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../api/api.service';

@Component({
    selector: 'app-ol-form',
    templateUrl: './ol-form.component.html',
    styleUrls: ['./ol-form.component.css']
})

export class OlFormComponent {

    @ViewChild('olForm', { static: true }) ngForm: NgForm;
    constructor(private apiService: ApiService) { }

    user = new User();
    submitted = false;
    error = false;
    success = false;

    onSubmit(data) {
        if (this.ngForm.invalid) {
            return;
        }
        this.submitted = true;
        this.user.name = data.name;
        this.user.address = data.address;
        this.user.description = data.description;

        this.apiService.getGeoLocation(this.user).subscribe(resp => {
            let jsonstr = JSON.stringify(resp);
            let json = JSON.parse(jsonstr);
            console.log(json['data']);
            if (json['data'].length == 0 || json['data'][0].length) {//not sure why I get back arrays of empty arrays..
                this.error = true;
            } else {
                this.error = false;
                this.success = true;
                let geoloc = json['data'][0];//api will return more than one result but best fit is the first one
                //add to db
                this.user.address = geoloc['street'];
                this.user.zip = geoloc['postal_code'];
                this.user.country = geoloc['country_code'];
                this.user.state = geoloc['region'];
                this.user.lat = geoloc['latitude'];
                this.user.lon = geoloc['longitude'];
                this.postDB(this.user);
            }
            this.ngForm.resetForm();
        });
    }
    ngOnInit() {
        this.ngForm.form.valueChanges.subscribe(x => {
            //console.log(x);//this can be used to autocomplete address via api...
        })
    }
    postDB(user: User) {
        this.apiService.addUser(user).subscribe(res => {
            console.log(res);// do something on complete.
        });
    }
    
}


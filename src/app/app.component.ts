import { Component } from '@angular/core';
import { User } from './form/user'
import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ui';
  users: User[];
  user = new User();
  
  ngOnInit() {
    var map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        })],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }
}

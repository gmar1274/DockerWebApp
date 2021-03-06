import { Component } from '@angular/core';
import { User } from './form/user'
import 'ol/ol.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Style from 'ol/style/Style.js'
import Icon from 'ol/style/Icon.js'

import MultiPoint from 'ol/geom/MultiPoint.js'
import Point from 'ol/geom/Point.js'
import Vector from "ol/layer/Vector.js";
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import { fromLonLat } from 'ol/proj.js';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { ApiService } from './api/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private apiService: ApiService) { }
  title = 'angular-ui';
  headers = ["id", "name", "lat", "lon"];
  userArr = [];
  multiPoints = []
  user = new User();
  map?: Map;
  ngOnInit() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        })],
      target: 'map',
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2,
      }),
    });
    this.refreshMap(this.map);
  }
  refreshMap(map: Map) {
    this.userArr = [];
    this.apiService.getUsers().subscribe((data) => {
      let userArr = data[0];
      for (var i in userArr) {
        var user = userArr[i];
        this.userArr.push(user);
        this.addToMap(user);
      }
    });
  }

  addToMap(user: User) {
    var marker = new Feature({
      geometry: new Point(
        fromLonLat([user.lon, user.lat])
      ),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://openlayers.org/en/latest/examples/data/icon.png'
        })
      })
    });
    var vectorSource = new VectorSource({
      features: [marker]
    });
    var markerVectorLayer = new Vector({
      source: vectorSource,
    });
    this.map.addLayer(markerVectorLayer);
  }
}

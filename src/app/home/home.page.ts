import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

declare var mapboxgl;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
address;
  modalCtrl: any;
  constructor(
    private navCtrl: NavController,
    private ModalCtrl:ModalController
  ) {

  }
  ngOnInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoibG9sbGllMDEiLCJhIjoiY2toa2dqbHlpMWt1ejJybWN2d3p4cXlvciJ9.SUTWrd2sUewHw6GUNA5Luw';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-28.4792625, 24.6727135],
    zoom: 3  
  });

    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      })
      );

    map.on('click', 'places', function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;
       
     
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
       
      new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
      });
       
      map.on('mouseenter', 'places', function () {
      map.getCanvas().style.cursor = 'pointer';
      });
       
      map.on('mouseleave', 'places', function () {
      map.getCanvas().style.cursor = '';
      });

      this.address = {
        place: ''
      };
    }
  

  }
  




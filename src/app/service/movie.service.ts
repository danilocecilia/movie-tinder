import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as AppConfig from '../config';

@Injectable()
export class MovieService {
  constructor(private http: HttpClient) { }

  private getConfiguration() {
    return this.http.get(`${AppConfig.MOVIE_DB.baseUrl}configuration?api_key=${AppConfig.MOVIE_DB.api_key}`).toPromise();
  }

  getRandonImage() {
    return this.discover()
      .then((response: any) => {
        if (response) {
          let max = response.results.length;
          let min = 1;

          let randonNumber = Math.floor(Math.random() * (max - min + 1)) + min;

          let poster_path = `${AppConfig.MOVIE_DB.imageBasePath}w500${response.results[randonNumber].poster_path}`;

          return poster_path;
        }
      }).catch(err => console.log(err));
  }

  discover() {
    return this.http.get(`${AppConfig.MOVIE_DB.baseUrl}discover/movie?api_key=${AppConfig.MOVIE_DB.api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`).toPromise();
  }

  getMovie() {
    //this.http.get(`${AppConfig.MOVIE_DB.baseUrl}movie_id=${}`)
  }

}

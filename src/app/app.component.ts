import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { MovieService } from './service/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Movie Tinder';
  imageUrl: any;

  constructor(private authService: AuthService, private movieService: MovieService) {
    authService.handleAuthentication();

    this.movieService.getRandonImage().then(img => {
      if (img)
        this.imageUrl = img;
    });
  }
}

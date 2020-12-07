import { Component, OnInit } from '@angular/core';
import { NewsService } from "src/app/services/news/news.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogged: boolean;
  userGoogle: any;

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.isLogged = false;
    console.log(this.isLogged);
  }

  async onLoginWithGoogle(): Promise<void> {
    try {
      this.userGoogle = await this.newsService.loginWithGoogle();
      this.isLogged = true;
      console.log('Usuario de google', this.userGoogle);
    } catch (error) {
      console.log('Error con google: ', error);
    }
  }

}

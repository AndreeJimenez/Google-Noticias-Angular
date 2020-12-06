import { INews } from 'src/app/interfaces/news/news.interface';
import { NewsService } from 'src/app/services/news/news.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit, OnDestroy {
  news: INews[];
  newsObs: Subscription;
  isActive: boolean;

  constructor(
    private newsService: NewsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.news = [];
    this.isActive = true;
    this.newsObs = this.newsService.getNewsFirebase().pipe(takeWhile(() => this.isActive)).subscribe((news: INews[]) => {
      this.news = news;
      console.log(news);
    });
  }

  /**
   * Elimina un usuario de firebase
   * @param news Objeto de tipo usuario
   */
  async onDelete(news: INews): Promise<void> {
    try {
      const newsDeleted = await this.newsService.deleteNewsById(news._id);
      console.log('Noticia eliminada', newsDeleted);
    } catch (error) {
      console.log('No se pudo eliminar la noticia', error);
    }
  }

  /**
   * Método que redirecciona al componeten new para poder ser editado
   * @param news Objeto de tipo news
   */
  onUpdate(news: INews): void {
    this.router.navigate(['/', 'home', 'news', 'tpl', news._id]);
  }

  ngOnDestroy(): void {
    console.log('Lista de maestros destruida');
    // this.teachersObs.unsubscribe();
    // this.isActive = false;
  }

}


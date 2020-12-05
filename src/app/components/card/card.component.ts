import { Component, Input, OnInit } from '@angular/core';
import { INews } from 'src/app/interfaces/news/news.interface';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  news: INews[];

  constructor(private newsService: NewsService) {}

  @Input() data;

  ngOnInit(): void {
    this.news = [];
    this.initHttp();
  }

  async initHttp(): Promise<void> {
    const items = await this.newsService.getNews();
    this.news = items;
  }
}

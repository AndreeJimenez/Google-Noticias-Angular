import { Injectable } from '@angular/core';
import { INews } from 'src/app/interfaces/news/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news: INews[] = [
    {
      _id: '1',
      image: 'http://lorempixel.com/100/100/abstract/1',
      title: 'Joe Biden invita al doctor Fauci a formar parte de su equipo contra Covid-19',
      description: 'El presidente electo de Estados Unidos, Joe Biden, dijo el jueves que le pidió al principal especialista en enfermedades infecciosas del gobierno, Anthony Fauci, que permaneciera en su cargo y se una a su equipo Covid-19 después de que llegue a la Casa Blanca.',
    },
    {
      _id: '2',
      image: 'http://lorempixel.com/100/100/abstract/2',
      title: 'Obama',
      description: 'Krispy Kreme',
    },
    {
      _id: '3',
      image: 'http://lorempixel.com/100/100/abstract/3',
      title: 'Trump',
      description: 'Krispy Kreme',
    }
  ];

  constructor() {}

  getNews(): INews[] {
    return this.news;
  }
}

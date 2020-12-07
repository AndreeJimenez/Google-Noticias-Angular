import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { INews } from 'src/app/interfaces/news/news.interface';

import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news: INews[] = [
    {
      _id: '1',
      newsPicture: 'http://lorempixel.com/100/100/abstract/1',
      title: 'Joe Biden invita al doctor Fauci a formar parte de su equipo contra Covid-19',
      description: 'El presidente electo de Estados Unidos, Joe Biden, dijo el jueves que le pidió al principal especialista en enfermedades infecciosas del gobierno, Anthony Fauci, que permaneciera en su cargo y se una a su equipo Covid-19 después de que llegue a la Casa Blanca.',
    },
    {
      _id: '2',
      newsPicture: 'http://lorempixel.com/100/100/abstract/2',
      title: 'CDMX anuncia más restricciones, pero no pasa a rojo pese aumento de hospitalizaciones',
      description: 'La Ciudad de México se mantiene en naranja “al límite”, pero ahora con el llamado a la población a quedarse en casa ante el aumento en los casos y las hospitalizaciones por COVID-19.',
    },
    {
      _id: '3',
      newsPicture: 'http://lorempixel.com/100/100/abstract/3',
      title: 'Shingeki no Kyojin temporada 4 capítulo 1: ¿dónde y a qué hora se podrá ver?',
      description: 'La espera por la llegada de la cuarta y última temporada de Shingeki no Kyojin está cerca de terminar. El anime, que conocemos de este lado del mundo como Attack on Titan, lanzará el primer episodio de esta tanda el lunes 7 de diciembre en Japón, domingo 6 en Latinoamérica.',
    }
  ];

  private newsCollection: AngularFirestoreCollection<INews>;

  constructor(
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
  ) {
    this.newsCollection = angularFirestore.collection<INews>('news');
  }

  getAllNews(): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/news/`);
  }

  getNews(): INews[] {
    return this.news;
  }

  /**
   * Obtiene las noticias registradas en firebase
   */
  getNewsFirebase(): Observable<INews[]> {
    return this.newsCollection.valueChanges({idField: '_id'});
  }

  /**
   * Obtiene una noticia desde firebase por su id
   * @param id id de la noticia
   */
  getNewsById(id: string): Observable<firebase.firestore.DocumentSnapshot<INews>> {
    return this.newsCollection.doc(id).get();
  }

  /**
   * Método que actualiza una noticia en firebase
   * @param id Id de la noticia
   * @param news Objecto de tipo INews
   */
  updateNews(id: string, news: INews): Promise<void> {
    return this.newsCollection.doc(id).update(news);
  }

  /**
   * Método que agrega un usuario de tipo news a la base de datos en firebase
   * @param news Objeto de tipo INews
   */
  addNews(news: INews): Promise<DocumentReference<INews>> {
    return this.newsCollection.add(news);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${environment.SERVER_URL}/news/${id}`);
  }

  deleteNewsById(id: string): Promise<void> {
    return this.newsCollection.doc(id).delete();
  }

  /**
   * Método que guarda un archivo en firestore
   * @param path ruta donde se almacenara el archivo
   * @param data archivo a almacenar
   */
  async uploadFile(path: string, data: any): Promise<any> {
    await this.angularFireStorage.upload(path, data);
    return await this.angularFireStorage.ref(path).getDownloadURL().toPromise();
  }

  loginWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}

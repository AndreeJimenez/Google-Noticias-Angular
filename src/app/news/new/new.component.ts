import { OnInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsService } from '../../services/news/news.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})

export class NewComponent implements OnInit {
  form: FormGroup;
  isNew: boolean;
  params: Params;

  img = 'https://firebasestorage.googleapis.com/v0/b/noticias-f3e62.appspot.com/o/invierte-mb.jpg?alt=media&token=c7ddf3a9-4369-435a-b54e-cb32b70c702c';
  file: File;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.isNew = true;
    this.file = null;

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    // Obtener los parámetros de la url
    this.activatedRoute.params.subscribe(
      async (params: Params) => {
        this.params = params;
        this.isNew = params.newsId === 'new' ? true : false;
        await this.iniValuesHttp();
        console.log('Parametros: ', params);
      }, // Next
      (error: any) => {
        console.log('Error parámetros: ', error);
      }, // Error
      () => { } // Complete
    );

    // this.iniValuesHttp();
  }

  async iniValuesHttp(): Promise<void> {
    try {
      /* this.params = await this.activatedRoute.params.pipe(take(1)).toPromise();
      this.isNew = this.params.teacherId === 'new' ? true : false; */

      if (!this.isNew) {
        const news = await this.newsService.getNewsById(this.params.newsId).toPromise();
        if (news.data()) {
          this.form = new FormGroup({
            title: new FormControl(news.data(), [Validators.required]),
            description: new FormControl(news.data(), [Validators.required]),
          });
          this.img = news.data().newsPicture ? news.data().newsPicture : this.img;
        }
      } else {
        this.form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Método que agrega una noticia en firebase
   */
  async onAdd(): Promise<void> {
    console.log(this.form);
    if (this.form.valid) {
      const firebaseResponse = await this.newsService.addNews(this.form.value);
      const news = await firebaseResponse.get();
      let path = null;
      if (this.file) {
        path = await this.newsService.uploadFile(`profile/${this.file.name}`, this.file);
        await this.newsService.updateNews(news.id, {...news.data(), newsPicture: path ? path : this.img});
      }
      this.file = null;
      path = null;
      this.router.navigate(['/', 'home', 'news', 'tpl', 'list']);
    } else {
      console.log('El formulario es inválido');
    }
  }

  /**
   * Método que actualiza un usuario en firebase
   */
  async onUpdate(): Promise<void> {
    try {
      let path = null;
      if (this.file) {
        path = await this.newsService.uploadFile(`profile/${this.file.name}`, this.file);
      }
      await this.newsService.updateNews(this.params.newsId, {...this.form.value, newsPicture: path ? path : this.img});
      this.router.navigate(['/', 'home', 'news', 'tpl', 'list']);
    } catch (error) {
      console.log(error);
    } finally {
      this.file = null;
    }
  }

  /**
   * Método que obtiene un archivo
   * @param event Evento para obtener el archivo seleccionado por el usuario
   */
  async onChange(event: any): Promise<any> {
    const files: any[] = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
      this.img = await this.getBase64(files[0]);
    } else {
      console.log('No selecciono un archivo');
    }
  }

  /**
   * Método que convierte un archivo a base64
   * @param file Archivo
   */
  getBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}

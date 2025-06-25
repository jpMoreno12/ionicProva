import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AlertController, ToastController } from "@ionic/angular";
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private URL: string = 'http://localhost/PHP_API/produto/';
  private http = inject(HttpClient);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  constructor() { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.URL).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  inserir(p: Produto): Observable<any> {
    return this.http.post(this.URL + 'inserir/', p).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  consultar(id: number): Observable<any> {
    return this.http.get<Produto>(this.URL + id).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  excluir(id: number): Observable<any> {
  return this.http.delete(this.URL + 'excluir.php?id=' + id).pipe(
    map(retorno => retorno),
    catchError(erro => this.exibeErro(erro))
  );
}

  alterar(p: Produto): Observable<any> {
    return this.http.put(this.URL + 'alterar/', p).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibeErro(erro))
    );
  }

  async exibeToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor,
      position: 'bottom',
    });
    await toast.present();
  }

  exibeErro(erro: any): Observable<any> {
    console.log(erro);
    return EMPTY;
  }

  async exibeErroAlerta(erro: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Erro',
      subHeader: "Erro na API",
      message: 'Erro ao consultar a API:<br>' + erro.message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async exibeErroToast(erro: any) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar a API<br>' + erro.message,
      duration: 3000,
      color: 'danger',
      position: 'bottom',
    });
    await toast.present();
  }
}

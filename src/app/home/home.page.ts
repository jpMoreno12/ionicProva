import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";
import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonRow, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, pencilOutline, trashOutline } from "ionicons/icons";
import { Produto } from '../model/produto';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonLabel, IonItem, IonFabButton, IonFab, IonItemOption, IonItemOptions, IonItemSliding, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonIcon],
})
export class HomePage {

  private produtoService = inject(ProdutoService);
  private router = inject(Router);
  public listaProduto: Produto[] = [];

  constructor() {
    addIcons({pencilOutline, trashOutline, addOutline});
    this.produtoService.listar().subscribe(dados=>{
      console.log(dados);
      this.listaProduto = dados;
    })
  }

  editar(id: number) {
      console.log('Editar produto', id);

    this.router.navigate(['cadastro/' + id]);
  }

  inserir() {
  this.router.navigate(['cadastro']);
  }

  excluir(id: number, slidingItem: IonItemSliding) {
    this.produtoService.excluir(id).subscribe({
      next: () => {
        this.listaProduto = this.listaProduto.filter(p => p.id !== id);
        this.produtoService.exibeToast('Produto excluído com sucesso', 'success');
        slidingItem.close(); // fecha o sliding após exclusão
      },
      error: () => {
        this.produtoService.exibeToast('Erro ao excluir produto', 'danger');
        slidingItem.close();
      }
    });
  }
  
  trackById(index: number, item: Produto): number {
    return item.id!;
  }

}

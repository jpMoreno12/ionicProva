import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonInput, IonItem, IonLabel, IonPopover, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonButton, IonDatetime, IonPopover, IonDatetimeButton, IonLabel, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CadastroPage implements OnInit {

  produtoService = inject(ProdutoService);
  router = inject(Router);
  activateRoute = inject(ActivatedRoute);
  modo: string = 'Cadastro'; 
  modoCarregada: string = 'Edicao de Produto'

  id = 0;
  produto: Produto = {
    descricao: '',
    preco: 0,
  };

  constructor() { }

  // salvar() {
  //   console.log(this.produto);
  //   this.produtoService.inserir(this.produto).subscribe(
  //     retorno => {
  //       this.produtoService.exibeToast(retorno.mensagem, 'medium');
  //       this.router.navigate(["/home"]);
  //     }
  //   )
  // }
salvar() {
  if (!this.validarCampos()) return;

  if (this.id != 0) {
    this.produtoService.alterar(this.produto).subscribe(
      retorno => {
        this.produtoService.exibeToast(retorno.mensagem, 'medium');
        this.router.navigate(["/home"]);
      }
    );
  } else {
    this.produtoService.inserir(this.produto).subscribe(
      retorno => {
        this.produtoService.exibeToast(retorno.mensagem, 'medium');
        this.router.navigate(["/home"]);
      }
    );
  }
}

  inserir() {
    this.produtoService.inserir(this.produto).subscribe(
      retorno => {
        this.produtoService.exibeToast(retorno.mensagem, 'medium');
      }
    );
  }

  alterar() {
    this.produtoService.alterar(this.produto).subscribe(
      retorno => {
        this.produtoService.exibeToast(retorno.mensagem, 'medium');
      }
    );
  }

  validarCampos(): boolean {
    if (this.produto.descricao == '') {
      this.produtoService.exibeToast("O campo descricao e obrigatorio", "danger");
      return false;
    } else if (this.produto.preco < 0) {
      this.produtoService.exibeToast("O preco deve ser maior que zero", "danger");
      return false;
    } else if (this.produto.validade == null) {
      this.produtoService.exibeToast("O campo validade e obrigatorio", "danger");
    }
    return true;
  }

  ngOnInit() {
    this.id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
    if (this.id != 0) {
      this.modo = 'Edicao';
      this.produtoService.consultar(this.id).subscribe(
        retorno => {
          this.produto = retorno;
        }
      );
    } else {
      this.modo = 'Adicionar Produto';
      this.modoCarregada = 'Adicione um Produto';
    }
  }

}

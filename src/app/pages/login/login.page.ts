import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
   imports: [IonLabel, IonList, IonListHeader, 
    CommonModule,
    FormsModule,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonTitle,
    IonToolbar,
  ],
})
export class LoginPage implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  toastCtrl = inject(ToastController);

  usuariosMockados = [
  { email: 'joao@email.com', senha: '123456' },
  { email: 'maria@email.com', senha: 'senha123' },
  { email: 'carlos@email.com', senha: 'senha123' }
];


  email: string = '';
  senha: string = '';

  constructor() { }

   async fazerLogin() {
    if (!this.email || !this.senha) {
      this.exibeToast('Informe email e senha', 'warning');
      return;
    }

    this.authService.login(this.email, this.senha).subscribe({
      next: async (res) => {
        if (res.erro) {
          this.exibeToast(res.erro, 'danger');
        } else if (res.message === 'Login OK') {
          this.exibeToast(`Bem-vindo, ${res.usuario?.nome}`, 'success');
          this.router.navigate(['/home']);
        }
      },
      error: async () => {
        this.exibeToast('Erro na conexão com o servidor', 'danger');
      }
    });
  }


    async exibeToast(mensagem: string, cor: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      color: cor,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }


  ngOnInit() { }
}


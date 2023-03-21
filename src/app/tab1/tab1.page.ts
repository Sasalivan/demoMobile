import { Component } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Article } from '../models/article.model';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  nomDeArticle: string|null = null;
  articles: Article[] = [];

  constructor(
    private alertController: AlertController,
    private asController: ActionSheetController,
    private storage: Storage,
  ) {}

  ajouter(){
    if(!this.nomDeArticle){
      return;
    }
    const nouvelArticle = {nom: this.nomDeArticle, estCoche: false};
    this.articles.push(nouvelArticle);
    this.nomDeArticle = null;
  }

  confirmer(){
    this.alertController.create({
      message: 'Etes vous sûr de vouloir vider la liste ? ', 
      buttons: [{text: 'non'}, {text:'oui', handler:()=> this.deleteAll()}]
    }).then(a => a.present());
  }

  afficherAction(article: Article){
    this.asController.create({buttons: [
      {text: 'supprimer', icon: 'trash-bin'},
      {text: article.estCoche ? 'Décocher' : 'Valider', icon: article.estCoche ? 'close' : 'checkmark', handler:()=> this.valider(article)}
    ]}).then(as => as.present());
  }

  private deleteAll(){
    if(!this.articles.length){
      return;
    }
    this.articles = [];
  }

  supprimer(article: Article){
    //const index = this.article.indexOf(article);
    //this.articles.splice(index, 1);
    this.articles = this.articles.filter(a => a !== article);
  }

  valider(article: Article){
    article.estCoche = !article.estCoche;
  }

  private save() {
    this.storage.set('LIST_ARTICLES', this.articles);
  }

  private load(): void{
    this.storage.get('LIST_ARTICLES').then(data => this.articles = data ?? [])
  }
}

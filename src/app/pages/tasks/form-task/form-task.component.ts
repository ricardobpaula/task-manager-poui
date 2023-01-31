  import { Component } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css']
})
export class FormTaskComponent {
  public breadcrumb: PoBreadcrumb

  constructor() {
    this.breadcrumb = {
      items: [
        { label: 'Tarefas', link: '/' },
        { label: 'Cadastro de Tarefas' },
      ]
    };
  }
}

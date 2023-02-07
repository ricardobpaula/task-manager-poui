  import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PoBreadcrumb, PoDynamicFormComponent, PoDynamicFormField, PoNotificationService, PoPageEditLiterals } from '@po-ui/ng-components';
import { catchError, map, throwError } from 'rxjs';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css']
})
export class FormTaskComponent implements OnInit {
  @ViewChild('dynamicForm', { static: true }) dynamicForm!: PoDynamicFormComponent

  public breadcrumb: PoBreadcrumb
  public literals: PoPageEditLiterals
  public formFields: PoDynamicFormField[]
  public id?: string
  public title: string = 'Nova Tarefa'

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private notification: PoNotificationService) {
    this.breadcrumb = {
      items: [
        { label: 'Tarefas', link: '/' },
        { label: 'Cadastro de Tarefas' },
      ]
    }

    this.literals = { save: 'Salvar', cancel: 'Cancelar' }

    this.formFields = [
      { property: 'name', label: 'Nome', required: true, showRequired: true },
      { property: 'date', visible: true, required: true, showRequired: true, type: 'date' },
      { property: 'description', label: 'Descrição', gridColumns: 12, gridSmColumns: 12, rows: 5 },
      { property: 'code', visible: false, required: false},
      { property: 'done', visible: false, required: false, type: 'boolean' }
    ]
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    if (this.id) {
      this.title = "Editar Tarefa"
      this.taskService.get(this.id)
        .subscribe(task => {
          this.dynamicForm.value = task
        })
    }
  }

  handleCancel() {
    this.location.back()
  }

  handleSubmit() {
    this.submit(this.dynamicForm.form.value)
      .subscribe({
        next: () => {
          this.router.navigate(["/tasks"])
          this.notification.success("Tarefa salva com sucesso!")
        },
        error: err => console.log(err)
      })
  }

  submit(task: Task) {
    if (this.id) {
      return this.taskService
        .update(task, this.id)
    }
    return this.taskService
        .create(task)
  }
}

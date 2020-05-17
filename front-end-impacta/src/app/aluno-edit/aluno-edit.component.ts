import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../shared/services/alunos.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aluno-edit',
  templateUrl: './aluno-edit.component.html',
  styleUrls: ['./aluno-edit.component.css']
})
export class AlunoEditComponent implements OnInit {
  public aluno = {
    nome: '',
    disciplinaSelcionada: [] = [],
    matricula: ''
  };
  alunoId: string;
  public disciplinas: Array<any>;

  constructor(
    private alunoService: AlunosService,
    public router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.alunoId = params.id;
      if (this.alunoId === 'details') {
        return;
      }
    });
  }

  async create() {
    try {
      if (!this.aluno.nome) {
        this.toastrService.info('Aluno não pode ser vazio');
        return;
      }
      if (!this.aluno.disciplinaSelcionada) {
        this.toastrService.info('Selecione pelo menos uma disciplina');
        return;
      }
      if (!this.aluno.matricula) {
        this.toastrService.info('A matricula não pode ser vazia');
        return;
      }
      await this.alunoService.create(this.aluno);
      this.toastrService.success('Aluno criado com sucesso');
      this.router.navigate(['/alunos']);
    } catch (error) {
      this.toastrService.error('Erro ao criar aluno');
    }

  }

}

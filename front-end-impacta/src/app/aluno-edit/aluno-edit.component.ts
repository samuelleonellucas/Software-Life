import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../shared/services/alunos.service';
import { DisciplinasService } from '../shared/services/disciplinas.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aluno-edit',
  templateUrl: './aluno-edit.component.html',
  styleUrls: ['./aluno-edit.component.css']
})
export class AlunoEditComponent implements OnInit {
  loading = false;
  public aluno: any = {
    name: '',
    disciplinaSelcionada: [] = [],
    RA: ''
  };
  public alunoId: string;
  public hasChanges: false;
  public disciplinas: any;

  constructor(
    private alunoService: AlunosService,
    public router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private disciplinasService: DisciplinasService

  ) { }

  ngOnInit() {
    this.getDisciplines();
    this.route.params.subscribe(params => {
      this.alunoId = params.id;
      if (this.alunoId === 'details') {
        return;
      }
      this.findById();
    });
  }

  async create() {
    try {
      await this.alunoService.create(this.aluno);
      this.toastrService.success('Aluno criado com sucesso');
    } catch (error) {
      console.log(error);
      this.toastrService.error('Erro ao criar aluno');
    }

  }

  async findById() {
    try {
      this.loading = true;
      const res = await this.alunoService.getById(this.alunoId);
      this.aluno = {
        _id: res['_id'],
        name: res['name'],
        disciplinas: res['disciplinaSelcionada'],
        RA: res['RA']
      };
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error);
      this.toastrService.error('Erro ao obter aluno por id');
    } finally {
      this.loading = false;
    }
  }

  async update() {
    try {
      const res = await this.alunoService.update(this.alunoId, this.aluno);
      this.toastrService.success('Aluno atualizado com sucesso');
    } catch (error) {
      console.log(error);
      this.toastrService.error('Erro ao atualizar aluno');
    }
  }

  async save() {
    try {
      if (!this.aluno.nome) {
        this.toastrService.info('Aluno não pode ser vazio');
        return;
      }
      if (!this.aluno.disciplinaSelcionada) {
        console.log(this.aluno.disciplinaSelcionada);
        this.toastrService.info('Selecione pelo menos uma disciplina');
        return;
      }
      if (this.hasChanges) {
        this.aluno = {
          name: this.aluno.name,
          disciplines: this.aluno.disciplinaSelcionada
        };
      }
      this.alunoId !== 'details' ? await this.update() : await this.create();
      this.router.navigateByUrl('/alunos');
    } catch (error) {
      console.log(error);
      this.toastrService.error(error);
    }
  }

  async getDisciplines() {
    try {
      this.disciplinas = await this.disciplinasService.list();
      console.log(this.disciplinas);
    } catch (error) {
      console.error(error);
    }
  }
}

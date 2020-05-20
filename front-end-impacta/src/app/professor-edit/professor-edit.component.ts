import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../shared/services/professores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-professor-edit',
  templateUrl: './professor-edit.component.html',
  styleUrls: ['./professor-edit.component.css']
})
export class ProfessorEditComponent implements OnInit {
  loading = false;
  public professor: any = {
    nome: '',
    disciplinaSelcionada: [] = [],
    matricula: ''
  };
  public professorId: string;
  public disciplinas: Array<any>;

  constructor(
    private professorService: ProfessorService,
    public router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.professorId = params.id;
      if (this.professorId === 'details') {
        return;
      }
      this.findById();
    });
  }

  async create() {
    try {
      await this.professorService.create(this.professor);
      this.toastrService.success('Professor criado com sucesso');
    } catch (error) {
      console.log(error);
      this.toastrService.error('Erro ao criar professor');
    }

  }
  async findById() {
    try {
      this.loading = true;
      const res = await this.professorService.getById(this.professorId);
      if (res) {
        this.professor = {
          _id: res['_id'],
          nome: res['nome'],
          matricula: res['matricula'],
          disciplinas: res['disciplinas']
        };
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error);
      this.toastrService.error('Erro ao obter professor por id');
    } finally {
      this.loading = false;
    }
  }
  async update() {
    try {
      const res = await this.professorService.update(this.professorId, this.professor);
      this.toastrService.success('Professor atualizado com sucesso');
    } catch (error) {
      console.log(error);
      this.toastrService.error('Erro ao atualizar professor');
    }
  }

  async save() {
    try {
      if (!this.professor.nome) {
        this.toastrService.info('Professor não pode ser vazio');
        return;
      }
      if (!this.professor.disciplinaSelcionada) {
        console.log(this.professor.disciplinaSelcionada);
        this.toastrService.info('Selecione pelo menos uma disciplina');
        return;
      }
      this.professorId !== 'details' ? await this.update() : await this.create();
      this.router.navigateByUrl('/professores');
    } catch (error) {
      console.log(error);
      this.toastrService.error(error);
    }

  }

}

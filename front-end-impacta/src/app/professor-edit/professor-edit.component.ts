import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../shared/services/professores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DisciplinasService } from '../shared/services/disciplinas.service';

@Component({
  selector: 'app-professor-edit',
  templateUrl: './professor-edit.component.html',
  styleUrls: ['./professor-edit.component.css']
})
export class ProfessorEditComponent implements OnInit {
  loading = false;
  public professor: any = {
    name: '',
    discipline: [] = [],
    RP: ''
  };
  public professorId: string;
  public disciplines: any;

  constructor(
    private professorService: ProfessorService,
    public router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private disciplinasService: DisciplinasService


  ) { }

  ngOnInit() {
    this.getDisciplines();
    this.route.params.subscribe(params => {
      this.professorId = params.id;
      if (this.professorId === 'details') {
        return;
      }
      this.findById();
    });
  }

  async create(teacher) {
    try {
      await this.professorService.create(teacher);
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
          id: res['id'],
          name: res['name'],
          RP: res['RP'],
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
  async update(teacher) {
    try {
      const res = await this.professorService.update(this.professorId, teacher);
      this.toastrService.success('Professor atualizado com sucesso');
    } catch (error) {
      console.log(error);
      this.toastrService.error('Erro ao atualizar professor');
    }
  }

  async save() {
    try {
      if (!this.professor.name) {
        this.toastrService.info('Professor não pode ser vazio');
        return;
      }
      if (!this.professor.discipline) {
        this.toastrService.info('Selecione pelo menos uma disciplina');
        return;
      }
      this.professorId !== 'details' ? await this.update(this.professor) : await this.create(this.professor);
      this.router.navigateByUrl('/professores');
    } catch (error) {
      console.log(error);
      this.toastrService.error(error);
    }

  }
  async getDisciplines() {
    try {
      this.disciplines = await this.disciplinasService.list();
    } catch (error) {
      console.error(error);
    }
  }

}

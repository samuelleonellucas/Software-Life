import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DisciplinasService } from '../shared/services/disciplinas.service';
import { ProfessorService } from '../shared/services/professores.service';


@Component({
  selector: 'app-disciplina-edit',
  templateUrl: './disciplina-edit.component.html',
  styleUrls: ['./disciplina-edit.component.css']
})
export class DisciplinaEditComponent implements OnInit {
  loading = false;
  public discipline: any = {
    name: '',
    teacher_id: [],
    workload: ''
  };
  public horarios = [];
  public disciplinaId: string;
  public disciplines: any;
  public teacher: any;
  public hasChanges: false;

  constructor(
    public router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private disciplinasService: DisciplinasService,
    private professorService: ProfessorService
  ) { }

  ngOnInit() {
    this.getDisciplines();
    this.getTeachers();
    this.horarios = ['36', '40', '72', '80', '120', '160'];
    this.route.params.subscribe(params => {
      this.disciplinaId = params.id;
      if (this.disciplinaId === 'details') {
        return;
      }
      this.findById();
    });
  }

  async create(discipline) {
    try {
      await this.disciplinasService.create(discipline);
      this.toastrService.success('Disciplina criado com sucesso');
    } catch (error) {
      console.log(error);
      this.toastrService.error('Erro ao criar disciplina');
    }

  }

  async findById() {
    try {
      this.loading = true;
      this.discipline = await this.disciplinasService.getById(this.disciplinaId);
      this.discipline.teacher_id = [this.discipline.teacher[0]];
      this.loading = false;

    } catch (error) {
      this.loading = false;
      console.log(error);
      this.toastrService.error('Erro ao obter disciplina');
    } finally {
      this.loading = false;
    }
  }

  async update(discipline) {
    try {
      const res = await this.disciplinasService.update(this.disciplinaId, discipline);
      this.toastrService.success('Disciplina atualizada com sucesso');
    } catch (error) {
      console.log(error);
      this.toastrService.error('Erro ao atualizar disciplina');
    }
  }

  async save() {
    try {
      if (!this.discipline.name) {
        this.toastrService.info('Nome da disciplina não pode ser vazio');
        return;
      }
      if (!this.discipline.workload) {
        this.toastrService.info('Carga horaria não pode ser vazio');
        return;
      }
      if (this.discipline.teacher_id.length > 1) {
        return this.toastrService.info('É possivel selecionar apenas um professor');
      }
      this.discipline.teacher = this.discipline.teacher_id;
      this.disciplinaId !== 'details' ? await this.update(this.discipline) : await this.create(this.discipline);
      this.router.navigateByUrl('/disciplinas');
    } catch (error) {
      console.log(error);
      this.toastrService.error(error);
    }
  }

  async getTeachers() {
    try {
      this.teacher = await this.professorService.list();
    } catch (error) {
      console.error(error);
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

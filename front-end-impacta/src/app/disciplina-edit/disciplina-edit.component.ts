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
    professorSelecionado: [] = [],
    cargaHoraria: ''
  };
  public horarios = [];
  public disciplinaId: string;
  public hasChanges: false;
  public teacher: any;

  constructor(
    public router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private disciplinasService: DisciplinasService,
    private professorService: ProfessorService
  ) { }

  ngOnInit() {
    this.getTeachers(); 
    this.horarios = ['36H', '40H', '72H', '80H', '120H', '160H'];
    this.route.params.subscribe(params => {
      this.disciplinaId = params.id;
      if (this.disciplinaId === 'details') {
        return;
      }
      this.findById();
    });
  }

  async create() {
    try {
      await this.disciplinasService.create(this.discipline);
      this.toastrService.success('Disciplina criado com sucesso');
    } catch (error) {
      console.log(error);
      this.toastrService.error('Erro ao criar disciplina');
    }

  }

  async findById() {
    try {
      this.loading = true;
      const res = await this.disciplinasService.getById(this.disciplinaId);
      if (res) {
        this.discipline = {
          _id: res['_id'],
          name: res['name'],
          teacher: res['teacher'],
          workload: res['workload']
        };
      }
      this.loading = false;
    } catch (error) {
      this.loading = false;
      console.log(error);
      this.toastrService.error('Erro ao obter disciplina');
    } finally {
      this.loading = false;
    }
  }

  async update() {
    try {
      const res = await this.disciplinasService.update(this.disciplinaId, this.discipline);
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
      if (!this.discipline.cargaHoraria) {
        this.toastrService.info('Carga horaria não pode ser vazio');
        return;
      }
      if (this.hasChanges) {
        this.discipline = {
          name: this.discipline.name,
          teacher: this.discipline.professorSelecionado,
          workload: this.discipline.cargaHoraria
        };
      }
      this.disciplinaId !== 'details' ? await this.update() : await this.create();
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
}

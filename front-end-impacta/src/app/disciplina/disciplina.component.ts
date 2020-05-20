import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { DisciplinasService } from '../shared/services/disciplinas.service';
import { ProfessorService } from '../shared/services/professores.service';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  public disciplines: any;
  public teacher: any;
  disciplinas: any = [];
  disciplinaId: string;
  p = 1;
  loading = false;
  constructor(
    private toastr: ToastrService,
    private disciplinaService: DisciplinasService,
    private professorService: ProfessorService
  ) { }

  ngOnInit() {
    this.get();
    this.getTeachers();
  }


  async delete(id) {
    try {
      Swal.fire({
        title: '<strong>Você deseja excluir esse registro?</u></strong>',
        icon: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
      }).then(async (result) => {
        if (!result.value) {
          return;
        }
        await this.disciplinaService.delete(id);
        this.toastr.success('Deletado com sucesso');
        return this.get();
      });

    } catch (error) {
      console.error(error);
      this.toastr.error('Erro ao deletar disciplina');
    }
  }

  async get() {
    try {
      this.loading = true;
      this.disciplinas = await this.disciplinaService.list();
    } catch (error) {
      this.loading = false;
      this.toastr.error('Error ao carregar disciplinas');
    } finally {
      this.loading = false;
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

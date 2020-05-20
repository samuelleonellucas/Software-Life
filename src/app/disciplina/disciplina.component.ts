import { Component, OnInit } from '@angular/core';
import { DisciplinasService } from '../shared/services/disciplinas.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {


  disciplinas: any = [];
  disciplinaId: string;
  p = 1;
  loading = false;
  constructor(
    private disciplinaService: DisciplinasService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.get();
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

}

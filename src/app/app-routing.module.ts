import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoComponent } from './aluno/aluno.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { ProfessorComponent } from './professor/professor.component';
import { HomeComponent } from './home/home.component';
import { AlunoEditComponent } from './aluno-edit/aluno-edit.component';
import { ProfessorEditComponent } from './professor-edit/professor-edit.component';
import { DisciplinaEditComponent } from './disciplina-edit/disciplina-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'alunos', component: AlunoComponent },
  { path: 'professores', component: ProfessorComponent },
  { path: 'disciplinas', component: DisciplinaComponent },
  { path: 'aluno/:id', component: AlunoEditComponent },
  { path: 'professor/:id', component: ProfessorEditComponent },
  { path: 'disciplinas/:id', component: DisciplinaEditComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

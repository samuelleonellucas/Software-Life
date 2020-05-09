import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunoComponent } from './aluno/aluno.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { ProfessorComponent } from './professor/professor.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'aluno/details', component: AlunoComponent },
  { path: 'professor/details', component: ProfessorComponent },
  { path: 'disciplina/details', component: DisciplinaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

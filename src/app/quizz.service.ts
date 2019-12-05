import { Question } from './shared/models/question.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataJson } from './shared/models/dataJson.model';
import { Observable } from 'rxjs';
import {tap, map, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  score: number;
  private nbQuestion: number;

  constructor(private http: HttpClient) {
    this.nbQuestion = 5;
  }

  private shuffle(a: DataJson[]): DataJson[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  public get getNbQuestion() {
    return this.nbQuestion;
  }

  public buildNewQuiz(): Question[] {
    let questionFinal: Question[] = [];
    let questions: DataJson[];
    this.getDataJson(5).subscribe(
      (q: DataJson[]) => {
        questions = q;
        q.forEach(element => {
          const quest: Question = {
            VraiQuestion: element,
            FausseReponse: this.getPropoDuContinent(element),
            allQuestion: []
          };
          questionFinal.push(quest);

        });
      }
    );
    return questionFinal;
  }

  private getPropoDuContinent(quest: DataJson): DataJson[] {
    let questionsTemp: DataJson[] = [];
    let questions2: DataJson[] = [];
    this.getDataJson(100).subscribe(
      (q: DataJson[]) => {
        questionsTemp = q;
        questions2.push(questionsTemp.filter(p => p.continent === quest.continent && p.pays !== quest.pays));
      }
    );
    return questions2;
  }

  private getDataJson(nbLimit) {
    return this.http.get<DataJson[]>('http://localhost:3000/questions').pipe(
      tap(q => this.shuffle(q)),
      map(q => q.slice(0, nbLimit))
    );
  }

}

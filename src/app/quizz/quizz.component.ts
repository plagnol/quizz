import { Question } from './../shared/models/question.model';
import { DataJson } from './../shared/models/dataJson.model';
import { QuizzService } from './../quizz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  questions: Question[];
  iQuestion = 0;
  currentQuestion: Question;
  answer: string;
  found: boolean;
  hasNext = true;
  showButton = true;
  showQuestion = false;
  reponseAAfficher = '';
  afficherNextButton = false;

  constructor(private myService: QuizzService) { }

  ngOnInit() {
    this.questions = this.myService.buildNewQuiz();
  }

  newGame() {

    this.showButton = false;
    this.showQuestion = true;
    this.currentQuestion = this.questions[this.iQuestion];
    this.currentQuestion.allQuestion.push(this.currentQuestion.FausseReponse[0][0]);
    this.currentQuestion.allQuestion.push(this.currentQuestion.FausseReponse[0][1]);
    this.currentQuestion.allQuestion.push(this.currentQuestion.FausseReponse[0][2]);
    this.currentQuestion.allQuestion.push(this.currentQuestion.VraiQuestion);
    this.currentQuestion.allQuestion = this.shuffle(this.currentQuestion.allQuestion);
  }

  loadNextQuestion() {
    this.iQuestion ++;
    this.afficherNextButton = false;
    this.reponseAAfficher = '';
    this.currentQuestion = this.questions[this.iQuestion];
    this.currentQuestion.allQuestion.push(this.currentQuestion.FausseReponse[0][0]);
    this.currentQuestion.allQuestion.push(this.currentQuestion.FausseReponse[0][1]);
    this.currentQuestion.allQuestion.push(this.currentQuestion.FausseReponse[0][2]);
    this.currentQuestion.allQuestion.push(this.currentQuestion.VraiQuestion);
    this.currentQuestion.allQuestion = this.shuffle(this.currentQuestion.allQuestion);
  }

  timeSpent() {

  }

  answerGiven(answer: string) {
    if (answer === this.currentQuestion.VraiQuestion.capitale) {
      this.reponseAAfficher = 'bonne réponse';
    } else {
      this.reponseAAfficher = 'mauvais réponse, la bonne était : ' + this.currentQuestion.VraiQuestion.capitale;
    }
    if (this.iQuestion === this.questions.length - 1) {
      this.reponseAAfficher += ' Fin du quizz';
      this.afficherRecommencer = true;
    } else{
      this.afficherNextButton = true;
    }

  }

  showAnswer() {

  }

  private shuffle(a: DataJson[]): DataJson[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

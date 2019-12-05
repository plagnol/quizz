import { DataJson } from './../shared/models/dataJson.model';
import { QuizzService } from './../quizz.service';
import { Component, OnInit } from '@angular/core';
import { Question } from '../shared/models/Question.model';

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

  constructor(private myService: QuizzService) { }

  ngOnInit() {
    this.questions = this.myService.buildNewQuiz();

  }

  newGame() {
    console.log(this.questions);
  }

  loadNextQuestion() {

  }

  timeSpent() {

  }

  answerGiven(answer: string) {

  }

  showAnswer() {

  }
}

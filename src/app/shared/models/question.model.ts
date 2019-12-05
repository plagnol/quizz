import { DataJson } from './dataJson.model';

export interface Question {
  VraiQuestion: DataJson;
  FausseReponse: DataJson[];
}

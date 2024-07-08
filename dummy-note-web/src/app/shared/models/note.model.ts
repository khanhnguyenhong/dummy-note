import { Moment } from 'moment';
import { isEmpty } from 'lodash';
import * as moment from 'moment';

export class Note {
  id: number;
  title: string;
  description: string;
  type: string;
  learningProcess?: LearningProcess;
  urgency: number;
  value: number;
  tags: string[];

  constructor(note: any) {
    this.id = note.id;
    this.title = note.title;
    this.description = note.description;
    this.type = note.type;
    this.urgency = note.urgency;
    this.value = note.value;
    this.tags = note.tags;

    if (!isEmpty(note.learningProcess)) {
      this.learningProcess = new LearningProcess(note.learningProcess);
    }
  }
}``

export class LearningProcess {
  id: number;
  currentReview: Moment;
  nextReview: Moment;

  constructor(learningProcess: any) {
    if (!isEmpty(learningProcess)) {
      this.id = learningProcess.id;
      this.currentReview = learningProcess.currentReview;
      this.nextReview = learningProcess.nextReview;
    } else {
      this.id = -1;
      this.currentReview = moment(new Date());
      this.nextReview = moment(new Date());
    }
  }
}

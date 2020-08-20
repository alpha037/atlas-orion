import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, take } from 'rxjs/operators';
import { Board } from 'src/app/kanban/models/board.model';
import { Task } from 'src/app/kanban/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  private get databaseRef() {
    return this.db.collection<Board>('boards');
  }

  /**
   * Creates a new board for the current user.
   * @param board : Accepts an argument board of type 'BoardDTO'.
   */
  async createBoard(board: Board) {
    const user = await this.afAuth.authState.pipe(take(1)).toPromise();
    return this.databaseRef.add({
      ...board,
      tasks: [
        { description: `Hello There, ${user.displayName}`, label: 'yellow' },
      ],
      uid: user.uid,
      createdAt: Date.now(),
    });
  }

  /**
   * Removes a specific board using a boardId.
   * @param boardId : Accepts a boardId of type 'string'.
   */
  removeBoard(boardId: string) {
    return this.databaseRef.doc(boardId).delete();
  }

  /**
   * Updates a specific board with the provided tasks array.
   * @param boardId : Accepts a boardId of type 'string'.
   * @param tasks : Accepts an array of tasks of type 'Task[]'.
   */
  updateTasks(boardId: string, tasks: Task[]) {
    return this.databaseRef.doc(boardId).update({ tasks });
  }

  /**
   * Removes a task from a specific board.
   * @param boardId : Accepts a boardId of type 'string'.
   * @param task : Accepts a task object of type 'Task'.
   */
  removeTask(boardId: string, task: Task) {
    return this.databaseRef.doc(boardId).update({
      tasks: firebase.firestore.FieldValue.arrayRemove(task),
    });
  }

  /**
   * Finds all the boards associated with the current user.
   */
  getBoards() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (!user) return [];

        return this.db
          .collection<Board>('boards', (ref) =>
            ref.where('uid', '==', user.uid).orderBy('priority')
          )
          .valueChanges({ idField: 'id' });
      })
    );
  }

  /**
   * Sorts the given boards based on their priority by using batch writes.
   * @param boards : Accepts an array of boards of type 'Board[]'.
   */
  sortBoards(boards: Board[]) {
    const batch = firebase.firestore().batch();
    const boardRefs = boards.map((board) => this.databaseRef.doc(board.id));
    boardRefs.forEach((board, idx) =>
      batch.update(board.ref, { priority: idx })
    );
    // boardRefs.forEach((board) => console.log(board.ref));
    batch.commit();
  }
}

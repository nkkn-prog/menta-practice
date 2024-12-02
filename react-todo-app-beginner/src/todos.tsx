
import { useState } from 'react'
import { EditForm } from './components/EditForm';
import './App.css'

export default function Todos() {
  type Task = {
    uuid: string;
    title: string
    content: string;
    status: string;
    isEditing: boolean;
  }

  const [inputText, setInputText] = useState('')
  const [inputTitle, setInputTitle] = useState('')
  const [notStartedTasks, setNotStartedTasks] = useState<Task[]>([])
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([])
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])
  const [editTask, setEditTask] = useState<Task>({
    uuid: '',
    title: '',
    content: '',
    status: '',
    isEditing: false,
  })

  const statuses = ['未着手','進行中','完了']

  const reflectTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value)
  }

  const reflectText = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value)
  }

  // ここからタスクを移動させる処理
  // 未着手→進行中
  const changeStatusToProgressFromNotStarted = (index:number) => {

    // 未着手タスクをコピー
    const newNotStartedTasks = [...notStartedTasks]
    // 選択したタスクを取得
    const selectedTask = newNotStartedTasks[index]

    // 進行中タスクに移動させる
    const newInProgressTasks = [...inProgressTasks, selectedTask]

    // 移動させるタスクを削除
    newNotStartedTasks.splice(index,1);

    // それぞれの値をセットする
    setNotStartedTasks(newNotStartedTasks)
    setInProgressTasks(newInProgressTasks)

    return

  }

  // 進行中→未着手
  const changeStatusToNotStarted = (index:number) => {

    // 進行中タスクをコピー
    const newInProgressTasks = [...inProgressTasks]
    // 選択したタスクを取得
    const selectedTask = newInProgressTasks[index]

    // 未着手タスクに移動させる
    const newNotStartedTasks = [...notStartedTasks, selectedTask]

    // 移動させるタスクを削除
    newInProgressTasks.splice(index,1);

    // それぞれの値をセットする
    setNotStartedTasks(newNotStartedTasks)
    setInProgressTasks(newInProgressTasks)

    return
  }

  // 進行中→完了
  const changeStatusToCompleted = (index:number) => {

    // 進行中タスクをコピー
    const newInProgressTasks = [...inProgressTasks]
    // 選択したタスクを取得
    const selectedTask = newInProgressTasks[index]

    // 完了タスクに移動させる
    const newCompletedTasks = [...completedTasks, selectedTask]

    // 移動させるタスクを削除
    newInProgressTasks.splice(index,1);

    // それぞれの値をセットする
    setCompletedTasks(newCompletedTasks)
    setInProgressTasks(newInProgressTasks)

    return
  }
  // 完了→進行中
  const changeStatusToProgressFromCompleted = (index:number) => {

    // 進行中タスクをコピー
    const newCompletedTasks = [...completedTasks]
    // 選択したタスクを取得
    const selectedTask = newCompletedTasks[index]

    // 完了タスクに移動させる
    const newInProgressTasks = [...inProgressTasks, selectedTask]

    // 移動させるタスクを削除
    newCompletedTasks.splice(index,1);

    // それぞれの値をセットする
    setCompletedTasks(newCompletedTasks)
    setInProgressTasks(newInProgressTasks)

    return
  }


  // ここからクリック系の処理

  const addClick = () => {
    // 新規作成するタスクを作成する
    const newTask : Task = {
      // タイトルも入れる
      uuid: crypto.randomUUID(),
      title: inputTitle,
      content: inputText,
      status: statuses[0],
      isEditing: false,
    };
    // 既存の未着手タスクに新規作成したタスクを追加
    if(inputTitle !== '' && inputText !== '') {
      setNotStartedTasks([...notStartedTasks, newTask]);
      //入力したタイトルとテキストをデフォルト値に戻す
      setInputTitle('')
      setInputText('')
      return
    }
  }

  const editClick = (index:number,  status:string) => {

      // ステータスごとのタスクを取得し、選択したタスクを設定する。
      const taskListMap = {
      [statuses[0]]: notStartedTasks,
      [statuses[1]]: inProgressTasks,
      [statuses[2]]: completedTasks
      };

      // 選択されたタスクのステータスに応じて、対応する配列を更新
      const tasks = taskListMap[status];

      // 選択されたタスクのisEditingをtrueに、他のタスクをfalseに設定
      const updatedTasks = tasks.map((task, i) => ({
        ...task,
        isEditing: i === index
      }));

      if (status[0] === status) {
        setNotStartedTasks(updatedTasks);
      }
      if (status[1] === status) {
        setInProgressTasks(updatedTasks);
      }
      if (status[2] === status) {
        setCompletedTasks(updatedTasks);
      }

      // 該当するタスクを取得
      const selectedTask = [...tasks][index];
      setEditTask(selectedTask);
      console.log(selectedTask)
  }

  // const updateTask = () => {}

  // const deleteTask = () => {}



  return (
    <>
      <div className='input-container'>
        <input
          type="text"
          placeholder="タイトルを入力"
          value={inputTitle}
          onChange={reflectTitle}
          className="input"
        />
        <textarea
          placeholder="タスクの内容を入力"
          value={inputText}
          onChange={reflectText}
          className="textarea"
        />
        <button className='primary-btn' onClick={addClick}>add</button>
      </div>
      <div className='container'>
        <div className='status-box'>
          <p className='status-label'>{statuses[0]}</p>
          {/* addしたものをここで出す */}
          {notStartedTasks.map((task, index) => (
            // key属性は最外部の要素に必要
            <div key={task.uuid}>
              {editTask.isEditing ? (
                <EditForm 
                  task={editTask}
                />
              ) : (
                <>
                  <p>{task.title}</p>
                  <p>{task.content}</p>
                  <button onClick={() => changeStatusToProgressFromNotStarted(index)}>＞</button>
                  <button onClick={() => editClick(index, statuses[0])}>編集</button>
                  <button>削除</button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className='status-box'>
          <p className='status-label'>{statuses[1]}</p>
          {inProgressTasks.map((task, index) => {
            return (
              <div key={task.uuid}>
                <button onClick={()=>changeStatusToNotStarted(index)}>＜</button>
                <p>{task.title}</p>
                <p>{task.content}</p>
                <button onClick={()=>changeStatusToCompleted(index)}>＞</button>
                {/* ここに編集ボタン/本当はfontawesomeを導入したかったが、ESLintの競合が発生して導入できなかったので、以下のようなボタンを設置 */}
                <button>{editTask.isEditing ? '保存': '編集'}</button>
                {/* ここに削除ボタン/本当はfontawesomeを導入したかったが、ESLintの競合が発生して導入できなかったので、以下のようなボタンを設置*/}
                <button>削除</button>
              </div>
            )
          })}
        </div>

        <div className='status-box'>
          <p className='status-label'>{statuses[2]}</p>
          {completedTasks.map((task, index) => {
            return (
              <div key={task.uuid}>
                <button onClick={()=>changeStatusToProgressFromCompleted(index)}>＜</button>
                <p>{task.title}</p>
                <p>{task.content}</p>
                {/* ここに編集ボタン/本当はfontawesomeを導入したかったが、ESLintの競合が発生して導入できなかったので、以下のようなボタンを設置 */}
                <button>編集</button>
                {/* ここに削除ボタン/本当はfontawesomeを導入したかったが、ESLintの競合が発生して導入できなかったので、以下のようなボタンを設置*/}
                <button>削除</button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

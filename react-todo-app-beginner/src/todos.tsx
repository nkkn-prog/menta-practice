
import { useState } from 'react'
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
  const [editInputTitle,setEditInputTitle] = useState('')
  const [editInputText,setEditInputText] = useState('')

  const statuses = ['未着手','進行中','完了']

  const reflectTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value)
  }

  const reflectText = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value)
  }

  const reflectEditTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setEditInputTitle(event.target.value)
  }

  const reflectEditText = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditInputText(event.target.value)
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

  const editClick = (index: number, status: string) => {

    const setTasksMap = {
      [statuses[0]]: setNotStartedTasks,
      [statuses[1]]: setInProgressTasks,
      [statuses[2]]: setCompletedTasks
    };
  
    const currentTasksMap = {
      [statuses[0]]: notStartedTasks,
      [statuses[1]]: inProgressTasks,
      [statuses[2]]: completedTasks
    };
  
    // 現在のタスクリストと更新関数を取得
    const setTasks = setTasksMap[status];
    const currentTasks = currentTasksMap[status];
  
    // 選択されたタスクを取得
    const selectedTask = currentTasks[index];
  
    // タスクリストを更新
    setTasks(currentTasks.map((task, i) => ({
      ...task,
      isEditing: i === index ? !task.isEditing : false
    })));
  
    // 編集用のタスクを設定
    setEditTask({
      ...selectedTask,
      isEditing: !selectedTask.isEditing
    });
  };

  const deleteTask = (index: number, status: string) => {

    if(status === statuses[0]){
      const newNotStartedTasks = [...notStartedTasks];
      newNotStartedTasks.splice(index, 1)
      setNotStartedTasks(newNotStartedTasks)
    }

    if(status === statuses[1]){
      const newInProgressTasks = [...inProgressTasks]
      newInProgressTasks.splice(index, 1)
      setInProgressTasks(newInProgressTasks)
    }

    if(status === statuses[2]){
      const newCompletedTasks = [...completedTasks]
      newCompletedTasks.splice(index, 1)
      setCompletedTasks(newCompletedTasks)
    }
  }

  const updateClick = (status:string) => {

    const setTasksMap = {
      [statuses[0]]: setNotStartedTasks,
      [statuses[1]]: setInProgressTasks,
      [statuses[2]]: setCompletedTasks
    };
  
    const currentTasksMap = {
      [statuses[0]]: notStartedTasks,
      [statuses[1]]: inProgressTasks,
      [statuses[2]]: completedTasks
    };
  
    // 現在のタスクリストと更新関数を取得
    const setTasks = setTasksMap[status];
    const currentTasks = currentTasksMap[status];
  
    // タスクリストを更新
    // editTaskを使わなければデプロイできなかったので、三項演算子ではなくif文で書いている
    setTasks(currentTasks.map(task => {
      if (task.uuid === editTask.uuid) {
        return {
          ...task,
          title: editInputTitle,
          content: editInputText,
        };
      }
      return task;
    }));

    setEditInputTitle('');
    setEditInputText('');
  }




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
        <div className='status-box not-started-box'>
          <p className='status-label' style={{color:'#737373'}}>{statuses[0]}</p>
          {/* addしたものをここで出す */}
          {notStartedTasks.map((task, index) => (
            // key属性は最外部の要素に必要
            <div key={task.uuid} className='not-started-item'>
              {task.isEditing ? (
                <>
                  <input
                    type="text"
                    value={editInputTitle} 
                    onChange={reflectEditTitle}
                    style={{height:'20px', marginTop:'10px'}}
                  />
                  <textarea
                    placeholder="タスクの内容を入力"
                    value={editInputText} 
                    onChange={reflectEditText}
                    style={{width:'95%', marginTop:'10px'}}
                  />
                  <button onClick={() => updateClick(statuses[0])}>保存</button>
                  <button onClick={() => deleteTask(index, statuses[0])}>削除</button>
                  <button onClick={() => changeStatusToProgressFromNotStarted(index)}>＞</button>
                </>
              ) : (
                <>
                  <p>タイトル：{task.title}</p>
                  <p>内容：{task.content}</p>
                  <button onClick={() => editClick(index, statuses[0])}>編集</button>
                  <button onClick={() => deleteTask(index, statuses[0])}>削除</button>
                  <button onClick={() => changeStatusToProgressFromNotStarted(index)}>＞</button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className='status-box in-progress-box'>
          <p className='status-label' style={{color:'#5271ff'}}>{statuses[1]}</p>
          {inProgressTasks.map((task, index) => (
            // key属性は最外部の要素に必要
            <div key={task.uuid} className='not-started-item'>
              {task.isEditing ? (
                <>
                  <input
                    type="text"
                    value={editInputTitle} 
                    onChange={reflectEditTitle}
                    style={{height:'20px', marginTop:'10px'}}
                  />
                  <textarea
                    placeholder="タスクの内容を入力"
                    value={editInputText} 
                    onChange={reflectEditText}
                    style={{width:'95%', marginTop:'10px'}}
                  />
                  <button onClick={()=>changeStatusToNotStarted(index)}>＜</button>
                  <button onClick={() => updateClick(statuses[1])}>保存</button>
                  <button onClick={() => deleteTask(index, statuses[1])}>削除</button>
                  <button onClick={()=>changeStatusToCompleted(index)}>＞</button>
                </>
              ) : (
                <>
                  <p>タイトル：{task.title}</p>
                  <p>内容：{task.content}</p>
                  <button onClick={()=>changeStatusToNotStarted(index)}>＜</button>
                  <button onClick={() => editClick(index, statuses[1])}>編集</button>
                  <button onClick={() => deleteTask(index, statuses[1])}>削除</button>
                  <button onClick={()=>changeStatusToCompleted(index)}>＞</button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className='status-box completed-box'>
          <p className='status-label' style={{color:'#00bf63'}}>{statuses[2]}</p>
          {completedTasks.map((task, index) => (
            // key属性は最外部の要素に必要
            <div key={task.uuid} className='not-started-item'>
              {task.isEditing ? (
                <>
                  <input
                    type="text"
                    value={editInputTitle} 
                    onChange={reflectEditTitle}
                    style={{height:'20px', marginTop:'10px'}}
                  />
                  <textarea
                    placeholder="タスクの内容を入力"
                    value={editInputText} 
                    onChange={reflectEditText}
                    style={{width:'95%', marginTop:'10px'}}
                  />
                  <button onClick={()=>changeStatusToProgressFromCompleted(index)}>＜</button>
                  <button onClick={() => updateClick(statuses[2])}>保存</button>
                  <button onClick={() => deleteTask(index, statuses[2])}>削除</button>
                </>
              ) : (
                <>
                  <p>タイトル：{task.title}</p>
                  <p>内容：{task.content}</p>
                  <button onClick={()=>changeStatusToProgressFromCompleted(index)}>＜</button>
                  <button onClick={() => editClick(index, statuses[2])}>編集</button>
                  <button onClick={() => deleteTask(index, statuses[2])}>削除</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

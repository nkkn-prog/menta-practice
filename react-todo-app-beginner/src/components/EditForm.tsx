 export const EditForm = (props) => {

    
    <>
      <input
        type='text'
        label='新しいタイトル'
        value={newTitle}
        onChange={handleEditFormChanges}
      />
      <button onClick={()=>handleEditTodo}>編集を保存</button>
      <button onClick={()=>handleCloseEditForm}>キャンセル</button>
    </>;
  };
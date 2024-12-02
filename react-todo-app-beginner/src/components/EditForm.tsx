type EditFormProps = {
    editInputTitle: string;
    editInputText: string;
    reflectEditTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
    reflectEditText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  }
  
export const EditForm = (props:EditFormProps) => {

    const {editInputTitle, editInputText, reflectEditTitle, reflectEditText} = props

    

    return (
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
        </>
    )
}
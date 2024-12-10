export default function TodoItem({ todo, onUpdate, onDelete }: {
    todo: string;
    onUpdate?: (newTodo: string) => void;
    onDelete?: () => void
}) {
    return (
        <div>
            {todo}
            {/* <button onClick={onUpdate}>수정</button> */}
            <button onClick={onDelete}>삭제</button>
        </div>
    );
}
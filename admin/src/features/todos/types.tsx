export interface Todo {
  _id: string;
  title: string;
  link: string;
  order: number;
  completed: boolean;
}

export interface CreateTodoDto {
  title: string;
  link: string;
}

export interface UpdateTodoDto extends Partial<CreateTodoDto> {
  _id: string;
  order: number | null;
  completed: boolean;
}

export type TodoTableRowProps = {
  row: Todo;
  selected: boolean;
  onSelectRow: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export interface Category {
  _id: string;
  title: string;
  slug: string;
}

export interface CreateCategoryDto {
  title: string;
  slug: string;
}
export interface UpdateCategoryDto {
  title: string;
  slug: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  newSlug: string;
}

export type CategoryTableRowProps = {
  row: Category;
  selected: boolean;
  onSelectRow: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export interface DeleteModalSettingsProps {
  open: boolean;
  item: {
    id?: string;
    titleToDelete: string;
  };
}

export interface AlertSettingsProps {
  show: boolean;
  text: string;
  type: string;
}

export interface HeaderTabProps {
  title: string;
  id: string;
  isActive: boolean;
  onClick: (title: string) => void;
}

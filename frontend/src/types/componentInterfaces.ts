export interface UserUpdateCardProps {
  title: string
  description: string
  currentLabel: string
  currentValue: string
  newLabel: string
  newValue: string
  onNewValueChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  inputType?: string
  isLoading?: boolean
}

export type MessageCard = { 
  content: string; 
  //from the enum in schema.prisma, remember?
  role: 'USER' | 'AI';
}

export type MessageListProps = {
  messages: MessageCard[];
  isLoading: boolean;
  error: string | null;
}
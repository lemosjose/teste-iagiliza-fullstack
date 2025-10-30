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

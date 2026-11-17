type Props = React.ComponentProps<'button'>



export default function Button({ className = '', ...props }: Props) {
  return (
    <button className={`cursor-pointer rounded px-3 py-1.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
  )
}
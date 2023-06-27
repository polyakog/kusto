type labelType = {
  children: React.ReactNode
  id?: string
}

const FormLabel = ({ children, id }: labelType) => {
  return <label id={id}>{children}</label>
}

export default FormLabel

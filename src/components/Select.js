const Select = ({ children, classList = '', name = '', value, handleChange }) => {

  return (
    <select
      className={classList}
      name={name}
      value={value}
      onChange={(e) => handleChange(e)}
    >
      {children}
    </select>
  )
}
export default Select
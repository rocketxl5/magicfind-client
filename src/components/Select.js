import Option from './Option';

const Select = (props) => {
  const {
    id,
    classList = '',
    type,
    name,
    value,
    options,
    handleChange,
    handleFocus
  } = props;

  return (
    <select
      id={id}
      className={classList}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
    >
      {
        options.map((option, i) => {
          return (
            <Option key={i} value={option.value}>
              {option.text}
            </Option>
          )
        })
      }
    </select>
  )
}

export default Select
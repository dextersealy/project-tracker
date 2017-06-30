export const handleChange = function(field) {
  return (e) => {
    e.preventDefault();
    this.setState({[field]: e.currentTarget.value});
  }
};

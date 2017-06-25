export const handleChange = function(field) {
  return (e) => {
    e.preventDefault();
    const newState = Object.assign({}, this.state);
    newState[field] = e.currentTarget.value;
    this.setState(newState);
  }
};

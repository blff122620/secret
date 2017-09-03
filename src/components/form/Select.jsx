import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  selectHeight:{
    height: '72px'
  }
}

class Select extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e, index, value){
    this.props.onChange(e, index, value, this.props.name);
  }
  render() {
    const {options,...props} = this.props;
    
    return (
      <div>
        <SelectField
          style={styles.selectHeight}
          {...props}
          onChange={this.handleChange}
        >
          {this.props.options.map((option, idx) => {
            return <MenuItem key={idx} value={option.value} primaryText={option.name} />;
          })}
          
        </SelectField>
      </div>
    );
  }
}

export default Select;
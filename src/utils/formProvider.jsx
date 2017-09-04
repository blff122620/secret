import React from 'react';
import $ from './utils';

function formProvider(WrappedForm, fields){
  const initialFormState = {};
  clearForm(fields);
  // 清空form的state
  function clearForm(fields){
    for(const key in fields){
      initialFormState[key] = {
        value: fields[key].defaultValue,
        error: '',
      }
    }
  }
  return class ValidForm extends React.Component{
    static displayName = `ValidForm(${$.getDisplayName(WrappedForm)})`;
    constructor(props){
      super(props);
      this.state = {
        form: initialFormState
      };
      this.handleChange = this.handleChange.bind(this);
      this.checkFormValid = this.checkFormValid.bind(this);
      this.setFormValues = this.setFormValues.bind(this);
    }
    // 编辑用设置表单数值
    setFormValues(values){
      if (!values) {
        clearForm(fields);
        this.state = {
          form: initialFormState
        };
        return;
      }
      const {form} = this.state;
      const newForm = {...form};
      for(const field in newForm){
        if(newForm.hasOwnProperty(field)){
          if(typeof values[field] !== 'undefined'){
            newForm[field].value = values[field];
          }
        }
      }
      this.setState({ form: newForm });
    }
    // 验证表单数值有效性
    checkFormValid(){
      const { form } = this.state;
      for(const name in form){
        if(this.identify(name, form[name].value)){
          return false;
        }
      }
      return true;
    }
    // 只做状态数值更改，不做验证
    handleChange(e, index, val, nodeName){
      let name = e.target.name,
          value = e.target.value;  
      if(nodeName){ // 处理MUI的select赋值
        name = nodeName;
        value = val;
      }
      this.identify(name, value);
    }

    // 验证表单，更改状态，显示错误信息
    identify(name, value){
      let errText = '';
      const formNotValid = fields[name].rules && fields[name].rules.length !==0 && fields[name].rules.some(rule => {
        // 遍历每一个规则，如果有错就返回
        if(typeof rule.pattern === 'function'){
          if(!rule.pattern(value)){
            // 第一个验证出错了，那么就返回，不在继续循环
            errText = rule.error;
            return true;
          }
        }
        else{
          if(!rule.pattern.test(value)){
            errText = rule.error;
            return true;
          }
        }
        return false;
      });
      
      const newForm = {
        ...this.state.form,
        [name]:{
          value,
          error: errText,
        }
      }
      this.setState({
        form: newForm,
      });
      return formNotValid
    }
    
    render(){
      const {form} = this.state;
      return (
        <WrappedForm form={form} formValid={this.checkFormValid} onFormChange={this.handleChange} setFormValues={this.setFormValues} {...this.props} />
      );
    }
  };
}

export default formProvider;
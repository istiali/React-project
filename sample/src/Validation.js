function validation(values) {
        const password_pattern =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        let errors = {};
        
        if (!password_pattern.test(values.password)) {
            errors.password = "Password must contain Minimum eight characters, at least one letter and one number";
          }
          else{
              errors.password = "";
          }
        
        return errors;
      
}
export default  validation;
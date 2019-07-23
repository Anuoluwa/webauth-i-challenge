const validateUser = (req, res, next) => {
    const { username, email, password } = req.body;
    const user = {
      username, email, password
    };
    if (typeof user.username === "undefined" || typeof user.email === "undefined" || typeof user.password === "undefined" ) {
      return res
        .status(404)
        .json({ errorMessage: "Please provide username as key, and value for the new user." });
    } 
    if(user.username.trim() === '' || user.email.trim() === '' || user.password.trim() === '') {
      return res
        .status(404)
        .json({ errorMessage: "Please provide value for the new user." });
    }
    next();
  };
  
  export default validateUser;
  
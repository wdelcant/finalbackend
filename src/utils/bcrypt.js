import bcrypt, { compareSync } from 'bcrypt'

export const createHash = password => {
    const passwordString = String(password); // Convert to string
    const salt = bcrypt.genSaltSync(10); // Generate salt synchronously
    return bcrypt.hashSync(passwordString, salt); // Hash the password with the salt
  };

//pass ingresado en login 
export const isValidPassword= (password, user) =>
{
  try{
    return bcrypt.compareSync(password, user.password)
  }catch (err){
    console.log ('Error isValidPassword', err)
  }
  

}
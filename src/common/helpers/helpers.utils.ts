import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};


// #Agregation of many functions by responsability 
// export const HelperService = {
//     async hashPassword(userPassword: string): Promise<string> {
//       const saltRounds = 10;
//       return bcrypt.hash(userPassword, saltRounds);
//     },
//   };
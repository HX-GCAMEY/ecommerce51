export function validate(request) {
  const authHeader = request.headers.authorization;
  //Basic: gama@gmail.com:Password123

  if (!authHeader) {
    return false;
  }

  const auth = authHeader.split(' ')[1]; //["Basic:", "gama@gmail.com:Password123"]

  if (!auth) {
    return false;
  }

  const [email, password] = auth.split(':'); //["gama@gmail.com","Password123"]

  if (!email || !password) {
    return false;
  }
  return true;
}

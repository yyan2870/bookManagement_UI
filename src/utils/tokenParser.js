export const parseAuth = (token) => {
  const rolePart = token.substring(token.length - 8);
  const authPart = token.substring(0, token.length - 8);
  return { authPart, rolePart }
}



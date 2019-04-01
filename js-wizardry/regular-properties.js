function getUser(banned) {
  const userStatus = {banned, banReason: 'Wizard'};
  // only combine the user status if the user is banned
  const user = { name: 'Micah' };
  if(userStatus.banned) {
    Object.assign(user, userStatus);
  }
   return user;
}


console.log(getUser(true));
console.log(getUser(false));


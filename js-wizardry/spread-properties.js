function getUser(banned) {
  const userStatus = {banned, banReason: 'Wizard'};
  // only combine the user status if the user is banned
   return {
    name: 'Micah',
    ...userStatus.banned && userStatus,
  }
}


console.log(getUser(true));
console.log(getUser(false));


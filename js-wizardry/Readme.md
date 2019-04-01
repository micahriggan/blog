# Javascript Property Wizardry
Did you know you can add properties conditionally to an object with spread?

so instead of 

```javascript
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

```

you can do

```javascript
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

```


## Outputs
```javascript
{ name: 'Micah', banned: true, banReason: 'Wizard' }
{ name: 'Micah' }
```

Neat!

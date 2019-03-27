function fetchData(data) {
  return new Promise(resolve => setTimeout(() => {
    resolve(data)
  }, 1000))
}

function getLoggedInUser() {
  return fetchData('user1');
}

async function getDataForUser(userName) {
  const profileData = await fetchData({
    user1: {name: 'Micah', points: 100},
    user2: {name: 'someone else', point: 200}
  });
  return profileData[userName];
}

async function getUserPosts(userName) {
  const posts = await fetchData({
    user1: ['Promises Post'],
    user2: ['Streams Post']
  });
  return posts[userName];
}

async function userDataSerial() {
  console.time('userData-serial');
  const userName = await getLoggedInUser();
  const userData = await getDataForUser(userName);
  const userPosts = await getUserPosts(userName);
  console.timeEnd('userData-serial');
}


async function userDataParallel() {
  console.time('userData-parallel');
  const userName = await getLoggedInUser();
  const [userData, userPosts] = await Promise.all([
    getDataForUser(userName),
    getUserPosts(userName)
  ])
  console.timeEnd('userData-parallel');
}

async function test() {
  await userDataSerial();
  await userDataParallel();
}

test();

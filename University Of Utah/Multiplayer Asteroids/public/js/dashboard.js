
  try {
  document
    .getElementById('loggedin-game-button')
    .addEventListener('click', handleGameClick)


} catch (error) {
  document
    .getElementById('guest-game-button')
    .addEventListener('click', handleGuestClick)

}


async function handleGameClick(){
  let name = await getName()
  localName(name.name)
document.location.replace('/game')
}

async function handleGuestClick(){
  let name = document
  .getElementById('guest-name')
  .value
  localName(name)
  document.location.replace('/game')
}


function localName(name){
  localStorage.setItem('name', name)
}


async function getName(){
  let response = await fetch('/api/users/user', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await response.json()
}
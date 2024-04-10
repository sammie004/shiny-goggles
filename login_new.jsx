document.addEventListener('DOMContentLoaded', function () {
  let signupBtn = document.getElementById('signupBtn')
  let signinBtn = document.getElementById('signinBtn')
  let nameField = document.getElementById('nameField')
  let title = document.getElementById('title')

  let credentials = [
    { email: 'samzie12346@gmail.com', password: 'bomboclaat' },
    { email: 'samzie12345@gmail.com', password: 'bomboclart' },
    { email: 'samzie12347@gmail.com', password: 'bomboclaaat' }
  ]

  signinBtn.onclick = function () {
    // Hide the name field
    nameField.style.maxHeight = '0'
    title.innerHTML = 'Sign in'
    signupBtn.classList.add('disable')
    signinBtn.classList.remove('disable')

    // Check login credentials
    let enteredEmail = document.getElementById('email').value
    let enteredPassword = document.getElementById('password').value

    let isValidCredentials = false

    // Iterate through the array to check if entered credentials match
    for (let i = 0; i < credentials.length; i++) {
      if (
        enteredEmail === credentials[i].email &&
        enteredPassword === credentials[i].password
      ) {
        isValidCredentials = true
        break
      }
    }
    
    if(isValidCredentials){
      // correct credentials, redirect to redirect.html page
      window.location.href = 'redirect.html'
      
    }
    else if(!isValidCredentials) {
      // incorrect credentials display error message
      const error_msg = document.getElementById("error_message")
      error_msg.innerHTML = "invalid email or password "
      error_msg.style.color = "red"
      error_msg.style.display = "block"
      error_msg.style.marginBottom = "10px"

      setTimeout(()=>{
        document.getElementById("email").value = ''
        document.getElementById('password').value = ''
        error_msg.style.display = "none"
      },3000)
    }
  }

  signupBtn.onclick = function () {
    // Show the name field
    nameField.style.maxHeight = '60px'
    title.innerHTML = 'Sign up'
    signupBtn.classList.remove('disable')
    signinBtn.classList.add('disable')

    const error_msg = document.getElementById("error_message")
    error_msg.style.display = "none"

    const user_name = document.getElementById("name")
    const email = document.getElementById("email")
    const password = document.getElementById("password")

    if(!user_name || !email || !password){
        error_msg.style.display = "block"
        error_msg.innerHTML = "please fill all fields"
    }
  }
})

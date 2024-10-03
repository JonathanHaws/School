
const Engineer = require('./../lib/Engineer.js');

test('Engineer module not returning correct values for Role and Github Username',()=>{ 
    let engineer = new Engineer('Jonathan',3,'jonathan@email.com','JonathanHaws')
    expect(engineer.getRole()).toBe("Engineer")
    expect(engineer.getGithub()).toBe("JonathanHaws")    
});

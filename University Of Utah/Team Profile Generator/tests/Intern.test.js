
const Intern = require('./../lib/Intern.js');

test('Intern module not returning correct values for Role and School',()=>{ 
    let intern = new Intern('Jonathan',3,'jonathan@email.com','University Of Utah')
    expect(intern.getRole()).toBe("Intern") 
    expect(intern.getSchool()).toBe("University Of Utah") 
});


const Manager = require('./../lib/Manager.js');

test('Manager module not returning correct values for Role and Office Number',()=>{ 
    let manager = new Manager('Jonathan',3,'jonathan@email.com','Number 4')
    expect(manager.getRole()).toBe("Manager")
    expect(manager.getOfficeNumber()).toBe("Number 4")    
});

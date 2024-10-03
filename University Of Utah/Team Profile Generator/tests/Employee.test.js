
const Employee = require('./../lib/Employee.js');

test('Employee module not returning correct values for Name Id and Role',()=>{ 
    let employee = new Employee('Jonathan',3,'jonathan@email.com')
    expect(employee.getName()).toBe("Jonathan")
    expect(employee.getId()).toBe(3)
    expect(employee.getRole()).toBe("Employee")  
});

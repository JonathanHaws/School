
const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

function createCard(employee, infotextcolor, headercolor, infocolor, headertextcolor){ 
    let headertextstyle = 'color:' + headertextcolor +'; text-align:center; '
    let infotextstyle   = 'color:' + infotextcolor;  +';'
    let cardstyle       = 'width:min-width; margin:20px 20px 0px 0px;'
    let headerstyle     = 'background-color:'+ headercolor + '; border-radius:12px 12px 0px 0px; padding:10px; border: 5px ridge'+ headercolor + ';';
    let infostyle       = 'background-color:'+ infocolor   + '; border-radius:0px 0px 12px 12px; padding:10px; border: 5px ridge'+ infocolor + ';';
    let header       = '<h2 style="'+headertextstyle+'">' + employee.getName() + '</h2>'
    let info         = '<h3 style="'+infotextstyle+'"> Role: '+ employee.getRole() + '</h3>'
        info        += '<h3 style="'+infotextstyle+'"> ID: '+ employee.getId() + '</h3>'  
        info        += '<h3 style="'+infotextstyle+'">Email: <a href="mailto:'+employee.getEmail() +'">' + employee.getEmail() + '</a></h3>';
    switch (employee.getRole()){
        case 'Manager': info  += '<h3 style="'+infotextstyle+'">Office #: '+ employee.getOfficeNumber()+ '</h3>';  break;
        case 'Engineer': info += '<h3 style="'+infotextstyle+'">Github: <a href="https://github.com/'+ employee.getGithub() + '">' + employee.getGithub()+ '</a></h3>';  break;
        case 'Intern': info   += '<h3 style="'+infotextstyle+'">School: '+ employee.getSchool()+ '</h3>';  break;break;
    }
    return '\n      <div style="'+ cardstyle +'"><div style="'+ headerstyle +'">'+ header +'</div><div style ="' + infostyle + '">' + info + '</div></div>';
}

async function promptForEmployee(manager){ // Probably a better way to get the value of a prompt without having to put each attribute 5 times!
    if (manager){ var role = "Manager"; } else { var role = await inquirer.prompt({ type: 'list', message: 'What type of employee is the next one?', choices: ['Engineer', 'Intern',], name:'role'}); role = role.role;} 
    var name  = await inquirer.prompt({ type: 'input', message: 'What is the '+ role + "'s name?", name:'name' }); name = name.name; 
    var id    = await inquirer.prompt({ type: 'input', message: 'What is the '+ role + "'s id?", name:'id' }); id = id.id;
    var email = await inquirer.prompt({ type: 'input', message: 'What is the '+ role + "'s email?", name:'email' }); email = email.email;  
    switch (role){ 
        case 'Manager': 
            var officeId = await inquirer.prompt({ type: 'input', message: 'What is their office id?', name:'officeId' }); officeId = officeId.officeId;
            return new Manager(name, id, email, officeId)
        case 'Engineer': 
            var github = await inquirer.prompt({ type: 'input', message: 'What is their github username?', name:'github' }); github = github.github;
            return new Engineer(name, id, email, github)    
        case 'Intern': 
            var school = await inquirer.prompt({ type: 'input', message: 'What is their school?', name:'school' }); school = school.school;
            return new Intern(name, id, email, school)   
        default: return new Employee(name, id, email);
    }
}

async function promptForTeam(){
    var team = [await promptForEmployee("Manager")];
    for (i = 1; 1<2 ; i++){ 
        team[i] = await promptForEmployee(); //console.log(team[i]);
        var finished = await inquirer.prompt({ type: 'list', message: 'Are you finished adding employees?', choices: ['No', 'Yes',], name:'answer'});
        if (finished.answer == "Yes") {return team}}
}

async function createTeamProfile(style){
    let team = await promptForTeam(); //console.log(team);
    var htmldoccument =''; var cssdocument =''; 
    for (i=0; i<team.length; i++){ htmldoccument+= createCard(team[i], style.colors[3], style.colors[1], style.colors[2], style.colors[0])}
    htmldocument  = '\n<!DOCTYPE html>\n  <head>\n    <link rel="stylesheet" href="style.css">\n  </head>\n  <body>\n' 
    htmldocument += '    <div style = "margin:0px; padding:10px; background-color: ' + style.colors[1] + '"> <h1 style="color:'+ style.colors[2] +'; text-align:center; text-shadow: 2px 2px '+ style.colors[0] +'"> Team Profiles </h1></div>\n'
    htmldocument += '    <div style = "display:flex; flex-wrap:wrap; align-items:flex-start; justify-content:center; width:60%; margin:auto;">' + htmldoccument + '    </div>\n  </body>\n</html>\n';
    cssdocument  = '\nbody {\n  margin: 0px;\n  background-color:' + style.colors[0] + ';\n color:'+ style.colors[0] + ';\n  font-family:"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;}\n'
    cssdocument += '\nh1,h2,h3 {\n  margin:0px;\n  padding-top:5px;\n}\n';
    cssdocument += '\na {\n  color:'+style.colors[1]+';\n  font-weight: bolder;\n  font-size:1.17em\n}\n';
    cssdocument += '\na:hover {\n  color:' + style.colors[0] + ';\n}\n';

    fs.writeFile('./dist/index.html', htmldocument, (err)=>{})
    fs.writeFile('./dist/style.css', cssdocument , (err)=>{});
}

createTeamProfile({colors:['#2b2b2b','#3ea869','#c2c2c2','#4f4f4f']})

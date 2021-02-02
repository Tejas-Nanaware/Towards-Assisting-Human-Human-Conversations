let genderNotListed = (gender) => {
    console.log(gender.value);
    if(gender.value == 'A gender identity not listed here. Please specify') {
        document.getElementById("genderText").style.display = "flex";
    } else {
        document.getElementById("genderText").style.display = "none";
    }
}

let languageNotListed = (language) => {
    console.log(language.value);
    if(language.value == 'Other') {
        document.getElementById("nativeLanguageText").style.display = "flex";
    } else {
        document.getElementById("nativeLanguageText").style.display = "none";
    }
}

let isNotStudent = (isStudent) => {
    console.log(isStudent.value);
    if(isStudent.value != 'Student') {
        document.getElementById("workIndustryDiv").style.display = "flex";
    } else {
        document.getElementById("workIndustryDiv").style.display = "none";
    }
}

let disabilityListed = (disability) => {
    console.log(disability.value);
    if(disability.value == 'Yes') {
        document.getElementById("disabilityText").style.display = "flex";
    } else {
        document.getElementById("disabilityText").style.display = "none";
    }
}
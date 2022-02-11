/**
 * Send data to LS
 * @param {*} key 
 * @param {*} value 
 */
function dataSend(key,value){
    let data = JSON.stringify(value);
    return localStorage.setItem(key,data);
};



/**
 * Get data from LS
 * @param {*} key 
 * @returns 
 */
function dataGet(key){
    let data = localStorage.getItem(key);
    return  JSON.parse(data);
};






/**
 * Student result calculation
 */
function StudentResultCal(){
    

    this.gradeCal = function(marks){
        let grade;
        if( marks >= 0 && marks < 33 ){
            grade = "F";
        }else if( marks >= 33 && marks < 40 ){
            grade = "D";
        }else if( marks >= 40 && marks < 50 ){
            grade = "C";
        }else if( marks >= 50 && marks < 60 ){
            grade = "B";
        }else if( marks >= 60 && marks < 70 ){
            grade = "A-";
        }else if( marks >= 70 && marks < 80 ){
            grade = "A";
        }else if( marks >= 80 && marks <= 100 ){
            grade = "A+";
        }
        return grade;
    }

    this.gpaCal = function(marks){
        let gpa;
        if( marks >= 0 && marks < 33 ){
            gpa = 0;
        }else if( marks >= 33 && marks < 40 ){
            gpa = 1;
        }else if( marks >= 40 && marks < 50 ){
            gpa = 2;
        }else if( marks >= 50 && marks < 60 ){
            gpa =  3;
        }else if( marks >= 60 && marks < 70 ){
            gpa = 3.5;
        }else if( marks >= 70 && marks < 80 ){
            gpa = 4;
        }else if( marks >= 80 && marks <= 100 ){
            gpa = 5;
        }
        return gpa;
    }

    this.cgpaCal = function( bn, en, math, s, ss, rel ){
        
        let cgpa;
        let totalGpa = bn + en + math + s + ss + rel ;

        if( bn == 0 || en == 0 || math == 0 || ss == 0 || s == 0 || rel == 0){
            cgpa = '';
        }else{
            cgpa = (totalGpa / 6 ).toFixed(2);
        } 
        return  cgpa;    
    }


    let fgrade;
     this.fgradeCal = function(cgpa){
    
        if( cgpa >= 0 && cgpa < 1 ){
            fgrade = "F";
        }else if( cgpa >= 1 && cgpa < 2 ){
            fgrade = "D";
        }else if( cgpa >= 2 && cgpa < 3 ){
            fgrade = "C";
        }else if( cgpa >= 3 && cgpa < 3.5 ){
            fgrade =  "B";
        }else if( cgpa >= 3.5 && cgpa < 4 ){
            fgrade = "A-";
        }else if( cgpa >= 4 && cgpa < 5 ){
            fgrade = "A";
        }else if( cgpa == 5 ){
            fgrade = "A+";
        }
        return fgrade;
    }
}












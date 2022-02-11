//  Student Result

const form = document.getElementById("st-form");
const show = document.getElementById("show");
const valid = document.getElementById("validation");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = this.querySelector("input[name=name]");
    let roll = this.querySelector("input[name=roll]");
    let class_name = this.querySelector("input[name=class]");
    let photo = this.querySelector("input[name=photo]");
    let gender = this.querySelector("input[name=gender]:checked");
    let bn = this.querySelector("input[name=bn]");
    let en = this.querySelector("input[name=en]");
    let math = this.querySelector("input[name=math]");
    let s = this.querySelector("input[name=s]");
    let ss = this.querySelector("input[name=ss]");
    let rel = this.querySelector("input[name=rel]");

    if (
        name.value == "" ||
        roll.value == "" ||
        class_name.value == "" ||
        photo.value == "" ||
        gender.value == "" ||
        bn.value == "" ||
        en.value == "" ||
        math.value == "" ||
        s.value == "" ||
        ss.value == "" ||
        rel.value == ""
    ) {
        valid.innerHTML = `<p class="alert alert-danger">All fields are required</p>
        `;
    } else {
        let st_info = [];
        if (dataGet("st_info")) {
            st_info = dataGet("st_info");
        } else {
            st_info = [];
        }

        st_info.push({
            name: name.value,
            roll: roll.value,
            class: class_name.value,
            photo: photo.value,
            gender: gender.value,
            bn: bn.value,
            en: en.value,
            math: math.value,
            s: s.value,
            ss: ss.value,
            rel: rel.value,
        });
        dataSend("st_info", st_info);
        showData();

        this.querySelector("input[name=name]").value = "";
        this.querySelector("input[name=roll]").value = "";
        this.querySelector("input[name=class]").value = "";
        this.querySelector("input[name=photo]").value = "";
        this.querySelector("input[name=bn]").value = "";
        this.querySelector("input[name=en]").value = "";
        this.querySelector("input[name=math]").value = "";
        this.querySelector("input[name=ss]").value = "";
        this.querySelector("input[name=s]").value = "";
        this.querySelector("input[name=rel]").value = "";
        valid.innerHTML = "";
    }
});

function showData() {
    let st_arr = dataGet("st_info");
    let result = new StudentResultCal();


    if (st_arr) {
        let data = "";
        st_arr.map((ele, index) => {
            data += ` <tr>
        <td>${index + 1}</td>
        <td>${ele.name}</td>
        <td>${ele.roll}</td>
        <td>${ele.class}</td>
        <td>${ele.gender}</td>
        <td> ${result.fgradeCal(result.cgpaCal(
            result.gpaCal(st_arr[index].bn),
            result.gpaCal(st_arr[index].en),
            result.gpaCal(st_arr[index].math),
            result.gpaCal(st_arr[index].s),
            result.gpaCal(st_arr[index].ss),
            result.gpaCal(st_arr[index].rel))
        )}</td>
        <td>${result.cgpaCal(
            result.gpaCal(st_arr[index].bn),
            result.gpaCal(st_arr[index].en),
            result.gpaCal(st_arr[index].math),
            result.gpaCal(st_arr[index].s),
            result.gpaCal(st_arr[index].ss),
            result.gpaCal(st_arr[index].rel),
        )}</td>        
        <td>
          <img src="${ele.photo}" height="50px" width="50px" alt="">
        </td>
        <td>
          <button onclick=getSingleResult(${index}) data-bs-toggle="modal" data-bs-target='#student_result_show' class="btn btn-info">View</button>
          <button onclick=deletestudent(${index}) class="btn btn-danger">Delete</button>
        </td>
      </tr>`;
        });

        show.innerHTML = data;
    } else {
        show.innerHTML = "";
    }
}

showData();

// Delete student data
function deletestudent(id) {
    let conf = confirm("Are you sure");
    if (conf) {
        let storageData = dataGet("st_info");
        storageData.splice(id, 1);
        dataSend("st_info", storageData);
        showData();
    } else {
        return false;
    }
}

const show_single_data = document.getElementById("show_single_data");

function getSingleResult(index) {
    let result = new StudentResultCal();

    let storageData = dataGet("st_info");

    show_single_data.innerHTML = `

            <div class="row">
            <div class="col-lg-4">
            <img width="120px" class="img-thumbnail" src="${storageData[index].photo}" alt="">
            </div>
            <div class="col-lg-8">
            <ul>
                <li><strong>Name:</strong> <span>${storageData[index].name}</span></li>
                <li><strong>Roll:</strong> <span>${storageData[index].roll}</span></li>
                <li><strong>Class:</strong> <span> ${storageData[index].class}</span></li>
                <li><strong>Gender:</strong> <span>${storageData[index].gender}</span></li>
            </ul>
            </div>
            </div>
            <hr>
            <table class="table table-bordered">
            <thead>
            <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>gpa</th>
                <th>cgpa</th>
                <th>FGrade</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Bangla</td>
                <td>${storageData[index].bn}</td>
                <td>${result.gradeCal(storageData[index].bn)}</td>
                <td>${result.gpaCal(storageData[index].bn)}</td>
                <td class="text-center" rowspan="6">${result.cgpaCal(
                    result.gpaCal(storageData[index].bn),
                    result.gpaCal(storageData[index].en),
                    result.gpaCal(storageData[index].math),
                    result.gpaCal(storageData[index].s),
                    result.gpaCal(storageData[index].ss),
                    result.gpaCal(storageData[index].rel),
                )}</td>
                <td class="text-center" rowspan="6"> ${result.fgradeCal(result.cgpaCal(
                    result.gpaCal(storageData[index].bn),
                    result.gpaCal(storageData[index].en),
                    result.gpaCal(storageData[index].math),
                    result.gpaCal(storageData[index].s),
                    result.gpaCal(storageData[index].ss),
                    result.gpaCal(storageData[index].rel))
                )}
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>English</td>
                <td>${storageData[index].en}</td>
                <td>${result.gradeCal(storageData[index].en)}</td>
                <td>${result.gpaCal(storageData[index].en)}</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Math</td>
                <td>${storageData[index].math}</td>
                <td>${result.gradeCal(storageData[index].math)}</td>
                <td>${result.gpaCal(storageData[index].math)}</td>
            </tr>
            <tr>
                <td>4</td>
                <td>Science</td>
                <td>${storageData[index].s}</td>
                <td>${result.gradeCal(storageData[index].s)}</td>
                <td>${result.gpaCal(storageData[index].s)}</td>
            </tr>
            <tr>
                <td>5</td>
                <td>Socail Science</td>
                <td>${storageData[index].ss}</td>
                <td>${result.gradeCal(storageData[index].ss)}</td>
                <td>${result.gpaCal(storageData[index].ss)}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Religion</td>
                <td>${storageData[index].rel}</td>
                <td>${result.gradeCal(storageData[index].rel)}</td>
                <td>${result.gpaCal(storageData[index].rel)}</td>
            </tr>
            </tbody>
            </table>
    `;
}



// Search student 

const search_student = document.getElementById('search_student');

search_student.addEventListener('keyup',function(){


    let st_arr = dataGet("st_info");
    let result = new StudentResultCal();

        let data = "";
        st_arr.map((ele, index) => {

            if( st_arr.name == search_student.value){
                data += ` <tr>
                <td>${index + 1}</td>
                <td>${ele.name}</td>
                <td>${ele.roll}</td>
                <td>${ele.class}</td>
                <td>${ele.gender}</td>
                <td> ${result.fgradeCal(result.cgpaCal(
                    result.gpaCal(st_arr[index].bn),
                    result.gpaCal(st_arr[index].en),
                    result.gpaCal(st_arr[index].math),
                    result.gpaCal(st_arr[index].s),
                    result.gpaCal(st_arr[index].ss),
                    result.gpaCal(st_arr[index].rel))
                )}</td>
                <td>${result.cgpaCal(
                    result.gpaCal(st_arr[index].bn),
                    result.gpaCal(st_arr[index].en),
                    result.gpaCal(st_arr[index].math),
                    result.gpaCal(st_arr[index].s),
                    result.gpaCal(st_arr[index].ss),
                    result.gpaCal(st_arr[index].rel),
                )}</td>        
                <td>
                  <img src="${ele.photo}" height="50px" width="50px" alt="">
                </td>
                <td>
                  <button onclick=getSingleResult(${index}) data-bs-toggle="modal" data-bs-target='#student_result_show' class="btn btn-info">View</button>
                  <button onclick=deletestudent(${index}) class="btn btn-danger">Delete</button>
                </td>
              </tr>`;
            }
        });

        show.innerHTML = data;

});


// modal 

const modal_open = document.querySelector('.export');
const modal_close = document.querySelector('.modal-close');
const modal = document.querySelector('.mk-modal');
const modal_btn = document.querySelectorAll('.header-Bottom button');


modal_open.addEventListener('click',function(){
    modal.style.display = "flex";
});
modal_close.addEventListener('click',function(){
    modal.style.display = "none";
});

modal_btn.forEach( ele =>{
    ele.addEventListener('click',function(){
        modal_btn.forEach( item =>{
            item.classList.remove('active');
        });
        ele.classList.add('active');
    });
});




const btns = document.querySelectorAll('.tab-menu ul li a');
const content = document.querySelectorAll('.tab-item');


btns.forEach( btn => {
    btn.addEventListener('click',function(e){
        e.preventDefault();
        btns.forEach( btn =>{
            btn.classList.remove('active');
        });
        btn.classList.add('active');
        content.forEach(ele =>{
            ele.classList.remove('active');
        });
        const pan = document.querySelector(this.getAttribute('href'));
        pan.classList.add('active');
    });
});
// Sub tab part 
const nav_btns = document.querySelectorAll('.sub-tab-menu.navigation ul li a');
const nav_content = document.querySelectorAll('.navigation-content .item');



nav_btns.forEach( btn => {
    btn.addEventListener('click',function(e){
        e.preventDefault();
        nav_btns.forEach( btn =>{
            btn.classList.remove('active');
        });
        btn.classList.add('active');
        nav_content.forEach(ele =>{
            ele.classList.remove('active');
        });
        const pan = document.querySelector(this.getAttribute('href'));
        pan.classList.add('active');
    });
});


// slider btn 
const slider_btn = document.querySelectorAll('.slider-btn');
slider_btn.forEach( element =>{
    element.addEventListener('click',function(){
        element.classList.toggle('disabled');
    });
});


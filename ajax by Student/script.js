
var editId = null;

                 // =========================getStudent ======================= //

const getStudents = () => {
    $('table tbody').html(' ')
    $.ajax({    
        url: `http://213.230.99.101:2027/api/admin/students`,
        method: "get",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            Array.isArray(res) ? res.map((value, index) => {
                $('table tbody').append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${value.fullname}</td>
                    <td>${value.username}</td>
                    <td>${value.address}</td>
                    <td><button type="button" class="btn btn-success"  onclick = "editStudent(${value.id})">Edit</button></td>
                    <td><button type="button" class="btn btn-primary" onclick = "deleteStudent(${value.id})">Delete</button></td>
                </tr>
                `)
            }) : ""

        },

        error: function (err) {
            console.log(err);
        }
    })
}
getStudents()

                 // =========================open Modal ======================= //

const openModal = () => {
    $("#exampleModal").modal('show')
}

                 // =========================Close Modal ======================= //

const closeModal = () => {
    $("#exampleInputFullName").val('')
    $("#exampleInputUserName").val('')
    $("#exampleInputaddres").val('')
    $("#exampleInputPassword").val('')

    $("#exampleModal").modal('hide')
    getStudents()
}

                 // =========================Save student ======================= //

const saveStudent = () => {
    fullname = $("#exampleInputFullName").val()
    username = $("#exampleInputUserName").val()
    address = $("#exampleInputaddres").val()
    password = $("#exampleInputPassword").val()

    if (editId == null) { 
        newStudent = {
            address,
            fullname, 
            password,
            username
        }
        $.ajax({
            url: "http://213.230.99.101:2027/api/admin/student/save",
            method: 'post',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(newStudent),
            success: function (res) {
                closeModal()
            },
            error: function (err) {
                console.log(editId);
            }

        })
    }
    else {
        newStudent = {
            address,
            fullname,
            password,
            username
        }
        $.ajax({
            url: `http://213.230.99.101:2027/api/admin/student/edit/${editId}`,
            method: 'put',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(newStudent),
            success: function (res) {
                editId = null;
                $("#exampleInputPassword").css({
                    display: "block"
                })
                $(".modal-body .pass").css({
                    display: "block"
                })
                closeModal()              
            },
            error: function (err) {
                console.log(editId);

            }
        })
    }  

}

                 // =========================Edit student ======================= //

const editStudent = (id) => {           
    $.ajax({
        url: `http://213.230.99.101:2027/api/admin/student/${id}`,
        method: "get",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (res) {
            openModal()

            $("#exampleInputFullName").val(res.fullname)
            $("#exampleInputUserName").val(res.username)
            $("#exampleInputaddres").val(res.address)
            $("#exampleInputPassword").css({
                display: "none"
            })
            $(".modal-body .pass").css({
                display: "none"
            })
        },
        error: function (err) {
            console.log(err);
        }

    })
    editId = id;
}

                  // =========================== delete student ========================//

const deleteStudent = (id) => {
    $.ajax({
        url: "http://213.230.99.101:2027/api/admin/student/delete/" + id,
        method: 'delete',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            getStudents()
        },
        error: function (err) {
            console.log(err);
        }
    })

}



const url = "http://213.230.99.101:2027/api/admin"
let  editId = null;

const getGroup = () => {
    $("#select").html("")
    $("#table_group").html("")
        $.ajax({
            url: `${url}/tutors`,
            method: "get",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            dataSrc: "",
            success: function (res) {  
                Array.isArray(res) ? res.map(item=> {
                    $("#select").append(
                    `<option value="${item.id}">${item.fullname}</option>`
                    )
                }) : ""
            },
            error: function (err) {  
                console.log(err);
            }
        }
    )
    $("#table_group").DataTable({
        ajax: {
            url: `${url}/groups`,
            method: 'get',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            dataSrc: "",
        },
        columns: [
            {
                title: 'Id',
                data: 'id'
            },
            {
                title: 'Name',
                data: 'name'
            },
            {
                title: 'Tutor Fullname',
                data: 'tutor.fullname'
            },
            {
                title: 'Tutor Username',
                data: 'tutor.username'
            },
            {
                title: 'Edit',
                data: "id",
                render: (id) => {
                    return (
                        `<button type="button" class="btn btn-success" onclick = "editTutor(${id})">Edit</button>`
                    )
                }

            },
            {
                title: 'Delete',
                data: 'id',
                render: (id) => {
                    return (
                        `<button type="button" class="btn btn-danger" onclick = "deleteTutor(${id})">Delete</button>`
                    )
                }

            }
        ]
    })
}  

getGroup()

const openModal = () => {
    $("#exampleModal").modal("show")
    $("#exampleInputName").val("")
}
const closeModal = () => {
    $("#exampleModal").modal("hide")
    $("#exampleInputName").val("")
}
const saveGroup = () => {
    nameGroup = $("#exampleInputName").val()
    tutorId = $("#select").val()

    if(editId==null){
        tutorData = {
            name: nameGroup,
            tutorId,
        }

        $.ajax({
            url: `${url}/group/save`,
            method: "Post",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            dataSrc: "",
            data: JSON.stringify(tutorData),
            success: function (res) {
                $("#table_group").DataTable().ajax.reload()
                closeModal()
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
    else{
        tutorData = {
            name: nameGroup,
            tutorId,
        }
        $.ajax({
            url: `${url}/group/edit/${editId}`,
            method: "put",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            dataSrc: "",
            data: JSON.stringify(tutorData),
            success: function (res) {  
                closeModal()
                editId = null
                $("#table_group").DataTable().ajax.reload()
            },
            error: function (err) {  
                console.log(err);
            }
        })
    }
 closeModal()
}

const editTutor = (id) => {
    openModal()
    $.ajax({
        url: `${url}/group/${id}`,
        method: "get",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        dataSrc: "",
        success: function (res) {  
            $("#exampleInputName").val(res.name)
            $("#select").val(res.tutor.id)
            console.log(res.tutor.fullname);
        },
        error: function (err) {  
            alert("Ma'lumot o'zgarmadi")
        }
    })
    editId = id;

}

const deleteTutor = (id) => {
    $.ajax({
        url: `${url}/group/delete/${id}`,
        method: "delete",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        dataSrc: "",
        success: function (res) {
            $("#table_group").DataTable().ajax.reload()
        },
        error: function (err) {
            alert("Ma'lumot o'chirilmadi")
        }
    })
}


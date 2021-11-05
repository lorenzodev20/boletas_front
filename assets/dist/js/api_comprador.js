// URI base de la API REST
var uri = 'http://127.0.0.1:8000';

function editComprador(id) {
    $.ajax({
        type: "GET",
        url: uri + "/api/compradores/edit/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            $('#id_edit').val(data.id)
            $('#nombre_edit').val(data.nombre)
            $('#apellido_edit').val(data.apellido)
            $('#identificacion_edit').val(data.identificacion)
            $('#telefono_edit').val(data.telefono)
            // console.log(data);
        },
        failure: function (data) {
            swal(data.responseText);
        },
        error: function (data) {
            swal(data.responseText);
        }
    });
}

function deleteComprador(id) {
    $.ajax({
        type: "delete",
        url: uri + "/api/compradores/delete/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            swal("Buen Trabajo!", data, "success")
            .then((value) => {
                location.reload();
            });
        },
        failure: function (data) {
            swal(data.responseText);
        },
        error: function (data) {
            swal(data.responseText);
        }
    });
}

$(document).ready(function () {
    // Obtener todos los compradores registrados
    $.ajax({
        type: "GET",
        url: uri + "/api/compradores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $('#compradores > tbody').empty();
            $.each(data, function (i, item) {
                var rows =
                    "<tr>" +
                    "<th scope='row'>" + item.id + "</th>" +
                    "<td>" + item.nombre + "</td>" +
                    "<td>" + item.apellido + "</td>" +
                    "<td>" + item.identificacion + "</td>" +
                    "<td>" + item.telefono + "</td>" +
                    "<td>" +
                    "<div class='btn-group' role='group' aria-label='Basic outlined'>" +
                    "<button type='button' class='btn btn-outline-primary btnEditar' onclick='editComprador(" + item.id + ")' data-bs-toggle='modal' data-bs-target='#modalEditComprador'>Editar</button>" +
                    "<button type='button' class='btn btn-outline-primary' onclick='deleteComprador("+item.id+")'>Eliminar</button>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";
                $('#compradores > tbody').append(rows);
            });
            // console.log(data);
        },
        failure: function (data) {
            swal(data.responseText);
        },
        error: function (data) {
            swal(data.responseText);
        }
    });

    // Nuevo reistro de comprador
    $("form[name=FormNuevoComprador]").submit(function (event) {
        event.preventDefault();

        var nombreComprador = $('#nombre').val();
        var apellidoComprador = $('#apellido').val();
        var identificacionComprador = $('#identificacion').val();
        var telefonoComprador = $('#telefono').val();
        $.ajax({
            url: uri + "/api/compradores/save",
            type: "Post",
            data: JSON.stringify({
                nombre: nombreComprador,
                apellido: apellidoComprador,
                identificacion: identificacionComprador,
                telefono: telefonoComprador
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                swal("Buen Trabajo!", data.responseText, "success")
                    .then((value) => {
                        location.reload();
                    });
            },
            failure: function (data) {
                // alert(data.responseText);
                swal("Algo anda mal!", data.responseText, "warning")
            },
            error: function (data) {
                swal("Algo ha fallado!", data.responseText, "error")
            }
        });
    });

    $("form[name=FormEditComprador]").submit(function (event) {
        event.preventDefault();

        var idComprador = $('#id_edit').val();
        var nombreComprador = $('#nombre_edit').val();
        var apellidoComprador = $('#apellido_edit').val();
        var identificacionComprador = $('#identificacion_edit').val();
        var telefonoComprador = $('#telefono_edit').val();
        $.ajax({
            url: uri + "/api/compradores/update/"+idComprador,
            type: "PUT",
            data: JSON.stringify({
                nombre: nombreComprador,
                apellido: apellidoComprador,
                identificacion: identificacionComprador,
                telefono: telefonoComprador
            }),
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                swal("Buen Trabajo!", data, "success")
                    .then((value) => {
                        location.reload();
                    });
            },
            failure: function (data) {
                // alert(data.responseText);
                swal("Algo anda mal!", data.responseText, "warning")
            },
            error: function (data) {
                swal("Algo ha fallado!", data.responseText, "error")
            }
        });
    });
});
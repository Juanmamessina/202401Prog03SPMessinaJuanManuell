class Persona {
    constructor(id, nombre, apellido, fechaNacimiento) {
        if (this.validarId(id)) {
            this.id = id;
        } else {
            throw new Error("El ID debe ser un número válido y único.");
        }

        if (nombre) {
            this.nombre = nombre;
        } else {
            throw new Error("El nombre es obligatorio.");
        }

        if (apellido) {
            this.apellido = apellido;
        } else {
            throw new Error("El apellido es obligatorio.");
        }

        if (this.validarFechaNacimiento(fechaNacimiento)) {
            this.fechaNacimiento = fechaNacimiento; 
        } else {
            throw new Error("La fecha de nacimiento debe ser un número válido en formato AAAAMMDD.");
        }
    }
    validarFechaNacimiento(fechaNacimiento) {
        if (typeof fechaNacimiento !== "number" || fechaNacimiento === null || fechaNacimiento === undefined) {
            return false;
        }

        const fechaString = fechaNacimiento.toString();
        // Comprobar el formato AAAAMMDD
        return fechaString.length === 8 && !isNaN(fechaNacimiento);
    }
    formatearFechaNacimiento() {
        const fecha = this.fechaNacimiento.toString(); // Convertir la fecha de nacimiento a un string
        const año = fecha.substring(0, 4);
        const mes = fecha.substring(4, 6);
        const dia = fecha.substring(6, 8);
        return `${dia}/${mes}/${año}`; // Devolver la fecha formateada
    }
}


class Extranjero extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, paisOrigen) {
        super(id, nombre, apellido, fechaNacimiento);
        if (paisOrigen !== null && paisOrigen !== undefined) {
            this.paisOrigen = paisOrigen;
        } else {
            throw new Error("El país de origen es obligatorio.");
        }
    }

    toString() {
        return super.toString() + `, País de Origen: ${this.paisOrigen}`;
    }
}

class Ciudadano extends Persona {
    constructor(id, nombre, apellido, fechaNacimiento, dni) {
        super(id, nombre, apellido, fechaNacimiento);
        if (dni !== null && dni !== undefined && dni > 0) {
            this.dni = dni;
        } else {
            throw new Error("El DNI debe ser mayor a 0.");
        }
    }

    toString() {
        return super.toString() + `, DNI: ${this.dni}`;
    }
}




let listaElementos = [];





function mostrarSpinner() {
    document.getElementById('spinner').style.display = 'block';
}
function ocultarSpinner() {
    
    document.getElementById('spinner').style.display = 'none';
}


function mostrarFormularioLista() {

    
        document.getElementById('formularioLista').classList.remove('hidden');
        document.getElementById('formularioABM').classList.add('hidden');
        document.getElementById('spinner').style.display = 'none';
        renderizarTabla();
     
    
}

function mostrarFormularioABM(accion, elemento = {}) {
    
    document.getElementById('accionABM').textContent = accion;

    
    document.getElementById('formularioLista').classList.add('hidden');
    document.getElementById('formularioABM').classList.remove('hidden');

    
    document.getElementById('tipo-container').style.display = 'none';

    
    document.getElementById('id').value = elemento.id || '';
    document.getElementById('nombre').value = elemento.nombre || '';
    document.getElementById('apellido').value = elemento.apellido || '';
    document.getElementById('fechaNacimiento').value = elemento.fechaNacimiento || '';

    
    const dniContainer = document.getElementById('dni-container');
    const dniInput = document.getElementById('dni');
    const paisOrigenContainer = document.getElementById('paisOrigen-container');
    const paisOrigenInput = document.getElementById('paisOrigen');
    

    
    if ('dni' in elemento) {
        
        dniContainer.style.display = 'block';
        dniInput.value = elemento.dni || '';

        paisOrigenContainer.style.display = 'none';
        paisOrigenInput.value = elemento.paisOrigen || '';

    } else if ('paisOrigen' in elemento) {
        
        paisOrigenContainer.style.display = 'block';
        paisOrigenInput.value = elemento.paisOrigen || '';

        dniContainer.style.display = 'none';
        dniInput.value = elemento.dni || '';

    } else {
        
        paisOrigenContainer.style.display = 'none';
        paisOrigenInput.value = '';

        dniContainer.style.display = 'none';
        dniInput.value = elemento.dni || '';
    }
}

function mostrarFormularioAlta() {
    mostrarFormularioABM('Alta');
    document.getElementById('nombre-container').style.display = 'block';
    document.getElementById('apellido-container').style.display = 'block';
    document.getElementById('fechaNacimiento-container').style.display = 'block';
    document.getElementById('tipo-container').style.display = 'block';
    document.getElementById('paisOrigen-container').style.display = 'none';
    document.getElementById('dni-container').style.display = 'none';
}

function mostrarCamposTipo() {
    const tipoSelect = document.getElementById('tipo').value;
    const paisOrigenContainer = document.getElementById('paisOrigen-container');
    const dniContainer = document.getElementById('dni-container');
    const aceptarBtn = document.getElementById('aceptar-btn');
    const cancelarBtn = document.getElementById('cancelar-btn');

    if (tipoSelect === 'extranjero') {
        paisOrigenContainer.style.display = 'block';
        dniContainer.style.display = 'none';
        aceptarBtn.style.display = 'block';
        cancelarBtn.style.display = 'block';
    } else if (tipoSelect === 'ciudadano') {
        paisOrigenContainer.style.display = 'none';
        dniContainer.style.display = 'block';
        aceptarBtn.style.display = 'block';
        cancelarBtn.style.display = 'block';
    } else {
        paisOrigenContainer.style.display = 'none';
        dniContainer.style.display = 'none';
        aceptarBtn.style.display = 'none';
        cancelarBtn.style.display = 'none';
    }
    aceptarBtn.style.float = 'left';
    aceptarBtn.style.marginRight = '10px';
}

function renderizarTabla() {
    const tbody = document.getElementById('tablaElementos').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    listaElementos.forEach(elemento => {
        const fila = tbody.insertRow();
        fila.insertCell().textContent = elemento.id;
        fila.insertCell().textContent = elemento.nombre;
        fila.insertCell().textContent = elemento.apellido;
        fila.insertCell().textContent = elemento.fechaNacimiento;
        fila.insertCell().textContent = elemento.dni || 'N/A';
        fila.insertCell().textContent = elemento.paisOrigen || 'N/A';
        

        const celdaAcciones = fila.insertCell();
        const botonModificar = document.createElement('button');
        botonModificar.textContent = 'Modificar';
        botonModificar.onclick = () => mostrarFormularioABM('Modificar', elemento);
        celdaAcciones.appendChild(botonModificar);
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => mostrarFormularioABM('Eliminar', elemento);
        celdaAcciones.appendChild(botonEliminar);
    });
}

function obtenerPersonas() {
    mostrarSpinner();
    setTimeout(function() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            ocultarSpinner();
            if (xhr.status ===200 ) {
                listaElementos = JSON.parse(xhr.responseText);
                console.log(listaElementos);
                mostrarFormularioLista();
            } else {
                alert('No se pudo obtener la lista de personas.');
            }
        };
        xhr.onerror = function() {
            ocultarSpinner();
            alert('Error de red al intentar obtener la lista de personas.');
        };
        xhr.send();
    }, 2000); 
}


async function agregarPersona(elemento) {
    mostrarSpinner();

    try {
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        const response = await fetch('https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(elemento)
        });

        ocultarSpinner();

        if (!response.ok) {
            throw new Error('No se pudo agregar la persona.');
        }
        const respuesta = await response.json(); 
        elemento.id = respuesta.id; 
        listaElementos.push(elemento); 

        mostrarFormularioLista(); 

    } catch (error) {
        console.error('Error al agregar persona:', error);
        alert('Error al agregar la persona. Por favor, intenta nuevamente.');

    } finally {
        ocultarSpinner();
    }
}



function modificarPersona(elemento) {
    mostrarSpinner();

    return new Promise((resolve, reject) => {
        fetch('https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(elemento)
        })
        .then(response => {
            ocultarSpinner();

            if (response.status === 200) {
                return response.text();
            } else {
                throw new Error('No se pudo modificar la persona. Estado: ' + response.status);
            }
        })
        .then(respuesta => {
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(respuesta);
            } catch (error) {
                parsedResponse = respuesta;
            }

            const encontrado = listaElementos.find(e => e.id === parseInt(elemento.id)); 
            if (encontrado) {
                Object.assign(encontrado, elemento); 
                listaElementos = listaElementos.map(e => {
                    if (e.id === encontrado.id) {
                        return Object.assign(e, elemento);
                    }
                    return e;
                });
                
                console.log('Elemento modificado y reindexado en listaElementos:', encontrado);
                mostrarFormularioLista();
                resolve();
            } else {
                throw new Error('Elemento no encontrado en listaElementos');
            }
            console.log(elemento);
        })
        .catch(error => {
            console.error('Error al modificar persona:', error);
            alert('Error al modificar la persona. Por favor, intenta nuevamente.');

            ocultarSpinner();
            mostrarFormularioLista();
            reject(error);
        });
    });
}



function eliminarPersona(id) {
    mostrarSpinner();

    setTimeout(function() {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'https://examenesutn.vercel.app/api/PersonaCiudadanoExtranjero', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            ocultarSpinner(); 

            if (xhr.status === 200) {
                const index = listaElementos.findIndex(e => e.id === parseInt(id));
                if (index !== -1) {
                    listaElementos.splice(index, 1); 
                } else {
                    console.error('Elemento no encontrado en listaElementos.');
                }

                
                mostrarFormularioLista(); 
            } else {
                alert('No se pudo eliminar la persona.'); 
            }
        };

        xhr.send(JSON.stringify({ id: parseInt(id) }));

    }, 2000);
}





function aceptarABM() {
    const accion = document.getElementById('accionABM').textContent.toLowerCase();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fechaNacimiento = document.getElementById('fechaNacimiento').value;
    const paisOrigen = document.getElementById('paisOrigen').value;
    const dni = document.getElementById('dni').value;
    const id = document.getElementById('id').value; 

    

    const elemento = {
        nombre,
        fechaNacimiento,
        apellido,
        ...(dni ? { dni } : {}),  // agrega compras solo si existe
        ...(paisOrigen ? { paisOrigen } : {})  // agrega sueldo y ventas solo si ventas existe
    };

    

    if (accion === 'alta') {
        agregarPersona(elemento);
    } else if (accion === 'modificar') {
        elemento.id = id; 
        modificarPersona(elemento);
    } else if (accion === 'eliminar') {
        elemento.id = id;
        eliminarPersona(id);
    }
}


function cancelarABM() {
    mostrarFormularioLista();
}


obtenerPersonas();

            

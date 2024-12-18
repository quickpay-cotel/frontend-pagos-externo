import Swal from 'sweetalert2';

// Función para mostrar alerta básica
export const basicMessage = (titulo='mensaje',texto) => {
  Swal.fire({
    title: titulo,
    text: texto,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: 'orange',  // Color verde para el botón OK
  });
};

// Función para mostrar alerta básica
export const showAlert = () => {
  Swal.fire({
    title: '¡Bienvenido!',
    text: 'Este es un ejemplo básico con SweetAlert2',
    icon: 'info',
    confirmButtonText: 'Aceptar',
  });
};

// Función con configuración personalizada (puedes agregar más si es necesario)
export const showCustomAlert = (title, text, icon = 'info') => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'OK',
  });
};

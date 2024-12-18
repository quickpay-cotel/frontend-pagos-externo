// src/plugins/piniaPersist.js
const piniaPersist = (context) => {
  const store = context.store;
  const storeId = store.$id; // ID único del store

  // Cargar el estado guardado desde localStorage o sessionStorage
  const savedState = localStorage.getItem(storeId); // Usando localStorage
  if (savedState) {
    store.$patch(JSON.parse(savedState)); // Restaurar el estado
  }

  // Persistir el estado cuando haya cambios
  store.$subscribe(() => {
    localStorage.setItem(storeId, JSON.stringify(store.$state)); // Guardar en localStorage
  });
};

export default piniaPersist;

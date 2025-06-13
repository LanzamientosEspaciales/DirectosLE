fetch('../../config.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al cargar config.json');
    }
    return response.json();
  })
  .then(data => {
    // Seleccionar la cuenta regresiva específica (por ejemplo, cuenta-regresiva-1)
    const contador1 = data.contadores['cuenta-regresiva-1'];
    const contador2 = data.contadores['cuenta-regresiva-2'];

    nombreMision = contador1.mision;
    coheteAUsar = contador1.cohete;

    nombreMision2 = contador2.mision;
    coheteAUsar2 = contador2.cohete;
    

    // Actualizar el nombre de la misión en el DOM
    document.getElementById('directoName1').textContent = coheteAUsar + " • " + nombreMision;

    // Actualizar el nombre de la misión en el DOM
    document.getElementById('directoName2').textContent = coheteAUsar2 + " • " + nombreMision2;

    // Iniciar la cuenta atrás
    startCountdown();
  })
  .catch(error => {
    console.error('Error:', error);
  });
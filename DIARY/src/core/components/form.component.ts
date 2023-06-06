export const formTemplate = `
<h2>Inserta o Actualiza</h2>
<form class="form">
    <label for="name">Nombre:</label>
    <input type="text" id="name" name="name" required>

    <label for="surname">Apellido:</label>
    <input type="text" id="surname" name="surname" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="birthDate">Fecha de nacimiento:</label>
    <input type="date" id="birthDate" name="birthDate" required>

    <label for="phone">Teléfono:</label>
    <input type="tel" id="phone" name="phone" required>

    <button id="btnSend" class="btn-send">Enviar</button>
    <button id="btnUpdate" class="btn-send button-update" disabled>Actualizar</button>
</form>
`;
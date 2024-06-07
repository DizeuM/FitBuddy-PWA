let activities = [];

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('add-activity').addEventListener('click', function() {
        var activityModal = new bootstrap.Modal(document.getElementById('activityModal'), {});
        activityModal.show();
    });

    document.getElementById('activityType').addEventListener('change', function() {
        var activityType = this.value;
        var kmField = document.getElementById('kmField');
        if (activityType === 'Corrida' || activityType === 'Pedalada') {
            kmField.style.display = 'block'; // Mostra o campo de quilômetros
            document.getElementById('activityKm').required = true;
        } else {
            kmField.style.display = 'none'; // Oculta o campo de quilômetros
            document.getElementById('activityKm').value = '';
            document.getElementById('activityKm').required = false;
        }
    });

    loadActivities();

    // Adicione um ouvinte de evento para o formulário
    document.getElementById('activityForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que o formulário seja enviado normalmente (recarregar a página)

        // Captura os valores dos campos do formulário
        var activityType = document.getElementById('activityType').value;
        var deviceType = document.getElementById('deviceType').value;
        var activityTime = document.getElementById('activityTime').value;
        var activityKm = ''
        var kmField = document.getElementById('activityKm');
        if (kmField) {
            activityKm = kmField.value;
        }

        if (activityTime !== '') {

            var activityModal = bootstrap.Modal.getInstance(document.getElementById('activityModal'));
            activityModal.hide();
            // Chama a função addActivity() quando o formulário é submetido
            addActivity(activityType, deviceType, activityTime, activityKm);

            // Fecha o modal após submissão do formulário
        } else {
            // Se o campo de tempo de atividade estiver vazio, exibe uma mensagem de erro ou realiza outra ação
            alert('Por favor, informe o tempo de atividade.');
        }
    });

    function addActivity(type, device, time, km = '') {
        document.getElementById('textosumir').style.display = 'none';
        const activityFeed = document.getElementById('activity-feed');
        const newActivity = document.createElement('div');
        newActivity.className = 'border border-black rounded-4 px-3 mt-3';
        newActivity.style.backgroundColor = 'white';

        //VARIÁVEIS DO FORMULÁRIO
        const kmString = km !== '' ? ` de ${km}km` : '';
        const deviceString = device === "Nenhum" ? '' : device;
        const frequenciaString = device === "Nenhum" ? '' : "Frequência cardíaca: ";
        const batimentosString = device === "Nenhum" ? '' : ` ${getRandomInt(100, 180)}bpm`;
        const espaçoString = type === "Treino com peso" ? '' : '<br><br><br><br><br>';

        let content = `
            <div class="row">
                <div class="col-auto py-3">
                    <i class="fa-solid fa-circle-user" style="font-size: 2.5rem;"></i>
                </div>
                <div class="col py-3">
                    <h6 class="m-0" style="font-weight: 600;">Você</h6>
                    <p class="m-0" style="font-size: small; font-weight: 600; color: #8F8F8F;">Agora</p>
                </div>
                <div class="col-auto text-end py-3">
                    <span class="badge text-light" style="font-weight: 500; background-color: #0F82FF;">${deviceString}</span>
                </div>
            </div>
            <h6 class="m-0 mb-2" style="font-weight: 600;">${type}${kmString}</h6>
        `;

        if (espaçoString !== '') {
            content += `<div class="bg-light border border-black rounded-4">${espaçoString}</div>`;
        }

        content += `
            <div class="row pt-2 pb-3">
                <div class="col-auto list-inline">
                    <p class="list-inline-item m-0" style="font-size: small; font-weight: 600;">Tempo: </p>
                    <p class="list-inline-item m-0" style="font-size: small; font-weight: 600; color: #8F8F8F;"> ${time}m</p>
                </div>
                <div class="col text-end list-inline">
                    <p class="list-inline-item m-0" style="font-size: small; font-weight: 600;">${frequenciaString}</p>
                    <p class="list-inline-item m-0" style="font-size: small; font-weight: 600; color: #8F8F8F;">${batimentosString}</p>
                </div>
            </div>
        `;

        newActivity.innerHTML = content;
        activityFeed.insertBefore(newActivity, activityFeed.children[1]); // Adiciona a nova atividade logo após o título
        saveActivity(newActivity.innerHTML);
        console.log(activities);
    }

    function loadActivities() {
        const activityFeed = document.getElementById('activity-feed');
        let savedActivities = JSON.parse(localStorage.getItem('activities')) || [];
        activities = savedActivities;
        if (activities.length > 0) {
            document.getElementById('textosumir').style.display = 'none';
        }
        activities.forEach(activityHTML => {
            const activity = document.createElement('div');
            activity.className = 'border border-black rounded-4 px-3 mt-3';
            activity.style.backgroundColor = 'white';
            activity.innerHTML = activityHTML;
            activityFeed.appendChild(activity);
        });
        document.getElementById('textosumir').removeAttribute('hidden');
    }

    function saveActivity(activityHTML) {
        activities.unshift(activityHTML); // Adiciona a nova atividade no início do array
        localStorage.setItem('activities', JSON.stringify(activities));
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

});

let activities = [];

document.addEventListener('DOMContentLoaded', function() {

    loadProfileActivities();

    function loadProfileActivities() {
        const profileActivityFeed = document.getElementById('atividadesperfil');
        let savedActivities = JSON.parse(localStorage.getItem('activities')) || [];
        activities = savedActivities;
        activities.forEach(activityHTML => {
            const activity = document.createElement('div');
            activity.className = 'border border-black rounded-4 px-3 mt-3';
            activity.style.backgroundColor = 'white';
            activity.innerHTML = activityHTML;
            profileActivityFeed.appendChild(activity);
        });
    }

});

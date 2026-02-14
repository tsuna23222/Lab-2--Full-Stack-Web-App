document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Fully Loaded and Parsed');

    const appState = {
        currentUser: null,
        role: null,
    };

    function renderview(role){
        console.log('Rendering view for role: ${role}');
    }

    renderview('guest');
});

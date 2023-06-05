import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Vérifie la taille de l'écran 
 * 
 * @returns isDesktop type { bool } taille de l'écran
 */

export function checkScreenSize() {

const isDesktop = ref(false);

function update(event){
    if(window.innerWidth <= 768){
        isDesktop.value = false;
    } else {
        isDesktop.value = true;
    }
}

onMounted( () => {
    window.addEventListener('resize', update);
    update();
})
onUnmounted( () => window.removeEventListener('resize', update))

return { isDesktop }

}

/**
 * Function de classe perso en fonction de la largeur de l'écran
 * @returns {string} customClass -> la classe perso elle même. 
 */
export function screenClass() {

    const customClass = ref("d-flex flex-row justify-content-end");

    function update(event){
        if(window.innerWidth <= 900){
            customClass.value = "d-flex flex-row justify-content-center";
        } else {
            customClass.value = "d-flex flex-row justify-content-end";
        }
    }

    onMounted( () => { 
        window.addEventListener('resize', update);
    update()})
    onUnmounted( () => window.removeEventListener('resize', update))

    return { customClass }

}
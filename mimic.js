const __ = document.querySelector.bind(document);

/**
 * Creates a reactive reference that tracks changes to a value.
 * @param {any} initialValue - The initial value to be stored in the reference.
 * @returns {Object} - An object with a getter and setter for the value.
 */
function ref(initialValue) {
    const r = { value: initialValue };
    const effects = new Set();

    return {
        /**
         * Getter for the value. Tracks the active effect if one is set.
         * @returns {any} - The current value of the reference.
         */
        get value() {
            if (activeEffect) {
                effects.add(activeEffect);
            }
            return r.value; 
        },
        /**
         * Setter for the value. Updates the stored value and triggers all registered effects.
         * @param {any} newValue - The new value to set.
         */
        set value(newValue) {
            r.value = newValue;
            effects.forEach(effect => effect());
        }
    };
}

let activeEffect = null;

/**
 * Registers an effect that should re-run when reactive values change.
 * @param {Function} effect - The effect function to register.
 */
function watchEffect(effect) {
    activeEffect = effect;
    effect();
    activeEffect = null;
}
import { createEffect, onCleanup } from 'solid-js';

const HelpPopup = () => {
    let closeHelpPopup: HTMLSpanElement | undefined;

    createEffect(() => {
        const timeout = setTimeout(() => {
            const helpPopup = document.getElementById("helpPopup");
            if (helpPopup) {
                helpPopup.style.visibility = "visible";
                setTimeout(() => {
                    helpPopup.style.display = "none";
                }, 10000);
            }
        }, 2500);

        return () => clearTimeout(timeout);
    });

    onCleanup(() => {
        if (closeHelpPopup) {
            closeHelpPopup.removeEventListener("click", closePopupHandler);
        }
    });

    const closePopupHandler = () => {
        const helpPopup = document.getElementById("helpPopup");
        if (helpPopup) {
            helpPopup.style.display = "none";
        }
    };

    return (
        <div id="helpPopup" class="help-popup">
            Need any help? Click the chat icon below.
            <span ref={closeHelpPopup} id="closeHelpPopup" onClick={closePopupHandler}>&times;</span>
        </div>
    );
};

export default HelpPopup;

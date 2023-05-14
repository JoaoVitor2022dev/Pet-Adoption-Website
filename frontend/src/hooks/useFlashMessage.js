import bus from "../utils/bus";

export default function useFlashMessage() {
    function setFlasMessage(msg, type) {
        bus.emit( "flash" , {
            message: msg,
            type: type,
        })
    }

    return { setFlasMessage }
}
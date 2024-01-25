import bus from "../utils/bus";

export default function useFlashMessage() {
  const setFlashMessage = (msg: string, type: string) => {
    bus.emit('flash', {
      message: msg,
      type: type
    })
  }

  return { setFlashMessage }
}
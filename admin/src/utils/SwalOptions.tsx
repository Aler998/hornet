import { SweetAlertOptions } from "sweetalert2";

export const deleteSwalOptions: SweetAlertOptions = {
    title: "Sei sicuro?",
    text: "Non potrai tornare indietro!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si conferma"
}

export const errorSwalOptions = (error: string): SweetAlertOptions => ({
    icon: "error",
    title: "Oops...",
    text: error
})
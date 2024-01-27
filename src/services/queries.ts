import {useMutation, useQuery, useQueryClient } from "react-query"
import { createAddress, fetchAddress } from "./api"
import { Address } from "../pages/Home"

export function useAddress(){
    return useQuery(["address"], fetchAddress)
}

export function useCreateAddress(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: Address[])=> createAddress(data),
        onSuccess: async()=>{
           await queryClient.invalidateQueries({queryKey: ["address"]})
        }
    })
}

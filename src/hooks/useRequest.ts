import {useEffect, useState} from "react";

export const useRequest = (callback: Function) => {
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<any>("");

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const response = await callback()
                setData(response.data)
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        loadData()
    }, [])

    return [data, isLoading, error]
}
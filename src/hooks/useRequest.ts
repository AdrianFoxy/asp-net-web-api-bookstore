import {useEffect, useState} from "react";
import {AxiosResponse} from "axios";

export function useRequest<T> (callback: Function, dependencies: any[] = []) {
    const [data, setData] = useState<T>()
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
    }, dependencies)

    return [data, isLoading, error]
}